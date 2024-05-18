import { Auth, User as FirebaseUser } from "@firebase/auth"
import { createContext } from "react"

export interface AuthContextProps {
    user: FirebaseUser | null;
    auth: Auth;
    isEmailVerified: boolean;
    isLoading: boolean;
    logout: () => void;
    login: (email: string, password: string) => Promise<FirebaseUser | Error>;
    signup: (data: RegisterUserType) => Promise<FirebaseUser>;
    sendVerificationEmail: () => Promise<boolean>;
    deleteUser: (user: FirebaseUser) => void;
    isOwner: boolean;
}

export const AuthContext = createContext<AuthContextProps | null>(null)