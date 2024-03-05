const router = require('express').Router()

//Middleware import
const isAuthenticatedMiddleware = require('../common/middlewares/IsAuthenticatedMiddleware')
const SchemaValidationMiddleware = require('../common/middlewares/SchemaValidationMiddleware')
const CheckPermissionMiddleware = require('../common/middlewares/CheckPermissionMiddleware')

//controller importt
const UserController = require('./controller/UserController')

//json schema import for payload verification
const updateUserPayload = require("../users/schema/updateUserPayload")
const changeRolePayload = require("../users/schema/changeRolePayload")

const {roles} = require('../config/config')


router.get('/',[isAuthenticatedMiddleware.check],UserController.getAllUser)

router.patch('/',
[isAuthenticatedMiddleware.check,SchemaValidationMiddleware.verify(updateUserPayload)],UserController.updateUser)

router.get("/all",[isAuthenticatedMiddleware.check,CheckPermissionMiddleware.has(roles.ADMIN)],UserController.getAllUser)

router.patch("/change-role/:userId",
[isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware.verify(changeRolePayload)],
     UserController.changeRole
     )

router.delete("/:userId",[isAuthenticatedMiddleware.check,CheckPermissionMiddleware.has(roles.ADMIN)],UserController.deleteUser)

module.exports = router