import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { InvoiceTable } from "@/components/Tables/invoice-table";
import  UserTable  from "@/components/Tables/Users";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import { TopProducts } from "@/components/Tables/top-products";
import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";

import { Metadata } from "next";
import { Suspense } from "react";
import LatestTransactionsTable from "@/components/Tables/Transactions";

export const metadata: Metadata = {
  title: "Tables",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Transactions" />

      <div className="space-y-10 w-full xl:w-[1100px] xl:max-w-[1100px] overflow-auto">
       <LatestTransactionsTable/>
      </div>
    </>
  );
};

export default TablesPage;
