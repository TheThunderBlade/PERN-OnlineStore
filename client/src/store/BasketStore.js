import {makeAutoObservable} from "mobx";

export default class BasketStore {
    constructor() {
        this._basketId = null

        makeAutoObservable(this)
    }

    setBasketId(basketId) {
        this._basketId = basketId
    }

    get basketId() {
        return this._basketId
    }
}
