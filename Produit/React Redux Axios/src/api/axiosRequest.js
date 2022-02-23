import axios from "axios";

const base_url = "http://127.0.0.1:8000";



const GetApiDetails = () => {
    return axios.get(`${base_url}/afficheProduit`);
}

const PostApiDetails = (data) => {
    return axios.post(`${base_url}/ajouteProduit`,data);
}


const DeleteApiDetails = (id) => {
    return axios.delete(`${base_url}/deleteProduit/` + id);
}

export  {GetApiDetails,PostApiDetails,DeleteApiDetails};