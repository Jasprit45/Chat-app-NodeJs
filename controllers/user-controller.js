const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req,res) => {
    try {
        const res = await userService.create({
            email:req.body.email,
            password:req.body.password
        });
        return res.status(201).json({
            data: res,
            success: true,
            message: "Successfully created a new user",
            err: {}
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            message: "Error in creation of user",
            data: {},
            success: false,
            err: error,
        });
    }
}
const signIn = async (req,res) => {
    try {
        const res = await userService.create(
            req.body.email,
            req.body.password
        );
        return res.status(200).json({
            data: res,
            success: true,
            message: "Successfully signed in and created a token user",
            err: {}
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            message: "Error in sign in of user",
            data: {},
            success: false,
            err: error,
        });
    }
}
const isAuthenticated = async (req,res) => {
    try {
        const token = req.headers['x-access-token'];
        const res = await userService.create(token);
        return res.status(201).json({
            data: res,
            success: true,
            message: "Successfully authenticated a user",
            err: {}
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            message: "Error in authentication of user",
            data: {},
            success: false,
            err: error,
        });
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated
}