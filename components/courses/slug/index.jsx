"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import useSWR from "swr";
import axios from "axios";
import Layout from "@/components/shared/layout";
import { useEffect, useState } from "react";
import Link from "next/link";
let server = "http://localhost:8080";
axios.defaults.baseURL = server;

const fetcher = async (url) => {
  try {
    const x = await axios.get(url);
    return x.data;
  } catch (err) {
    return err;
  }
};

const descriptions = [
  {
    title: "Learning Highlights",
    features: [
      {
        icon: "ri-infinity-line",
        label: "Get Lifetime Access of the course",
      },
      {
        icon: "ri-award-fill",
        label: "Certificate",
      },
      {
        icon: "ri-folder-video-line",
        label: "40+ Hrs High Quality Videos",
      },
      {
        icon: "ri-book-marked-line",
        label: "Study Material for Interview Preparation",
      },
      {
        icon: "ri-suitcase-line",
        label:
          "1 Major project (This project has more than  1lac market value)",
      },
      {
        icon: "ri-user-heart-fill",
        label: "Recommended for Beginners",
      },
    ],
  },

  {
    title: "Why Choose Us?",
    features: [
      {
        icon: "ri-mac-line",
        label: "Best coding patterns",
      },
      {
        icon: "ri-tv-line",
        label: "course is in hindi language",
      },
    ],
  },
  {
    title: "Who Can Start this Course?",
    features: [
      {
        icon: "ri-book-read-line",
        label:
          "Basic knowledge of Javascript, html & css  is Required. If you are not Familiar with it then we have a course for js + ts too",
      },
    ],
  },

  {
    title: "What Will you Learn?",
    subtitle:
      "Upon successful completion of the course, you will be able to learn:",
    features: [
      {
        label: "Learn to build dynamic websites (advance level)",
      },
      {
        label: "You can Get High Package (15lac +)",
      },
      {
        label: "You will be able to create, deploy ,debug",
      },
      {
        label: "Learn  best coding Practices",
      },
      {
        label: "Become eligible for Better Job/Internship",
      },
      {
        label: "complete angular with latest version",
      },
      {
        label: "Learn complex things like ngrx, observables in deep",
      },
    ],
  },
  {
    title: "How to Get started?",
    features: [
      {
        icon: "ri-shopping-cart-line",
        label: "Click on Add to Cart",
      },
      {
        icon: "ri-image-circle-line",
        label: "Signup",
      },
      {
        icon: "ri-bank-card-2-line",
        label: "Pay",
      },
      {
        icon: "ri-checkbox-line",
        label: "Start with your Course",
      },
    ],
  },
];

const Slug = () => {
  const [tab, setTab] = useState("description");
  const searchParams = useSearchParams();
  const id = searchParams.get("item");
  const { data, error, isLoading } = useSWR(`/courses/${id}`, fetcher);

  return (
    <Layout carticon={true}>
      <div className="md:w-8/12 mx-auto flex mt-16 gap-12">
        <div className="flex-1 ">
          <div className="flex gap-8 mb-20">
            <div className="w-5/12">
              <img
                src={`${server}/${data && data.thumbnail}`}
                alt={data && data.thumbnail}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <h1 className="text-3xl font-bold text-gray-600">
                  {data && data.title}
                </h1>
                <p className="text-gray-600 text-sm">
                  {data && data.description}
                </p>
              </div>
              <p className="text-gray-600 font-semibold">
                <span>For Queries: </span>
                <Link
                  className="text-blue-700 hover:underline"
                  href={`tel:+91 7073066389`}
                >
                  +91 7073066389
                </Link>
              </p>
              <h2 className="text-red-700 font-semibold">LIFETIME ACCESS</h2>
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <span>Instructor: </span>
                  <span className="text-blue-800">Shagun Garg</span>
                </p>
                <p>
                  <span>Language: </span>
                  <span className="text-blue-800">Hindi</span>
                </p>
                <p>
                  <span>Validity Period: </span>
                  <span className="text-blue-800">Lifetime</span>
                </p>
                <p className="text-lg font-semibold">
                  <del>₹{data && data.price}</del>
                  <span> {data && data.discount}% OFF</span>
                </p>
                <h1 className="space-x-2">
                  <span className="text-2xl text-amber-500 font-bold">
                    ₹{data && data.price - (data.price * data.discount) / 100}
                  </span>
                  <sub className="text-md font-semibold">including 18% GST</sub>
                </h1>
                <div className="flex items-center gap-4 pt-4">
                  <Link
                    href="#"
                    className="px-12 py-2 rounded text-blue-800 font-semibold space-x-2 text-lg hover:bg-blue-800 hover:opacity-70 hover:text-white duration-300"
                  >
                    <i className="ri-book-read-line"></i>
                    <span>Preview</span>
                  </Link>
                  <button className="px-12 py-2 rounded font-semibold text-lg bg-blue-800 duration-300 text-white hover:bg-[#27336B]">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="bg-[#FEFEFE] flex justify-between shadow-xl rounded-3xl border text-sm font-bold">
              <button
                className={`flex-1 py-2 ${
                  tab === "description" && "bg-blue-800 text-white"
                } rounded-3xl`}
                onClick={() => setTab("description")}
              >
                Description
              </button>
              <button
                className={`flex-1 py-2 ${
                  tab === "course-content" && "bg-blue-800 text-white"
                } rounded-3xl`}
                onClick={() => setTab("course-content")}
              >
                Course Content
              </button>
              <button
                className={`flex-1 py-2 ${
                  tab === "how-to-use" && "bg-blue-800 text-white"
                } rounded-3xl`}
                onClick={() => setTab("how-to-use")}
              >
                How to Use
              </button>
            </div>

            <div className="mt-8">
              {tab == "description" && (
                // description container
                <div className="space-y-4">
                  {descriptions.map((description, descIndex) => (
                    <div
                      key={descIndex}
                      className="bg-[#071F38] text-white font-semibold py-8 rounded"
                    >
                      <h1 className="text-xl text-center">
                        {description.title}
                      </h1>
                      <hr className="w-4/12 mx-auto border mt-1 border-[#CFAA4A] rounded-2xl" />

                      <div className="px-12">
                        {description.subtitle && (
                          <p className="my-6">{description.subtitle}</p>
                        )}
                        <div className="space-y-6 mt-12">
                          {description.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className={`${
                                feature.icon &&
                                "list-none flex items-center gap-2"
                              }  font-normal`}
                            >
                              {feature.icon && (
                                <i className={`${feature.icon} text-3xl`}></i>
                              )}
                              <spa>{feature.label}</spa>
                            </li>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div>
                    <img
                      src="/images/google-play/1.png"
                      alt="google-play"
                      className="w-60"
                    />
                  </div>
                </div>
              )}

              {tab == "course-content" && (
                // Course-content container
                <div>
                  <h1 className="text-3xl font-bold">Course Content</h1>
                </div>
              )}

              {tab == "how-to-use" && (
                // how-to-use container
                <div className="space-y-4 text-gray-500 font-semibold">
                  <p>
                    After successful purchase, this item would be added to your
                    courses.
                  </p>
                  <p>You can access your courses in the following ways :</p>
                  <p>
                    From Computer, you can access your courses after successful
                    login
                  </p>
                  <p>From Android app, you can download the app from here</p>
                  <p>
                    For other devices, you can access your library using this
                    web app through browser of your device.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-3/12">
          <h1>Other Courses</h1>
        </div>
      </div>
    </Layout>
  );
};
export default Slug;
