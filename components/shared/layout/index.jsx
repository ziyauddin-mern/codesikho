"use client";
import { useEffect, useState } from "react";
import { Form, Input, Modal, Select, message } from "antd";
import countries from "@/components/json/CountryCodes";
import Link from "next/link";
import "./layout.css";
import axios from "axios";
const server = "http://localhost:8080";
axios.defaults.baseURL = server;

const features = [
  {
    title: "Expert Instructors",
    desc: "Learn With One of the Best Instructor in Hindi",
    bg: "#FBB545",
    rounded: "md:rounded-ss-[45px]",
  },
  {
    title: "Learn Anytime",
    desc: "The biggest advantage of Online education is that you study at your pace.",
    bg: "#FFAA21",
    rounded: "rounded-none",
  },
  {
    title: "Learn Anywhere",
    desc: "Now you can study at your home or with your friends.",
    bg: "#FBB545",
    rounded: "md:rounded-tr-[45px]",
  },
];

const featuresB = [
  {
    desc: `Learn With One of the Best Instructor in Hindi`,
    bg: "#FBB545",
  },
  {
    desc: "The biggest advantage of Online education is that you study at your pace.",
    bg: "#FFAA21",
  },
  {
    desc: "Now you can study at your home or with your friends.",
    bg: "#FBB545",
  },
];

const footerMenus = [
  {
    label: "Privacy policy",
    href: "#",
  },
  {
    label: "Terms of use",
    href: "#",
  },
  {
    label: "Contact us",
    href: "#",
  },
  {
    label: "Refund policy",
    href: "#",
  },
];

const checkAuth = async (session) => {
  if (session) {
    try {
      const { data: isLogged } = await axios.post("/token/verify", {
        token: session,
      });
      return isLogged;
    } catch (err) {
      localStorage.removeItem("auth");
      return null;
    }
  }
};

