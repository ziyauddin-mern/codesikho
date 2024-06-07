"use client";
import { useState } from "react";
import AdminLayout from "@/components/shared/admin-layout";
import { InboxOutlined } from "@ant-design/icons";
import useSWR, { mutate } from "swr";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";

const fetcher = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const FeedBacks = () => {
  const [file, setFile] = useState(null);
  const [submit, setSubmit] = useState(false);

  const { data, error, isLoading } = useSWR("/feedbacks", fetcher);

  const onUpload = async (e) => {
    e.preventDefault();

    if (file) {
      const orignalfilename = file.name;
      const updatedFilename = orignalfilename + ".feedbacks";
      const newFile = new File([file], updatedFilename, { type: file.type });
      setSubmit(true);
      try {
        const formData = new FormData();
        formData.append("upload_file", newFile);
        const { data, isLoading } = await axios.post("/storage", formData);
        await axios.post("/feedbacks", { screenshot: data.path });
        mutate("/feedbacks");
      } catch (err) {
        console.log(err);
      } finally {
        setSubmit(false);
        e.target.reset();
      }
    }
  };

  return (
    <AdminLayout selecKey="feedbacks">
      <div>
        <h1 className="text-center text-2xl font-bold">
          Please Upload your FeedBacks screenshots.
        </h1>
        <div className="w-6/12 mx-auto mt-12">
          <form onSubmit={onUpload}>
            <div className="relative h-[200px] bg-white border-2 border-dotted shadow-xl rounded-xl flex justify-center items-center flex-col border-gray-500 hover:border-blue-500 duration-1000 gap-2">
              <input
                type="file"
                accept="image/*"
                id="feed-file"
                required
                className="border absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <InboxOutlined className="text-4xl text-blue-600" />
              <p className="text-gray-400 font-semibold">
                Click this area to upload file
              </p>
            </div>
            {submit ? (
              <button
                type="button"
                className="px-8 py-2 mt-4 font-bold  bg-gray-200 border-2 text-gray-500 cursor-auto"
              >
                please wait...
              </button>
            ) : (
              <button className=" border-2 border-gray-600 border-dotted px-8 py-2 mt-4 bg-blue-600 text-white font-bold hover:bg-white hover:text-blue-600 hover:border-blue-600 duration-300">
                Submit
              </button>
            )}
          </form>
        </div>

        <div className="mt-12 ">
          <div className="grid md:grid-cols-5 w-10/12 mx-auto gap-8">
            {data &&
              data.map((pic, index) => (
                <img
                  src={`http://localhost:8080/${pic.screenshot}`}
                  alt={pic.path}
                  className="mx-auto w-[300px] h-[200px]"
                  key={index}
                />
              ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
export default FeedBacks;
