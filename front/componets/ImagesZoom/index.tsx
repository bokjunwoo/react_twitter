import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Slick from 'react-slick'
import { Overlay, Global, Header, CloseBtn, ImageWrapper, Indicator ,SlickWrapper } from './style'

export default function ImagesZoom({ images, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <SlickWrapper>
        <div>
          <Slick 
          initialSlide={0}
          beforeChange={(slide) => setCurrentSlide(slide)}
          infinite
          arrows={false}
          slidesToShow={1}
          slidesToScroll={1}
          >
            {images.map((v) => (
              <ImageWrapper key={v.src}>
                <img src={`http://localhost:3333/${v.src}`} alt={v.src} />
              </ImageWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1}
              {' '}
              /
              {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  )
}

ImagesZoom.prototype = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired
}
