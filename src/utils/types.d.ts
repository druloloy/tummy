type GenderType = 'm' | 'f' | 'o' | 'a'

interface User {
    _id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    dob: string;
    gender?: GenderType;
}

type RegisterUserType extends Omit<User, '_id'> & {password: string}

interface UserClaims extends Pick<User, '_id' | 'email' | 'username'> {
    token: string;
    emailVerified: boolean;
}

type ColorsType = 
    | 'primary-50'
    | 'primary-100'
    | 'primary-200'
    | 'primary-300'
    | 'primary-400'
    | 'primary-500'
    | 'primary-600'
    | 'primary-700'
    | 'primary-800'
    | 'primary-900'
    | 'secondary-50'
    | 'secondary-100'
    | 'secondary-200'
    | 'secondary-300'
    | 'secondary-400'
    | 'secondary-500'
    | 'secondary-600'
    | 'secondary-700'
    | 'secondary-800'
    | 'secondary-900'
    | 'black'
    | 'white'

type WeightsType = 
    | 'extrathin'
    | 'thin'
    | 'regular' 
    | 'medium' 
    | 'bold'
    | 'extrabold'
    | 'black' 