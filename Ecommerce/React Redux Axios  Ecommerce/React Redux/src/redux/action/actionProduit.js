import { PRODUIT } from '../type/typeProduit';
export const Produits = (product) => {
    return {
        type: PRODUIT,
        payload: product
    }
}
