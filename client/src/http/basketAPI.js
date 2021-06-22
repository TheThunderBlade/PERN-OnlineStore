import {$authHost} from "./index";

export const createBasketItem = async (deviceId, basketId) => {
    try {
        const {data} = await $authHost.post('/api/basket', {deviceId, basketId})
        return data
    } catch (e) {
        return e.response.data
    }
}

export const fetchAllBasketItem = async (basketId) => {
    try {
        const {data} = await $authHost.get('/api/basket/fetch/' + basketId)
        return data
    } catch (e) {
        console.log(e)
    }
}

export const removeBasketItem = async (deviceId, basketId) => {
    try {
        const {data} = await $authHost.delete('/api/basket/' + basketId + '/' + deviceId)
        return data
    } catch (e) {
        console.log(e)
    }
}

export const shoppingCartPayment = async (basketId) => {
    try {
        const {data} = await $authHost.delete('/api/basket/' + basketId)
        return data
    } catch (e) {
        console.log(e)
    }
}

export const getBasketId = async (id) => {
    try {
        const {data} = await $authHost.get('/api/basket/' + id)
        return data
    } catch (e) {
        return e.response.data
    }
}