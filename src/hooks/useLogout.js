import { useAuthContext } from './useAuthContext';
import { useEffect, useState } from 'react'
import { projectAuth } from '../firebase/config'

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setIsPending(true)
        setError(null)

        try {
            await projectAuth.signOut()

            dispatch({ type: 'LOGOUT' })
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


    return { logout, error, isPending }
}