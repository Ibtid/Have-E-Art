import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [contextStore, setContextStore] = useState({
        loggedIn: false,
        owner: false,
        user: undefined,
        eart: {},
        edition: {},
        notifications: [],
        messages: []
    })

    return (
        <AppContext.Provider value={{contextStore, setContextStore}}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
