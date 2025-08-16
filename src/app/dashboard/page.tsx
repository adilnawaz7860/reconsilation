"use client"
import { useEffect, useState } from "react";
import { OverviewCardsGroup } from "../(home)/_components/overview-cards";
import  LatestTransactionsTable from "@/components/Tables/latest-transactions";
import { getallMerchants, getCurrentUser } from "@/services/authService";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { getAllTransactionsCount } from "@/services/analyticsService";
import { useRouter } from "next/navigation";
  import { format, set } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";



type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

export default  function Home({ searchParams }: PropsType) {
  const router = useRouter();
    const [merchants ,setMerchants] = useState([]);
  const [filteredMerchants, setFilteredMerchants] = useState<any[]>([]);
     const [selectedMerchantName, setSelectedMerchantName] = useState<string | null>(null);

   const [selectedMerchant, setSelectedMerchant] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [startDate ,setStartDate] = useState("");
  const [endDate ,setEndDate] = useState("");
  const [role ,setRole] = useState("")


    const [amount, setAmount] = useState("0");
    const [totalPayin, setTotalPayin] = useState("0");
    const [totalPayout, setTotalPayout] = useState("0");
    const [progressPercent,setProgressPercent] = useState("0");

     useEffect(() => {
    const fetchUsers = async () => {
      const res = await getallMerchants();
      console.log(res , "response")
      const users = res?.data?.users ?? [];
      setMerchants(users);
      setFilteredMerchants(users);
    };
    fetchUsers();
  }, []);

 const handleSelectMerchant = async (
  merchant: any,
  startDate?: string,
  endDate?: string
) => {
  // if merchant is an object
  if (typeof merchant === "object") {
    setSelectedMerchantName(merchant.fullName);
    setSelectedMerchant(merchant._id);

    const res = await getAllTransactionsCount(merchant._id, startDate, endDate);
    setTotalPayin(res?.data?.totalPayin);
    setAmount(res?.data?.totalAmount);
    setTotalPayout(res?.data?.totalPayout);
    setProgressPercent(res.data);
  }

  // if merchant is just an id
  if (typeof merchant === "string") {
    const res = await getAllTransactionsCount(merchant, startDate, endDate);
    setTotalPayin(res?.data?.totalPayin);
    setAmount(res?.data?.totalAmount);
    setTotalPayout(res?.data?.totalPayout);
    setProgressPercent(res.data);
  }
};


  const handleClear = async() => {
  setSelectedMerchant(null);
    setSelectedMerchantName(null);

 
   setRange([{
        startDate: null,
        endDate: null,
        key: "selection",
      }]);
       setEndDate("");
  setStartDate("");

    const res = await getAllTransactionsCount();
  setTotalPayin(res?.data?.totalPayin);
    setTotalPayout(res?.data?.totalPayout);
        setAmount(res?.data?.totalAmount);
    setProgressPercent(res?.data);
   


 
 

};

  const handleSearch = (value: string) => {
    setSearch(value);
    if (!value) {
      setFilteredMerchants(merchants);
    } else {
      setFilteredMerchants(
        merchants.filter((m :any) =>
          m.fullName.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

   const [showDatePicker, setShowDatePicker] = useState(false);
    const [range, setRange] = useState<any>([
      {
        startDate: null,
        endDate: null,
        key: "selection",
      },
    ]);
  
    const formatDateForAPI = (date :any) => {
    if (!date) return null;
    
    // Use local timezone instead of UTC to avoid date shifting
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

 
  
    const getUser = async() => {
      const res = await getCurrentUser();
      setRole(res?.data?.role)
  
        
    }

    useEffect(() => {
      getUser()
    }, [role])
  
  return (
    <>
    {
      role === "ADMIN" && (
         <div className="flex justify-end items-end  gap-4 p-2 mb-4">
       <div className="relative">
                    <input
                      readOnly
                      value={
                        range[0]?.startDate && range[0]?.endDate
                          ? `${format(range[0].startDate, "dd/MM/yyyy")} - ${format(
                              range[0]?.endDate,
                              "dd/MM/yyyy",
                            )}`
                          : "Select date range"
                      }
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      className="w-full capitalize  cursor-pointer text-dark-2 rounded-md border border-primary p-2.5 border-x-4 border-y-2 text-sm dark:bg-gray-dark dark:text-white md:w-auto"
                    />
      
                    {showDatePicker && (
                      <div
  className="absolute mt-2 w-full  bg-transparent p-2 shadow-lg z-50 dark:bg-dark-2"
>
                        <DateRange
                          ranges={range}
                         onChange={(item: any) => {
  setRange([item.selection]);

  const formattedStartDate :any = formatDateForAPI(item.selection.startDate);
  const formattedEndDate : any = formatDateForAPI(item.selection.endDate);

  setStartDate(formattedStartDate);
  setEndDate(formattedEndDate);

  // 👇 only call API when a valid range is selected
  if (item.selection.startDate && item.selection.endDate) {
    handleSelectMerchant(
      selectedMerchant ? selectedMerchant : "",
      formattedStartDate,
      formattedEndDate
    );
  }

  // Close only if it's a proper range, not a single day
  if (
    item.selection.startDate &&
    item.selection.endDate &&
    item.selection.startDate.getTime() !== item.selection.endDate.getTime()
  ) {
    setShowDatePicker(false);
  }
}}

                          moveRangeOnFirstSelection={false}
                          months={1}
                          direction="horizontal"
                          showDateDisplay={false}
                          rangeColors={["#4F46E5"]}
                        />
                      </div>
                    )}
                  </div>
       <div className="relative">
      {/* Dropdown Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full border border-primary border-x-4 border-y-2 rounded-lg px-4 py-2 flex justify-between items-center dark:bg-dark-2 dark:text-white text-dark-2 bg-white shadow-sm"
      >
        {selectedMerchantName ? selectedMerchantName : "Select Merchant"}
        <span className="ml-2"><ChevronDown/></span>
      </button>

      {/* Dropdown Content */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-full bg-white dark:bg-dark-2 border rounded-lg shadow-lg z-50"
          >
            {/* Search Box */}
            <div className="p-2">
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search merchant..."
                className="w-full dark:bg-dark-2 bg-white border rounded px-2 py-1 focus:outline-none"
              />
            </div>

            {/* Merchants List */}
            <div className="max-h-48 overflow-y-auto">
              {filteredMerchants.length > 0 ? (
                filteredMerchants.map((merchant) => (
                  <motion.div
                    key={merchant._id}
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                    className="px-4 py-2 capitalize cursor-pointer"
                     onClick={() => handleSelectMerchant(merchant , startDate ,endDate)}
                  >
                    {merchant.fullName}
                  </motion.div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No merchant found</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
     <button
            onClick={handleClear}
            className="w-full rounded-md border bg-primary px-3 py-3 text-sm text-white hover:bg-opacity-90 md:w-auto"
          >
            Clear Filter
          </button>
    </div>
      )
    }

   

   
      
        <OverviewCardsGroup totalPayout={totalPayout} setTotalPayout={setTotalPayout} setProgressPercent={setProgressPercent} progressPercent={progressPercent} setTotalPayin={setTotalPayin} amount={amount} setAmount={setAmount} totalPayin={totalPayin}/>
    

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
       

        <div className="col-span-12">
         <LatestTransactionsTable/>
        </div>

      
      </div>
    </>
  );
}
