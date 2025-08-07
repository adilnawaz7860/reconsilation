// nav-data.ts
import { useUserStore } from "@/store/userStore";
import * as Icons from "../icons";
import { getCurrentUser } from "@/services/authService";
import { useEffect, useState } from "react";

export function useNavData() {
  
  const [role ,setRole] = useState("")

  const getUser = async() => {
    const res = await getCurrentUser();
    console.log(res?.data?.role ,"roleelore")
    setRole(res?.data?.role)

      
  }

 useEffect(() => {
  getUser()
 },[])

  return [
    {
      label: "MAIN MENU",
      items: [
        {
          title: "Dashboard",
          url: "/",
          icon: Icons.Calendar,
          items: [],
        },
        ...(role === "ADMIN"
          ? [
              {
                title: "Users",
                url: "/dashboard/users",
                icon: Icons.Calendar,
                items: [],
              },
            ]
          : []),
        {
          title: "Transactions",
          url: "/dashboard/transactions",
          icon: Icons.Alphabet,
          items: [],
        },
         {
          title: "Excel Data",
          url: "/dashboard/import",
          icon: Icons.Alphabet,
          items: [],
        },
        {
          title: "Profile",
          url: "/dashboard/profile",
          icon: Icons.User,
          items: [],
        },
        // {
        //   title: "Forms",
        //   icon: Icons.Alphabet,
        //   items: [
        //     {
        //       title: "Form Elements",
        //       url: "/forms/form-elements",
        //     },
        //     {
        //       title: "Form Layout",
        //       url: "/forms/form-layout",
        //     },
        //   ],
        // },
        // {
        //   title: "Tables",
        //   icon: Icons.Table,
        //   items: [
        //     {
        //       title: "Tables",
        //       url: "/tables",
        //     },
        //   ],
        // },
        // {
        //   title: "Pages",
        //   icon: Icons.Alphabet,
        //   items: [
        //     {
        //       title: "Settings",
        //       url: "/pages/settings",
        //     },
        //   ],
        // },
      ],
    },
    // {
    //   label: "OTHERS",
    //   items: [
    //     {
    //       title: "Charts",
    //       icon: Icons.PieChart,
    //       items: [
    //         {
    //           title: "Basic Chart",
    //           url: "/charts/basic-chart",
    //         },
    //       ],
    //     },
    //     {
    //       title: "UI Elements",
    //       icon: Icons.FourCircle,
    //       items: [
    //         {
    //           title: "Alerts",
    //           url: "/ui-elements/alerts",
    //         },
    //         {
    //           title: "Buttons",
    //           url: "/ui-elements/buttons",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Authentication",
    //       icon: Icons.Authentication,
    //       items: [
    //         {
    //           title: "Sign In",
    //           url: "/auth/sign-in",
    //         },
    //       ],
    //     },
    //   ],
    // },
  ];
}
