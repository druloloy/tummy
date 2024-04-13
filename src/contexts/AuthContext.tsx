import { User as FirebaseUser } from "@firebase/auth"
import { createContext } from "react"

export interface AuthContextProps {
    user: any;
    isEmailVerified: boolean;
    isLoading: boolean;
    logout: () => void;
    login: (email: string, password: string) => Promise<FirebaseUser | Error>;
    signup: (data: RegisterUserType) => Promise<FirebaseUser>;
    deleteUser: (user: FirebaseUser) => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null)