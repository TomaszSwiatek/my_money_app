import { useEffect, useRef, useState } from 'react'
import { projectFirestore } from '../firebase/config'

export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    //becouse of reference type of array that we pass as query (in home component) whe have to use useRef to show react that after refetch data its still the same array (so we dont go to infinite loop)
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    // we want to invoke tyhis part right after component first mounts and after every collection change
    useEffect(() => {
        let ref = projectFirestore.collection(collection)
        //optional query to filter data
        if (query) {
            ref = ref.where(...query)
        }

        if (orderBy) {
            ref = ref.orderBy(...orderBy)//by spreading array we get to separate values as arguments
        }

        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })
            setDocuments(results)
            setError(null)
        }, (error) => {
            console.log(error)
            setError('could not fetch the data')
        })

        // unsubsrcibe on unmount
        return () => unsubscribe()

    }, [collection, query, orderBy])


    return { documents, error }
}