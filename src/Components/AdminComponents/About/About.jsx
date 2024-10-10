import React, { useState } from 'react';
import axios from 'axios';
import URL from "../../../apiconfig";

const About = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photoFiles, setPhotoFiles] = useState([]);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [isPhotosUploaded, setIsPhotosUploaded] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 3) {
      setPhotoFiles(files);
    } else {
      alert("Please select exactly three photos.");
      setPhotoFiles([]);
    }
  };

  const handleFileUpload = async () => {
    const photoIds = await Promise.all(photoFiles.map(async (file) => {
      const formData = new FormData();
      formData.append('upload', file);

      try {
        const Authorization = localStorage.getItem('token');
        const response = await axios.post(`${URL}/api/file/upload`, formData, {
          headers: {
            Authorization,
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data.fileId;
    
      } catch (error) {
        console.error('Error uploading photo:', error);
        alert('Error uploading photo');
      }
    }));

    setUploadedPhotos(photoIds);
    setIsPhotosUploaded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPhotosUploaded) {
      alert("Please upload photos before submitting.");
      return;
    }

    const aboutUsData = {
      title,
      description,
      photos: uploadedPhotos,
    };

    try {
      const Authorization = localStorage.getItem('token');
      const response = await axios.post(`${URL}/api/aboutus/create`, aboutUsData, {
        headers: {
          Authorization,
          'Content-Type': 'application/json',
        },
      });
      alert('About Us section updated successfully');
    } catch (error) {
      console.error('Error updating About Us section:', error);
      alert('Error updating About Us section');
    }
  };

  return (
    <div className="about-us-update text-black">
      <h2 className="text-3xl font-bold mb-5 text-center">Update About Us</h2>
      <form onSubmit={handleSubmit} className='bg-gray-200 flex flex-col'>
        {/* Title */}
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        {/* Description */}
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        {/* File Upload */}
        <label>Upload Photos:</label>
        <input type="file" multiple onChange={handleFileChange} accept="image/*" />
        <button
          type="button"
          onClick={handleFileUpload}
          className={`bg-blue-600 mb-2 w-fit ${photoFiles.length === 3 ? '' : 'opacity-50 cursor-not-allowed'}`}
          disabled={photoFiles.length !== 3}
        >
          Upload Photos
        </button>

        {/* Uploaded Photo IDs */}
        {uploadedPhotos.length === 3 && (
          <div className="uploaded-photos">
            <h3>Uploaded Photo IDs:</h3>
            {uploadedPhotos.map((photoId, index) => (
              <p key={index}>{photoId}</p>
            ))}
          </div>
        )}

        <button
          type="submit"
          className={`bg-blue-600 mb-2 w-fit ${isPhotosUploaded ? '' : 'opacity-50 cursor-not-allowed'}`}
          disabled={!isPhotosUploaded}
        >
          Update About Us
        </button>
      </form>
    </div>
  );
};

export default About;
