import React from 'react';
import "./styles/app.scss";

const Footer = ( props ) => {
    const {languages: {languageCurrent:{ madeBy }} } = props;
    return (
        <footer>
            <p>2020 {madeBy} Illia Nikitin</p> 
            <a href="https://github.com/Illia16" className="github" aria-label="github icon for Illia's profile"><i className="fab fa-github" aria-hidden="true"></i></a>
            <a href="https://www.linkedin.com/in/illia-nikitin-a4a637122/" className="linkedin" aria-label="linkedin icon for Illia's profile"><i className="fab fa-linkedin" aria-hidden="true"></i></a>
        </footer>
    );
};
export default Footer;