import React from 'react'
import md5 from 'md5'
import dayjs from 'dayjs'

type LocalStorageType<T> = T & {exp?: number}


const useLocalStorage = () => {
    const PREFIX = '__tummy_'

    function __retrieveAllStorageKeys() {
        const keys = Object.keys(localStorage)
        return keys.filter(key => key.startsWith(PREFIX))
    }

    function watch(watchInterval = 5000 ) {
        const retrievedStorageKeys = __retrieveAllStorageKeys()
        // Set interval to calculate expiration time
        const intervalId = setInterval(() => {
            retrievedStorageKeys.forEach(key => {
                const value = localStorage.getItem(key)
                if (value) {
                    const expirationTime = JSON.parse(value)?.exp
                    if (expirationTime && expirationTime < dayjs().valueOf()) {
                        window && window.localStorage.removeItem(key)
                    }
                }
            })
        }, watchInterval)

        return () => clearInterval(intervalId)
    }
    
    function __hash_key(key: string) {
        return md5(key)
    }

    function get<T>(key: string, initialValue: LocalStorageType<T>) {
        if (window && window.localStorage) {
            const value = window.localStorage.getItem(PREFIX + __hash_key(key))

            if (!value) {
                return initialValue
            }

            const parsedValue = JSON.parse(value)

            if (!parsedValue) {
                return initialValue
            }

            const expirationTime = parsedValue?.exp

            if (expirationTime && expirationTime < dayjs().valueOf()) {
                remove(key)
                return initialValue
            }

            return parsedValue.value
        }
    }

    function set<T>(key: string, value: T, exp?: number) {
        if (window && window.localStorage) {
            window.localStorage.setItem(PREFIX + __hash_key(key), JSON.stringify({value, exp} as LocalStorageType<T>))
        }
    }

    function remove(key: string) {
        if (window && window.localStorage) {
            window.localStorage.removeItem(PREFIX + __hash_key(key))
        }
    }
    
    return {
        get,
        set,
        remove,
        watch
    }
}

export default useLocalStorage