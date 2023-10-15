import logoupload from "../../assets/download.svg";
import  { useState } from 'react';
import axios from 'axios';

function Upload4() {
    const [imageFile, setImageFile] = useState(null);
    const [imageP, setImageP] = useState(null);
    const [imagePm, setImagePm] = useState(null);
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      setImageFile(file);
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('file', imageFile);
  
      try {
        const response = await axios.post('http://127.0.0.1:5000/MSPrediction4', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log(response.data);
        // Update the state with the prediction results
        setImageP(response.data.original_image);
        setImagePm(response.data.mask_image);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
  return (
    <>
    <div className="container">
    <div className="row justify-content-center m-0 p-0 ">
    <div className=" col-lg-3">
    <h6 className="mb-3 title-upload ">
      Upload Your Photo for Segmentaion Image
    </h6>
    <div className="card-upload text-center bg-opacity-10 bg-dark p-5">
      <form onSubmit={handleSubmit} className="card-hover position-relative">
        <input type="file" className="position-absolute file" accept="file*" name="file" onChange={handleImageUpload}></input>
        <img className="svg-upload" src={logoupload} alt=".."></img>
        <h6 className="drog-drop mt-3">
          Drag & drop files 
          <span className="browse btn-link" id="browse" type="files">
            Browse
          </span>
        </h6>
      </form>
      <span className="supported-text text-white-50 text-opacity-50">
        Supported formates:
        <span className="supported-type">
          {" "}
          JPEG, PNG, GIF
        </span>
      </span>
    </div>
  </div>
  <div className="col-lg-2 d-flex my-3 my-lg-0 justify-content-center justify-content-lg-start  align-items-center ">
    <button className=" btn btn-primary w-100" type="submit" onClick={handleSubmit} >predict</button>
  </div>
  {imageP &&
  <div className="col-lg-7" >
  <h6 className="mb-3 mt-2 title-upload ">
      predict Your Photo
    </h6>
  <div className="card-upload row m-0 p-0 position-relative bg-opacity-10 bg-dark ">
    <img className="col-lg-5 h-100 bg-white " src={`data:image/jpeg;base64,${imageP}`} alt="pic" />
    <img className=" position-absolute top-0 col-lg-5 h-100" src={`data:image/jpeg;base64,${imagePm}`} alt="pic" />
    </div>
  </div>
  }
</div>
</div>
</>
);
}

export default Upload4