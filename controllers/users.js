let userModel = require("../schemas/users");
let bcrypt = require('bcrypt')
let { signAccessToken } = require('../utils/jwtHandler')

module.exports = {
    CreateAnUser: async function (username, password, email, role, fullName, avatarUrl, status, loginCount) {
        let newItem = new userModel({
            username: username,
            password: password,
            email: email,
            fullName: fullName,
            avatarUrl: avatarUrl,
            status: status,
            role: role,
            loginCount: loginCount
        });
        await newItem.save();
        return newItem;
    },
    GetAllUser: async function () {
        return await userModel
            .find({ isDeleted: false })
    },
    GetUserById: async function (id) {
        try {
            return await userModel
                .findOne({
                    isDeleted: false,
                    _id: id
                })
        } catch (error) {
            return false;
        }
    },
    QueryLogin: async function (username, password) {
        if (!username || !password) {
            return false;
        }
        let user = await userModel.findOne({
            username: username,
            isDeleted: false
        })
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                return signAccessToken({
                    id: user.id
                })
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    ChangePassword: async function (id, oldPassword, newPassword) {
        if (!id || !oldPassword || !newPassword) {
            return {
                success: false,
                status: 400,
                message: 'thieu thong tin'
            }
        }

        let user = await userModel.findOne({
            _id: id,
            isDeleted: false
        })

        if (!user) {
            return {
                success: false,
                status: 404,
                message: 'user khong ton tai'
            }
        }

        let isOldPasswordCorrect = bcrypt.compareSync(oldPassword, user.password)
        if (!isOldPasswordCorrect) {
            return {
                success: false,
                status: 400,
                message: 'oldpassword khong dung'
            }
        }

        if (oldPassword === newPassword) {
            return {
                success: false,
                status: 400,
                message: 'newpassword khong duoc trung oldpassword'
            }
        }

        await userModel.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { password: newPassword },
            { new: true }
        )

        return {
            success: true,
            status: 200,
            message: 'doi mat khau thanh cong'
        }
    }
}
