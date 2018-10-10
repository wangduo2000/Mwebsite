import Router from './utils/router'
import homeController from './controllers/home'
import positionController from './controllers/position'
import searchController from './controllers/shopcart'
import profileController from './controllers/profile'
// shaojun

homeController.render()

const router = new Router()
router.init()
router.route('#position', positionController.render)
router.route('#shopcart', searchController.render)
router.route('#profile', profileController.render)