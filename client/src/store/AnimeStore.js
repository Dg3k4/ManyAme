import {makeAutoObservable} from "mobx";
import AnimeService from "../services/AnimeService";

export default class AnimeStore {
    anime = {}
    certainAnime = {}
    isLoading = false;

    setAnime(anime) {
        this.anime = anime
    }

    setIsCertainAnime(certainAnime) {
        this.certainAnime = certainAnime
    }

    setIsLoading(bool) {
        this.isLoading = bool
    }

    constructor() {
        makeAutoObservable(this)
    }

    async giveCertainAnime({animeId}) {
        this.setIsLoading(true)
        try {

        } catch (e) {
            console.error(e.response?.data?.message)
        } finally {
            this.setIsLoading(false)
        }
    }

    async giveAnime({offset, limit, sortField, sortOrder, filters}) {
        this.setIsLoading(true)
        try {
            const response = await AnimeService.fetchAnime({offset, limit, sortField, sortOrder, filters})
            console.log(response)
            this.setAnime(response.data)
        } catch (e) {
            console.error(e.response?.data?.message)
        } finally {
            this.setIsLoading(false)
        }
    }

}