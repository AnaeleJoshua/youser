const jwt = require('jsonwebtoken')
const crypto = require('crypto');

const UserModel  = require('../../common/models/user');

const {roles, jwSecret, jwtExpirationInSecs} = require('../../config/config')

//Genrates an access Token using usrname and userId for the user's authentication
const generateAccessToken = (username, userId) => {
    return jwt.sign({
        userId,
        username, 
    },
    jwtSecret,
    {
        expiresIn: jwtExpirationInSecs
    })
}

//Encrypts the password using SHA256 Algorithm, for enhanced security of the password
const encryptPassword = (password)=>{
// We will hash the password using SHA256 Algorithm before storing in the DB
  // Creating SHA-256 hash object
  const hash = crypto.createHash("sha256");
  //update the hash object with the string to be encrypted
  hash.update(password);
  //get the encrypted value in hexadecimal format
  return hash.digest("hex")
};

module.exports = {
    homePage:async (req,res) => {
        res.send('hellooooo')
    },
    register: async (req,res)=>{
        try {
            const payload = req.body;
    
            let encryptPassword = encryptPassword(payload.password);
            let role = payload.role;
    
            if(!role){
                role = role.User;
            }
            const createUser = await UserModel.createUser(Object.assign(payload,{password:encryptPassword,role}))
            const accessToken = generateAccessToken(payload.username, user.id);

            return res.status(200).json({
                status: true,
                data: {
                    user: createUser.toJSON(),
                    token: accessToken
                }
            })
        }catch(err){
            res.status(500).json({
                status: false,
                data: err
            })
        }
        },

        login: async (req,res) => {
            const {username, password} = req.body;
            try {
                const user = await UserModel.findUser({username})
                if(!user){
                    return res.status(400).json({
                        status: false,
                        error: {
                          message: `Could not find any user with username: \`${username}\`.`,
                        },
                    })
            }

            const encryptedPassword = encryptPassword(password)

        // IF Provided password does not match with the one stored in the DB
        // THEN Return password mismatch error
        if (user.password != encryptedPassword){
            return res.status(401).json({
                status:true,
                error: 'username and password do not match' 
            })
        }

        const accessToken = generateAccessToken(user.username,user.id)
        res.status(200).json({
            status: true,
            data:{
                user: user.toJSON(),
                token:accessToken
            }
        })
        }catch(err){
                res.status(500).json({
                    status: false,
                    data: err
                })
        }
    }
}
