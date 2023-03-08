import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router';
import { LOGIN_USER_TOKEN } from './axios';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { PublicRoute } from './components/routes/PublicRoute';
import Home from './containers/Home';
import Login from './containers/Login';
import Admins from './containers/Admins/List'
import Add from './containers/Admins/AddUpdate'
import { checkLoginAction } from './reducks/users/actions';
import { fetchUserFromLocalStorage } from './reducks/users/operations';
import AuthRequest from './requests/auth-request';
import Task from './containers/Tasks/List'
import TaskAddUpdate from './containers/Tasks/AddUpdate'
import Leave from './containers/Leaves/List'
import LeaveAddUpdate from './containers/Leaves/AddUpdate'
import Target from './containers/Targets/List'
import TargetAddUpdate from './containers/Targets/AddUpdate'
import Update from './containers/Profile/Update';
import Communication from './containers/Communication/List';
import CommunicationAddUpdate from './containers/Communication/AddUpdate'
// import { Table } from '@mui/material';

const Router = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem(LOGIN_USER_TOKEN);

    useEffect(() => {
        dispatch(fetchUserFromLocalStorage());
        if (token) {
            AuthRequest.checkLogin().then(response => {
                dispatch(checkLoginAction(response));
            });
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Switch>
            <PublicRoute token={token} component={Login} path={'/login'} exact />
            <PrivateRoute token={token} component={Home} path={'/'} exact />
            <PrivateRoute token={token} component={Admins} path={'/admins'} exact />
            <PrivateRoute token={token} component={Add} path={'/admins/:action/:id?'} exact />
            <PrivateRoute token={token} component={Update} path={'/profile/:id'} exact />
            <PrivateRoute token={token} component={Task} path={'/task'} exact />
            <PrivateRoute token={token} component={TaskAddUpdate} path={'/task/:action/:id?'} exact />
            <PrivateRoute token={token} component={Leave} path={'/leave'} exact />
            <PrivateRoute token={token} component={LeaveAddUpdate} path={'/leave/:action/:id?'} exact />
            <PrivateRoute token={token} component={Target} path={'/target'} exact />
            <PrivateRoute token={token} component={TargetAddUpdate} path={'/target/:action/:id?'} exact />
            <PrivateRoute token={token} component={Communication} path={'/communication'} exact />
            <PrivateRoute token={token} component={CommunicationAddUpdate} path={'/communication/:action/:id'} exact />
        </Switch>
    );
};
export default Router;
