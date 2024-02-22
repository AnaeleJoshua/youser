const UserModel = require('./../../common/models/user')

module.exports = {
    // getUser: (req,res) => {
    //     const {user:{userId}} = req
    //     UserModel.findUser({id:userId})
    // }
    getUser : async (req,res)=>{
        const {user:{userId}} = req;
        try {
            const user = await UserModel.findUser({id:userId})
            return res.status(200).json({
                status: true,
                data: user.toJSON()
            })
        } catch (err){
            return res.status(500).json({
                status: false,
                error: err
            })
        }
        
    },

    updateUser: async (req,res) => {
        const {
            user:{userId},
            body:payload
        } = req;

        try {
            // IF the payload does not have any keys i.e no data to update with,
            // THEN we can return an error, as nothing can be updated
            if (!Object.keys(payload).length){
                return res.status(400).json({
                    status:false,
                    error: {
                        message:"Body is empty, hence cannot update user"
                    }
                })
            
            }
            const user = await UserModel.updateUser({id:userId},payload)
                return res.status(200).json({
                    status: true,
                    data: user.toJSON(),
                }) 
            }catch (err){
                return res.status(500).json({
                    status: false,
                    error: err
                })
        }
}
}