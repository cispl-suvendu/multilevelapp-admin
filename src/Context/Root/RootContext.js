import { createContext, useContext } from "react";


export const RootContext = createContext()

export const RootContextProvider = ({ children }) => {
    return (
        <RootContext.Provider value={{}}>
            {children}
        </RootContext.Provider>
    )
}

export const useRootContext = () => {
    return useContext(RootContext)
}