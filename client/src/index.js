import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import UserStore from "./store/UserStore";
import AnimeStore from "./store/AnimeStore";

const userStore = new UserStore()
const animeStore = new AnimeStore()

export const Context = createContext({
    userStore, animeStore,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        userStore, animeStore,
    }}>
        <App />
    </Context.Provider>,
);
