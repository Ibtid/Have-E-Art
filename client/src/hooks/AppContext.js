import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [owner, setOwner] = useState(false);
    const [user, setUser] = useState(undefined);
    const [contextStore, setContextStore] = useState({
        loggedIn: false,
        owner: false,
        user: undefined,
        eart: {}
    })

    return (
        <AppContext.Provider value={{contextStore, setContextStore}}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
