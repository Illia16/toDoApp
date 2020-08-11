import React, { Component } from 'react';
import firebase from './firebase';
import './App.css';



class App extends Component {
    constructor() {
        super();
        this.state = {
        list: [],
        howMuch: [],
        firebaseObj: firebase.database().ref(),
        userInput: []
        }
    }

    inputChange = (e) => {
        e.preventDefault();
        const copy = this.state.userInput;
        copy[0] = e.target.value;

        this.setState({
            userInput: copy, 
        })

        // Have to input twice!!! WAS BEFORE
        // this.setState(({val}), () => {
        //     this.state.userInput[0] = val
        //     console.log(this.state.userInput);
        // })
    }

    // doesn't work properly
    // inputChange = (e) => {
    //     e.preventDefault();

    //     this.setState({userInput: [...this.state.userInput, e.target.value]}, () => {
    //         console.log(this.state.userInput);
    //     })
    // }

    inputQChange = (e) => {
        e.preventDefault();
        const copy = this.state.userInput;
        copy[1] = e.target.value;

        this.setState({
            userInput: copy, 
        })

    //WAS BEFORE
        // e.preventDefault();
        // const val = e.target.value;

        // this.setState(({val}), () => {
        //     this.state.userInput[1] = val;
        //     console.log(this.state.userInput);
        // })
    }
    
    addItem = (e) => {
        e.preventDefault();

        const itemToAdd = this.state.userInput[0];
        const itemToAddQuantity = this.state.userInput[1];
        console.log(itemToAdd, itemToAddQuantity);
        
        const newListArray = []; 
        const newHowMuch = [];
        newListArray.push(itemToAdd);
        newHowMuch.push(itemToAddQuantity);

        this.setState({
            list: newListArray,
            howMuch: newHowMuch,
            userInput: ["", ""]
        })

        this.state.firebaseObj.update({[newListArray]: newHowMuch});
    }

    // removing a certain list element
    deleteList = (listEl) => {    
        this.state.firebaseObj.child(listEl).remove();
    }

    // emptying the whole list
    deleteAll = (e) => {
        e.preventDefault();

        this.setState({
            list: [],
            howMuch: []
        })

        this.state.firebaseObj.set(null);
    }

    // getting up-to-date data from database
    componentDidMount() {

    this.state.firebaseObj.on('value', (snapshot) => {
        console.log(snapshot.val());

        const data = snapshot.val();
        const newListArray = [];
        const newHowMuch = [];

        for (let propertyName in data) {
            newListArray.push(propertyName);
            newHowMuch.push(data[propertyName]);
        }

        console.log(newListArray);

        this.setState({
            list: newListArray,
            howMuch: newHowMuch
        })

        })
    }



    render() {
        return (
            <div>
                <form action="">
                    <fieldset>
                        <label htmlFor="itemInput">Input field</label>
                        <input onChange={this.inputChange} value={this.state.userInput[0]} type="text" id="itemInput" placeholder="item"></input>

                        <label htmlFor="itemQuantity">Input field</label>
                        <input onChange={this.inputQChange} value={this.state.userInput[1]} type="text" id="itemQuantity" placeholder="quantity"></input>

                        <button onClick={this.addItem}>Add</button>
                        <button onClick={this.deleteAll}>Remove All</button>
                    </fieldset>
                </form>

                <p>{this.state.visitorCount}</p>

                <ul>
                {
                    this.state.list.map( (listItem, index) => {
                        const quantity = this.state.howMuch[index]
                        
                        return (
                            <li>
                                {listItem}
                                <span>{quantity}</span>
                                <button onClick={ () => this.deleteList(listItem)} >Remove</button>
                            </li>
                        )
                    })
                }
                </ul>
            </div>
        );
    }
}

export default App;
