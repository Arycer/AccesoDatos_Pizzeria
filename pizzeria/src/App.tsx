import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm.tsx";
import RegisterForm from "./components/auth/RegisterForm.tsx";
import ProtectedRoute from "./components/route/ProtectedRoute.tsx";
import AccessDenied from "./components/route/AccessDenied.tsx";
import Logout from "./components/auth/Logout.tsx";
import Header from "./components/elements/Header.tsx";
import AdminOrdersPage from "./components/order/AdminOrdersPage.tsx";
import ClientOrdersPage from "./components/order/ClientOrdersPage.tsx";
import PizzaManager from "./components/pizza/PizzaManager.tsx";
import CreateOrderPage from "./components/order/CreateOrderPage.tsx";
import ClientHomepage from "./components/pages/ClientHomepage.tsx";
import Footer from "./components/elements/Footer.tsx";
import RoleBasedRoute from "./components/route/RoleBasedRoute.tsx";
import AdminHomepage from "./components/pages/AdminHomepage.tsx";

function App() {
    const isAuthenticated = Boolean(localStorage.getItem("token"));

    return (
        <BrowserRouter>
            <div className="app-container">
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/auth/login" />} />
                        <Route path="/auth/login" element={<LoginForm />} />
                        <Route path="/auth/register" element={<RegisterForm />} />
                        <Route path="/auth/logout" element={<Logout />} />
                        <Route path="/access-denied" element={<AccessDenied />} />

                        <Route
                            path="/admin/orders"
                            element={
                                <ProtectedRoute
                                    element={<AdminOrdersPage />}
                                    allowedRoles={["ADMIN"]}
                                />
                            }
                        />

                        <Route
                            path="/admin/pizzas"
                            element={
                                <ProtectedRoute
                                    element={<PizzaManager />}
                                    allowedRoles={["ADMIN"]}
                                />
                            }
                        />

                        <Route
                            path="/create-order"
                            element={
                                <ProtectedRoute
                                    element={<CreateOrderPage />}
                                    allowedRoles={["ADMIN", "CLIENTE"]}
                                />
                            }
                        />

                        <Route
                            path="/my-orders"
                            element={
                                <ProtectedRoute
                                    element={<ClientOrdersPage />}
                                    allowedRoles={["ADMIN", "CLIENTE"]}
                                />
                            }
                        />

                        <Route
                            path="/home"
                            element={
                                <RoleBasedRoute
                                    roleComponents={{
                                        ADMIN: <AdminHomepage />,
                                        CLIENTE: <ClientHomepage />,
                                    }}
                                />
                            }
                        />
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
