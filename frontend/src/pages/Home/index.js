import React from 'react';

import M from 'materialize-css/dist/js/materialize.min.js';
import './style.css';

import logo from '../../assets/systock_logo.png';

export default function Home() {

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, {});
    });

    return(
        <div className="profile-container">
            <nav>
                <div className="nav-wrapper">
                    <a href=""><i data-target="slide-out" className="material-icons sidenav-trigger">menu</i></a>
                    <img src={logo} className="navbar-logo"/>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="sass.html"><i className="material-icons">search</i></a></li>
                        <li><a href="collapsible.html"><i className="material-icons">refresh</i></a></li>
                    </ul>
                </div>
            </nav>

            <ul id="slide-out" className="sidenav">
                <li>
                    <div className="user-view">
                        <div className="background">
                            
                        </div>
                        <a href="#user"><img className="circle" src="images/yuna.jpg"/></a>
                        <a href="#name"><span className="white-text name">John Doe</span></a>
                        <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a>
                    </div>
                </li>
                <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
                <li><a href="#!">Second Link</a></li>
                <li><div className="divider"></div></li>
                <li><a className="subheader">Subheader</a></li>
                <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
            </ul>
        </div>
    );
}