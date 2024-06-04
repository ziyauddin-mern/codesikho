"use client";
import Link from "next/link";
import "./layout.css";

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

const Layout = ({ children, carticon = false }) => {
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
            <Link href="/blog" className="hover-line md:text-start text-center">
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

            <button className="bg-[#3F51B5] text-white px-12 rounded py-3 hover:bg-[#28346C] duration-300 w-fit mx-auto">
              Login
            </button>
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
    </>
  );
};

export default Layout;
