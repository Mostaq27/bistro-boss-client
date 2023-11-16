import SectionTitle from "../../../SectionTitle/SectionTitle";
import featuredImg from '../../../../assets/home/Featured.jpg';
import './Featured.css';



const Featured = () => {
  return (
    <div className="featured-item bg-fixed text-white pt-8 my-20">
        <section>
        <SectionTitle
        subHeading={'Check it out'}
        heading={'Featured Itrms'}></SectionTitle>
        </section>
    <div className="md:flex justify-center items-center  py-20 pt-12 px-36">
        <div>
            <img src={featuredImg} alt="" />
        </div>
        <div className="md: ml-10">
            <p>Aug 4, 2023</p>
            <p className="uppercase">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, cupiditate, laudantium quam culpa quia quibusdam reiciendis delectus ea, tenetur quo voluptate cum! Repellat et in accusamus possimus modi. Consequuntur ad autem vel quasi enim beatae mollitia blanditiis. Deserunt explicabo quam dolorum voluptates cupiditate iusto sapiente possimus, odit corrupti, dolores commodi.</p>
            <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
        </div>
    </div>
    </div>
  );
};

export default Featured;