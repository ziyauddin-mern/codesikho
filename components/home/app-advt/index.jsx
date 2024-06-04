import Link from "next/link";
import "./style.css";

const AppAdvt = () => {
  return (
    <div className="py-8 bg-white">
      <div className="bg-[url('/images/home/app-advt/bg.jpg')] text-white rounded-3xl">
        <div className="md:w-7/12 mx-auto md:px-0 px-8">
          <h1 className="py-12 md:text-5xl text-3xl text-center font-semibold font-[Kanit]">
            DOWNLOAD OUR APP
          </h1>

          <div className="flex md:flex-row flex-col md:gap-0 gap-8 md:justify-between md:mt-8">
            <div className="md:space-y-8 space-y-4">
              <h1 className="md:text-6xl text-4xl md:text-start text-center font-[sans-serif] font-bold leading-tight">
                MOBILE APP
                <br className="md:block hidden" /> FOR
                <span className="text-cyan-300"> STUDENTS</span>
              </h1>

              <h2 className="text-lg text-gray-100 md:text-start text-center">
                Learn Code from anywhere ,anytime using our appand
                <br className="md:block hidden" /> website. Download it today!
              </h2>

              <Link
                href="#"
                className="rounded-full bg-cyan-500 border-2 border-cyan-500 text-white md:px-12 px-8 md:py-2 font-semibold flex items-center w-fit hover:bg-inherit hover:text-cyan-500 duration-300 md:mx-0 mx-auto"
              >
                <i className="ri-play-fill text-4xl"></i>
                <span>PLAY STORE</span>
              </Link>
            </div>
            <div>
              <img
                src="/images/home/app-advt/1.jpg"
                alt="app-advt"
                className="w-7/12 md:mx-0 mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppAdvt;
