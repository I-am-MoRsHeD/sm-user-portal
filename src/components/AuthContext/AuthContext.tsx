import { createContext, ReactNode, useEffect, useState } from "react"


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
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : [];
    });

    console.log(user);
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
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
