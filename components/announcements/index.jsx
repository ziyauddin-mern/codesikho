"use client";

import Link from "next/link";
import Layout from "../shared/layout";
import "./announcements.css";
import useSWR from "swr";
import axios from "axios";
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

const Announcements = () => {
  const { data, error, isLoading } = useSWR("/announcements", fetcher);
  if (!data)
    return (
      <div className="h-screen bg-gray-200 flex items-center justify-center">
        <i className="ri-loader-2-line block animate-spin text-8xl"></i>
      </div>
    );
  console.log(data);
  return (
    <Layout>
      <div className="bg-[#EEEFF0] mb-12">
        <h1 className="text-center text-gray-700 py-8 text-5xl font-bold">
          Announcements
        </h1>
        <hr className="border border-gray-400 w-24 mx-auto" />
        <h1 className="text-center text-gray-700 py-8 text-3xl font-bold mt-12">
          UPCOMING COURSES
        </h1>
        <div className="md:w-6/12 mx-auto md:px-0 px-8">
          <div className="gap-16 grid md:grid-cols-2 mb-8">
            {data.map(
              (ann, annIndex) =>
                ann.thumbnail && (
                  <div key={annIndex}>
                    <img
                      src={`${server}/${ann.thumbnail}`}
                      alt={ann.thumbnail}
                    />
                    <div className="space-y-4 py-8">
                      <h1 className="text-2xl font-bold">{ann.title}</h1>
                      <p className="text-lg text-gray-600 tracking-widest">
                        <span>{ann.desc}</span>
                        <span className="text-gray-700 font-bold">
                          {" "}
                          {ann.status}
                        </span>
                      </p>
                      <div className="pt-6">
                        <Link
                          className={`bg-green-400 hover:bg-green-500 px-8 duration-200 py-4 text-sm text-gray-200 tracking-widest`}
                          href="#"
                        >
                          ENROLL NOW
                        </Link>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>

          <Link href="#">
            <img src="/images/announcements/3.png" alt="announcemnt" />
          </Link>
          <h2 className="tracking-widest text-xl py-12 text-gray-600">
            Our new ANDROID APP is LIVE
          </h2>
        </div>
      </div>
    </Layout>
  );
};
export default Announcements;
