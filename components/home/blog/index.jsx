import Link from "next/link";
import "./blog.css";

const blogs = [
  {
    pic: "/images/home/blog/1.jpg",
    cat: (
      <Link className="text-[#3F4C9A] font-semibold text-xs" href="#">
        Web Dev
      </Link>
    ),
    date: "24th Sept,2020",
    title: (
      <Link
        href="/blog/blog-description"
        className="text-[#3F4C9A] text-xl font-bold"
      >
        Node.js websocket (Chat app)
      </Link>
    ),
    desc: "In this video we will discuss and check that how to use websockets ...",
    tutor: (
      <Link href="#" className="text-[#3F4C9A]">
        Shagun Garg
      </Link>
    ),
  },
  {
    pic: "/images/home/blog/2.jpg",
    cat: (
      <Link className="text-[#3F4C9A] font-semibold text-xs" href="#">
        Web Design
      </Link>
    ),
    date: "9th Jul,2020",
    title: (
      <Link
        href="/blog/blog-description"
        className="text-[#3F4C9A] text-xl font-bold"
      >
        Upload video to youtube from Angular 9
      </Link>
    ),
    desc: "we will see how to upload video from angular 9 to youtube in Hindi. in youtube history...",
    tutor: (
      <Link href="#" className="text-[#3F4C9A]">
        Shagun Garg
      </Link>
    ),
  },
  {
    pic: "/images/home/blog/3.jpg",
    cat: (
      <Link className="text-[#3F4C9A] font-semibold text-xs" href="#">
        Web Design
      </Link>
    ),
    date: "27th Jul,2018",
    title: (
      <Link
        href="/blog/blog-description"
        className="text-[#3F4C9A] text-xl font-bold"
      >
        Angular 9 common header and footer
      </Link>
    ),
    desc: "we will see how to use common header and footer in angular 9 with best practises and along with...",
    tutor: (
      <Link href="#" className="text-[#3F4C9A]">
        Shagun Garg
      </Link>
    ),
  },
];

const Blog = () => {
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
          {blogs.map((blog, blogIndex) => (
            <div key={blogIndex} className="border blog rounded-xl">
              <img
                src={blog.pic}
                alt={blog.pic}
                className="hover:contrast-50 duration-300"
              />
              <div className="flex flex-col items-center gap-8 py-12">
                <h1>
                  {blog.cat}
                  <span className="text-lg text-gray-400 ml-6">
                    {blog.date}
                  </span>
                </h1>

                {blog.title}
                <p className="font-semibold text-gray-400">{blog.desc}</p>
                <p className="text-xs font-semibold">By {blog.tutor}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="#"
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
