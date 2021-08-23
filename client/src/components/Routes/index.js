import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Posting from '../../pages/Posting';
import Navbar from '../Navbar';
import UserList from '../../pages/UserList';
import PostList from '../../pages/PostList';
import PrivateRoute from '../../Routing/PrivateRoute';
import Messenger from '../../pages/messenger/Messenger';

const index = () => {
  
  return (
    <Router>
      <Navbar />
      <Switch>
      <Route path="/" exact component={Home} />



        <Route path="/profil" exact component={Profil} />
        <Route path="/posting" exact component={Posting} />
        <Route path="/Messenger" exact component={Messenger} />
        <PrivateRoute path="/UserList" exact component={UserList} />
        <PrivateRoute path="/PostList" exact component={PostList} />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default index;