import React from 'react';
import "./styles/app.scss";

const Error = ( props ) => {
    const {error, closeWindow, closeWindowText} = props;

    return(
        <div className="popupBack">
            <div className="popup">
                <p>{error}</p>
                <button onClick={closeWindow} >{closeWindowText}</button>
            </div>
        </div>
    );
};

export default Error;