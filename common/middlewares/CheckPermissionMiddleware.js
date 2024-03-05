const UserModel = require("../models/user")

module.exports = {
    has: (role) => {
        return async (req,res,next) => {
            const {
                user: {userId},
            } = req;

            const user = await UserModel.findUser({id:userId})
            // If user does not exist in our database, means something is fishy
            // THEN we will return forbidden error and ask user to login again
            if (!user){
                return res.status(403).json({
                    status:false,
                    error:"Invalid access token provided, please login again",
                });
            }
            const userRole = user.role;

            //if user does not possess the require role
            // then return forbiddine error
            if (userRole !== role){
                return res.status(403).json({
                    status:false,
                    error: `You need to be a ${role} to access this endpoint`
                })
            }

            next()
        }
    }
}