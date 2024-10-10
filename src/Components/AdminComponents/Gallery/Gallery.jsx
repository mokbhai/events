import React, { useEffect, useState } from "react";
import axios from "axios";
import URL from "../../../apiconfig";
import "./gallery.css";

const Gallery = () => {
  const [gallery, setGallery] = useState({ photos: [], video: "" });
  const [newPhoto, setNewPhoto] = useState(null);
  const [newVideo, setNewVideo] = useState("");
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await axios.get(`${URL}/api/gallery`);
      setGallery(response.data);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      alert("Error fetching gallery");
    }
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleDeletePhoto = async (id) => {
    try {
      const Authorization = localStorage.getItem("token");
      await axios.delete(`${URL}/api/file/${id}`, {
        headers: { Authorization },
      });
      setGallery((prevGallery) => ({
        ...prevGallery,
        photos: prevGallery.photos.filter((photoId) => photoId !== id),
      }));
      alert("Photo deleted successfully");
    } catch (error) {
      console.error("Error deleting photo:", error);
      alert("Error deleting photo");
    }
  };

  const handleDeleteVideo = async () => {
    try {
      const Authorization = localStorage.getItem("token");
      await axios.delete(`${URL}/api/gallery/video`, {
        headers: { Authorization },
      });
      setGallery((prevGallery) => ({
        ...prevGallery,
        video: "",
      }));
      alert("Video deleted successfully");
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Error deleting video");
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const Authorization = localStorage.getItem("token");

    for (const file of files) {
      const formData = new FormData();
      formData.append("upload", file);
      formData.append("type", "Gallery");

      try {
        const response = await fetch(URL + "/api/file/upload", {
          method: "POST",
          headers: {
            Authorization,
          },
          body: formData,
        });

        const data = await response.json();
      } catch (error) {
        console.error(error);
      }
    }
    setUploading(false);
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("upload", file);

    try {
      const Authorization = localStorage.getItem("token");
      const response = await axios.post(`${URL}/api/file/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization,
        },
      });
      setGallery((prevGallery) => ({
        ...prevGallery,
        video: response.data.fileId,
      }));
      alert("Video uploaded successfully");
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Error uploading video");
    }
  };

  return (
    <div className="gallery-container p-10">
      <h1 className="text-3xl font-bold mb-5 text-center">Gallery</h1>
      <div className="gallery-list mb-5 grid grid-cols-4 gap-4">
        {gallery.photos.map((photo) => (
          <div
            key={photo}
            className="gallery-item bg-gray-200 p-4 rounded flex flex-col items-center"
          >
            <img
              src={`${URL}/api/file/view/${photo}`}
              alt="Gallery"
              className="w-full h-40 object-cover rounded mb-2"
            />
            <button
              className="bg-red-600 p-2 rounded text-white"
              onClick={() => handleDeletePhoto(photo)}
            >
              Delete
            </button>
          </div>
        ))}
        {gallery.video && (
          <div className="gallery-item bg-gray-200 p-4 rounded flex flex-col items-center">
            <video
              controls
              src={`${URL}/api/file/view/${gallery.video}`}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <button
              className="bg-red-600 p-2 rounded text-white"
              onClick={handleDeleteVideo}
            >
              Delete Video
            </button>
          </div>
        )}
      </div>

      {uploading && <div className="loader">Uploading...</div>}
      {!uploading && (
        <div className="upload-section">
          <h2 className="text-2xl mb-4">Add New Photo</h2>
          <input type="file" multiple onChange={handleFileChange} />
          <button onClick={handleFileSubmit}>Upload</button>
        </div>
      )}
      <div className="upload-section mt-5">
        <h2 className="text-2xl mb-4">Add New Video</h2>
        <input type="file" onChange={handleVideoUpload} />
      </div>
    </div>
  );
};

export default Gallery;
