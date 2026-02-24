import React from 'react';
import AdminWrapper from '@/Components/AdminComponents/AdminWrapper';
import Galleryupload from './Galleryupload';

const Admingallery = () => {
  return (
    <AdminWrapper activeTab="gallery">
      <Galleryupload/>
    </AdminWrapper>
  );
};

export default Admingallery;