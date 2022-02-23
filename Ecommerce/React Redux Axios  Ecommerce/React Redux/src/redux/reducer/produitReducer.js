import { PRODUIT } from '../type/typeProduit';
const produit = [];
const produitReducer = (state = produit, action) => {
    if (localStorage.getItem('produit')) {
        state = JSON.parse(localStorage.getItem('produit'));
    }
    switch (action.type) {
        case PRODUIT:
            state=action.payload;
            return  state;
            break;
        default:
            return state;
            break;
    }
}

export default produitReducer;