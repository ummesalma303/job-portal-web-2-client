import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SignIn/SignIn";
import JobDetails from "../pages/JobDetails/JobDetails";
import PrivateRoute from "./PrivateRoute";
import JobApply from "../pages/JobApply/JobApply";
import MyApplications from "../pages/MyApplications/MyApplications";
import AddJob from "../pages/AddJob/AddJob";
import MyPostedJobs from "../pages/MyPostedJobs/MyPostedJobs";
import ViewApplications from "../pages/ViewApplications/ViewApplications";
import AllJobs from "../pages/AllJobs/AllJobs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <h2>Route not found</h2>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path:"/jobs",
        element:<AllJobs/>
      },
      {
        path: 'jobs/:id',
        element: <PrivateRoute><JobDetails></JobDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`https://job-portal-server-for-recruiter-part3-omega.vercel.app/jobs/${params.id}`)
      },
      {
        path: 'jobApply/:id',
        element: <PrivateRoute><JobApply></JobApply></PrivateRoute>
      },
      {
        path: 'myApplications',
        element: <PrivateRoute><MyApplications></MyApplications></PrivateRoute>
      },
      {
        path: 'addJob',
        element: <PrivateRoute><AddJob></AddJob></PrivateRoute>
      },
      {
        path: 'myPostedJobs',
        element: <PrivateRoute><MyPostedJobs></MyPostedJobs></PrivateRoute>
      },
      {
        path: 'viewApplications/:job_id',
        element: <PrivateRoute><ViewApplications></ViewApplications></PrivateRoute>,
        loader: ({ params }) => fetch(`https://job-portal-server-for-recruiter-part3-omega.vercel.app/job-applications/jobs/${params.job_id}`)
      },
      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path: 'signIn',
        element: <SignIn></SignIn>
      }
    ]
  },
]);

export default router;