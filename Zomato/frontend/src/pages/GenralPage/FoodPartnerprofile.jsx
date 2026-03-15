import React, { useEffect, useState } from "react";
import "../../Css/Fpatner.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const FoodPartnerprofile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [reels, setReels] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/foodpatner/${id}`, { withCredentials: true })
      .then((response) => {
        console.log("API DATA:", response.data);
        setProfile(response.data.foodPartner);
        setReels(response.data.foodPartner.foodItems || []);
      })
      .catch((err) => console.log("API ERROR:", err));
  }, [id]);

  // Show loading until API returns
  if (!profile) {
    return <div>Loading...</div>;
  }

  const data = profile; // safe to use now

  return (
    <div className="partner-page">
      <div className="partner-header">
        <img
          className="partner-avatar"
          src="/profile.webp"
        />
        <div className="partner-info">
          <h2 className="partner-name">{data.bName || "Business Name"}</h2>
          <p className="partner-owner">👤 Owner: {data.Name}</p>
          <p className="partner-email">📧 {data.email}</p>
          <p className="partner-address">📍 {data.address || "Address not added"}</p>
          <p className="partner-customers">🍽 {data.customersServed || 0} Customers Served</p>
        </div>
      </div>

      <div className="partner-actions">
        <button className="order-btn">Order Food</button>
        <button className="message-btn">Message</button>
        <button className="share-btn">Share</button>
      </div>

      <div className="partner-stats">
        <div>
          <h3>{reels.length}</h3>
          <p>Reels</p>
        </div>
        <div>
          <h3>{data.customersServed || 0}</h3>
          <p>Customers</p>
        </div>
        <div>
          <h3>{data.likes || 0}</h3>
          <p>Likes</p>
        </div>
      </div>

      <div className="reels-grid">
        {reels.length > 0 ? (
          reels.map((item) => (
            <video key={item._id} className="reel-thumb" src={item.video} muted />
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>No reels yet</p>
        )}
      </div>
    </div>
  );
};

export default FoodPartnerprofile;