import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navigation from "./components/navigation.component";
import ExistingList from "./components/existing-list.component";
import Newcontact from "./components/new.component";


function App() {
  return (
    <Router>
      <div className="container">
      <Navigation />
      <br/>
        <Route path="/" exact component = { () =>
            <ExistingList/>
          }
          />
          <Route path = "/new" exact component = { (props) =>
            <Newcontact {...props}/> 
          } />
          <Route path = "/new/:id" exact component = { (props) =>
            <Newcontact {...props}/>
          } />
          <Route path = "/new/open/:id" component = { (props) =>
            <Newcontact disable =  'true' {...props}/>
          } />
      </div>
    </Router>
  );
}

export default App;
