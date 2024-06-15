"use client";
import { useSearchParams } from "next/navigation";

import Layout from "@/components/shared/layout";
import useSWR from "swr";
import axios from "axios";
let server = "http://localhost:8080";

const fetcher = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    return err;
  }
};

const BlogDesc = () => {
  const search = useSearchParams();
  const id = search.get("item");

  const { data, error, isLoading } = useSWR(`/blogs/${id}`, fetcher);
  console.log(data);

  if (!data)
    return (
      <div className="h-screen bg-gray-200 text-8xl flex items-center justify-center">
        <i class="ri-loader-2-line block animate-spin"></i>
      </div>
    );
  return (
    <Layout>
      <div className="bg-[#EEEFF0] py-24">
        <div className="md:w-8/12 mx-auto">
          <img src={`${server}/${data.thumbnail}`} alt="blog" />
        </div>
      </div>

      <div className="md:w-8/12 mx-auto bg-white py-24">
        <h1 className="text-5xl text-gray-600">{data.title}</h1>
        <p className="my-20 text-xl text-gray-500 leading-loose tracking-widest">
          {data.desc}
        </p>
      </div>
    </Layout>
  );
};
export default BlogDesc;
