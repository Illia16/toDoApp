import React, { Component } from 'react';
import firebase from './firebase';
import Error from './Error';
import "./styles/app.scss";

class Main extends Component {
    constructor() {
        super();
        this.state = {
            firebaseObj: firebase.database().ref(),
            list: [],
            howMuch: [],
            userInput: "",
            userInputQuantity: "",
            ready: false,
            errorPopUp: false,
        };
    };
    
    inputChange = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    // function that finds the number of LETTER IN THE LONGEST WORD FROM THE INPUT
    longestWord = (input) => {
        let arr = input.split(" ");
        let longestWord = 0;
        
        for (let i=0; i<arr.length; i++) {
            if (arr[i].length > longestWord) {
            longestWord = arr[i].length;
            };
        };
        return longestWord;
    };

    
    addItem = (e) => {
        e.preventDefault();

        const longestWordItem = this.longestWord(this.state.userInput);
        const longestWordQuantity = this.longestWord(this.state.userInputQuantity);

        if (this.state.userInput === "" || longestWordItem > 30 || longestWordQuantity > 30) {
            this.setState({
                errorPopUp: true,
            })
        } else {       
            const itemToAdd = this.state.userInput;
            const itemToAddQuantity = this.state.userInputQuantity;

            const newListArray = []; 
            const newHowMuch = [];

            newListArray.push(itemToAdd);
            newHowMuch.push(itemToAddQuantity);
            
            this.state.firebaseObj.update({[newListArray]: newHowMuch});
            this.updateDOM();
        };
    };

    updateDOM = () => {
        this.state.firebaseObj.on('value', (snapshot) => {
            const data = snapshot.val();
            const newListArray = [];
            const newHowMuch = [];

            for (let propertyName in data) {
                newListArray.push(propertyName);
                newHowMuch.push(data[propertyName]);
            };

            this.setState({
                list: newListArray,
                howMuch: newHowMuch,
                ready: true,
                userInput: "",
                userInputQuantity: ""
            });
        });
    }

    // removing a certain list element
    deleteList = (listEl) => {
        this.state.firebaseObj.child(listEl).remove();
    };
    
    // emptying the whole list
    deleteAll = (e) => {
        e.preventDefault();
        this.setState({
            list: [],
            howMuch: []
        });
        this.state.firebaseObj.set(null);
    };

    // getting up-to-date data from database
    componentDidMount() {
        this.updateDOM();
    };

    closeErrorPopUp = () => {
        this.setState({
            errorPopUp: false,
        });
    };

    render() {
        const {changeLanguage, languages: {languageCurrent:{ addBtn, closeErrorMsg, errorMsg, h1, h2, item, itemPlaceholder, madeBy, quantity, quantityPlaceholder, removeAllBth, removeThisEl}} } = this.props;

        return (
            <main className="wrapper">
                <div className="languages">
                    <button onClick={changeLanguage} value='en' >EN</button>
                    <button onClick={changeLanguage} value='ru' >RU</button>
                    <button onClick={changeLanguage} value='cn' >CN</button>
                </div>

                <h1>{h1}</h1>

                {
                
                this.state.errorPopUp ?
                <Error
                error={errorMsg}
                closeWindowText={closeErrorMsg}
                closeWindow={this.closeErrorPopUp}
                />
                : null
                }

                <form action="">
                    <fieldset>
                        <div className="userInputSection">
                            <label htmlFor="itemInput">{item}</label>
                            <input onChange={this.inputChange} name="userInput" value={this.state.userInput} type="text" id="itemInput" placeholder={itemPlaceholder} ></input>

                            <label htmlFor="itemQuantity">{quantity}</label>
                            <input onChange={this.inputChange} name="userInputQuantity" value={this.state.userInputQuantity} type="text" id="itemQuantity" placeholder={quantityPlaceholder}></input>

                            <button onClick={this.addItem}>{addBtn}</button>
                        </div>
                    </fieldset>
                </form>

                <h2>{h2}</h2>
                <ul>
                {
                    this.state.list.map( (listItem, index) => {
                        const quantity = this.state.howMuch[index]

                        return (
                            <li key={`keyFor`+listItem} className="thingsToDo">
                                <p><span>{index + 1 + '.'}</span> {listItem}</p>
                                <p>{quantity}</p>
                                <button onClick={ () => this.deleteList(listItem)} className="closeWindow" aria-label={removeThisEl} title={removeThisEl}><i className="fas fa-times" aria-hidden="true"></i></button>
                            </li>
                        )
                    })
                }
                </ul>

                {
                this.state.ready 
                ? <div className="removeAll"><button onClick={this.deleteAll}>{removeAllBth}</button> </div> 
                : <div className="waitingClock"><img src={require("./assets/sandClock.png")} alt="waiting clock"/></div>
                }
            </main>
        );
    };
};

export default Main;