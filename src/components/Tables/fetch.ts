import * as logos from "@/assets/logos";

export async function getTopProducts() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    {
      image: "/images/product/product-01.png",
      name: "Apple Watch Series 7",
      category: "Electronics",
      price: 296,
      sold: 22,
      profit: 45,
    },
    {
      image: "/images/product/product-02.png",
      name: "Macbook Pro M1",
      category: "Electronics",
      price: 546,
      sold: 12,
      profit: 125,
    },
    {
      image: "/images/product/product-03.png",
      name: "Dell Inspiron 15",
      category: "Electronics",
      price: 443,
      sold: 64,
      profit: 247,
    },
    {
      image: "/images/product/product-04.png",
      name: "HP Probook 450",
      category: "Electronics",
      price: 499,
      sold: 72,
      profit: 103,
    },
  ];
}

export async function getInvoiceTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Free package",
      price: 0.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Paid",
    },
    {
      name: "Standard Package",
      price: 59.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Paid",
    },
    {
      name: "Business Package",
      price: 99.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Unpaid",
    },
    {
      name: "Standard Package",
      price: 59.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Pending",
    },
  ];
}

export async function getLatestTransactions() {
  // Simulate API delay
  await new Promise((res) => setTimeout(res, 2000));

  return [
    {
      name: "Adil Nawaz",
      email: "adil@example.com",
      avatar: "/avatars/1.jpg",
      amount: 1200,
      status: "completed",
      date: "Aug 6, 2025",
    },
    {
      name: "Sara Khan",
      email: "sara.k@example.com",
      avatar: "/avatars/2.jpg",
      amount: 850,
      status: "pending",
      date: "Aug 5, 2025",
    },
    {
      name: "Ravi Sharma",
      email: "ravi.s@example.com",
      avatar: "/avatars/3.jpg",
      amount: 199.99,
      status: "failed",
      date: "Aug 4, 2025",
    },
    {
      name: "Nikita Jain",
      email: "nikita.j@example.com",
      avatar: "/avatars/4.jpg",
      amount: 560,
      status: "completed",
      date: "Aug 3, 2025",
    },
    {
      name: "Zain Ali",
      email: "zain.ali@example.com",
      avatar: "/avatars/5.jpg",
      amount: 1100,
      status: "completed",
      date: "Aug 2, 2025",
    },
    {
      name: "Priya Singh",
      email: "priya.singh@example.com",
      avatar: "/avatars/6.jpg",
      amount: 750,
      status: "pending",
      date: "Aug 2, 2025",
    },
    {
      name: "Kabir Mehra",
      email: "kabir.m@example.com",
      avatar: "/avatars/7.jpg",
      amount: 320,
      status: "failed",
      date: "Aug 1, 2025",
    },
    {
      name: "Ayesha Khan",
      email: "ayesha.k@example.com",
      avatar: "/avatars/8.jpg",
      amount: 980,
      status: "completed",
      date: "Jul 31, 2025",
    },
    {
      name: "Raj Patel",
      email: "raj.patel@example.com",
      avatar: "/avatars/9.jpg",
      amount: 640,
      status: "completed",
      date: "Jul 30, 2025",
    },
    {
      name: "Meera Iyer",
      email: "meera.iyer@example.com",
      avatar: "/avatars/10.jpg",
      amount: 290,
      status: "pending",
      date: "Jul 29, 2025",
    },
  ];
}


export async function getTopChannels() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return [
    {
      name: "Google",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.google,
    },
    {
      name: "X.com",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.x,
    },
    {
      name: "Github",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.github,
    },
    {
      name: "Vimeo",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.vimeo,
    },
    {
      name: "Facebook",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.facebook,
    },
  ];
}
