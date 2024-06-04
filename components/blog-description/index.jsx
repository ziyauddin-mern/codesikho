"use client";

import Layout from "../shared/layout";

const BlogDesc = () => {
  return (
    <Layout>
      <div className="bg-[#EEEFF0] py-24">
        <div className="md:w-8/12 mx-auto">
          <img src="/images/blog/1.jpg" alt="blog" />
        </div>
      </div>

      <div className="md:w-8/12 mx-auto bg-white py-24">
        <h1 className="text-5xl text-gray-600">
          Node.js + angular web sockets chat app
        </h1>
        <p className="my-20 text-xl text-gray-500 leading-loose tracking-widest">
          In this video we will discuss about node.js websocket, it is really
          important to understand websocket. we will use socket.io for using
          websocket in node.js with express.js. We will use best coding
          approaches and practices that you have ever seen on youtube for sure.
        </p>
      </div>
    </Layout>
  );
};
export default BlogDesc;
