import React, { useState } from 'react'
import { PostApiAction } from '../redux/action/action';
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {PostApiDetails} from '../api/axiosRequest';
import { toast } from 'react-toastify';
const Form = () => {
    const [libelle, setLibelle] = useState("");
    const [price, setPrice] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState();
    const inputFile = (e) => {
        setImage(e.target.files[0]);
    }

    const history = useHistory();

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('libelle', libelle);
        form.append('price', price);
        form.append('content', content);
        form.append('image', image);
        //    const finalData={libelle:libelle,price:price,content:content,image:image};
        PostApiDetails(form).then(function (response) {
            if (response.data.status === true) {
                dispatch(PostApiAction(response.data.Donner));
                toast.success("Produit saved successfully");
                history.push('/');
            }
          }).catch(function (error) {
               console.log(error.response);
            })
  
    }
    return (
        <div className="container">
            <div className="d-flex justify-content-center">
                <div className="col-md-4">
                    <h2 className="text-center my-2">Add Products</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Libelle</label>
                            <input type="text" value={libelle} onChange={(e) => setLibelle(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder="Enter libelle" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Price</label>
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter price" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Content</label>
                            <input type="text" value={content} onChange={(e) => setContent(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter content" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" >Image</label>
                            <input type="file" className="form-control" onChange={inputFile} id="exampleInputPassword1" placeholder="Enter content" />
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form;
