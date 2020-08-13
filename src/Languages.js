import React, { Component } from 'react';

class Languages extends Component {
    constructor() {
        super();
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
                    removeThisEl: "仅删除此项目",
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
}

export default Languages;