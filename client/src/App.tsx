import Home from "./pages/admin/home/Home";
import {createBrowserRouter, RouterProvider, Outlet, useLocation} from "react-router-dom";
import Users from "./pages/admin/users/Users";
import Products from "./pages/admin/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/admin/user/User";
import Product from "./pages/admin/product/Product";
// @ts-ignore
import {profile} from "./apis/users.ts";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import HomeClient from "./pages/client/HomeClient/HomeClient.tsx";
import {useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {useDispatch} from "react-redux";
import {setUser} from "./redux/userSlice.ts";


const queryClient = new QueryClient();

function App() {
    const Layout = () => {
        const location = useLocation();
        const isAdmin = location.pathname.startsWith("/admin");
        const dispatch = useDispatch();

        const getProfile = async () => {
            try {
                const res = await profile();
                dispatch(setUser(res.data));
            } catch (error) {
                window.location.href = "/admin/login";
                console.log(error);
            }
        }
        useEffect(() => {
            if (isAdmin) {
                getProfile();
            }
        }, [])


        return (
            <div className="main">
                <Navbar/>
                <div className="container-main">
                    <div className="menuContainer">
                        <Menu/>
                    </div>
                    <div className="container">
                        <QueryClientProvider client={queryClient}>
                            <Outlet/>
                        </QueryClientProvider>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    };

    const router = createBrowserRouter([
        {
            path: "/admin",
            element: <Layout/>,
            children: [
                {
                    path: "",
                    element: <Home/>,
                },
                {
                    path: "users",
                    element: <Users/>,
                },
                {
                    path: "products",
                    element: <Products/>,
                },
                {
                    path: "users/:id",
                    element: <User/>,
                },
                {
                    path: "products/:id",
                    element: <Product/>,
                },
            ],
        },
        {
            path: "/",
            children: [
                {
                    path: "",
                    element: <HomeClient/>,
                }
            ]
        },
        {
            path: "/admin/login",
            element: <Login/>,
        },
        {
            path: "/login",
            element: <Login/>,
        },
    ]);

    return <RouterProvider router={router}/>;
}

export default App;
