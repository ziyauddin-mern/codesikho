"use client";
import Layout from "../shared/layout";
import "./feedbacks.css";
import useSWR, { mutate } from "swr";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";

const fetcher = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const Feed = () => {
  const { data, error, isLoading } = useSWR("/feedbacks", fetcher);
  return (
    <Layout>
      <div className="md:w-7/12 mx-auto py-12">
        <h1 className="font-[Lato]  italic md:text-6xl text-4xl text-center mb-10">
          See what people Says
        </h1>
        <hr className="w-16 border border-black mx-auto" />
        <div className="grid md:grid-cols-3 gap-y-12 py-12 px-24">
          {data &&
            data.map((item, index) => (
              <img
                src={`http://localhost:8080/${item.screenshot}`}
                alt={data.path}
                key={index}
                className="w-11/12 mx-auto animate__animated animate__zoomIn"
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Feed;
