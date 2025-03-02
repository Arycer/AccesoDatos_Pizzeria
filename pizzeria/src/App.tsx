import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard.tsx";
import LoginForm from "./components/auth/LoginForm.tsx";
import RegisterForm from "./components/auth/RegisterForm.tsx";

function App() {
    const isAuthenticated = Boolean(localStorage.getItem("token"));

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/auth/login" />} />
                <Route path="/auth/login" element={<LoginForm />} />
                <Route path="/auth/register" element={<RegisterForm />} />
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;