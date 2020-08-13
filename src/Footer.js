import React, { Component } from 'react';
import './App.scss';

class Footer extends Component {
    render() {
        return (
        <footer>
            <p>2020 Illia Nikitin</p> 
            <a href="https://github.com/Illia16" className="github" target="_blank"><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/illia-nikitin-a4a637122/" className="linkedin" target="_blank"><i className="fab fa-linkedin"></i></a>
        </footer>
        )
    }
}
export default Footer;