import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext } from '../../store/Context';
import { AuthContext } from '../../store/Context';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const { storage } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const date = new Date()
  const navigate=useNavigate()

  const imageUploadToCloudinary=async()=>{
    const formdata=new FormData()
    formdata.append('file',image)
    formdata.append('upload_preset', 'ml_default')

    try{
      const response=await axios.post("https://api.cloudinary.com/v1_1/dqzfwvmoe/image/upload",formdata);
      if(response.data.secure_url){
        return response.data.secure_url
      }
    }catch(error){
      console.error("error uploading image",error)
    }
  }


  const handlesubmit = async () => {
    try {
      const imageURL = await imageUploadToCloudinary()
      if (!imageURL) {
        console.error("image upload failed")
        return
      }
      await addDoc(collection(db, 'products'), {
        name,
        category,
        price,
        url: imageURL,
        userId: user.uid,
        createdAt: date.toDateString()
      })
    } catch (error) {
      console.error('Error adding product:', error);
    }
    navigate('/')

  }


  return (
    <Fragment>
      <Header />
      <div>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input className="input" type="number" id="fname" value={price}
            onChange={(e) => setPrice(e.target.value)} />
          <br />

          <br />
          {image && <img width="200px" height="200px" src={URL.createObjectURL(image)}></img>}
          <br />
          <input onChange={(e) => {
            setImage(e.target.files[0])
          }} type="file" />
          <br />
          <button onClick={handlesubmit} className="uploadBtn">upload and Submit</button>

        </div>
      </div>
    </Fragment>
  );
};

export default Create;
