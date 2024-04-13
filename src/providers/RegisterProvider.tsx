import { RegisterContext } from "@contexts/RegisterContext";
import { RegisterPersonalInformationInputs } from "@pages/Registration/RegisterPersonalInformation";
import React from "react";

const RegisterProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const initialData: RegisterPersonalInformationInputs = JSON.parse(sessionStorage.getItem('__registered_personal') || '{}')
    const [registeredInfo, _setRegisteredInfo] = React.useState<RegisterPersonalInformationInputs>({
        first_name: initialData?.first_name || '',
        last_name: initialData?.last_name || '',
        dob: initialData?.dob || '',
        gender: initialData?.gender || null
    });

    const setRegisteredInfo = (data: RegisterPersonalInformationInputs) => {
        console.log(data)
        sessionStorage.setItem('__registered_personal', JSON.stringify(data))
        _setRegisteredInfo(data)
    }

    const clearRegisteredInfo = () => {
        sessionStorage.removeItem('__registered_personal')
        _setRegisteredInfo({first_name: '', last_name: '', dob: '', gender: null})
    }

    return (
        <RegisterContext.Provider value={{ registeredInfo, setRegisteredInfo, clearRegisteredInfo }}>
            {children}
        </RegisterContext.Provider>
    )
}

export default RegisterProvider