import { AJOUTE_PRODUIT, SUPRIMER_PRODUIT } from '../type/typeCart';
export const addCart = (product) => {
    return {
        type: AJOUTE_PRODUIT,
        payload: product
    }
}

export const DeleteCart = (product) => {
    return {
        type: SUPRIMER_PRODUIT,
        payload: product
    }
}