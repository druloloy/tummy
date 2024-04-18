import React from 'react'

type DeviceType = 'desktop' | 'mobile' | 'tablet'

interface WindowDimensionsProps {
    height: number;
    width: number;
}

function getWindowDimensions(): WindowDimensionsProps {
    const { innerHeight: height, innerWidth: width } = window
    return { height, width }
}

function getDeviceType(width: number): DeviceType {
    if (width >= 1024) {
        return 'desktop'
    } else if (width >= 768) {
        return 'tablet'
    } else {
        return 'mobile'
    }
}

const useWindowDimension = (): WindowDimensionsProps & { device: DeviceType } => {
    const [windowDimensions, setWindowDimensions] = React.useState<WindowDimensionsProps>(getWindowDimensions())
    React.useEffect(() => {
        const handleResize = () => setWindowDimensions(getWindowDimensions())

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return { ...windowDimensions, device: getDeviceType(windowDimensions.width) }
}

export default useWindowDimension