import FeedBacks from "@/components/feedbacks";
import axios from "axios";
export const metadata = {
  title: "Feedbacks",
};

const Blo = async () => {
  let x = null;
  try {
    const { data } = await axios.get("http://localhost:8080/feedbacks");
    x = data;
  } catch (err) {
    console.log(err);
  }
  return <FeedBacks allData={x} />;
};

export default Blo;
