import React, { Component } from 'react';
import './App.css';
import Navbar from '../components/navigation/navbar.js'
import MainPage from './Main'
import Stacks from '../practice/stack'
import { Link, withRouter, Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
        <Route exact path ='/' render = { () => <MainPage /> }></Route>
        <Route exact path ='/stacks' render = { () => <Stacks data="1" /> }></Route>

        </Switch>

      </div>
    );
  }
}

export default App;
