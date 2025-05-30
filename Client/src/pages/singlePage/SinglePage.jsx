  import Slider from '../../components/slider/Slider';
  import Map from '../../components/map/Map';
  import './singlePage.scss';
  // import { singlePostData, userData } from '../../lib/dummydata';
  import { useLoaderData, useNavigate } from 'react-router-dom';
  import DOMPurify from "dompurify";
  import { useContext, useState } from 'react';
  import { AuthContext } from "../../context/AuthContext";
  import apiRequest from "../../lib/apiRequest";

  function SinglePage() {
    const navigate = useNavigate();
    const post = useLoaderData();
    const [saved,setSaved] = useState(post.isSaved)
    const { currentUser } = useContext(AuthContext);
    
    const handleSave = async () => {
      
      if (!currentUser) {
        navigate("/login");
      }
      setSaved((prev) => !prev); 
      
      try {
        await apiRequest.post("/users/save", { postId: post.id });
      } catch (err) {
      console.log(err);
        setSaved((prev) => !prev);    
      }
    }

    const handleMessage = async () => {
      if (!currentUser) {
        navigate("/login");
        return;
      }
      
      try {
        const existingChatRes = await apiRequest.get(`/chats/find/${currentUser.id}/${post.userId}`);
        const chatId = existingChatRes.data?.id;

        if (chatId) {
          navigate("/profile", { state: { chatId } });
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          try {
            const res = await apiRequest.post("/chats", { receiverId: post.userId });
            navigate("/profile", { state: { chatId: res.data.id } });
          } catch (error) {
            console.log(error);            
          }
        } else {
          console.log("Unexpected Error", err); 
        }       
      }
      
    }
    
    return (
      <div className='singlePage'>
        <div className="details">
          <div className="wrapper">
            <Slider images={post.images} />
            <div className="info">
              <div className="top">
                <div className="post">
                  <h1>{post.title}</h1>
                  <div className="address">
                    <img src="/pin.png" alt="err" />
                    <span>{post.address}</span>
                  </div>
                  <div className="price">$ {post.price }</div>
                </div>
                <div className="user">
                  <img src={post.user.avatar} alt="err" />
                  <span>{post.user.username}</span>
                </div>
              </div>
              <div className="bottom" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.postDetail.desc)}}>
                {/* {post.postDetail.desc} */}
              </div>
            </div>
          </div>
        </div>
        <div className="features">
          <div className="wrapper">
            <p className='title'>General</p>
            <div className="listVertical">
              <div className="feature">
                <img src="/utility.png" alt="err" />
                <div className="featureText">
                  <span>Utilities</span>
                  {post.postDetail.utilities === 'owner' ? (
                    <p>Owner is responsible</p>
                  ) : (
                      <p>Tenent is responsible</p>
                  )}
                </div>
              </div>
              <div className="feature">
                <img src="/pet.png" alt="err" />
                <div className="featureText">
                  <span>Pet Policy</span>
                    {post.postDetail.pet === 'allowed' ? (
                    <p>Pets Allowed</p>
                  ) : (
                      <p>Pets Not Allowed</p>
                  )}
                </div>
              </div>
              <div className="feature">
                <img src="/fee.png" alt="err" />
                <div className="featureText">
                  <span>Income Policy</span>
                  <p>{post.postDetail.income}</p>
                </div>
              </div>
            </div>
            <p className='title'>Room Sizes</p>
            <div className="sizes">
              <div className="size">
                <img src="/size.png" alt="err" />
                <span>{post.postDetail.size}sqft</span>
              </div>
              <div className="size">
                <img src="/bed.png" alt="err" />
                <span>{post.bedroom} beds </span>
              </div>
              <div className="size">
                <img src="/bath.png" alt="err" />
                <span>{post.bathroom} bathroom</span>
              </div>
            </div>
            <p className='title'>Nearby Places</p>
            <div className="listHorizontal">
              <div className="feature">
                <img src="/school.png" alt="err" />
                <div className="featureText">
                  <span>School</span>
                  <p>{post.postDetail.school > 999 ? post.postDetail.school/1000 + "km" : post.postDetail.school + "m"} away</p>
                </div>
              </div>
              <div className="feature">
                <img src="/pet.png" alt="err" />
                <div className="featureText">
                  <span>Bus Stop</span>
                  <p>{post.postDetail.bus > 999 ? post.postDetail.bus/1000 + "km" : post.postDetail.bus + "m"} away</p>
                </div>
              </div>
              <div className="feature">
                <img src="/school.png" alt="err" />
                <div className="featureText">
                  <span>Restaurant</span>
                  <p>{post.postDetail.restaurant > 999 ? post.postDetail.restaurant/1000 + "km" : post.postDetail.restaurant + "m"} away</p>
                </div>
              </div>
            </div>
            <p className='title'>Location</p>
            <div className="mapContainer">
              <Map items={[post]}/>
            </div>
            <div className="buttons">
              {currentUser?.id !== post.userId && (
                <button onClick={handleMessage}>
                  <img src="/chat.png" alt="err" />
                  Send a Message
                </button>
              )}
              <button onClick={handleSave} style={{
                backgroundColor: saved ? "#fece51" : "white"
              }}>
                <img src="/save.png" alt="err" />
              { saved ? "Place saved":"Save the Place"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  export default SinglePage;