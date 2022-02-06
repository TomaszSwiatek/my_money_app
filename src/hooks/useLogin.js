import { useAuthContext } from './useAuthContext';
import { useEffect, useState } from 'react'
import { projectAuth } from '../firebase/config'

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsPending(true)
        setError(null)

        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)

            dispatch({ type: 'LOGIN', payload: res.user })
            // update state only if component didnt unmount
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
    // cleanup function (have to be in useEffect hook)
    useEffect(() => {
        // it fires when component unmount
        return () => setIsCancelled(true)
    }, [])


    return { login, error, isPending }
}