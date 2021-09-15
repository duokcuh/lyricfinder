import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index';
import { Provider } from './context';
import { Component } from 'react';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <>
            <Navbar/>
            <div className="container">
              <Switch>
                <Route exact path="/" component={Index} />
              </Switch>
            </div>
          </>
        </Router>
      </Provider>
    );
  }
}

export default App;
