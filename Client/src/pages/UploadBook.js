import React, { useState } from 'react';
import axios from 'axios';
const UploadBook = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
  
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  
    const handleUpload = async (event) => {
      event.preventDefault();
  
      if (!file) {
        setMessage('Please select a file to upload.');
        return;
      }
  
      const token = localStorage.getItem('token');
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
  
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('description', description);
  
      try {
        const apiUrl = 'http://localhost:5000/books/upload';
        console.log(`Uploading to: ${apiUrl}`);
        console.log('FormData:', formData);
        const response = await axios.post(apiUrl, formData, config);
  
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error uploading file:', error);
        setMessage('Error uploading file.');
      }
    };

    return (
        <div>
            <style>
                {`
                    .upload-book-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        padding: 20px;
                        background-color: #F0E2C6;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        width: 80%;
                        max-width: 600px;
                        margin: 20px auto;
                    }

                    .upload-book-container h2 {
                        font-size: 24px;
                        color: #3E2723; /* Dark brown color */
                        margin-bottom: 20px;
                        font-weight: bold;
                    }

                    .upload-book-container form {
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                        gap: 15px; /* Add spacing between fields */
                    }

                    .upload-book-container input[type="text"],
                    .upload-book-container textarea,
                    .upload-book-container input[type="file"] {
                        padding: 12px;
                        margin: 0;
                        background-color: #efebde;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        font-size: 16px;
                        width: 100%;
                        box-sizing: border-box;
                    }
                    .upload-book-container input[type="file"] {
                        padding: 12px;
                        background-color: #efebde;
                    }

                    .upload-book-container input[type="text"]:focus,
                    .upload-book-container textarea:focus,
                    .upload-book-container input[type="file"]:focus {
                        background-color: #efebde;
                        border-color: #3E2723;
                        outline: none;
                    }

                    .upload-book-container textarea {
                        background-color: #efebde;
                        resize: vertical;
                        min-height: 120px;
                    }

                    .upload-book-container button {
                        background: linear-gradient(45deg, #3E2723, #867A6B);
                        color: white;
                        padding: 12px 20px;
                        border: none;
                        border-radius: 4px;
                        font-size: 16px;
                        cursor: pointer;
                        transition: background 0.3s ease;
                        width: 100%;
                        box-sizing: border-box;
                    }

                    .upload-book-container button:hover {
                        background: linear-gradient(45deg, #867A6B, #3E2723);
                    }

                    .upload-book-container p {
                        color: #333;
                        font-size: 16px;
                        margin-top: 15px;
                        text-align: center;
                    }



                    /* Align labels properly above input fields */
                    .upload-book-container input[type="text"],
                    .upload-book-container textarea {
                        font-size: 16px;
                    }
                `}
            </style>

            <div className="upload-book-container">
                <h2>Upload Your Book</h2>
                <form onSubmit={handleUpload}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <input type="file" accept=".pdf" onChange={handleFileChange} required />
                    <button type="submit">Upload</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default UploadBook;
