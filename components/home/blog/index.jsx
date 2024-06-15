"use client";
import Link from "next/link";
import "./blog.css";
import useSWR from "swr";
import axios from "axios";
import { Skeleton } from "antd";
import moment from "moment";
let server = "http://localhost:8080";
axios.defaults.baseURL = server;

const fetcher = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    return err;
  }
};

const Blog = () => {
  const { data } = useSWR("/blogs/0/3", fetcher);
  if (!data)
    return (
      <div className="md:w-7/12 mx-auto">
        <Skeleton active />
      </div>
    );
  return (
    <div
      className="md:bg-[url('/images/home/blog/bg.png')] bg-right-top bg-no-repeat md:mx-12 mb-12"
      style={{ backgroundSize: "30% 12%" }}
    >
      <div className="md:w-7/12 mx-auto">
        <h1 className="text-[#3F4C9A] text-4xl font-bold text-center pt-8">
          Our Blog
        </h1>
        <div className="flex justify-center py-4">
          <img src="/images/home/plan/1.png" alt="plan1" />
        </div>

        <div className="space-y-8">
          {data.map(
            (blog, blogIndex) =>
              blog.thumbnail && (
                <div key={blogIndex} className="border blog rounded-xl">
                  <img
                    src={`${server}/${blog.thumbnail}`}
                    alt={blog.thumbnail}
                    className="hover:contrast-50 duration-300"
                  />
                  <div className="flex flex-col items-center gap-8 py-12 px-8">
                    <h1>
                      <span className="text-lg text-gray-400 ml-6">
                        {moment(blog.createdAt).format("Do MMM, YYYY h:mm A")}
                      </span>
                    </h1>

                    <Link
                      href={`/blogs/${blog.title.replaceAll(" ", "-")}?item=${
                        blog._id
                      }`}
                      className="text-2xl font-bold text-blue-800 hover:text-blue-600 duration-300"
                    >
                      {blog.title}
                    </Link>
                    <p className="font-semibold text-sm text-gray-400 text-center">
                      {blog.desc.length < 70
                        ? blog.desc
                        : `${blog.desc.substring(0, 70)}...`}
                    </p>
                    <p className="text-xs text-gray-600 font-semibold">
                      <span>By</span>
                      <span className="text-blue-800 text-sm pl-1 cursor-pointer font-bold">
                        {blog.blogger}
                      </span>
                    </p>
                  </div>
                </div>
              )
          )}
        </div>

        <div className="flex justify-center">
          <Link
            href="/blogs"
            className="bg-[#4D7CC7] px-16 mt-12 text-white rounded-full border-2 py-3 font-bold hover:bg-white hover:text-[#4D7CC7] hover:border-[#4D7CC7]  duration-500 text-lg"
          >
            All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blog;
