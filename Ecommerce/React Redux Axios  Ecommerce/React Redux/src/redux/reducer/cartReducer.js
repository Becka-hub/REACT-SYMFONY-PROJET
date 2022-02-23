import { AJOUTE_PRODUIT, SUPRIMER_PRODUIT } from '../type/typeCart';

const cart = [];

const cartReducer = (state = cart, action) => {
    const product = action.payload;
    if (localStorage.getItem('panier')) {
        state = JSON.parse(localStorage.getItem('panier'));
    }
    switch (action.type) {
        case AJOUTE_PRODUIT:
            const existe = state?.find((x) => x.id === product.id);
            if (existe) {
                const stateExiste = state.map((x) => x.id === product.id ? { ...x, qty: x.qty + 1 } : x);
                localStorage.setItem('panier', JSON.stringify(stateExiste));
                return stateExiste;
            } else {
                const product = action.payload;
                localStorage.setItem('panier', JSON.stringify([...state, { ...product, qty: 1 }]));
                return [...state,{ ...product, qty: 1 }];
            }
            break;
            
        case SUPRIMER_PRODUIT:
            const existe1 = state.find((x) => x.id === product.id);
            if (existe1.qty === 1) {
                const stateDel = state.filter((x) => x.id !== product.id);
                localStorage.setItem('panier', JSON.stringify(stateDel));
                return stateDel;
            } else {
                const stateDecre = state.map((x) => x.id === product.id ? { ...x, qty: x.qty - 1 } : x);
                localStorage.setItem('panier', JSON.stringify(stateDecre));
                return stateDecre;
            }
            break;
        default:
            return state;
            break;
    }
}
export default cartReducer;