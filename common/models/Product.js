const {DataTypes, Sequelize} = require('sequelize')
const {productPriceUnits} = require('../../config/config')
const { query } = require('express')

const ProductModel = {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    price:{
        type:DataTypes.STRING,
        allowNull: false,

    },
    price:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    priceUnit:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue: productPriceUnits.DOLLAR
    }
}

module.exports = {
    initialise: (sequelize) => {
        this.model = sequelize.define("product",ProductModel)
    },
    createProduct: (user) => {
    return this.model.create(user)
    },
    findProduct: (query)=>{
        return this.model.findOne({where: query,})
    },
    updateProduct:(query,updatedValue) => {
        return this.model.update(updatedValue,{
            where: query
        })
    },
    
    findAllProduct: (query)=>{
        return this.model.findAll({
            where:query
        })
    },
    deleteProduct: (query)=>{
        return this.model.destroy({
            where:query
        })
    }
}