import { USER, SUPRIMER_USER } from '../type/typeAuth';
const user = [];
const authReducer = (state = user, action) => {
    if (localStorage.getItem('user')) {
        state = JSON.parse(localStorage.getItem('user'));
    }
    switch (action.type) {
        case USER:
            state = action.payload;
            return state;
            break;
        case SUPRIMER_USER:
            return state = [];
        default:
            return state;
            break;
    }
}

export default authReducer;