import Welcome from './components/Welcome';
import Home from './components/Home';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App(props) {
  return (
    <Router>
        <Switch>
          {/* Welcome Page */}
          <Route path="/" component={Welcome}/>

          {/* Home Page */}
          <Route path="/Home" component={Home}/>
        </Switch>
    </Router>
  );
}

export default App;
