// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        // Agar token yo'q bo'lsa — login sahifasiga yo'naltir
        return <Navigate to="/login" replace />;
    }

    // Aks holda — sahifani ko'rsat
    return children;
};

export default ProtectedRoute;
