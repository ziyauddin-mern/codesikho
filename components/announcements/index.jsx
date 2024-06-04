"use client";

import Link from "next/link";
import Layout from "../shared/layout";
import "./announcements.css";

const announcements = [
  {
    pic: "/images/announcements/1.png",
    title: "Angular 9",
    desc: "Angular course is live",
    url: "#",
    btnColor: "bg-green-400 text-white hover:bg-green-300",
  },
  {
    pic: "/images/announcements/2.png",
    title: "Javascript Ds & Algo",
    desc: "Js : ds and algo course is live",
    url: "#",
    btnColor: "bg-rose-600 text-white hover:bg-rose-700",
  },
];

const Announcements = () => {
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
            {announcements.map((announcement, announcementIndex) => (
              <div key={announcementIndex}>
                <img src={announcement.pic} alt={announcement.pic} />
                <div className="space-y-4 py-8">
                  <h1 className="text-2xl font-bold">{announcement.title}</h1>
                  <p className="text-lg text-gray-600 tracking-widest">
                    {announcement.desc}
                  </p>
                  <div className="pt-6">
                    <Link
                      className={`${announcement.btnColor} px-8 duration-200 py-4 text-sm text-gray-200 tracking-widest`}
                      href={announcement.url}
                    >
                      ENROLL NOW
                    </Link>
                  </div>
                </div>
              </div>
            ))}
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
