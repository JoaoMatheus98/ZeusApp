import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Home from '../components/home/Home';
import CompraCrud from '../components/compra/CompraCrud';

export default props =>
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/compras' component={CompraCrud}/>
        <Redirect from='*' to='/'/>
    </Switch>