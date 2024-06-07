"use client";
import { useState } from "react";
import AdminLayout from "@/components/shared/admin-layout";
import useSWR, { mutate } from "swr";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";
import { Form, Input, Radio, Button, message } from "antd";

const Courses = () => {
  const fetcher = async (url) => {
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  const { data, error, isLoading } = useSWR("/courses", fetcher);
  const [submit, setSubmit] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [courseForm] = Form.useForm();

  const onCoursesCrate = async (values) => {
    setSubmit(true);
    try {
      const { data } = await axios.post("/courses", values);
      message.success(
        "Success ! If you want to publish your product then first upload the photo. Thank you."
      );
      mutate("/courses");
    } catch (err) {
      message.error("Unable to create Courses, please try after some time.");
    } finally {
      setSubmit(false);
      courseForm.resetFields();
    }
  };

  const upload = async (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const orignalfilename = file.name;
      const updatedFilename = orignalfilename + ".courses";
      const newFile = new File([file], updatedFilename, { type: file.type });

      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("upload_file", newFile);
        const { data } = await axios.post("/storage", formData);
        await axios.put(`/courses/${id}`, { thumbnail: data.path });
        mutate("/courses");
      } catch (err) {
        console.log(err.messages);
      } finally {
        setUploading(false);
      }
      return false;
    }
  };

  return (
    <AdminLayout selecKey="courses">
      <div className="mt-[-25px]">
        <div className="w-6/12 mx-auto p-8 shadow-lg bg-white rounded-lg">
          <h1 className="text-center text-2xl font-bold">Add Courses.</h1>
          <Form onFinish={onCoursesCrate} form={courseForm} layout="vertical">
            <div className="grid grid-cols-2 gap-x-4">
              <div className="col-span-2">
                <Form.Item
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Course name",
                    },
                  ]}
                  label={
                    <p className="font-semibold text-gray-600 text-lg">
                      Course name:
                    </p>
                  }
                >
                  <Input
                    size="large"
                    className="rounded-none"
                    placeholder="React Js"
                  />
                </Form.Item>
              </div>

              <div>
                <Form.Item
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Course Price",
                    },
                  ]}
                  label={
                    <p className="font-semibold text-gray-600 text-lg">
                      Price:
                    </p>
                  }
                >
                  <Input
                    size="large"
                    className="rounded-none"
                    placeholder="36000"
                  />
                </Form.Item>
              </div>

              <div>
                <Form.Item
                  name="discount"
                  label={
                    <p className="font-semibold text-gray-600 text-lg">
                      Discount:
                    </p>
                  }
                >
                  <Input
                    size="large"
                    className="rounded-none"
                    placeholder="30000"
                  />
                </Form.Item>
              </div>

              <div className="col-span-2">
                <Form.Item
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please write course description",
                    },
                  ]}
                  label={
                    <p className="font-semibold text-gray-600 text-lg">
                      Description:
                    </p>
                  }
                >
                  <Input.TextArea
                    placeholder="React Js Description...."
                    rows={6}
                    className="rounded-none"
                  />
                </Form.Item>
              </div>

              <div className="flex col-span-2 justify-end">
                {submit ? (
                  <Button
                    disabled={true}
                    size="large"
                    className="font-semibold space-x-2 flex"
                  >
                    <span>Waiting</span>
                    <div className=" animate-spin">
                      <i className="ri-loader-3-line"></i>
                    </div>
                  </Button>
                ) : (
                  <Button
                    htmlType="submit"
                    size="large"
                    className="font-semibold space-x-2"
                  >
                    <span>SUBMIT</span>
                    <i className="ri-send-plane-2-line"></i>
                  </Button>
                )}
              </div>
            </div>
          </Form>
        </div>

        <div className="grid grid-cols-5 w-10/12 mx-auto mt-10 py-4 gap-8">
          {data &&
            data.map((course, courseIndex) => (
              <div
                key={courseIndex}
                className="bg-white rounded space-y-2 shadow-lg animate__animated animate__fadeIn"
              >
                {course.thumbnail ? (
                  <img
                    src={`http://localhost:8080/${course.thumbnail}`}
                    alt={course.thumbnail}
                  />
                ) : uploading ? (
                  <div className="w-full h-[200px] bg-gray-200 border flex items-center justify-center">
                    <span className="animate-spin text-8xl text-gray-400">
                      <i class="ri-loader-4-line"></i>
                    </span>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute cursor-pointer top-0 left-0 w-full opacity-0 h-full"
                      onChange={(e) => upload(e, course._id)}
                    />
                    <img
                      src="/images/logo/avatar.png"
                      alt="avatar"
                      className="w-11/12 mx-auto"
                    />
                  </div>
                )}
                <div className="px-4 pb-4">
                  <h1 className="text-lg font-semibold text-gray-600">
                    {course.title}
                  </h1>
                  <div className="flex gap-2 text-sm font-bold text-blue-600">
                    <del>₹{course.price}</del>
                    <p>₹{course.discount}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </AdminLayout>
  );
};
export default Courses;
