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
            longest: {
                userInput: 0,
                userInputQuantity: 0,
            },
            amountWords: {
                userInput: 0,
                userInputQuantity: 0,
            },
            loggedIn: false,
            user: {
                id: 'User',
                displayedName: null,
            },
        };
    };

    logIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const auth = firebase.auth();

        auth.signInWithPopup(provider).then( (result) => {   
            this.setState({
                loggedIn: true,
                user: {
                    id: result.user.uid,
                    displayedName: result.user.displayName,
                },
            });
            this.updateDOM();
        });
    };

    logOut = () => {
        const auth = firebase.auth();

        auth.signOut().then( () => {
            this.setState({
                loggedIn: false,
                user: {
                    id: 'User',
                    displayedName: null,
                },
            });
            this.updateDOM();
        });
    };
    
    inputChange = (e) => {
        e.preventDefault();
        this.checkingInput(e.target);

        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    // function that finds a NUMBER of LETTERS IN THE LONGEST WORD FROM THE INPUT(30)
    // Also getting AMOUNT of WORDS in the input to check that our input isn't more than CERTAIN AMOUNT OF WORDS(20)
    checkingInput = (input) => {
        const value = input.value;

        if (!value) {
            this.setState({
                longest:  {
                    ...this.state.longest,
                    [input.name]: 0,
                },
                amountWords: {
                    ...this.state.amountWords,
                    [input.name]: 0,
                },
            })
            return
        } else {
            let arr = value.split(" ");

            //making sure SPACE ISN'T INCLUDED IN THE ARRAY
            const arrMod = arr.filter(el => el);
            
            // getting the number of letters in the longest word out of all words from the input
            let longestWord = 0;
            for (let i=0; i<arr.length; i++) {
                if (arr[i].length > longestWord) {
                    longestWord = arr[i].length;
                };
            };

            this.setState({
                // longest: longestWord,
                // amountWords: arrMod.length,
                longest:  {
                    ...this.state.longest,
                    [input.name]: longestWord,
                },
                amountWords: {
                    ...this.state.amountWords,
                    [input.name]: arrMod.length,
                },
            })
        }
    };
    
    addItem = (e) => {
        e.preventDefault();

        // checking if user inputs are valid:
            // -NOT EMPTY, 
            // -DON'T HAVE MORE THAN 20 WORDS, 
            // -LONGEST WORD ISN'T MORE THAN 30 LETTERS IN LENGTH
        if (this.state.userInput === "" || this.state.longest.userInput > 30 || this.state.longest.userInputQuantity > 30
        || this.state.amountWords.userInput > 20 || this.state.amountWords.userInputQuantity > 20 ) {
            this.setState({
                errorPopUp: true,
            })
        } else {
            const itemToAdd = this.state.userInput;
            const itemToAddQuantity = this.state.userInputQuantity;
            this.state.firebaseObj.child(this.state.user.id).update({ [itemToAdd]: itemToAddQuantity} );

            this.updateDOM();
        };
    };

    updateDOM = () => {
        // const dbRef = firebase.database().ref(this.state.user.id);
        // console.log(dbRef, dbRef.child);
        
        this.state.firebaseObj.on('value', (snapshot) => {
                const data = snapshot.val()[this.state.user.id];
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
                    userInputQuantity: "",
                    longest: {
                        userInput: 0,
                        userInputQuantity: 0,
                    },
                    amountWords: {
                        userInput: 0,
                        userInputQuantity: 0,
                    },
                });
        });
    }

    // removing a certain list element
    deleteList = (listEl) => {
        this.state.firebaseObj.child(this.state.user.id).child(listEl).remove();
    };
    
    // emptying the whole list
    deleteAll = () => {
        this.state.firebaseObj.child(this.state.user.id).remove();
    };

    // getting up-to-date data from database
    componentDidMount() {
        this.updateDOM();

        const auth = firebase.auth();

        auth.onAuthStateChanged( (user) => {
            if (!user) {
                return
            } else {
                this.setState({
                    loggedIn: true,
                    user: {
                        id: user.uid,
                        displayedName: user.displayName,
                    },
                });
            }
        });
    };

    closeErrorPopUp = () => {
        this.setState({
            errorPopUp: false,
        });
    };

    render() {
        const {changeLanguage, languages: {languageCurrent:{hello, user, wouldYouSignIn, languageInterface, logIn, logOut, googleLogInAria, addBtn, closeErrorMsg, errorMsg, h1, h2, item, itemPlaceholder, quantity, quantityPlaceholder, removeAllBth, removeThisEl}} } = this.props;

        return (
            <>
                <div className="herobg">
                    <h1>{h1}</h1>
                    {
                        this.state.ready &&
                        <div className="signInOut">
                            {
                                this.state.user.displayedName ?
                                <p>{hello}, {this.state.user.displayedName.split(' ')[0]}</p> :
                                <>
                                    <p>{hello}, {user}</p>
                                    <p>{wouldYouSignIn}</p>
                                </>
                            }

                            {
                                !this.state.loggedIn
                                ? 
                                <button onClick={this.logIn} aria-label={googleLogInAria}><i className="fab fa-google" aria-hidden="true"></i> {logIn}</button>
                                :
                                <button onClick={this.logOut}><i className="fab fa-google" aria-hidden="true"></i> {logOut}</button>
                            }

                            <p>{languageInterface}</p>
                            <div className="languages">
                                <button onClick={changeLanguage} value='en' >EN</button>
                                <button onClick={changeLanguage} value='ru' >RU</button>
                                <button onClick={changeLanguage} value='cn' >CN</button>
                            </div>
                        </div>
                    }
                </div>

                <main className="wrapper">
                    {
                    
                    this.state.errorPopUp ?
                    <Error
                    states={this.state}
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
                    this.state.ready && this.state.list.length
                    ? <div className="removeAll"><button onClick={this.deleteAll}>{removeAllBth}</button> </div> 
                    : !this.state.ready ? <div className="waitingClock"><img src={require("./assets/sandClock.png")} alt="waiting clock"/></div>
                    : null
                    }
                </main>
            </>
        );
    };
};

export default Main;