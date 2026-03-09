const UserRepository  = require('../repository/user-repository');
const {JWT_KEY} = require('../config/server-config');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');

class UserService{
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    createToken(user) {
        try {
            const res = jwt.sign(user, JWT_KEY, {expiresIn:'1h'});
            return res;
        } catch (error) {
            console.log(error);
            
        }
    }

    verifyToken(token) {
        try {
            const res = jwt.verify(token,JWT_KEY);
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async isAuthenticated(token) {
        try {
            const res = this.verifyToken(token);
            if(!res) throw {error: "Invalid Token!!!"};

            const user = await this.userRepository.findByUserId(res.id);
            if(!user) throw {error: "No user with this token"};

            return user.id;
        } catch (error) {
            throw error;
        }
    }

    async signIn(email, inputPassword) {
        try {
            const user = await this.userRepository.findByEmail(email);
            if(!user) throw {error: "User not found with this email"};

            const passwordMatch = this.checkPassword(inputPassword,user.password);
            if(!passwordMatch) throw {error: "Wrong password"};

            const res = this.createToken({
                email:user.email,
                id:user.id
            });
            return res;
        
        } catch (error) {
            throw {error};
        }
    }

    checkPassword(inputPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(inputPassword,encryptedPassword);
        } catch (error) {
            throw {error};
        }
    }
}

module.exports = UserService;