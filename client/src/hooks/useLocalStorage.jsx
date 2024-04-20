import { useEffect, useState } from "react"

const useLocalStorage = ( key, defaultVal="" ) => {
    const [ val, setVal ] = useState( () => JSON.parse( localStorage.getItem( key ) || defaultVal ) )

    useEffect( () => {
        localStorage.setItem( key, JSON.stringify( val ) )
    }, [val])

    const getter = () => {
        localStorage.getItem( key )
    }
   
    const erase = () => { setVal() }

    return [ val, setVal, getter, erase ]

}
export default useLocalStorage