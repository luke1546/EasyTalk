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

        selectedImages.forEach((image) => {
            formData.append("images", image);
        });
        formData.append("content", "저희 보리 귀엽죵");

        try {
            const response = await axios.post('http://localhost:8080/neighbor/feed', formData, {
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
