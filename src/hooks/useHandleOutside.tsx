import React from 'react'

function useHandleOutside<T extends HTMLElement>(callback: Function): React.MutableRefObject<T | null> {

    const ref = React.useRef<T | null>(null)

    React.useEffect(() => {
        function handleOutsideClick(event: MouseEvent) {
            
            // @ts-ignore
            if (ref.current && !ref.current.contains(event.target)) {
                callback()
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)

        return () => document.removeEventListener('mousedown', handleOutsideClick)
    }, [ref])

  return ref
}

export default useHandleOutside