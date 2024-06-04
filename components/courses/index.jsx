"use client";

import { useState } from "react";
import Link from "next/link";
import Layout from "../shared/layout";
import "./courses.css";

const cats = [
  "back end curses",
  "coding fundamentals",
  "combos",
  "course bundles",
  "front end courses",
  "membership",
  "trending",
];

const courses = [
  {
    url: "#",
    pic: "/images/courses/1.jpg",
    title: "Mean + Js + Ts + data structure & Alg",
    availability: "4 Courses",
    origPrice: 8000,
    offeredPrice: 1800,
    package: true,
  },
  {
    url: "#",
    pic: "/images/courses/2.jpg",
    title: "Mean Stack",
    availability: "2 Courses",
    origPrice: 6000,
    offeredPrice: 1050,
    package: true,
  },
  {
    url: "#",
    pic: "/images/courses/3.jpg",
    title: "Angular 10",
    availability: "Shagun Garg",
    origPrice: 10000,
    offeredPrice: 599,
    package: false,
  },
  {
    url: "#",
    pic: "/images/courses/4.jpg",
    title: "Data structures and algorithms (JS)",
    availability: "Shagun Garg",
    origPrice: 3000,
    offeredPrice: 499,
    package: false,
  },
  {
    url: "#",
    pic: "/images/courses/5.jpg",
    title: "Git",
    availability: "Shagun Garg",
    origPrice: 2000,
    offeredPrice: 490,
    package: false,
  },
  {
    url: "#",
    pic: "/images/courses/6.jpg",
    title: "MERN + JS + TS + Data Structure and",
    availability: "4 Courses",
    origPrice: 6000,
    offeredPrice: 1500,
    package: true,
  },
  {
    url: "#",
    pic: "/images/courses/7.jpg",
    title: "Core Python Version 3.8",
    availability: "Shagun Garg",
    origPrice: 2500,
    offeredPrice: 495,
    package: false,
  },
  {
    url: "#",
    pic: "/images/courses/8.jpg",
    title: "Javascript + Typescript",
    availability: "Shagun Garg",
    origPrice: 4000,
    offeredPrice: 550,
    package: false,
  },
  {
    url: "#",
    pic: "/images/courses/9.jpg",
    title: "All in One",
    availability: "7 Courses",
    origPrice: 8000,
    offeredPrice: 1900,
    package: true,
  },
  {
    url: "#",
    pic: "/images/courses/10.jpg",
    title: "React Native + Nodejs + Expressjs +",
    availability: "2 Courses",
    origPrice: 6000,
    offeredPrice: 1050,
    package: true,
  },
  {
    url: "#",
    pic: "/images/courses/11.jpg",
    title: "Subscription Plan",
    availability: "7 Courses",
    origPrice: 15000,
    offeredPrice: 3000,
    package: true,
  },
  {
    url: "#",
    pic: "/images/courses/12.jpg",
    title: "Node.js, Express.js, MongoDB with",
    availability: "Shagun Garg",
    origPrice: 4000,
    offeredPrice: 590,
    package: false,
  },
  {
    url: "#",
    pic: "/images/courses/13.jpg",
    title: "React Native+React J.s Beginner To",
    availability: "Shagun Garg",
    origPrice: 5000,
    offeredPrice: 650,
    package: false,
  },
  {
    url: "#",
    pic: "/images/courses/14.jpg",
    title: "React Native Hacks",
    availability: "Shagun Garg",
    offeredPrice: "Free",
    package: false,
  },
  {
    url: "#",
    pic: "/images/courses/15.jpg",
    title: "Rxjs Observables [2020]",
    availability: "Shagun Garg",
    offeredPrice: "Free",
    package: false,
  },
  {
    url: "#",
    pic: "/images/courses/16.jpg",
    title: "Typescript 2020 Edition",
    availability: "Shagun Garg",
    offeredPrice: "Free",
    package: false,
  },
];

const Courses = () => {
  const [catList, setCatList] = useState(false);

  return (
    <Layout carticon={true}>
      <div className="md:w-8/12 w-full mx-auto md:px-0 px-8 pt-16">
        <button
          className="bg-[#3F4C9A] text-white px-4 py-2 rounded font-semibold space-x-2 hover:bg-[#27336C] duration-200 courseBtn"
          onClick={() => setCatList(!catList)}
        >
          <span>Category</span>
          <i class="ri-arrow-down-s-fill"></i>
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
          {courses.map((course, courseIndex) => (
            <Link
              href={course.url}
              key={courseIndex}
              className="bg-white shadow rounded-xl course-hover duration-300 py-2 px-2"
            >
              <div>
                <div className="relative">
                  <img
                    src={course.pic}
                    alt={course.pic}
                    className="rounded-xl shadow-xl contrast-75"
                  />
                  {course.package && (
                    <span className="absolute top-2 left-0 bg-[#3F4C9A] text-white px-4 font-semibold text-xs rounded-e-full py-1">
                      PACKAGE
                    </span>
                  )}
                </div>
                <div className="px-2 space-y-4 pt-4">
                  <h1 className="text-sm text-gray-700">{course.title}</h1>
                  <p className="text-gray-400 text-sm font-semibold">
                    {course.availability}
                  </p>
                  <div className="space-x-2 text-blue-800 pb-8">
                    {course.origPrice && <del>₹{course.origPrice}</del>}
                    <span>₹{course.offeredPrice}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default Courses;
