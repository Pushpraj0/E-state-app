import HomePage from './pages/homePage/HomePage'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import ListPage from './pages/listPage/ListPage';
import {Layout, RequireAuth } from './pages/layout/Layout';
import SinglePage from './pages/singlePage/SinglePage'
import ProfilePage from './pages/profilePage/ProfilePage';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ProfileUpdatePage from './pages/profileUpdatePage/ProfileUpdatePage';
import NewPostPage from './pages/newPostPage/NewPostPage';
import { listPageLoader, profilePageLoader, singlePageLoader } from './lib/loader';
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/list",
          element: <ListPage />,
          loader:listPageLoader
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader:singlePageLoader
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element:<Register/>
        }
      ]
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader:profilePageLoader
        },
        {
          path: "/profile/update",
          element:<ProfileUpdatePage/>
        },
         {
          path: "/add",
          element:<NewPostPage/>
        }
      ]
    }
  ]);
  return (

    <RouterProvider router={router}/>
  )
}

export default App