import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { Suspense } from "react";
import ImportTable from "@/components/Tables/Imports";

export const metadata: Metadata = {
  title: "Tables",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Import" />

      <div className="space-y-10">
       <ImportTable/>
      </div>
    </>
  );
};

export default TablesPage;
