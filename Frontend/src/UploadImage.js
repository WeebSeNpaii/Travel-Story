import axiosInstance from './axiosInstance';

const UploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axiosInstance.post(
      'http://localhost:3000/users/image-uploads',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error uploading the image:', error);
    throw error;
  }
};

export default UploadImage;