const Layout = ({ children, carticon = false }) => {
  const [submitLoginForm] = Form.useForm();

  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const tmp = async () => {
      const session = localStorage.getItem("auth");
      if (session) {
        const isLogged = await checkAuth(session);
        setIsAuth(isLogged);
      } else {
        localStorage.removeItem("auth");
      }
    };
    tmp();
  }, []);
  const [modalState, setModalState] = useState(false);
  const [loginForm, setLoginForm] = useState(true);
  const [phonePrefix, setPhonePrefix] = useState("+91");
  const [logReq, setLogReq] = useState(false);
  const [signupReq, setSignupReq] = useState(false);
  const [accountPanel, setAccountPanel] = useState(false);

  const onCountry = (value) => {
    setPhonePrefix(value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const prefixSelector = (
    <Form.Item
      noStyle
      name="country_code"
      rules={[{ required: true, message: "Please select your contry" }]}
    >
      <Select
        style={{
          width: 70,
        }}
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onCountry}
        filterOption={filterOption}
        options={countries}
      />
    </Form.Item>
  );

  const onSignup = async (values) => {
    values.mobile = values.country_code + values.mobile;
    setSignupReq(true);
    try {
      const { data } = await axios.post("/auth/signup", values);
      message.success("Success.");
      localStorage.setItem("auth", data.token);
      let isLogged = await checkAuth(localStorage.getItem("auth"));
      setIsAuth(isLogged);
      setModalState(false);
      setLoginForm(true);
    } catch (err) {
      message.error(err.response.data.message);
    } finally {
      setSignupReq(false);
    }
  };

  const onLogin = async (values) => {
    const { login_email: email, login_password: password } = values;
    setLogReq(true);
    try {
      const { data } = await axios.post("/auth/login", { email, password });
      message.success("Success.");
      localStorage.setItem("auth", data.token);
      let isLogged = await checkAuth(localStorage.getItem("auth"));
      setIsAuth(isLogged);
      submitLoginForm.resetFields();
      setModalState(false);
    } catch (err) {
      //message.error(err.response.data.message);
    } finally {
      setLogReq(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    setIsAuth(null);
  };

  return (
    <>
      {/* header */}
      <header className="xl:w-8/12 w-full mx-auto">
        <nav className="flex gap-4 py-6 md:items-center md:justify-between md:flex-row flex-col">
          <div className="flex items-center md:justify-between flex-1 md:gap-0 gap-8 md:px-0 px-8">
            <Link href="/">
              <img
                src="/images/logo/logo.png"
                alt="logo"
                className="w-[42px] h-[42px]"
              />
            </Link>
            <div className="flex-1">
              <form className="relative md:w-6/12 w-full mx-auto">
                <input
                  type="text"
                  name="search"
                  placeholder="Search"
                  className="outline-none text-sm border focus:border-[#3F51B5] duration-300 p-3 w-full"
                />
                <button className="absolute top-0 text-xl px-2 h-full right-2 text-[#3F51B5]">
                  <i className="ri-search-line"></i>
                </button>
              </form>
            </div>
          </div>

          {/* navigation container */}
          <div className="md:space-x-8 text-sm text-[#3F51B5] font-semibold flex md:flex-row flex-col md:items-center md:justify-start md:space-y-0 space-y-4 md:px-0 px-8">
            <Link
              href="/courses"
              className="hover-line md:text-start text-center"
            >
              Courses
            </Link>
            <Link
              href="/blogs"
              className="hover-line md:text-start text-center"
            >
              Blog
            </Link>
            <Link
              href="/announcements"
              className="hover-line md:text-start text-center"
            >
              Announcements
            </Link>
            <Link
              href="/feedbacks"
              className="hover-line md:text-start text-center"
            >
              FeedBacks
            </Link>
            {carticon && (
              <button>
                <i className="ri-shopping-cart-2-line"></i>
              </button>
            )}

            {isAuth ? (
              <div
                className="flex  items-center cursor-pointer relative justify-center"
                onClick={() => setAccountPanel(!accountPanel)}
              >
                <div className="text-2xl font-bold bg-[#FCBB1F] w-10 h-10 border-2 hover:border-blue-500 duration-300 rounded-full flex items-center justify-center capitalize">
                  {isAuth.fullname.substring(0, 1)}
                </div>
                <div>
                  <i className="ri-arrow-down-s-fill"></i>
                </div>
                {accountPanel && (
                  <div className="bg-[#3F51B5] py-2 shadow absolute top-[100%] z-10 md:right-0 font-bold rounded text-md capitalize text-white flex flex-col w-[150px]">
                    <Link
                      href="/dashboard/mycourses"
                      className="hover:bg-white hover:text-[#3F51B5] px-4 py-2"
                    >
                      my purchases
                    </Link>
                    <Link
                      href="/dashboard/myprofile"
                      className="hover:bg-white hover:text-[#3F51B5] px-4 py-2"
                    >
                      my profile
                    </Link>
                    <button
                      onClick={logout}
                      className="hover:bg-white hover:text-[#3F51B5] px-4 py-2 text-left"
                    >
                      log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="bg-[#3F51B5] text-white px-12 rounded py-3 hover:bg-[#28346C] duration-300 w-fit mx-auto"
                onClick={() => setModalState(true)}
              >
                Login
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* section */}

      <section>{children}</section>

      {/* footer */}
      <footer className="bg-white">
        <div className="xl:w-8/12 mx-auto md:pb-0 pb-8 grid md:grid-cols-3 px-12 md:space-y-0 space-y-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.rounded} pt-12 md:pb-0 pb-12 text-white flex flex-col items-center justify-center gap-4`}
              style={{ background: feature.bg }}
            >
              <h1 className="text-2xl font-semibold">{feature.title}</h1>
              <p className="md:hidden block text-center text-sm font-semibold px-20 mt-4">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-[url('/images/footer/footer.jpg')]">
          <div style={{ background: "rgba(57, 70, 143, 0.5)" }}>
            <div className="md:w-8/12 mx-auto">
              <div className="grid md:grid-cols-3 px-12 text-white ">
                {featuresB.map((featureB, featureBIndex) => (
                  <div
                    key={featureBIndex}
                    className={`flex justify-center md:pb-8 pb-0`}
                    style={{ background: featureB.bg }}
                  >
                    <p className="text-center text-sm font-semibold px-20 mt-4 md:block hidden">
                      {featureB.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-3 md:gap-0 gap-12 px-12 text-white pt-12 pb-6">
                <div className="flex flex-col space-y-4">
                  <Link href="#" className="space-x-2">
                    <i className="ri-mail-fill"></i>
                    <span>info@codesikho.com</span>
                  </Link>
                  <Link href="#">Affiliate Policy</Link>
                  <Link href="#">Cancellation / Refund Policy</Link>
                </div>

                <div>
                  <h1 className="font-bold text-2xl mb-8">Companys</h1>

                  <div className="flex flex-col space-y-4">
                    <Link href="#" className="w-fit">
                      About Us
                    </Link>
                    <Link href="#" className="w-fit">
                      Contact Us
                    </Link>
                    <Link href="#" className="w-fit">
                      Privacy Policy
                    </Link>
                    <Link href="#" className="w-fit">
                      FAQs
                    </Link>
                    <Link href="#" className="w-fit">
                      Terms & conditions
                    </Link>
                  </div>
                </div>

                <div>
                  <h1 className="font-bold text-2xl mb-8">Social Media</h1>

                  <div className="flex space-x-2">
                    <Link href="#" className="w-fit">
                      <i className="ri-youtube-line"></i>
                    </Link>

                    <Link href="#" className="w-fit">
                      <i className="ri-facebook-line"></i>
                    </Link>

                    <Link href="#" className="w-fit">
                      <i className="ri-instagram-line"></i>
                    </Link>

                    <Link href="#" className="w-fit">
                      <i className="ri-twitter-fill"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-white bg-[#28346C] pt-8 pb-16">
          <p className="w-8/12 mx-auto">© 2020 Asng Associates (CodeSikho)</p>
        </div>

        <div className="bg-[#F7F7F7] flex flex-col items-center py-16 gap-8">
          <Link
            href="#"
            className="bg-black text-white px-6 text-sm font-bold py-3 rounded space-x-2"
          >
            <i className="ri-paragraph"></i>
            <span>Launch your Graphy</span>
          </Link>

          <p className="text-xs font-semibold">
            100K+ creators trust{" "}
            <Link href="#" className="underline">
              Graphy
            </Link>{" "}
            to teach online
          </p>

          <div className="md:w-8/12 mx-auto flex md:flex-row flex-col gap-12 justify-center md:items-start items-center text-sm font-semibold mt-8">
            <p>CodeSikho © 2024</p>
            <ul className="list-disc flex gap-12 md:flex-row flex-col">
              {footerMenus.map((footerMenu, footerMenuIndex) => (
                <li key={footerMenuIndex}>
                  <Link className="underline" href={footerMenu.href}>
                    {footerMenu.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>

      <Modal
        open={modalState}
        onCancel={() => setModalState(false)}
        footer={null}
        width={450}
        className="no-border-radius"
      >
        {loginForm ? (
          <div>
            <Form form={submitLoginForm} onFinish={onLogin}>
              <p className="font-bold text-lg">Log in to CodeSikho</p>
              <div className="mt-4">
                <Form.Item
                  name="login_email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                    },
                  ]}
                >
                  <Input
                    placeholder="Email Address"
                    size="large"
                    className="rounded-none"
                  />
                </Form.Item>

                <Form.Item
                  name="login_password"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Login Password"
                    size="large"
                    className="rounded-none"
                  />
                </Form.Item>
                {logReq ? (
                  <button
                    disabled
                    className="bg-gray-400 w-full text-white font-semibold py-1 text-lg"
                  >
                    <span className="animate-spin block">
                      <i className="ri-loader-3-line"></i>
                    </span>
                  </button>
                ) : (
                  <button className="bg-[#3F51B5] hover:bg-[#28346C] w-full text-white font-semibold py-1 duration-300 text-lg">
                    NEXT
                  </button>
                )}
              </div>
            </Form>
            <div className="mt-4 font-semibold">
              <p>
                <span>Don’t have an account? </span>
                <button
                  className="font-bold"
                  onClick={() => setLoginForm(false)}
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        ) : (
          <div>
            <Form onFinish={onSignup} autoComplete="off">
              <p className="font-bold text-lg">Create an account</p>
              <div className="mt-4 overflow-hidden">
                <Form.Item
                  name="fullname"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    placeholder="Name"
                    size="large"
                    className="rounded-none"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                    },
                  ]}
                >
                  <Input
                    placeholder="Email Address"
                    size="large"
                    className="rounded-none"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Password"
                    size="large"
                    className="rounded-none"
                  />
                </Form.Item>

                <Form.Item
                  name="mobile"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Mobile number!",
                    },
                  ]}
                >
                  <Input
                    prefix={phonePrefix}
                    type="number"
                    addonBefore={prefixSelector}
                    style={{
                      width: "100%",
                    }}
                    size="large"
                    className="rounded-none"
                  />
                </Form.Item>

                {signupReq ? (
                  <button
                    disabled
                    className="bg-gray-400 w-full text-white font-semibold py-1 duration-300 text-lg"
                  >
                    <span className="animate-spin block">
                      <i className="ri-loader-3-line"></i>
                    </span>
                  </button>
                ) : (
                  <button className="bg-[#3F51B5] hover:bg-[#28346C] w-full text-white font-semibold py-1 duration-300 text-lg">
                    NEXT
                  </button>
                )}
              </div>
            </Form>
            <div className="mt-4 font-semibold">
              <p>
                <span>Already have an account? </span>
                <button
                  className="font-bold"
                  onClick={() => setLoginForm(true)}
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Layout;
