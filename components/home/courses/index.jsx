"use client";
import Link from "next/link";
import "./courses.css";
import useSWR from "swr";
import axios from "axios";
import { Skeleton } from "antd";
let server = "http://localhost:8080";
axios.defaults.baseURL = server;

const courses = [
  {
    src: "/images/home/courses/1.jpg",
    title: "All in One",
    tutor: "Shagun Gurg",
    origPrice: "₹12000",
    offeredPrice: "₹4500",
    buyLink: "#",
  },
  {
    src: "/images/home/courses/2.jpg",
    title: "Core Python Version 3.8",
    tutor: "Shagun Gurg",
    origPrice: "₹3500",
    offeredPrice: "₹1000",
    buyLink: "#",
  },
  {
    src: "/images/home/courses/3.jpg",
    title: "JavaScript + Typescript",
    tutor: "Shagun Gurg",
    origPrice: "₹4000",
    offeredPrice: "₹1200",
    buyLink: "#",
  },
];

const fetcher = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    return err;
  }
};

const Courses = () => {
  const { data, error, isLoading } = useSWR("/courses/0/3", fetcher);

  if (!data)
    return (
      <div className="bg-white md:w-8/12 mx-auto">
        <Skeleton active />
      </div>
    );
  return (
    <div
      className="md:bg-[url('/images/home/courses/bg.png')] bg-left-top bg-no-repeat md:mx-12 mb-12"
      style={{ backgroundSize: "30% 50%" }}
    >
      <div className="md:w-8/12 mx-auto">
        <h1 className="text-[#3F4C9A] text-4xl font-bold text-center">
          Top Courses
        </h1>
        <div className="flex justify-center py-4">
          <img src="/images/home/plan/1.png" alt="plan1" />
        </div>
        <div className="grid md:grid-cols-3 gap-12 px-16 py-12">
          {data.map(
            (course, courseIndex) =>
              course.thumbnail && (
                <div
                  key={courseIndex}
                  className="courses-hover rounded-3xl p-4 bg-white flex flex-col items-center gap-8 hover:gap-0 duration-1000 overflow-hidden pb-24 relative"
                >
                  <img
                    src={`${server}/${course.thumbnail}`}
                    alt={course.thumbnail}
                    className="rounded-xl duration-300 hover:contrast-50"
                  />
                  <div className="flex flex-col items-center gap-2 relative">
                    <h1 className="font-bold text-xl">{course.title}</h1>
                    <p className="text-lg text-gray-400">
                      {course.description}
                    </p>
                    <p className="text-lg space-x-3">
                      <del className="text-gray-400">₹{course.price}</del>
                      <span className="text-green-700 font-bold">
                        ₹{course.price - (course.price * course.discount) / 100}
                      </span>
                    </p>
                    <Link
                      href={`/courses/${course.title.replaceAll(
                        " ",
                        "-"
                      )}?item=${course._id}`}
                      className="bg-[#4D7CC7] px-8 text-white rounded border-2 py-2 font-bold hover:bg-white hover:text-[#4D7CC7] hover:border-[#4D7CC7] absolute bottom-[-160px] course-link duration-1000"
                    >
                      View
                    </Link>
                  </div>
                </div>
              )
          )}
        </div>

        <div className="flex justify-center">
          <Link
            href="/courses"
            className="bg-[#4D7CC7] px-12 text-white rounded-full border-2 py-3 font-bold hover:bg-white hover:text-[#4D7CC7] hover:border-[#4D7CC7]  duration-500 text-lg"
          >
            All Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Courses;
