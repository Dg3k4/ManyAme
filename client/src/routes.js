import {
    ADMIN_ROUTE,
    ANIME_PAGE_ROUTE,
    ANIME_ROUTE,
    ANIME_SEARCH_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE,
    USER_LIST_ROUTE,
    USER_ROUTE
} from "./utils/consts";
import Admin from "./pages/Admin";
import UserList from "./pages/UserList";
import UserProfile from "./pages/UserProfile";
import Auth from "./pages/Auth";
import AnimeMain from "./pages/AnimeMain";
import AnimeSearch from "./pages/AnimeSearch";
import AnimePage from "./pages/AnimePage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: USER_LIST_ROUTE + "/:id",
        Component: UserList
    },
    {
        path: USER_ROUTE,
        Component: UserProfile
    },
]

export const publicRoutes = [
    {
        path: ANIME_ROUTE,
        Component: AnimeMain
    },
    {
        path: ANIME_SEARCH_ROUTE,
        Component: AnimeSearch
    },
    {
        path: ANIME_PAGE_ROUTE + "/:animeId",
        Component: AnimePage
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]