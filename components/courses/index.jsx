"use client";

import { useState } from "react";
import Link from "next/link";
import Layout from "../shared/layout";
import "./courses.css";
import useSWR from "swr";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";

const cats = [
  "back end curses",
  "coding fundamentals",
  "combos",
  "course bundles",
  "front end courses",
  "membership",
  "trending",
];

const Courses = () => {
  const fetcher = async (url) => {
    try {
      const { data } = await axios.get("/courses/0/all");
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  const { data, error, isLoading } = useSWR("/courses", fetcher);

  const [catList, setCatList] = useState(false);

  return (
    <Layout carticon={true}>
      <div className="md:w-8/12 w-full mx-auto md:px-0 px-8 pt-16">
        <button
          className="bg-[#3F4C9A] text-white px-4 py-2 rounded font-semibold space-x-2 hover:bg-[#27336C] duration-200 courseBtn"
          onClick={() => setCatList(!catList)}
        >
          <span>Category</span>
          <i className="ri-arrow-down-s-fill"></i>
        </button>
        <div className="relative">
          {catList ? (
            <div className="flex flex-col border w-fit shadow-lg rounded p-4 gap-1 absolute bg-white top-0 left-0 animate__animated animate__fadeIn z-10">
              {cats.map((cat, catIndex) => (
                <Link
                  href={cat}
                  key={catIndex}
                  className="capitalize hover:bg-[#3F4C9A] hover:text-white px-2 py-1 text-sm rounded"
                >
                  {cat}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        <div className="grid md:grid-cols-4 gap-8 py-8">
          {data &&
            data.map(
              (courseItem, courseIndex) =>
                courseItem.thumbnail && (
                  <Link
                    href={`/courses/${courseItem.title.replaceAll(
                      " ",
                      "-"
                    )}?item=${courseItem._id}`}
                    key={courseIndex}
                    className="bg-white shadow rounded-xl course-hover duration-300 py-2 px-2 animate__animated animate__fadeIn"
                  >
                    <div>
                      <div className="relative">
                        <img
                          src={`http://localhost:8080/${courseItem.thumbnail}`}
                          alt={courseItem.thumbnail}
                          className="rounded-xl shadow-xl contrast-75"
                        />
                      </div>
                      <div className="px-2 space-y-4 pt-4">
                        <h1 className="text-sm text-gray-700">
                          {courseItem.title}
                        </h1>
                        <p>
                          {courseItem.description.length <= 60
                            ? courseItem.description
                            : courseItem.description.substring(0, 60) + "..."}
                        </p>
                        <div className="space-x-2 text-blue-800 pb-8">
                          <del>₹{courseItem.price}</del>
                          <span>
                            ₹
                            {courseItem.price -
                              (courseItem.price * courseItem.discount) / 100}
                          </span>
                          <span className="text-gray-400 text-sm">
                            ({courseItem.discount}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
            )}
        </div>
      </div>
    </Layout>
  );
};
export default Courses;
