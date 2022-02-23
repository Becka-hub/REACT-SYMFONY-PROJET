import axios from "axios";
import { BASE_URL } from "./utils";

const Inscription = async (data) => {
    return await axios.post(`${BASE_URL}/register`,data);
}

const Auth = async (data) => {
     return await axios.post(`${BASE_URL}/auth`,data);
}

export { Inscription, Auth };