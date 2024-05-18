import { AuthContext } from "@contexts/AuthContext"
import { app } from "@fb/app"
import { User as FirebaseUser, createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, updateProfile } from "@firebase/auth"
import useEmailVerificationCheck from "hooks/useEmailVerificationCheck"
import { useEffect, useState } from "react"
import { UserAPI } from "services/api"

const auth = getAuth(app)

const AppProvider = ({ children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<FirebaseUser | null>(auth?.currentUser)
    const [isLoading, setLoading] = useState<boolean>(true) 
    const { isEmailVerified } = useEmailVerificationCheck(auth, (result) => UserAPI.updateUser({_id: (result.claims.dbid as string), is_user_verified: true}, result.token))    

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }

            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    function logout() {
        auth.signOut()
        setUser(null)
    }

    async function login(email: string, password: string): Promise<FirebaseUser | Error> {
        return new Promise( (resolve, reject) => {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user
                    setUser(user)
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
        if (!user) return false
        return sendEmailVerification(user).then(() => true)
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
        auth,
        isEmailVerified,
        isLoading,
        logout,
        login,
        signup,
        sendVerificationEmail,
        deleteUser
    }}>
        {children}
    </AuthContext.Provider>
}

export default AppProvider