import Welcome from './components/Welcome';
import Home from './components/Home';
import ListContainer from './components/ListContainer';
import Login from './components/Login';
import Register from './components/Register';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App(props) {
  return (
    <Router>
        <Switch>
          {/* Welcome Page */}
          <Route exact path="/" component={Welcome}/>

          {/* Login Page */}
          <Route path="/Login" component={Login}/>

          {/* Register Page */}
          <Route path="/Register" component={Register}/>

          {/* Home Page */}
          <Route exact path="/Home" component={Home}/>

          {/* Single List Page */}
          <Route path="/List/:listId" component={ListContainer}/>
        </Switch>
    </Router>
  );
}

export default App;
