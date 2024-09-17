import { createContext, ReactNode, useState } from "react"


interface NavigationContextType {
    isNavOpen?: boolean;
    toggleNavigation?: () => void;
};

interface NavigationContextProviderProps {
    children: ReactNode;
}

export const NavigationContext = createContext<NavigationContextType | null>(null);


const NavigationContextProvider: React.FC<NavigationContextProviderProps> = ({children}) => {
    const [navOpen, setNavOpen] = useState(true);

    const toggleNavigation = () =>{
        setNavOpen(!navOpen);
    }

    const info: NavigationContextType = {
        isNavOpen: navOpen,
        toggleNavigation
    };

    return <NavigationContext.Provider value={info}>
        {children}
    </NavigationContext.Provider>
};

export default NavigationContextProvider;
