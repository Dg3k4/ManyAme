const {User, Role} = require("../../models/user");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../../dtos/user-dtos");
const {Op} = require("sequelize");
const ApiError = require("../../error/ApiError");


class UserService {
    async registration(name, email, password) {
        const candidateEmail = await User.findOne({where: {email: email}})
        const candidateName = await User.findOne({where: {name: name}})
        if (candidateEmail) {
            throw new Error(`User with this email: ${email} already exist`)
        }
        if (candidateName) {
            throw new Error(`This name already occupied`)
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const activationLink = uuid.v4()

        const newUser = await User.create({name, email, password: hashPassword, activationLink})

        await newUser.addRole(3) // 3 айди это пользователь
        const roles = await newUser.getRoles()
        const roleIds = roles.map(role => role.id)

        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)

        const userDto = new UserDto({...newUser.toJSON(), roleIds: roleIds});
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await User.findOne({where: {activationLink: activationLink}})
        if (!user) {
            throw new Error("Incorrect activation link")
        }
        user.isActive = true;
        await user.save();
    }

    async login(name, email, password) {
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    {name: name},
                    {email: email}
                ]
            },
            include: [{model: Role}]
        })
        if (!user) {
            throw ApiError.badRequest("User with this nickname or email does not exist")
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.badRequest("Incorrect password")
        }

        const roleIds = user.roles.map(role => role.id);
        console.log(roleIds)

        const userDto = new UserDto({
            ...user.toJSON(),
            roleIds: roleIds,
        })
        const tokens = tokenService.generateTokens({...userDto})
        console.log('Сам токен:', tokens);
        console.log('Расшифрованный токен:', tokenService.validateAccessToken(tokens.accessToken));

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.badRequest("Not authorized")
        }
        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.badRequest("Not authorized")
        }

        const user = await User.findOne({where: {id: userData.id}, include: [{model: Role}]})
        const roleIds = user.roles.map(role => role.id);

        const userDto = new UserDto({
            ...user.toJSON(),
            roleIds: roleIds,
        })
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async getAllUsers() {
        const users = await User.findAll()
        return users
    }

    async addAccRole(userId, roleId) {
        const user = await User.findOne({where: userId})
        const role = await Role.findOne({where: roleId})
        const joinRole = await user.addRole(roleId)

        return {
            joinRole,
            user,
            role
        }
    }
}

module.exports = new UserService()