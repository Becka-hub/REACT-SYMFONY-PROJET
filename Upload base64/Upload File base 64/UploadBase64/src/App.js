import React, { useState } from 'react';
import axios from 'axios';
const App = () => {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const [fileBase64String, setFileBase64String] = useState("");
  const [message,setMessage]=useState();
  const NameInput = (e) => {
    setName(e.target.value);
  }
  const FileInput = (e) => {
    var reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        var Base64 = reader.result;
        console.log(Base64);
        setFileBase64String(Base64);
      };
      reader.onerror = (error) => {
        console.log('Error', error);
      };
    }
  }

  const handleRequest = (e) => {
    e.preventDefault();
    console.log(fileBase64String);

                        axios.post(
                            'http://127.0.0.1:8000/ajouteImage',
                            {name:name,
                             image:fileBase64String},
                        ).then(function (response) {
                            console.log(response);
                            setMessage(response.data.message)
                        })
                            .catch(function (error) {
                                console.log(error.response);
                            });
  }

  return (
    <div>
      <h1 className="text-center">Base64 File Upload</h1>
      {message && (<h4 className="text-center text-success">{message}</h4>)}
      <div className="d-flex justify-content-center">
      <div className="col-md-6">      <form onSubmit={handleRequest}>
        <input type="text" className="form-control"  placeholder="Votre nom ..." onChange={NameInput} />
        <input type="file" className="form-control my-2"  onChange={FileInput} />
        <div className="d-flex justify-content-center my-2">
        <img src={fileBase64String} width="200px" />
        </div>
        <div className="d-flex justify-content-center">
        <input type="submit" className=" btn btn-success my-2" value="ajoute" />
        </div>
      </form>
      </div>
      </div>

    </div>
  );
}

export default App;
