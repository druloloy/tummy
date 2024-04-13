import React from 'react'
import {
    createBrowserRouter
  } from "react-router-dom";
import App from '../App';
import NotFound from '@pages/NotFound';
import Registration from '@pages/Registration/Index';
import RegisterCredentials from '@pages/Registration/RegisterCredentials';
import Login from '@pages/Login';
import RegisterPersonalInformation from '@pages/Registration/RegisterPersonalInformation';
import EmailVerification from '@pages/EmailVerification';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Home from '@pages/Main/Home';
import NewRecipe from '@pages/Main/NewRecipe';

const MainRouter = createBrowserRouter([
    {
        path: '/',
        element: <PublicRoute><App /></PublicRoute>,
        children: [
            {
                path: '',
                element: <PublicRoute><Home /></PublicRoute>
            },
            {
                path: 'new',
                element: <PrivateRoute><NewRecipe /></PrivateRoute>
            },
            {
                path: 'signup',
                element: <Registration />,
                children: [
                    {
                        path: '',
                        Component: RegisterPersonalInformation
                    },
                    {
                        path: 'create-account',
                        Component: RegisterCredentials
                    }
                ]
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'verify',
                Component: EmailVerification
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export default MainRouter