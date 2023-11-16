import { Helmet } from "react-helmet-async";
import Footer from "../../Shared/Footer/Footer";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopulerMenu/PopularMenu";
import Testimonials from "../Teastimonials/Testimonials";



const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Home</title>
      </Helmet>
      <Banner></Banner>
      <Category></Category>
      <PopularMenu />
      <Featured />
      <Testimonials />
    </div>
  );
};

export default Home;