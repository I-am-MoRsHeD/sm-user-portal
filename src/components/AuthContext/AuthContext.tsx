'use client'
import { createContext, ReactNode, useEffect, useState } from "react"
import { decodedUser } from "../hooks/useUser";


interface AuthContextType {
    user: string;
    setUser: (value: string) => void;
};
interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);


const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    // const [user, setUser] = useState('');
    const [user, setUser] = useState(() => {
        const storedUser = typeof window !== "undefined" ? localStorage.getItem('user') : null;
        return storedUser ? JSON.parse(storedUser) : {};
    });


    useEffect(() => {
        if (user) {
            typeof window !== "undefined" ? localStorage.setItem('user', JSON.stringify(user)) : null;
        }
        if(decodedUser){
            typeof window !== "undefined" ? localStorage.setItem('user', JSON.stringify(decodedUser)) : null;
        }
        
    }, [user]);


    const info: AuthContextType = {
        user,
        setUser,
    };

    return <AuthContext.Provider value={info}>
        {children}
    </AuthContext.Provider>
};

export default AuthContextProvider;
