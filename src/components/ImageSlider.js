import React from 'react';
import { Carousel } from 'react-bootstrap';
import './ImageSlider.css'; // Import custom CSS

const ImageSlider = () => (
  <Carousel>
    {[...Array(10).keys()].map((_, index) => (
      <Carousel.Item key={index}>
        <img
          className="d-block carousel-img"
          src={`${process.env.PUBLIC_URL}/img${index + 1}.jpg`}
          alt={`Slide ${index + 1}`}
        />
        <Carousel.Caption>
          <h3>{`Slide ${index + 1} Title`}</h3>
          <p>{`Slide ${index + 1} Description`}</p>
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
);

export default ImageSlider;
