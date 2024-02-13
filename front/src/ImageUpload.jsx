import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageChange = (e) => {
        setSelectedImages([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        
        formData.append("profileImage",selectedImages[0])
        formData.append("info", "좋은아침 입니다.");

        try {
            const response = await axios.put('http://localhost:8080/user', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" multiple onChange={handleImageChange} />
            <button type="submit">Upload</button>
        </form>
    );
};

export default ImageUpload;
