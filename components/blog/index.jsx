"use client";

import Link from "next/link";
import Layout from "../shared/layout";
import "./blog.css";
import moment from "moment";
import useSWR from "swr";
import axios from "axios";
let server = "http://localhost:8080";
axios.defaults.baseURL = server;

const categories = [
  { category: "Angular", count: 3, url: "#" },
  { category: "Basic Fundamentals", count: 12, url: "#" },
  { category: "Css Tutorials", count: 1, url: "#" },
  { category: "Javascript", count: 2, url: "#" },
  { category: "Node.js", count: 1, url: "#" },
];

const fetcher = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    return err;
  }
};

const Blog = () => {
  const { data: blogs, error, isLoading } = useSWR("/blogs/0/5", fetcher);

  return (
    <Layout>
      <div className="md:w-8/12 w-full mx-auto md:px-0 px-8 pt-16 md:gap-32 md:pb-0 pb-12 flex md:flex-row flex-col">
        <div>
          <div className="space-y-16">
            {blogs &&
              blogs.map(
                (blog, blogIndex) =>
                  blog.thumbnail && (
                    <div key={blogIndex} className="border-b">
                      <div className="flex justify-center">
                        <Link
                          href={`/blogs/${blog.title.replaceAll(
                            " ",
                            "-"
                          )}?item=${blog._id}`}
                          className="w-7/12"
                        >
                          <img
                            src={`${server}/${blog.thumbnail}`}
                            alt={blog.thumbnail}
                          />
                        </Link>
                      </div>
                      <div className="space-y-4 py-8">
                        <Link
                          href={`/blogs/${blog.title.replaceAll(
                            " ",
                            "-"
                          )}?item=${blog._id}`}
                          className="text-[#3F51B5] text-3xl font-bold hover:underline"
                        >
                          {blog.title}
                        </Link>
                        <div className="text-gray-400 flex gap-2">
                          <p className="space-x-1">
                            <i className="ri-time-line text-xl"></i>
                            <span>
                              {moment(blog.createdAt).format(
                                "ddd MMM D, YYYY h:mm A"
                              )}
                            </span>
                          </p>
                          <p className="space-x-1">
                            <i className="ri-emoji-sticker-line text-xl"></i>
                            <span>{blog.blogger}</span>
                          </p>
                        </div>
                        <p className="text-md text-gray-600 leading-normal">
                          {blog.desc}
                        </p>
                        <div className="flex justify-end">
                          <Link
                            href={`/blogs/${blog.title.replaceAll(
                              " ",
                              "-"
                            )}?item=${blog._id}`}
                            className="bg-[#3F51B5] text-white px-3 py-1 rounded text-sm read-more duration-200"
                          >
                            Read more
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
              )}
          </div>
          <div className="flex justify-end pb-12 pt-4">
            <Link
              href="#"
              className="text-[#3F51B5] font-semibold px-4 py-1 duration-100 hover:bg-black bg-white hover:text-white flex gap-1 items-center"
            >
              <span>See Older Posts</span>
              <i className="ri-arrow-right-s-line text-2xl"></i>
            </Link>
          </div>
        </div>
        <div className="w-10/12 px-8">
          <img src="/images/blog/aside.jpg" alt="aside" />
          <div className="flex flex-col gap-2 py-2">
            {categories.map((category, categoryIndex) => (
              <Link
                key={categoryIndex}
                href={category.url}
                className="hover:bg-[#3F51B5] px-2 py-1 text-gray-600 hover:text-white"
              >
                {category.category} ({category.count})
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Blog;
