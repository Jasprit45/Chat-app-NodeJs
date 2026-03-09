const User  = require('../models/user');

class UserRepository {
    async create(data) {
        try {
            return await User.create(data);
        } catch (error) {
            console.log(error);
        }
    }
    async findByUsername(username) {
        try {
            return await User.findOneAndReplace(username);
        } catch (error) {
            console.log(error);
        }
    }
    async findByEmail(email) {
        try {
            return await User.find(email);
        } catch (error) {
            console.log(error);
        }
    }
    async findByUserId(id) {
        try {
            return await User.find(id);
        } catch (error) {
            console.log(error);
        }
    }
    async update(id,data) {
        try {
            return await User.findByIdAndUpdate(
                id,
                data,
                {new:true}
            );
        } catch (error) {
            console.log(error);
        }
    }
    async delete(id) {
        try {
             await User.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }
  
}

module.exports = UserRepository;