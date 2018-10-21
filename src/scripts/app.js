import Router from './utils/router'
import homeController from './controllers/home'
import positionController from './controllers/position'
import moreController from './controllers/more'
import inquireController from './controllers/inquire'
import sendexpressController from './controllers/sendexpress'
import profileController from './controllers/profile'
import senddetailController from './controllers/senddetail'


homeController.render()

const router = new Router()
router.init()
router.route('#position', positionController.render)
router.route('#more', moreController.render)
router.route('#profile', profileController.render)
router.route('#inquire', inquireController.render)
router.route('#sendexpress', sendexpressController.render)
router.route("#detail",senddetailController.render)