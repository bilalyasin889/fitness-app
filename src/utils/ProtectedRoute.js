import {useAuth} from "./authentication/AuthProvider";
import {Navigate, Outlet} from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated()) {
        return <Navigate to='/login' />;
    }

    return children ? children : <Outlet />;
};
