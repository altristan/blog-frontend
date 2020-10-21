export enum ActionTypes {
    AUTHORIZED = 'AUTHORIZED',
    UNAUTHORIZED = 'UNAUTHORIZED'
}

export const authorizedAction = () => ({
    type: ActionTypes.AUTHORIZED
});

export const unauthorizedAction = () => ({
    type: ActionTypes.UNAUTHORIZED
});