import React from 'react';
import "./styles/app.scss";

const Error = ( props ) => {
    const { error:{noText, tooLongWord}, closeWindow, closeWindowText } = props;

    return(
        <div className="popupBack">
            <div className="popup">
                {/* showing the right type of error */}
                {
                (!props.states.userInput) ? <p>{noText}</p> : <p>{tooLongWord}</p>
                }
                <button onClick={closeWindow} >{closeWindowText}</button>
            </div>
        </div>
    );
};

export default Error;