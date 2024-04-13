import {FirebaseOptions, initializeApp} from '@firebase/app'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, NextOrObserver, User, ErrorFn, sendEmailVerification, updateProfile} from '@firebase/auth'
import dayjs from 'dayjs'

const firebaseConfig: FirebaseOptions = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
}

export const app = initializeApp(firebaseConfig)

export const signupUser = async (email: string, password: string, displayName: {first_name: string, last_name?: string}) => {
    const auth = getAuth(app)

    await createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
            updateProfile(user.user, {
                displayName: `${displayName.first_name} ${displayName.last_name || ''}`.trim()
            })
        })
        .catch((error) => {
            throw error
        })
}

export const signInUser = async (email: string, password: string) => {
    const auth = getAuth(app)

    return await signInWithEmailAndPassword(auth, email, password)
}

export const getCurrentUser = (callback: NextOrObserver<User>, error?: ErrorFn ) => {
    const auth = getAuth(app)
    return onAuthStateChanged(auth, callback, error)
}

export const sendVerificationEmail = async (user: User) => {
    const auth = getAuth(app)

    const verificationSent = JSON.parse(localStorage.getItem('__verification_sent') || '{}')
    const secondsBeforeResend = 60 * 1
    if (verificationSent?.sent) {
        const secondsDiff = dayjs().diff(1712290050676, 'seconds');
        const remainingSeconds = Math.max(secondsBeforeResend - secondsDiff, 0)

        if (remainingSeconds > 0) {
            return { success: false, resendAfter: remainingSeconds }
        }
    }

    return await sendEmailVerification(user).then(() => {
        localStorage.setItem('__verification_sent', JSON.stringify({ sent: true, ts: dayjs().valueOf() }))
        return true
    })
}