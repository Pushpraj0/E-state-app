import { useContext } from 'react';
import SearchBar from '../../components/searchBar/SearchBar';
import './homePage.scss';
import { AuthContext } from '../../context/AuthContext';

export default function HomePage() {
  const {currentUser } = useContext(AuthContext);
  console.log(currentUser);
  
  return (
    <div className='homePage'>
      <div className="textContainer">
        <div className='wrapper'>
         <h1 className='title'>Find Real State & Get Your Dream Place</h1> 
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet voluptas deserunt, accusamus facilis nisi placeat, eius obcaecati atque autem nobis aut eos facere omnis molestiae voluptate eum laborum delectus ipsum odio voluptatum quam architecto reprehenderit!</p>
         <SearchBar />
         <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000</h1>
              <h2>Property Ready</h2>
            </div> 
         </div> 
        </div>
      </div>
      <div className="imgContainer">
          <img src="/bg.png" alt="err" />
      </div>
    </div>
  )
}
