import $api from "../http";

export default class AuthService {
    static async login(name, email, password) {
        return $api.post("/user/login", {name, email, password})
    }

    static async registration(name, email, password) {
        return $api.post("/user/registration", {name, email, password})
    }

    static async logout() {
        return $api.post("/user/logout")
    }
}