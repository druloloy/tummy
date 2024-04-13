interface ReducerState {
    user: UserClaims | null;
}

interface SET_USER {
    type: 'SET_USER';
    payload: UserClaims;
}

type ActionTypes = 
    | SET_USER


export const reducerHandler = (state: ReducerState, action: ActionTypes): ReducerState => {
    switch (action.type) {
        case 'SET_USER': {
            return {
                ...state,
                user: action.payload
            }
        }
    }
}

export function initialState(): ReducerState {
    return {
        user: null,
    }
}
