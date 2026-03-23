import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import ForgotPasssword from "./pages/Auth/ForgotPassword";

import Dashboard from "./pages/user/Dashboard";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";

import PrivateRoute from "./components/Routes/PrivateRoute";
import AdminRoute from "./components/Routes/AdminRoute";
import { Toaster } from "react-hot-toast";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoriesProduct";
import CartPage from "./pages/Cartpage";
import AdminOrders from "./pages/Admin/AdminOrders";

function App() {
  return (
    <>
      <Toaster />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />

        {/* User Routes */}
        <Route path="/dashboard/user" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} /> {/* /dashboard */}
          <Route path="orders" element={<Orders />} /> {/* /dashboard/orders */}
          <Route path="search" element={<Search />} />
          <Route path="profile" element={<Profile />} />
          {/* /dashboard/profile */}
        </Route>

        {/* Admin Routes */}
        <Route path="/dashboard/admin" element={<AdminRoute />}>
          <Route index element={<AdminDashboard />} /> {/* /admin */}
          <Route
            path="/dashboard/admin/create-category"
            element={<CreateCategory />}
          />
          <Route
            path="/dashboard/admin/create-product"
            element={<CreateProduct />}
          />
          <Route path="/dashboard/admin/products" element={<Products />} />
          <Route
            path="/dashboard/admin/product/:slug"
            element={<UpdateProduct />}
          />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
