import Router from './utils/router_user'
import loginController from './controllers/G_login';
import resignController from './controllers/G_resign';

loginController.render()
const router = new Router()
router.init()
router.route('#login', loginController.render)
router.route('#resign', resignController.render)





   
        
    

