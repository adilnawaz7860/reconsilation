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

      <div className="w-full space-y-10 overflow-auto xl:w-[1000px] xl:max-w-[1000px]">
        <ImportTable />
      </div>
    </>
  );
};

export default TablesPage;
