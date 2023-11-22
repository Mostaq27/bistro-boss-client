import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";



const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="flex justify-center h-screen items-center"><progress className="progress w-56"></progress></div>
    }
    if (user) {
        return children;
    }
    return <Navigate to={'/login'} state={{from: location}} replace></Navigate>
    return (
        <div>

        </div>
    )
}

export default PrivateRoute;