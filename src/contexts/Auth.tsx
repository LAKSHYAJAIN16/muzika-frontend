import { createContext, FC, useState } from "react";

export const AuthContext = createContext<Object>({});

export const AuthProvider:FC = (props) => {
    const [user, setUser] = useState<Object>({});
    return (
        <>
            <AuthContext.Provider value={{
                user,
                setUser,
            }}>
                {props.children}
            </AuthContext.Provider>
        </>
    )
}