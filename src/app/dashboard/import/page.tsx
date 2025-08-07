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

      <div className="space-y-10 w-full xl:w-[1100px] xl:max-w-[1100px] overflow-auto">
       <ImportTable/>
      </div>
    </>
  );
};

export default TablesPage;
