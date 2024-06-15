"use client";
import moment from "moment";
import AdminLayout from "@/components/shared/admin-layout";
import { Form, Input, message } from "antd";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { useState } from "react";
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

const Blogs = () => {
  const [loader, setLoader] = useState(false);
  const [upload, setUpload] = useState(false);
  const [blogForm] = Form.useForm();

  const { data, error, isLoading } = useSWR("/blogs/0/all", fetcher);

  const onSubmit = async (values) => {
    setLoader(true);
    try {
      const { data: blog } = await axios.post("/blogs", values);
      blogForm.resetFields();
      mutate("/blogs/0/all");
    } catch (err) {
      message.error("Unable to create. Please try after some time.");
    } finally {
      setLoader(false);
    }
  };

  const onUpload = async (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const orignalfilename = file.name;
      const updatedFilename = orignalfilename + ".blogs";
      const newFile = new File([file], updatedFilename, { type: file.type });
      setUpload(true);
      try {
        const formData = new FormData();
        formData.append("upload_file", newFile);
        const { data } = await axios.post("/storage", formData);
        await axios.put(`/blogs/${id}`, {
          thumbnail: data.path,
        });
        mutate("/blogs/0/all");
      } catch (err) {
        console.log(err);
      } finally {
        setUpload(false);
      }
    }
  };

  return (
    <AdminLayout selecKey="blog">
      <div>
        <div className="w-6/12 mx-auto bg-white shadow-lg rounded py-4 px-8">
          <Form form={blogForm} onFinish={onSubmit} layout="vertical">
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please enter blog title.",
                },
              ]}
              label={<p className="font-bold text-lg">Title: </p>}
            >
              <Input
                placeholder="Your blog title here."
                size="large"
                className="rounded-none"
              />
            </Form.Item>

            <Form.Item
              name="blogger"
              label={<p className="font-bold text-lg">Blogger Name: </p>}
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
              ]}
            >
              <Input
                placeholder="Your name here."
                size="large"
                className="rounded-none"
              />
            </Form.Item>

            <Form.Item
              name="desc"
              rules={[
                {
                  required: true,
                  message: "Please enter blog description",
                },
              ]}
              label={<p className="font-bold text-lg">Description: </p>}
            >
              <Input.TextArea rows={10} placeholder="Enter blog description." />
            </Form.Item>

            <div className="flex justify-end">
              {loader ? (
                <button
                  disabled
                  className="px-12 py-1 rounded space-x-2  text-3xl bg-gray-300 text-white"
                >
                  <i className="ri-loader-3-line animate-spin block"></i>
                </button>
              ) : (
                <button className="border px-4 py-2 rounded space-x-2 font-bold text-sm hover:border-blue-300 hover:text-blue-400 duration-300">
                  <span>SUBMIT</span>
                  <i className="ri-login-circle-line text-md"></i>
                </button>
              )}
            </div>
          </Form>
        </div>

        <div className="grid grid-cols-4 my-8 gap-8 px-8">
          {data &&
            data.map((item, blogIndex) => (
              <div
                className="bg-white shadow rounded animate__animated animate__fadeIn"
                key={blogIndex}
              >
                <div>
                  {item.thumbnail ? (
                    <img
                      src={`${server}/${item.thumbnail}`}
                      alt={item.thumbnail}
                    />
                  ) : upload ? (
                    <div className="relative flex justify-center text-5xl h-[200px] items-center bg-gray-200">
                      <i className="ri-loader-2-line block animate-spin"></i>
                    </div>
                  ) : (
                    <div className="relative flex">
                      <img
                        src="/images/logo/avatar.png"
                        alt="avatar"
                        className="mx-auto w-5/12"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        className="border border-red-500 absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                        onChange={(e) => onUpload(e, item._id)}
                      />
                    </div>
                  )}
                </div>
                <div className="p-4 space-y-4">
                  <h1 className="text-gray-500 text-lg font-semibold">
                    {item.title.length < 35
                      ? item.title
                      : `${item.title.substring(0, 35)}...`}
                  </h1>
                  <p className="text-xs text-gray-400 flex justify-between">
                    <span>
                      {moment(item.createdAt).format("ddd MMM D, YYYY h:mm A")}
                    </span>
                    <span>{item.blogger}</span>
                  </p>
                  <p className="text-gray-400">
                    {item.desc.length < 70
                      ? item.desc
                      : `${item.desc.substring(0, 70)}...`}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </AdminLayout>
  );
};
export default Blogs;
