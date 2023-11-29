import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import MealDetails from "../Pages/MealDetails/MealDetails";
import MealsPage from "../Pages/MealsPage/MealsPage";
import Dashboard from "../layout/Dashboard";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import RequestedMeals from "../Pages/Dashboard/RequestedMeals/RequestedMeals";
import Checkout from "../Pages/CheckoutPage/Checkout";
import Payment from "../Pages/Payment/Payment";
import ManageUser from "../Pages/Dashboard/Admin/ManageUser/ManageUser";
import AddMeal from "../Pages/Dashboard/Admin/AddMeal/AddMeal";
import AllMeals from "../Pages/Dashboard/Admin/AllMeals/AllMeals";
import AllReviews from "../Pages/Dashboard/Admin/AllReviews/AllReviews";
import ServeMeals from "../Pages/Dashboard/Admin/ServeMeals/ServeMeals";
import UpcomingMeals from "../Pages/Dashboard/Admin/UpcomingMeals/UpcomingMeals";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile/AdminProfile";
import Upcoming from "../Pages/Home/Upcoming/Upcoming";
import MyReview from "../Pages/Dashboard/MyReview/MyReview";
import AdminRoute from "./AdminRoute";
import ErrorPage from "../Compounts/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path : '/',
            element: <Home></Home>
        },
        {
          path: 'meals',
          element: <MealsPage></MealsPage>
        },
        {
          path: 'meals/:id',
          element: <MealDetails></MealDetails>
        },
        {
          path: 'checkout/:packageName',
          element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
        },
        {
          path: '/payment',
          element: <PrivateRoute><Payment></Payment></PrivateRoute>
        },
        {
          path: 'upcoming',
          element: <Upcoming></Upcoming>
        }
      ]
    },
    {
      path: '/dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        // for normal user
        {
          path: 'myProfile',
          element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
        },
        {
          path: 'requestedMeals',
          element : <PrivateRoute><RequestedMeals></RequestedMeals></PrivateRoute>
        },
        {
          path: 'myReviews',
          element: <PrivateRoute><MyReview></MyReview></PrivateRoute>
        },
        // for admin panel
        {
          path: 'adminProfile',
          element:<AdminRoute><AdminProfile></AdminProfile></AdminRoute>
        },
        {
          path: 'manageUsers',
          element: <AdminRoute><ManageUser></ManageUser></AdminRoute>
        },
        {
          path: 'addMeal',
          element: <AdminRoute><AddMeal></AddMeal></AdminRoute>
        },
        {
          path: 'allMeals',
          element: <AdminRoute><AllMeals></AllMeals></AdminRoute>
        },
        {
          path: 'allReviews',
          element: <AdminRoute><AllReviews></AllReviews></AdminRoute>
        },
        {
          path: 'serveMeals',
          element: <AdminRoute><ServeMeals></ServeMeals></AdminRoute>
        },
        {
          path: 'upcomingMeals',
          element: <AdminRoute><UpcomingMeals></UpcomingMeals></AdminRoute>
        }
      ]
    },
    {
      path: '/login',
      element: <Login></Login>
    },
    {
      path: '/register',
      element: <Register></Register>
    }
  ]);