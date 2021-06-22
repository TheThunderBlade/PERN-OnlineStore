const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.post('/', basketController.createBasketItem)
router.get('/:id', basketController.getBasketId)
router.get('/fetch/:id', basketController.fetchBasketItem)
router.delete('/:basketId/:deviceId', basketController.removeBasketItem)
router.delete('/:basketId', basketController.removeAllBasketItem)

module.exports = router