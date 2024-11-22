const ApiError = require("../../error/ApiError")
const {User} = require("../../models/user");
const {List} = require("../../models/list");
const {TypeList} = require("../../models/list");

class ListService {
    async initializeGeneralTypeLists(listId) {
        const mainTypeListsTitles = ["Смотрю", "Просмотренно", "Запланировано", "Заброшено", "Отложено", "Пересматриваю"];
        const typeLists = mainTypeListsTitles.map(title => ({ title, listId }));

        await TypeList.bulkCreate(typeLists);
    }

    async createAnimeList(userId) {
        const user = await User.findOne({where: {id: userId}})
        if (!user) {
            throw ApiError.notFound("User does not found")
        }

        if (user.isActive) {
            const newList = await List.create({userId: userId})
            await this.initializeGeneralTypeLists(newList.id)
            return newList
        }
        return "Account is not activated"
    }
}

module.exports = new ListService()