import { useContext, useEffect, useState } from 'react';
import './navbar.scss';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useNotificationStore } from '../../lib/notificationStore';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext) 
  
  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  useEffect(() => {
    if (currentUser) {
      fetch();
    }
  },[currentUser,fetch])

  return (
    <nav>
     <div className="left">
        <Link href="/" className='logo'>
          <img src="/logo.png" alt="err" />
          <span>Estate</span>
        </Link>   
        <Link href="/">Home</Link>
        <Link href="/">About</Link>
        <Link to={"/list"}>Content</Link>
        <Link href="/">Agents</Link>
     </div>
     <div className="right">
        {currentUser ? (
         <div className='user'>
            <img
              src={currentUser.avatar || "/noavatar.jpg"}
              alt="err"
            />
            <span >{ currentUser.username}</span>
            <Link to={"/profile"} className='profile'>
            { number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
          ) : (
            <>
              <Link to="/login">
                Sign in
              </Link>
              <Link to="/register" className='register'>
                Sign up
              </Link>
           </>)}
        <div className='menuIcon'>
          <img src="/menu.png" alt="err" onClick={()=> setOpen((prev)=>!prev)} />
        </div>  
        <div className={open ? "menu active" : "menu"}>
          <Link href="/">Home</Link>
          <Link href="/">About</Link>
          <Link to={"/list"}>Content</Link>
          <Link href="/">Agents</Link>
          <Link href="/">Sign in</Link>
          <Link href="/">Sign up</Link>

        </div>
     </div> 
    </nav>
  )
}
