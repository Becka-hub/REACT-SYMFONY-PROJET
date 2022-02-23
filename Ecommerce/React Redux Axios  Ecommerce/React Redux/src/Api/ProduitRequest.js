import axios from "axios";
import { BASE_URL } from "./utils";
const GetProduit = async () => {
    return await axios.get(`${BASE_URL}/afficheProduit`);
}

const GetProduitDetails = async (id) => {
    return await axios.get(`${BASE_URL}/afficheProduitDetails/${id}`)
}

export { GetProduit, GetProduitDetails };