import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Navigation extends Component {
  render() {
    document.title = 'Contact Management Application'
    return (
      <div className = "container">

        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <img src="../logofinal.png" width="60" height="60" className="d-inline-block align-center"
          />
          <span class="navbar-brand mb-4 h1" style={{ fontFamily: "Georgia", fontSize:28, position: 'absolute', color: 'white', left: '48%', transform: 'translateX(-50%)'}}>
          CONTACT  MANAGEMENT  SYSTEM
          </span>
        </nav>

        <nav className="navbar navbar-expand-sm bg-light navbar-light">
          <div className="collpase navbar-collapse">
            <ul className="nav navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/new" className="nav-link">
                  <span class="navbar-brand mb-0 h2" style={{ fontFamily: "Georgia", color: 'black', left: '28%'}}>
                    New
                  </span>
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/" className="nav-link">
                  <span class="navbar-brand mb-0 h2" style={{ fontFamily: "Georgia", color: 'black', left: '48%'}}>
                    Existing Form
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}


export default Navigation;