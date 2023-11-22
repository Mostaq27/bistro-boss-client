import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";


const FoodCard = ({ item }) => {
    const { image, price, recipe, name,_id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCart = food => {
        // console.log('food', food, user.email)
        if(user && user.email){
            //  sent cart item to the database
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axiosSecure.post('/carts', cartItem)
            .then(res => {
                console.log(res.data)
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: `${name} added to your carts`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                      // refetch cart to update the cart items count
                      refetch();
                }
            })
        }
        else{
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
              }).then((result) => {
                if (result.isConfirmed) {
                //  sent user to the login page
                    navigate('/login', {state: {from: location}})
                }
              });
        }
    }


    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="img" /></figure>
            <p className="absolute right-0 mr-4 mt-4 px-4 rounded-lg bg-slate-900 text-white">$ {price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => handleAddToCart(item)}
                        className="btn btn-outline bg-slate-100 border-0 border-orange-400 border-b-4 mt-4 uppercase">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;