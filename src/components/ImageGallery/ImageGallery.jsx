import React, { useState, useEffect, useMemo } from "react";
import Masonry from "react-masonry-css";
import "./ImageGallery.css";
import "./reset.css";

const imageModules = import.meta.glob("../../assets/images/g-image (*.png)", { eager: true });

const ImageGallery = () => {
  const [images] = useState(() =>
    Object.keys(imageModules)
      .sort()
      .map((path) => ({
        src: imageModules[path].default,
      }))
  );

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ウィンドウ幅に基づいて表示する画像の枚数を決定
  const maxImages = useMemo(() => {
    if (windowWidth >= 1280) return images.length; // 1280px以上: 全画像
    if (windowWidth >= 1024) return 8;
    if (windowWidth >= 768) return 6;
    return 4; // 768px未満: 4枚
  }, [windowWidth, images.length]);

  const displayImages = useMemo(() => images.slice(0, maxImages), [images, maxImages]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleImages, setVisibleImages] = useState([]);

  useEffect(() => {
    const timers = displayImages.map((_, index) =>
      setTimeout(() => {
        setVisibleImages((prev) => [...prev, index]);
      }, index * 300)
    );
    return () => timers.forEach(clearTimeout);
  }, [displayImages]);



  const breakpointColumnsObj = {
    default: 6,
    1280: 4,
    1024: 3,
    768: 2,
    0: 2,
  };

  return (
    <div className="gallery-container">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {displayImages.map((image, index) => (
          <div
            key={index}
            className={`image-wrapper ${visibleImages.includes(index) ? "visible" : ""}`}
          >
            <img
              src={image.src}
              alt={`Image ${index}`}
              onError={(e) => console.log(`Failed to load image ${index}:`, image.src)}
            />
          </div>
        ))}
      </Masonry>

      {isModalOpen && selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt="Expanded" className="modal-image" />
            <button className="modal-close-button" onClick={closeModal}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;