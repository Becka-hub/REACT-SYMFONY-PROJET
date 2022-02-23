import React, { useEffect } from 'react'
import { GetApiAction, DeleteApiAction} from '../redux/action/action';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {GetApiDetails,DeleteApiDetails} from '../api/axiosRequest';
const Home = () => {
    const dispatch = useDispatch();
    const responseData = useSelector((state) => state.Reducer.details);
    useEffect(() => {
        getDate();
    });

    const getDate =()=>{
        GetApiDetails().then(function (response) {
            dispatch(GetApiAction(response.data.Donner));
          }).catch(function (error) {
            console.log(error);
          });
    }

    const handleDelete=(id)=>{
        DeleteApiDetails(id).then(function (response) {
            console.log(response.data.status);
            if(response.data.status===true){
                getDate();
                dispatch(DeleteApiAction(id));
                toast.success("Produit Deleted successfully");
            }
          }).catch(function (error) {
              console.log(error.response);
          });
    }


    return (
        <div className="container">
            <h1 className="text-center">React Redux Axios Developpeur apps</h1>
            <div className="d-flex justify-content-end">
                <Link to="/form" className="btn btn-dark bg-info border-0">Add</Link>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Image</th>
                            <th scope="col">Libelle</th>
                            <th scope="col">Price</th>
                            <th scope="col">Content</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {responseData?.map((data, index) => {
                            return (<tr key={index}>
                                <th scope="row">{data.id}</th>
                                <td><img src={'http://127.0.0.1:8000/uploads/' + data.image} width="80px" alt="" /></td>
                                <td>{data.libelle}</td>
                                <td>{data.price} Ar</td>
                                <td>{data.content}</td>
                                <td><button className="btn btn-danger" onClick={()=>handleDelete(data.id)}>Delete</button></td>
                            </tr>);
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

// const Home = () => {
//     const dispatch = useDispatch();
//     const responseData = useSelector((state) => state.Reducer);

//     useEffect(() => {
//         dispatch(GetApiAction());
//     }, [dispatch]);


//     const result = responseData?.map((data, index) => {
//         return (<tr key={index}>
//             <th scope="row">{data.id}</th>
//             <td><img src={'http://127.0.0.1:8000/uploads/' + data.image} width="80px" alt="" /></td>
//             <td>{data.libelle}</td>
//             <td>{data.price} Ar</td>
//             <td>{data.content}</td>
//             <td><button className="btn btn-danger" >Delete</button></td>
//         </tr>);
//     });



//     return (
//         <div className="container">
//             <h1 className="text-center">React Redux Axios Developpeur apps</h1>
//             <div className="d-flex justify-content-end">
//                 <Link to="/form" className="btn btn-dark bg-info border-0">Add</Link>
//             </div>
//             <div>
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th scope="col">#</th>
//                             <th scope="col">Image</th>
//                             <th scope="col">Libelle</th>
//                             <th scope="col">Price</th>
//                             <th scope="col">Content</th>
//                             <th scope="col">Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {result?.length > 0 ? (result) : (<p>Pas de donner</p>)}
//                     </tbody>
//                 </table>
//             </div>

//         </div>
//     )
// }

export default Home
