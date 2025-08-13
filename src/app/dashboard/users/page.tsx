import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { InvoiceTable } from "@/components/Tables/invoice-table";
import  UserTable  from "@/components/Tables/Users";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import { TopProducts } from "@/components/Tables/top-products";
import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Users",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Users" />

      <div className="space-y-10">
       <UserTable/>
      </div>
    </>
  );
};

export default TablesPage;
