import { USER, SUPRIMER_USER } from '../type/typeAuth';
export const user = (donner) => {
    return {
        type: USER,
        payload: donner
    }
}

export const suprimerUser = () => {
    return {
        type: SUPRIMER_USER,
        payload: ''
    }
}