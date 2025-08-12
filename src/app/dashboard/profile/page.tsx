"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";

import { useEffect, useState } from "react";
import { getInitials } from "@/libs/utils";
import UpdateUserModal from "./updateUserProfile";
import { getCurrentUser } from "@/services/authService";

export default function Page() {
  const [data, setData] = useState({
    name: "Danish Heilium",
    profilePhoto: "/images/user/user-03.png",
    coverPhoto: "/images/cover/cover-01.png",
  });
   const [open ,setOpen] = useState(false);
     const [userInfo ,setUserInfo] = useState<any>({})
     
   
     
   
     useEffect(() => {
       getUserInfo();
     },[])
   
    const getUserInfo = async () => {
       const res = await getCurrentUser();
       console.log(res?.data , "datatada")
       setUserInfo(res?.data || "");
     };
     
    

  const handleChange = (e: any) => {
    if (e.target.name === "profilePhoto" ) {
      const file = e.target?.files[0];

      setData({
        ...data,
        profilePhoto: file && URL.createObjectURL(file),
      });
    } else if (e.target.name === "coverPhoto") {
      const file = e.target?.files[0];

      setData({
        ...data,
        coverPhoto: file && URL.createObjectURL(file),
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-[970px]">
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="relative z-20 h-35 md:h-65">
          <Image
            src={data?.coverPhoto}
            alt="profile cover"
            className="h-full w-full rounded-tl-[10px] rounded-tr-[10px] object-cover object-center"
            width={970}
            height={260}
            style={{
              width: "auto",
              height: "auto",
            }}
          />
          {/* <div onClick={() =>setOpen(true)} className="absolute  bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            <label
              htmlFor="cover"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-[15px] py-[5px] text-body-sm font-medium text-white hover:bg-opacity-90"
            >
              <input
                type="file"
                name="coverPhoto"
                id="coverPhoto"
                className="sr-only p-2 rounded border border-gray-3"
                onChange={handleChange}
                accept="image/png, image/jpg, image/jpeg"
              />

              <CameraIcon />

              <span onClick={() =>setOpen(true)}>Edit</span>
            </label>
          </div> */}
        </div>
      <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
      <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-[176px] sm:p-3">
        <div className="relative drop-shadow-2 flex items-center justify-center overflow-hidden rounded-full bg-primary text-white text-4xl font-bold h-full w-full">
          {data?.profilePhoto ? (
            <>
              {getInitials(userInfo?.fullName)}
              <label
                htmlFor="profilePhoto"
                className="absolute bottom-0 right-0 flex size-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
              >
                {/* <CameraIcon /> */}
                <input
                  type="file"
                  name="profilePhoto"
                  id="profilePhoto"
                  className="sr-only"
                  onChange={handleChange}
                  accept="image/png, image/jpg, image/jpeg"
                />
              </label>
            </>
          ) : (
            getInitials(userInfo?.fullName)
          )}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-1 text-heading-6 capitalize font-bold text-dark dark:text-white">
          {userInfo?.fullName}
        </h3>
        <p className="font-medium  text-body-sm text-muted-foreground">
         {userInfo?.email}
        </p>

        {/* <div className="mx-auto mb-5.5 mt-5 grid max-w-[370px] grid-cols-1 gap-4">
          <input
            value={user?.name || ""}
            readOnly
            className="cursor-default border p-2 rounded-full"
            placeholder="Name"
          />
           <input
            value={user?.email || ""}
            readOnly
            className="cursor-default border p-2 rounded-full"
            placeholder="Name"
          />
        </div> */}


        {/* <SocialAccounts /> */}
      </div>
    </div>
      </div>
      <UpdateUserModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
