import { AuthContext } from "@contexts/AuthContext"
import { app } from "@fb/app"
import { User as FirebaseUser, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, reauthenticateWithCredential, sendEmailVerification, signInWithEmailAndPassword, updateProfile } from "@firebase/auth"
import useAuth from "hooks/useAuth"
import { useContext, useEffect, useMemo, useState } from "react"
import { UserAPI } from "services/api"

const AppProvider = ({ children }: any) => {
    
    const [user, setUser] = useState<FirebaseUser | null>(null)
    const [isEmailVerified, setisEmailVerified] = useState<boolean>(false)
    const [isLoading, setLoading] = useState<boolean>(true)

    const auth = useMemo(() => getAuth(app), [])
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                setisEmailVerified(user.emailVerified)
            }

            setLoading(false)
        })

        return () => unsubscribe()
    }, [])


    function logout() {
        auth.signOut()
        setUser(null)
        setisEmailVerified(false)
    }

    async function login(email: string, password: string): Promise<FirebaseUser | Error> {
        return new Promise( (resolve, reject) => {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user
                    setUser(user)
                    setisEmailVerified(user.emailVerified)
                    resolve(user)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    async function signup(data: RegisterUserType): Promise<FirebaseUser> {
        return new Promise((resolve, reject) => {
                try {
                    createUserWithEmailAndPassword(auth, data.email, data.password)
                    .then(async (userCredential) => {
                        const user = userCredential.user
                        UserAPI.createUser({_auth_id: user.uid, ...data})
                            .then(() => {
                                sendEmailVerification(user)
                                updateProfile(user, { displayName: data.username })
                                setUser(user)
                                resolve(user)
                            })
                            .catch((error) => {
                                setUser(null)
                                setisEmailVerified(false)
                                user.delete();
                                throw error
                            })
                    })
                } catch (error) {
                    reject(error)
                }
        })
    }

    async function sendVerificationEmail() {
        return new Promise((resolve, reject) => {
            if(!!user) {
                sendEmailVerification(user)
                .then(() => {
                    resolve(true)
                })
                .catch((error) => {
                    reject(error)
                })
            }

            reject(new Error('User not logged in.'))
        })
    }

    function deleteUser(user: FirebaseUser) {
        setUser(null)
        user.delete()
    }

    if (isLoading) {
        return null
    }

    return <AuthContext.Provider value={{
        user,
        isEmailVerified,
        isLoading,
        logout,
        login,
        signup,
        deleteUser
    }}>
        {children}
    </AuthContext.Provider>
}

export default AppProvider