import React, { Component } from 'react';
import firebase from './firebase';
// import Languages from './Languages';
import './App.scss';

class App extends Component {
    constructor() {
        super();
        this.state = {
            firebaseObj: firebase.database().ref(),
            list: [],
            howMuch: [],
            userInput: "",
            userInputQuantity: "",
            ready: false,
            languageInterface: {
                en: {
                    h1: "To do list",
                    item: "Item to buy/to do",
                    itemPlaceholder: "e.g. buy avocado",
                    quantity: "How much/many?",
                    quantityPlaceholder: "e.g. 3 pc, 2 kg",
                    addBtn: "ADD",
                    h2: "List of current things",
                    removeThisEl: "Remove only this item",
                    removeAllBth: "REMOVE ALL ITEMS"
                },
                ru: {
                    h1: "Cписок дел",
                    item: "Что сделать/купить",
                    itemPlaceholder: "напр. купить авокадо",
                    quantity: "Сколько?",
                    quantityPlaceholder: "напр. 3 шт., 2 кг",
                    addBtn: "Добавить",
                    h2: "Cписок текущих дел",
                    removeThisEl: "удалить только этот элемент",
                    removeAllBth: "Удалить все элементы"
                },
                cn: {
                    h1: "任務清單",
                    item: "需要買/做的物品",
                    itemPlaceholder: "例如：買酪梨",
                    quantity: "數量多少",
                    quantityPlaceholder: "例如：三袋、兩公斤",
                    addBtn: "添加",
                    h2: "目前的清單",
                    removeThisEl: "只移除這項物品",
                    removeAllBth: "清除所有物品"
                }
            },
            languageCurrent: {
                h1: "To do list",
                item: "Item to buy/to do",
                itemPlaceholder: "e.g. buy avocado",
                quantity: "How much/many?",
                quantityPlaceholder: "e.g. 3 pc, 2 kg",
                addBtn: "ADD",
                h2: "List of current things",
                removeThisEl: "Remove only this item",
                removeAllBth: "REMOVE ALL ITEMS"
                },
        }
    }
    
    inputChange = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    
    addItem = (e) => {
        e.preventDefault();

        
        if (this.state.userInput === "") {
            alert('Nothing\'s selected')
        } else {       
            const itemToAdd = this.state.userInput;
            const itemToAddQuantity = this.state.userInputQuantity;
            
            const newListArray = []; 
            const newHowMuch = [];
            newListArray.push(itemToAdd);
            newHowMuch.push(itemToAddQuantity);

            this.setState({
                list: newListArray,
                howMuch: newHowMuch,
                userInput: "",
                userInputQuantity: ""
            })
            
            this.state.firebaseObj.update({[newListArray]: newHowMuch});
        }
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
                const data = snapshot.val();
                const newListArray = [];
                const newHowMuch = [];

                for (let propertyName in data) {
                    newListArray.push(propertyName);
                    newHowMuch.push(data[propertyName]);
                }

                this.setState({
                    list: newListArray,
                    howMuch: newHowMuch,
                    ready: true
                });
            })
    }

    changeLang = (val) => {
        val.preventDefault();

        this.setState({
            languageCurrent: this.state.languageInterface[val.target.value]
        })
    }
    render() {
        return (
            <main className="wrapper">
                <div className="languages">
                    <button onClick={this.changeLang} value='en' >EN</button>
                    <button onClick={this.changeLang} value='ru' >RU</button>
                    <button onClick={this.changeLang} value='cn' >CN</button>
                </div>

                <h1>{this.state.languageCurrent.h1}</h1>

                <form action="">
                    <fieldset>
                        <label htmlFor="itemInput">{this.state.languageCurrent.item}</label>
                        <input onChange={this.inputChange} name="userInput" value={this.state.userInput} type="text" id="itemInput" placeholder={this.state.languageCurrent.itemPlaceholder}></input>

                        <label htmlFor="itemQuantity">{this.state.languageCurrent.quantity}</label>
                        <input onChange={this.inputChange} name="userInputQuantity" value={this.state.userInputQuantity} type="text" id="itemQuantity" placeholder={this.state.languageCurrent.quantityPlaceholder}></input>

                        <button onClick={this.addItem}>{this.state.languageCurrent.addBtn}</button>
                    </fieldset>
                </form>

                <h2>{this.state.languageCurrent.h2}</h2>
                <ul>
                {
                    this.state.list.map( (listItem, index) => {
                        const quantity = this.state.howMuch[index]

                        return (
                            <li key={`keyFor`+listItem} className="thingsToDo">
                                <p><span>{index + 1 + '.'}</span> {listItem}</p>
                                <p>{quantity}</p>
                                <button onClick={ () => this.deleteList(listItem)} className="closeWindow" aria-label={this.state.languageCurrent.removeThisEl} ><i className="fas fa-times"></i></button>
                            </li>
                        )
                    })
                }
                </ul>

                {
                this.state.ready 
                ? <div className="removeAll"><button onClick={this.deleteAll}>{this.state.languageCurrent.removeAllBth}</button> </div> 
                : <div className="waitingClock"><img src={require("./assets/sandClock.png")} alt="waiting clock"/></div>
                }
            </main>
        );
    }
}

export default App;