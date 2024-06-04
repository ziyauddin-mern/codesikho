import "./plan.css";

const plans = [
  {
    pic: "/images/home/plan/2.png",
    title: "LEARN CLEAN CODING",
    desc: "Learn Best Coding Patterns and Practices to make your code more scalable",
  },
  {
    pic: "/images/home/plan/3.png",
    title: "LEARN BEST CODING PATTERNS",
    desc: "Educate yourself with the top-notch study material designed by the EXPERTS.",
  },
  {
    pic: "/images/home/plan/4.png",
    title: "WORLD-CLASS FACULTY",
    desc: "Learn from the accomplished teachers with an in-depth understanding of the subject.",
  },
  {
    pic: "/images/home/plan/5.png",
    title: "QUIZ & ASSIGNMENTS",
    desc: "Practice chapter-wise Quizzes & solve Assignments to learn and revise concepts.",
  },
  {
    pic: "/images/home/plan/6.png",
    title: "VIDEO LECTURES",
    desc: "Learn through high-quality & easy to understand video lectures.",
  },
  {
    pic: "/images/home/plan/7.png",
    title: "E-BOOKS",
    desc: "Get Important topics & formulas for last-minute revision in the PDF format.",
  },
  {
    pic: "/images/home/plan/8.png",
    title: "TRUSTED CONTENT",
    desc: "Learn from the comprehensive & interactive course content.",
  },
  {
    pic: "/images/home/plan/9.png",
    title: "AFFORDABLE FEE STRUCTURE",
    desc: "Learn from the best in the industry with an affordable payment plan.",
  },
  {
    pic: "/images/home/plan/10.png",
    title: "ONLINE VIDEO LECTURES",
    desc: "Learn Through interactive video lectures",
  },
];

const Plan = () => {
  return (
    <div className="md:w-8/12 mx-auto my-16">
      <h1 className="text-[#3F4C9A] text-4xl font-bold text-center">
        Our Basic Plan Features
      </h1>
      <div className="flex justify-center py-12">
        <img src="/images/home/plan/1.png" alt="plan1" />
      </div>
      <div className="grid md:grid-cols-3 gap-6 px-8">
        {plans.map((plan, planIndex) => (
          <div
            key={planIndex}
            className="border flex flex-col items-center py-4 px-8 rounded-2xl  plan-hover duration-200 cursor-pointer"
          >
            <div>
              <img src={plan.pic} alt={plan.pic} className="w-[65px]" />
            </div>
            <h1 className="font-semibold text-sm text-gray-600 mt-2 duration-200">
              {plan.title}
            </h1>
            <p className="text-gray-500 pt-6 text-lg text-center">
              {plan.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plan;
