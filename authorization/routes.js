const {Router} = require('express')
const router = Router()

//controller import
const AuthController = require('./controllers/controller')

//middleware imports
const SchemaValidationMiddleware = require('../common/middlewares/SchemaValidationMiddleware')

//json schema import for payload
const registerPayload = require('./schema/registerPayload')
const loginPayload = require('./schema/loginPayload')

router.get('/',AuthController.homePage)
router.get('/login',AuthController.login)
router.post('/login',[SchemaValidationMiddleware.verify(loginPayload)],AuthController.login)
router.get('/signup',
[SchemaValidationMiddleware.verify(registerPayload)],
AuthController.register)



module.exports = router;