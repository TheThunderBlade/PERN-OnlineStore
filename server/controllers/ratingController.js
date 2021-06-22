const {Rating} = require('../models/models')
const ApiError = require('../error/ApiError');

class RatingController {
    async create(req, res, next) {
        try {
            const {userId, deviceId, rate} = req.body

            const candidate = await Rating.findOne({where: {userId, deviceId}})

            if (candidate !== null) {
                return next(ApiError.badRequest('Вы уже оставляли оценку этому товару!'))
            }

            const rating = await Rating.create({userId, deviceId, rate})

            return res.status(200).json({message: 'Оценка добавлена'})
        } catch (e) {
            return next(ApiError.badRequest({message: e}))
        }

    }
}

module.exports = new RatingController()