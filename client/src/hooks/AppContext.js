import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [owner, setOwner] = useState(false);
    const [user, setUser] = useState(undefined);

    let value = {
        loggedIn: loggedIn,
        setLoggedIn: setLoggedIn,
        owner: owner,
        setOwner: setOwner,
        user: user,
        setUser: setUser,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
