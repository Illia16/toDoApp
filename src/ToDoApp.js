import React, { Component } from 'react';
import Main from "./Main";
import Footer from "./Footer";
import "./styles/app.scss";

class ToDoApp extends Component {
  constructor() {
    super()
    this.state = {
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
            removeAllBth: "REMOVE ALL ITEMS",
            errorMsg: {
              noText: "Nothing's selected. Please, input the item you want",
              tooLongWord: "Input is too long",
            },
            closeErrorMsg: "CLOSE",
            madeBy: 'Made by',
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
            removeAllBth: "Удалить все элементы",
            errorMsg: "Ничего не выбрано",
            errorMsg: {
              noText: "Ничего не выбрано. Пожалуйста, напишите то, что вы хотите добавить",
              tooLongWord: "Текст слишком длинны",
            },
            closeErrorMsg: "Закрыть",
            madeBy: "Разработал",
            
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
            removeAllBth: "清除所有物品",
            errorMsg: "未選取任何物品",
            errorMsg: {
              noText: "未選取任何物品。請點選您想要的物品",
              tooLongWord: "選取過多",
            },
            closeErrorMsg: "關閉",
            madeBy: "製作者",
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
        removeAllBth: "REMOVE ALL ITEMS",
        errorMsg: {
          noText: "Nothing's selected. Please, input the item you want",
          tooLongWord: "Input is too long",
        },
        closeErrorMsg: "CLOSE",
        madeBy: 'Made by',
      },
    }
    
    this.changeLang = this.changeLang.bind(this);
  }

  changeLang = (val) => {
    val.preventDefault();
    this.setState({
        languageCurrent: this.state.languageInterface[val.target.value]
    });
  };

  render() {
    return (
      <div className="App">
        <Main languages={this.state} changeLanguage={this.changeLang} />
        <Footer languages={this.state} />
      </div>
    );
  };
};

export default ToDoApp;