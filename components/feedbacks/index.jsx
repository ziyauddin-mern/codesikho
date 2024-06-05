"use client";
import Layout from "../shared/layout";
import "./feedbacks.css";

const FeedBacks = ({ allData }) => {
  return (
    <Layout>
      <div className="md:w-7/12 mx-auto py-12">
        <h1 className="font-[Lato]  italic md:text-6xl text-4xl text-center mb-10">
          See what people Says
        </h1>
        <hr className="w-16 border border-black mx-auto" />
        <div className="grid md:grid-cols-3 gap-y-12 py-12 px-24">
          {allData &&
            allData.map((data, dataIndex) => (
              <img
                src={`http://localhost:8080/${data.path}`}
                alt={data.path}
                key={dataIndex}
                className="w-11/12 mx-auto animate__animated animate__zoomIn"
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};
export default FeedBacks;
