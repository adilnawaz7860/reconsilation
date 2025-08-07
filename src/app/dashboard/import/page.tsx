import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { Suspense } from "react";
import ImportTable from "@/components/Tables/Imports";

export const metadata: Metadata = {
  title: "Excel",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Import" />

      <div className="w-full space-y-10 overflow-auto">
        <ImportTable />
      </div>
    </>
  );
};

export default TablesPage;
