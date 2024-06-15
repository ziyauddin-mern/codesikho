"use client";
import { useState } from "react";
import AdminLayout from "@/components/shared/admin-layout";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { Button, Form, Input, Select } from "antd";
let server = "http://localhost:8080";
axios.defaults.baseURL = server;

const fetcher = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const Announcements = () => {
  const [upload, setUpload] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [anform] = Form.useForm();

  const { data, error, isLoading } = useSWR("/announcements", fetcher);
  console.log(data);

  const onUpload = async (e, id) => {
    const file = e.target.files[0];

    if (file) {
      const originalFilename = file.name;
      const newFilename = originalFilename + ".announcements";
      const newFile = new File([file], newFilename, { type: file.type });

      const formData = new FormData();
      formData.append("upload_file", newFile);
      setUpload(true);
      try {
        const { data } = await axios.post("/storage", formData);
        await axios.put(`/announcements/${id}`, { thumbnail: data.path });
        mutate("/announcements");
      } catch (err) {
        console.log(err);
      } finally {
        setUpload(false);
      }
    }
  };

  const onSubmit = async (values) => {
    setSubmit(true);
    try {
      await axios.post("/announcements", values);
      mutate("/announcements");
      anform.resetFields();
    } catch (err) {
      console.log(err);
    } finally {
      setSubmit(false);
    }
  };

  return (
    <AdminLayout selecKey="announcements">
      <div>
        <div className="w-6/12 mx-auto mt-4 bg-white shadow rounded p-8">
          <h1 className="text-center text-2xl font-bold">ANNOUNCEMENTS</h1>
          <Form form={anform} layout="vertical" onFinish={onSubmit}>
            <Form.Item
              label={
                <p className="font-bold text-lg text-gray-500">Title : </p>
              }
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please enter announcement title.",
                },
              ]}
            >
              <Input
                placeholder="React js"
                size="large"
                className="rounded-none"
              />
            </Form.Item>

            <Form.Item
              label={
                <p className="font-bold text-lg text-gray-500">Status : </p>
              }
              name="status"
              rules={[
                {
                  required: true,
                  message: "Please select announcement status.",
                },
              ]}
            >
              <Select size="large" placeholder="Launched..">
                <Select.Option value="launched">Launched</Select.Option>
                <Select.Option value="coming soon">Comming soon</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={
                <p className="font-bold text-lg text-gray-500">Description :</p>
              }
              name="desc"
              rules={[
                {
                  required: true,
                  message: "Please enter announcement title.",
                },
              ]}
            >
              <Input.TextArea
                placeholder="React js"
                rows="6"
                className="rounded-none"
              />
            </Form.Item>
            <div className="flex justify-end">
              {submit ? (
                <Button
                  size="large"
                  disabled
                  className="rounded-none font-semibold space-x-1"
                >
                  <i className="ri-loader-2-line block animate-spin"></i>
                </Button>
              ) : (
                <Button
                  htmlType="submit"
                  size="large"
                  className="rounded-none font-semibold space-x-1"
                >
                  <span>SUBMIT</span>
                  <i className="ri-expand-right-line"></i>
                </Button>
              )}
            </div>
          </Form>
        </div>

        <div className="mt-12 grid grid-cols-2 w-8/12 mx-auto gap-8">
          {data &&
            data.map((ann, annIndex) => (
              <div
                className="bg-white shadow animate__animated animate__fadeIn"
                key={annIndex}
              >
                {ann.thumbnail ? (
                  <img src={`${server}/${ann.thumbnail}`} alt={ann.thumbnail} />
                ) : upload ? (
                  <div className="bg-gray-200 flex items-center justify-center h-[200px]">
                    <i className="ri-loader-2-line animate-spin block text-6xl"></i>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src="/images/logo/avatar.png"
                      alt="avatar"
                      className="mx-auto w-4/12"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => onUpload(e, ann._id)}
                      className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                    />
                  </div>
                )}

                <div className="text-center p-4">
                  <h1 className="text-lg text-gray-600 font-semibold">
                    {ann.title}
                  </h1>
                  <p className="text-gray-500">
                    <span>{ann.desc}</span>{" "}
                    <span className="font-bold text-gray-700">
                      {ann.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </AdminLayout>
  );
};
export default Announcements;
