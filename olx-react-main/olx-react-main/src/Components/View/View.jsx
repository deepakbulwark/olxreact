import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { collection, where, getDocs, query } from 'firebase/firestore';

function View() {
  const [userDetails, setUserDetails] = useState({})
  const { postDetails } = useContext(PostContext)
  const { db } = useContext(FirebaseContext)

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const q = query(collection(db, "users"), where("userId", "==", postDetails.userId))
        const results = await getDocs(q)

        if (!results.empty) {
          setUserDetails(results.docs[0].data())
        }
      } catch (error) {
        console.error("error fetching details")
      }

    }
    fetchUserDetails()
  }, [db, postDetails.userId])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span> {postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
