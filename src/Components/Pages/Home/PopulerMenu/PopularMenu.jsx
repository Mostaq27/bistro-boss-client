
import SectionTitle from "../../../SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../../Hooks/useMenu";


const PopularMenu = () => {
    const [menu] = useMenu();
    const populer = menu.filter(item=> item.category === 'popular');
    // const [menu, setMenu] =useState([]);
    // useEffect(()=>{
    //     fetch('/menu.json')
    //     .then(res=>res.json())
    //     .then(data => {
    //         const populerItems = data.filter(item => item.category === 'popular');
    //         setMenu(populerItems)})
    // },[])
  return (
   <section className="mb-12">
    <SectionTitle
    subHeading={'Populer items'}
    heading={'From our menu'}>
    </SectionTitle>
    <div className="grid md:grid-cols-2 gap-10">
        {
            populer.map(item=> <MenuItem
            key={item._id}
            item={item}
            ></MenuItem>)
        }
    </div>
    <div className="text-center">

    <button className="btn btn-outline border-0 border-b-4 mt-4 ">View Full Menu</button>
    </div>
   </section>
  );
};

export default PopularMenu;