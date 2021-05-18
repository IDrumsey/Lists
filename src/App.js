import Welcome from './components/Welcome';
import Home from './components/Home';
import ListContainer from './components/ListContainer';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App(props) {
  return (
    <Router>
        <Switch>
          {/* Welcome Page */}
          <Route exact path="/" component={Welcome}/>

          {/* Home Page */}
          <Route exact path="/Home" component={Home}/>

          {/* Single List Page */}
          <Route path="/List" component={ListContainer}/>
        </Switch>
    </Router>
  );
}

export default App;
