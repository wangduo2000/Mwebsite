import Router from './utils/router_user'
import loginController from './controllers/G_login';

loginController.render()

const router = new Router()
router.init()
router.route('#resign', resignController.render)