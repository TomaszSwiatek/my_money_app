import { useState, useEffect } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext();

    const signup = async (email, password, displayName) => {
        setError(null) //if we resend form after any previous error
        setIsPending(true)

        try {
            // signup user
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            // console.log(res.user)


            if (!res) {
                // if there is no response from FB:
                throw new Error('Could not complete signup')
            }

            // add siplayName to user:
            await res.user.updateProfile({
                displayName: displayName
            })

            // dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user })
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        } catch (err) {
            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        // it fires when component unmount - and if - we dont want to update state - becouse it will couse errors
        return () => setIsCancelled(true)
    }, [])

    return { error, isPending, signup }
}