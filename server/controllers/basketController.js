const {Device, Basket, BasketDevice} = require('../models/models')
const ApiError = require('../error/ApiError');

class BasketDeviceController {
    async createBasketItem(req, res, next) {
        try {
            const {deviceId, basketId} = req.body

            await BasketDevice.create({deviceId, basketId})

            return res.json({message: 'Продукт добавлен в корзину!'})
        } catch (e) {
            return next(ApiError.badRequest({message: e}))
        }
    }

    async fetchBasketItem(req, res, next) {
        try {
            const {id} = req.params

            const basketItems = await BasketDevice.findAll({where: {basketId: id}})
            const basketItemsDeviceId = basketItems.map(item => item.deviceId)

            const basketDevices = []

            for (let i = 0; i < basketItemsDeviceId.length; i++) {
                const device = await Device.findOne({where: {id: basketItemsDeviceId[i]}})
                basketDevices.push(device.dataValues)
            }

            return res.json(basketDevices)
        } catch (e) {
            return next(ApiError.badRequest({message: e}))
        }
    }

    async removeBasketItem(req, res, next) {
        try {
            const {deviceId, basketId} = req.params

            const candidate = await BasketDevice.findOne({where: {deviceId, basketId}})
            if (candidate){
                await candidate.destroy()
                return res.json({message: 'Объект удалён'})
            } else {
                return next(ApiError.badRequest({message: 'Удаляёмый объект не найден!'}))
            }
        } catch (e) {
            return next(ApiError.badRequest({message: e}))
        }
    }

    async removeAllBasketItem(req, res, next) {
        try {
            const {basketId} = req.params

            console.log(basketId)

            const candidates = await BasketDevice.findAll({where: {basketId}})
            if (candidates){
                candidates.map(item => {
                    item.destroy()
                })

                return res.json({message: 'Оплата прошла успешно'})
            } else {
                return next(ApiError.badRequest({message: 'Удаляёмый объект не найден!'}))
            }
        } catch (e) {
            return next(ApiError.badRequest({message: e}))
        }
    }

    async getBasketId(req, res, next) {
        try {
            const {id} = req.params

            const basket = await Basket.findOne({where: {userId: id}})

            return res.json(basket.dataValues.id)
        } catch (e) {
            return next(ApiError.badRequest({message: e}))
        }
    }
}

module.exports = new BasketDeviceController()