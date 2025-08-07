"use client";

import InputGroup from "@/components/FormElements/InputGroup";
import { Modal } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import {upLoadFile}  from '@/services/fileService'

type Props = {
  open: boolean;
  onClose: () => void;
  setRefresh: any;
};

export default function CreateImportModal({ open, onClose, setRefresh }: Props) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      file: null as File | null,
    },
    validationSchema: Yup.object({
      file: Yup.mixed()
        .required("Please upload a file")
        .test("fileType", "Only Excel files are allowed", (value:any) => {
          if (!value) return false;
          return (
            value.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || // .xlsx
            value.type === "application/vnd.ms-excel" || // .xls
            value.type === "text/csv" // optional for CSV
          );
        }),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const res = await upLoadFile(values.file)
      if(res.statusCode === 200){
          resetForm();
          toast.success(res?.message || "File uploaded successfully");
          onClose();
          setRefresh((prev :any) => !prev)


      }else{
              onClose();
         toast.error(res.message || "Upload failed");

      }
      

     

        // if (res.ok) {
        //   toast.success(result.message || "File uploaded successfully");
        //   resetForm();
        //   onClose();
        //   setRefresh((prev: any) => !prev);
        // } else {
          
        //   onClose();
        //   toast.error(result.message || "Upload failed");
        // }
      } catch (error: any) {
          
          onClose();
        toast.error(error?.response?.data?.message || error?.response?.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        style: {
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <div className="z-[9999] absolute top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white dark:bg-gray-900 p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-dark dark:text-white">
          Import Excel
        </h2>

        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div>
            <InputGroup
              type="file"
              label="Attach file"
              placeholder="Attach Excel file"
              fileStyleVariant="style1"
              accept=".xlsx,.xls,.csv"
              required
              handleChange={(e) => {
                const file = e.currentTarget.files?.[0];
                formik.setFieldValue("file", file);
              }}
            />
            {formik.touched.file && formik.errors.file && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.file}</p>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 flex items-center justify-center min-w-[80px]"
              disabled={loading}
            >
              {loading ? (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent" />
              ) : (
                "Upload"
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
