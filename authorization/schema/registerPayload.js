const {roles} = require('../../config/config')


module.exports = {
    type:'object',
    properties:{
        username:{
            type:'string'
            
        },
        email:{
            type:'string',
            pattern:"^[^\\s@]+@[^\\s@]+\\.[\\s@]"
        },
        age:{
            type:'integer',
        },
        password:{
            type:'string'
        },
        firstName:{
            type:'string'
        },
        lastName:{
            type:'string'
        },
        role:{
            type:'string',
            enum: Object.values(roles)
        }
    },
    required:[
    'username',
    'password',
    'age',
    'email',
    'firstName',
    'lastName'],
    additionalPropertied:false
}