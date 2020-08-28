import React from 'react';
import "./styles/app.scss";

const Error = ( props ) => {
    const {states:{longest}, error:{noText, tooLongWord}, closeWindow, closeWindowText} = props;
    
    return(
        <div className="popupBack">
            <div className="popup">
                {
                longest === 0 ? <p>{noText}</p> : <p>{tooLongWord}</p>
                }
                <button onClick={closeWindow} >{closeWindowText}</button>
            </div>
        </div>
    );
};

export default Error;