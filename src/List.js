import React, { Component } from 'react';
import firebase from './firebase';
import './App.css';


class App extends Component {
    constructor() {
        super();
        this.state = {
        list: [],
        howMuch: [],
        visitorCount: 0
        }
    }
    
    addItem = () => {
        this.setState({
            visitorCount: this.state.visitorCount + 1,
        })

        const itemToAdd = document.getElementById('itemInput').value;
        const itemToAddQuantity = document.getElementById('itemQuantity').value;
        console.log(itemToAdd, itemToAddQuantity);
        
        const newListArray = []; 
        const newHowMuch = [];
        newListArray.push(itemToAdd);
        newHowMuch.push(itemToAddQuantity);

        this.setState({
            list: newListArray,
            howMuch: newHowMuch
        })

        firebase.database().ref().update({[newListArray]: newHowMuch});
    }

    removeAll = () => {
        this.setState({
            list: [],
            howMuch: []
        })

        firebase.database().ref().set(null);
    }

    onSubmit = (e) => {
        e.preventDefault();
    }

    componentDidMount() {
    const dbRef = firebase.database().ref();

        dbRef.on('value', (snapshot) => {
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
                <form action="" onSubmit={this.onSubmit}>
                    <fieldset>
                        <label htmlFor="itemInput">Input field</label>
                        <input type="text" id="itemInput" placeholder="item"></input>
                        <input type="text" id="itemQuantity" placeholder="quantity"></input>
                        <button onClick={this.addItem}>Add</button>
                        <button onClick={this.removeAll}>Remove All</button>
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
