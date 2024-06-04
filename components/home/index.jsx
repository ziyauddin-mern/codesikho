import Layout from "../shared/layout";
import AppAdvt from "./app-advt";
import Blog from "./blog";
import Courses from "./courses";
import Hero from "./hero";
import Plan from "./plan";

const Home = () => {
  return (
    <Layout carticon={true}>
      <Hero />
      <Plan />
      <Courses />
      <Blog />
      <AppAdvt />
    </Layout>
  );
};
export default Home;
