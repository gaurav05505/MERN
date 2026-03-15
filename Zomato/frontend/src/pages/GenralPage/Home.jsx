import React, { useEffect, useRef, useState } from "react";
import "../../Css/reel.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {

  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/food", { withCredentials: true })
      .then((response) => {
        setVideos(response.data.foodItem);
      });
  }, []);

  async function likeVideo(item){ 
    try {
      const response = await axios.post(
        'http://localhost:3000/api/food/like', 
        { foodId: item._id }, 
        { withCredentials: true }
      );

      if(response.data.like){
        console.log("video liked");
        setVideos((prv)=> prv.map((v) => v._id === item._id ?  {...v , likecount: v.likecount+1} : v))
      } else {
        console.log("video unliked");
        setVideos((prv)=> prv.map((v) => v._id === item._id ?  {...v , likecount: v.likecount-1} : v))
      }
    } catch (error) {
      console.log("Failed to like video:", error.response?.data?.message || error.message);
    }
  }




  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {

          const video = entry.target;

          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }

        });
      },
      { threshold: 0.7 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };

  }, [videos]);

  return (
    <div className="app-wrapper">
      <div className="reels-wrapper">

        <div className="reels-container">
          {videos.map((item, index) => (
            <div key={item._id} className="reel-item">

              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="reel-video"
                src={item.video}
                loop
                muted
                playsInline
              />

              <div className="reel-overlay">

                <div className="reel-info">
                  <h3 className="reel-username">{item.name}</h3>
                  <p className="reel-description">{item.description}</p>

                  <Link
                    to={`/foodpatner/${item.foodPatner}`}
                    className="visit"
                  >
                    Visit Store
                  </Link>

                </div>

                <div className="reel-sidebar">

                  <button onClick={() => likeVideo(item)} className="sidebar-btn">
                    <img src="like.svg" alt="" />
                    <p>{item.likecount}</p>
                  </button>

                  <button className="sidebar-btn">
                    <img src="comment.svg" alt="" />
                    <p>{item.comments}</p>
                  </button>

                  <button className="sidebar-btn">
                    <img src="share.svg" alt="" />
                    <p>Share</p>
                  </button>

                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;