import { RegisterOptions } from "react-hook-form";
import { UserAPI } from "services/api";

type BaseRuleType = Record<string, Omit<RegisterOptions<any, string>, 'setValueAs' | 'disabled' | 'valueAsNumber' | 'valueAsDate'>>

export const RegisterAccountFormRules: BaseRuleType = {
    email: {
        required: { value: true, message: 'Email is required.' },
        pattern: { value: /(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/g, message: 'Invalid email address.' },
        maxLength: { value: 30, message: 'Email must be less than 30 characters.' },
        validate: async (value: string) => {
            const res = await UserAPI.isEmailOrUsernameAvailable({email: value})
            if (res) {
                return true
            }
            return 'Email is already taken.'
        }
    },
    username: {
        required: { value: true, message: 'Username is required.' },
        minLength: { value: 3, message: 'Username must be at least 3 characters.' },
        maxLength: { value: 15, message: 'Username must be less than 15 characters.' },
        pattern: { value: /^[a-z0-9_-]{3,15}$/g, message: 'Username should only contain letters, numbers, and underscores and should be between 3 and 15 characters.' },
        validate: async (value: string) => {
            const res = await UserAPI.isEmailOrUsernameAvailable({username: value})
            if (res) {
                return true
            }
            console.log(res)
            return 'Username is already taken.'
        },
    },
    password: {
        required: { value: true, message: 'Password is required.' },
        pattern: { value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character and should be at least 8 characters.'},
    },
    confirmPassword: {
        required: { value: true, message: 'Confirm password is required.' },
        validate: (value: string, formValues) => value === formValues.password || 'Passwords do not match.', 
    },
}

export const PersonalnformationRules: BaseRuleType = {
    first_name: {
        required: { value: true, message: 'First name is required.'},
        minLength: {value: 2, message: 'First name must be at least 2 characters.'},
        maxLength: {value: 30, message: 'First name must be less than 30 characters.'},
        pattern: { 
            value: /^[A-Za-zÁáÀàÂâĂăÄäÅåÃãǍǎÆæÇçĆćĈĉĊċČčÐðÉéÈèÊêËëĚěĔĕĖėȨȩĘęẼẽĜĝĞğĠġĢģĤĥĦħÍíÌìÎîÏïĨĩĪīĬĭĮįĲĳĴĵĶķĹĺĻļĽľŁłḸḹḼḽŃńŇňÑñŅņǸǹŊŋÓóÒòÔôÖöÕõŐőǑǒØøǾǿŒœŔŕŘřŚśŜŝŞşŠšŢţŤťŦŧÚúÙùÛûÜüŨũŪūŬŭŮůŰűŲųẂẃẀẁŴŵÝýỲỳŶŷŸÿŹźŻżŽž]+(?:[ -][A-Za-zÁáÀàÂâĂăÄäÅåÃãǍǎÆæÇçĆćĈĉĊċČčÐðÉéÈèÊêËëĚěĔĕĖėȨȩĘęẼẽĜĝĞğĠġĢģĤĥĦħÍíÌìÎîÏïĨĩĪīĬĭĮįĲĳĴĵĶķĹĺĻļĽľŁłḸḹḼḽŃńŇňÑñŅņǸǹŊŋÓóÒòÔôÖöÕõŐőǑǒØøǾǿŒœŔŕŘřŚśŜŝŞşŠšŢţŤťŦŧÚúÙùÛûÜüŨũŪūŬŭŮůŰűŲųẂẃẀẁŴŵÝýỲỳŶŷŸÿŹźŻżŽž]+)*$/g,
            message: 'First name must only contain letters.' 
        },
    },
    last_name: {
        required: { value: true, message: 'Last name is required.' },
        minLength: { value: 2, message: 'Last name must be at least 2 characters.' },
        maxLength: { value: 30, message: 'Last name must be less than 30 characters.' },
        pattern: { 
            value: /^[A-Za-zÁáÀàÂâĂăÄäÅåÃãǍǎÆæÇçĆćĈĉĊċČčÐðÉéÈèÊêËëĚěĔĕĖėȨȩĘęẼẽĜĝĞğĠġĢģĤĥĦħÍíÌìÎîÏïĨĩĪīĬĭĮįĲĳĴĵĶķĹĺĻļĽľŁłḸḹḼḽŃńŇňÑñŅņǸǹŊŋÓóÒòÔôÖöÕõŐőǑǒØøǾǿŒœŔŕŘřŚśŜŝŞşŠšŢţŤťŦŧÚúÙùÛûÜüŨũŪūŬŭŮůŰűŲųẂẃẀẁŴŵÝýỲỳŶŷŸÿŹźŻżŽž]+(?:[ -][A-Za-zÁáÀàÂâĂăÄäÅåÃãǍǎÆæÇçĆćĈĉĊċČčÐðÉéÈèÊêËëĚěĔĕĖėȨȩĘęẼẽĜĝĞğĠġĢģĤĥĦħÍíÌìÎîÏïĨĩĪīĬĭĮįĲĳĴĵĶķĹĺĻļĽľŁłḸḹḼḽŃńŇňÑñŅņǸǹŊŋÓóÒòÔôÖöÕõŐőǑǒØøǾǿŒœŔŕŘřŚśŜŝŞşŠšŢţŤťŦŧÚúÙùÛûÜüŨũŪūŬŭŮůŰűŲųẂẃẀẁŴŵÝýỲỳŶŷŸÿŹźŻżŽž]+)*$/g,
            message: 'Last name must only contain letters.' 
        },
    },
    dob: {
        required: { value: true, message: 'Date of birth is required.' },
        validate: (value: string) => {
            // if date is in the future and not 13 years old, return error\
            const ageAllowed = 13
            if (new Date().getFullYear() - new Date(value).getFullYear() < ageAllowed) {
                return 'Must be at least 13 years old.'
            }
        }
    },
    gender: {
        required: false,
    }
}

export const LoginFormRules: BaseRuleType = {
    email: {
        required: { value: true, message: 'Email is required.' },
    },
    password: {
        required: { value: true, message: 'Password is required.' },
    }
}