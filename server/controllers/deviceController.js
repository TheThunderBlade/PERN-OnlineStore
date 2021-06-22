const uuid = require('uuid')
const path = require('path');
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError');
const {Rating} = require("../models/models");

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files

            // if (img === null) {
            //     console.log('zxc')
            //     next(ApiError.badRequest({message: 'Выберите картинку!'}))
            // }

            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({order: ['id'], limit, offset})
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset})
        }
        return res.json(devices)
    }

    async getOne(req, res) {
        try {
            const {id} = req.params

            const device = await Device.findOne(
                {
                    where: {id},
                    include: [{model: DeviceInfo, as: 'info'}]
                },
            )
            return res.json(device)
        } catch (e) {
            console.log(e)
        }
    }

    async calculateMark(req, res) {
        try {
            const {id} = req.params
            const marksData = await Rating.findAll({where: {deviceId: id}})
            const marks = marksData.map(mark => mark.dataValues.rate)
            let resultMark = 0;

            for (let i = 0; i < marks.length; i++) {
                resultMark += marks[i]
            }
            resultMark = resultMark / marks.length

            Device.update({rating: resultMark}, {where: {id}})
                .then(() => {
                        console.log('Рейтинг обновлён')
                })

        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new DeviceController()
