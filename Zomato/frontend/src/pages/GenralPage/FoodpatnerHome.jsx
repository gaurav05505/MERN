import React, { useState } from "react";
import "../../Css/createReel.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const FoodpatnerHome = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    video: null
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleVideoChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setFormData({
      ...formData,
      video: file
    });

    setPreview(URL.createObjectURL(file));
  };

  const removeVideo = () => {

    setFormData({
      ...formData,
      video: null
    });

    setPreview(null);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("video", formData.video);

    try {

      const res = await axios.post(
        "http://localhost:3000/api/food",
        data,
        {
          withCredentials: true
        }
      );

      console.log(res.data);
      navigate('/')

      alert("Food reel uploaded!");

    } catch (err) {

      console.log(err);
      alert("Upload failed");

    }

  };

  return (

    <div className="create-reel-page">

      <h2>Create Food Reel</h2>

      <form className="create-reel-form" onSubmit={handleSubmit}>

        <label>Food Name</label>

        <input
          type="text"
          name="name"
          placeholder="Chocolate Cake"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Upload Video</label>

        {!preview && (

          <label htmlFor="videoUpload" className="upload-field">
            Tap to upload video 🎥
          </label>

        )}

        <input
          id="videoUpload"
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
        />

        {preview && (

          <div className="video-preview-box">

            <video
              src={preview}
              controls
              className="video-preview"
            />

            <div className="video-actions">

              <label htmlFor="videoUpload" className="change-btn">
                Change
              </label>

              <button
                type="button"
                className="remove-btn"
                onClick={removeVideo}
              >
                Remove
              </button>

            </div>

          </div>

        )}

        <label>Description</label>

        <textarea
          name="description"
          rows="4"
          placeholder="Tell something about the food..."
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Upload Reel
        </button>

      </form>

    </div>

  );

};

export default FoodpatnerHome;
