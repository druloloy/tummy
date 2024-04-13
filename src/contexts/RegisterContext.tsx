import { RegisterPersonalInformationInputs } from '@pages/Registration/RegisterPersonalInformation'
import {createContext} from 'react'

export interface RegisterContextProps {
    registeredInfo: RegisterPersonalInformationInputs;
    setRegisteredInfo: (data: RegisterPersonalInformationInputs) => void;
    clearRegisteredInfo: () => void;
}

export const RegisterContext = createContext<RegisterContextProps | null>(null)
