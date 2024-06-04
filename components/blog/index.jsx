"use client";

import Link from "next/link";
import Layout from "../shared/layout";
import "./blog.css";

const blogs = [
  {
    url: "#",
    pic: "/images/blog/1.jpg",
    title: "Node.js + angular websocket (chat app)",
    date: "Wed Nov 25, 2020",
    blogger: "SHAGUN",
    desc: "Node.js + angular web sockets chat app In this video we will discuss about node.js websocket, it is really important to understand websocket. we will use socket.io for using websocket in node.js with express.js. We will use best coding approaches and practices that you have ever seen on youtube for",
  },
  {
    url: "#",
    pic: "/images/blog/2.jpg",
    title: "Creating Instagram like ads algorithm in javascript",
    date: "Sun Aug 16, 2020",
    blogger: "SHAGUN",
    desc: "Creating Instagram like ads algorithm in javascript In this video we will discuss and check that how can we create our own algorithm like Facebook and Instagram to show ads between posts. we will create our Instagram like ads algorithm using javascript CHECK THE CODE BELOW: // suppose you have an ar",
  },
  {
    url: "#",
    pic: "/images/blog/3.jpg",
    title: "Upload video to youtube from Angular 9",
    date: "Thu Jul 09, 2020",
    blogger: "SHAGUN",
    desc: "Upload to youtube from angular 9 FullPlaylist:https://www.youtube.com/playlist?list=PL6GcqPPzylelP_iBCttqLmua-1WGtrDCI SOURCE CODE:https://bitbucket.org/shagun123/angular-upload-to-youtube/src/master/ In this video, we will see how to upload video from angular 9 to youtube in Hindi. in youtube histo.",
  },
  {
    url: "#",
    pic: "/images/blog/4.jpg",
    title: "Top 5 programming languages to Learn in 2020",
    date: "Tue Jun 30, 2020",
    blogger: "SHAGUN",
    desc: "TOP 5 PROGRAMMING LANGUAGES YOU SHOULD LEARN In this video we will discuss about top 5 programming languages you should learn which will help you to land a job. Python , javascript, java , flutter , dart and for ios you should learn swift programming language. So this is my list of best programming .",
  },
  {
    url: "#",
    pic: "/images/blog/5.jpg",
    title: "Angular 9 common header and footer",
    date: "Fri Jul 27, 2018",
    blogger: "SHAGUN",
    desc: "ANGULAR 9 COMMON HEADER AND FOOTER source code : CLICK HERE In this video we will see how to use common header and footer in angular 9 with best practises and along with it how to set dynamic header instead of fix header. like a different header for user and admin in angular 9..",
  },
];

const categories = [
  { category: "Angular", count: 3, url: "#" },
  { category: "Basic Fundamentals", count: 12, url: "#" },
  { category: "Css Tutorials", count: 1, url: "#" },
  { category: "Javascript", count: 2, url: "#" },
  { category: "Node.js", count: 1, url: "#" },
];

const Blog = () => {
  return (
    <Layout>
      <div className="md:w-8/12 w-full mx-auto md:px-0 px-8 pt-16 md:gap-32 md:pb-0 pb-12 flex md:flex-row flex-col">
        <div>
          <div className="space-y-16">
            {blogs.map((blog, blogIndex) => (
              <div key={blogIndex} className="border-b">
                <div className="flex justify-center">
                  <Link href={blog.url} className="w-7/12">
                    <img src={blog.pic} alt={blog.pic} />
                  </Link>
                </div>
                <div className="space-y-4 py-8">
                  <Link
                    href={blog.url}
                    className="text-[#3F51B5] text-3xl font-bold hover:underline"
                  >
                    {blog.title}
                  </Link>
                  <div className="text-gray-400 flex gap-2">
                    <p className="space-x-1">
                      <i class="ri-time-line text-xl"></i>
                      <span>{blog.date}</span>
                    </p>
                    <p className="space-x-1">
                      <i class="ri-emoji-sticker-line text-xl"></i>
                      <span>{blog.blogger}</span>
                    </p>
                  </div>
                  <p className="text-md text-gray-600 leading-normal">
                    {blog.desc}
                  </p>
                  <div className="flex justify-end">
                    <Link
                      href={blog.url}
                      className="bg-[#3F51B5] text-white px-3 py-1 rounded text-sm read-more duration-200"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end pb-12 pt-4">
            <Link
              href="#"
              className="text-[#3F51B5] font-semibold px-4 py-1 duration-100 hover:bg-black bg-white hover:text-white flex gap-1 items-center"
            >
              <span>See Older Posts</span>
              <i class="ri-arrow-right-s-line text-2xl"></i>
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
