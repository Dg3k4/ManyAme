import $api from "../http";

export default class AnimeService {
    static async fetchAnime({ offset = 0, limit = 9, sortField = 'createdAt', sortOrder = 'DESC', filters = {} }) {
        const params = {
            offset,
            limit,
            sortField,
            sortOrder,
            ...filters
        };

        console.log(params); // Логирование параметров для проверки
        return $api.get("/anime", { params });
    }

    static async giveOneAnime(id) {
        return $api.get(`/anime/${id}`)
    }

    static async fetchGenre() {
        return $api.get("/anime/genre")
    }
}
