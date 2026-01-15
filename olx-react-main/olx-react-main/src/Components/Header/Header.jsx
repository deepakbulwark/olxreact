import React, { useContext } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';



function Header() {
  const {user}=useContext(AuthContext)
  const {auth}=useContext(FirebaseContext)
  const navigate=useNavigate()

  const handlesell=()=>{
    navigate('/create')
  }

  const handleloginclick=()=>{
    if(!user){
      navigate('/login')
    }
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage" onClick={handleloginclick}>
          <span>{user ? user.displayName:"Login"}</span>
          <hr />
        </div>
        {user && <span onClick={async()=>{
          try{
            await signOut(auth);
          navigate('/login')
          }catch(error){
            console.error(error)
          }

        }}>Logout</span>}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div onClick={handlesell} className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
