"use client";

import { Modal } from "@mui/material";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";

type Props = {
  open: boolean;
  onClose: () => void;
  transaction: any;
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "Invalid Date";

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

export default function CreateExcelModal({ open, onClose, transaction }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!transaction) return null;

 const handleDownload = async () => {
  if (!modalRef.current) return;

  setIsDownloading(true);
  try {
    // Wait for the UI to update and hide the buttons
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const canvas = await html2canvas(modalRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
    });

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = `transaction-${transaction.transactionid}-${new Date().toISOString()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error capturing screenshot:", error);
    alert("Failed to download screenshot");
  } finally {
    setIsDownloading(false);
  }
};


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
      <div 
        ref={modalRef}
        className="z-[9999] absolute top-1/2 left-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white dark:bg-gray-900 p-6 shadow-lg"
      >
        {/* Header with download and close buttons */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-dark dark:text-white">
            Excel Details
          </h2>
          {/* Hide buttons when downloading */}
          {!isDownloading && (
            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary hover:bg-blue-700 text-white dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
                aria-label="Download screenshot"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="space-y-1 grid grid-cols-2 gap-2 space-x-4">
          <DetailRow label="Transaction ID" value={transaction.transactionid} />
          <DetailRow label="Merchant ID" value={transaction.merchantId?._id || "00000"} />
          <DetailRow label="Amount" value={`₹${transaction.amount?.toFixed(2)}`} />
          <DetailRow label="Payer VPA" value={transaction?.payerVpa} />
                              <DetailRow label="Payer Name" value={transaction?.payerName} />

                    <DetailRow label="Payer Mobile" value={transaction?.payerMobile} />
                       <DetailRow label="Customer VPA" value={transaction?.customerVpa} />
                          <DetailRow label="Customer Name" value={transaction?.customerName} />


          <DetailRow 
            label="Merchant Email" 
            value={transaction.merchantId?.email || "N/A"} 
          />
          <DetailRow label="UTR" value={transaction.utr || "N/A"} />
             <DetailRow label="Settled Amount" value={transaction.netSettlementAmt} />
           <DetailRow 
            label="Status" 
            value={
              <span className={`capitalize ${
                transaction.status === "SUCCESS" ? "text-green-600" :
                transaction.status === "PENDING" ? "text-yellow-500" : "text-red-500"
              }`}>
                {transaction.status}
              </span>
            } 
          />
           <DetailRow label="Transaction Time" value={formatDate(transaction.trxTime)} />
                    <DetailRow label="Created At" value={formatDate(transaction.createdAt)} />
                     

        
        </div>

        {/* Show loading indicator when downloading */}
       
      </div>
    </Modal>
  );
}

// Helper component for consistent styling
const DetailRow = ({ label, value }: { label: string; value: string | React.ReactNode }) => (
  <div className="flex flex-col justify-between items-start border-b border-gray-200 pb-3">
    <span className="font-medium text-gray-700 dark:text-gray-300">{label}:</span>
    <span className="text-gray-900 dark:text-white text-right max-w-full">
      {value}
    </span>
  </div>
);