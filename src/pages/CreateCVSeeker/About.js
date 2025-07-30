import React from 'react';
import images from '~/assets/Images';

const ImageComponent = () => {
  return (
    <div>
      <img src={images['152.jpg']} alt="152" />
    </div>
  );
};

export default ImageComponent;
