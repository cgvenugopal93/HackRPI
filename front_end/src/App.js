
import './App.css';
import {Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'

import AboutPage from './pages/about'
import Signup from './components/Signup'
function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={LoginPage} exact></Route>
        <Route path="/signup" component={Signup} exact></Route>
        <Route path="/home" component={HomePage}></Route>
        <Route path="/about" component={AboutPage}></Route>
      </Switch>
      
    </div>
  );
}

export default App;
