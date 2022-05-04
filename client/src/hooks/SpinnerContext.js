import { createContext, useState } from "react";

export const SpinnerContext = createContext()

export default function SpinnerContextProvider (props){
    const [showSpinner, setShowSpinner] = useState(false)
    return (
        <SpinnerContext.Provider value={{showSpinner, setShowSpinner}}>
            {props.children}
        </SpinnerContext.Provider>
    )
}