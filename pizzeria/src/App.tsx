import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard.tsx";
import LoginForm from "./components/auth/LoginForm.tsx";
import RegisterForm from "./components/auth/RegisterForm.tsx";
import ProtectedRoute from "./components/route/ProtectedRoute.tsx";
import AccessDenied from "./components/route/AccessDenied.tsx";
import Logout from "./components/auth/Logout.tsx";

function App() {
    const isAuthenticated = Boolean(localStorage.getItem("token"));

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/auth/login" />} />
                <Route path="/auth/login" element={<LoginForm />} />
                <Route path="/auth/register" element={<RegisterForm />} />
                <Route path="/auth/logout" element={<Logout />} />
                <Route path="/access-denied" element={<AccessDenied />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute
                            element={<Dashboard />}
                            allowedRoles={["ADMIN","CLIENTE"]}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;