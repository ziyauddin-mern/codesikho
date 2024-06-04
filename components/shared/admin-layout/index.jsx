"use client";
import { useState } from "react";
import { Menu } from "antd";
import Link from "next/link";

const AdminLayout = ({ children, selecKey = null }) => {
  const [current, setCurrent] = useState(selecKey);
  const onClick = (e) => {
    setCurrent(e.key);
  };
  const items = [
    {
      label: (
        <Link
          href="/admin/feedbacks"
          className="text-lg font-semibold flex items-center gap-2"
        >
          <i className="ri-user-3-line"></i>
          <span>FeedBacks</span>
        </Link>
      ),
      key: "feedbacks",
    },
    {
      label: (
        <Link
          href="/admin/courses"
          className="text-lg font-semibold flex items-center gap-2"
        >
          <i className="ri-code-box-line"></i>
          <span>Courses</span>
        </Link>
      ),
      key: "courses",
    },
    {
      label: (
        <Link
          href="/admin/blog"
          className="text-lg font-semibold flex items-center gap-2"
        >
          <i className="ri-blogger-line"></i>
          <span>FeedBacks</span>
        </Link>
      ),
      key: "blog",
    },
  ];
  return (
    <div className="flex">
      <div className="w-[250px] bg-white-200 py-4 min-h-screen shadow-lg border">
        <h1 className="text-center font-bold text-xl text-blue-600">
          Dashboard
        </h1>
        <div className="mt-8">
          <Menu onClick={onClick} selectedKeys={[current]} items={items} />
        </div>
      </div>
      <div className="bg-gray-100 flex-grow flex flex-col">
        <nav className="bg-white shadow-lg py-2 px-8">
          <img
            src="/images/logo/logo.png"
            alt="logo"
            className="w-[42px] h-[42px]"
          />
        </nav>
        <section className="flex-grow p-8">{children}</section>
      </div>
    </div>
  );
};
export default AdminLayout;
