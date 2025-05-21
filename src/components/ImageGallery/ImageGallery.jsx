import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import "./ImageGallery.css";
import "./reset.css";

// 画像を動的にインポート
const imageModules = import.meta.glob("../../assets/images/gallery-image (*.png)", { eager: true });

// コードのリスト（36個分）
const codes = [
  "1girl, stellar loussier, gundam",
  "1girl, hyuuga hinata, naruto (series)",
  "1girl, haruno sakura, pink hair, naruto (series)",
  "1girl, uchiha sarada, naruto (series)",
  "1girl, inoue orihime, bleach",
  "1girl, shizuku (kantoku), original",
  "1girl, chitanda eru, hyouka",
  "1girl, izayoi sakuya, touhou",
  "1girl, nena trinity, gundam",
  "1girl, hayakawa tazuna, umamusume",
  "1girl, arona's sensei doodle (blue archive), blue archive",
  "1girl, sinon (sao-alo), sword art online",
  "1girl, eva 02, neon genesis evangelion",
  "1girl, ogami sakura, danganronpa (series)",
  "1girl, kiana kaslana (herrscher of finality), honkai (series)",
  "1girl, pneuma (xenoblade), xenoblade chronicles (series)",
  "1girl, mythra (xenoblade), xenoblade chronicles (series)",
  "1girl, dokugamine riruka, bleach",
  "1girl, koshimizu toru, nijisanji",
  "1girl, aura (sousou no frieren), sousou no frieren",
  "1girl, nishikino maki, love live!",
  "1girl, hoshimachi suisei (school uniform), hololive",
  "1girl, leafa, sword art online",
  "1other, pom-pom (honkai star rail), honkai star rail",
  "1girl, yonah, nier (series)",
  "1girl, pavolia reine (1st costume), hololive",
  "1girl, enterprise (azur lane), azur lane",
  "1girl, murasaki shion (5th costume), hololive",
  "1girl, okita souji alter (first ascension) (fate), fate/grand order",
  "1girl, fran (ff12), final fantasy",
  "1girl, yuuki (sao), sword art online",
  "1girl, silica (sao-alo), sword art online",
  "1girl, bambietta basterbine, bleach",
  "1girl, matsumoto rangiku, bleach",
  "1girl, alice zuberg, sword art online",
  "1girl, matou sakura, fate (series)",
];

const ImageGallery = () => {
  const [images] = useState(() =>
    Object.keys(imageModules)
      .sort()
      .map((path, index) => ({
        src: imageModules[path].default, // Viteが解決するパスを使用
        code: codes[index],
      }))
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleImages, setVisibleImages] = useState([]);

  useEffect(() => {
    const timers = images.map((_, index) =>
      setTimeout(() => {
        setVisibleImages((prev) => [...prev, index]);
      }, index * 300)
    );
    return () => timers.forEach(clearTimeout);
  }, [images]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const breakpointColumnsObj = {
    default: 6,
    1280: 5,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="gallery-container">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`image-wrapper ${visibleImages.includes(index) ? "visible" : ""}`}
          >
            <img
              src={image.src}
              alt={`Image ${index}`}
              onClick={() => handleImageClick(image)}
              style={{ cursor: "pointer" }}
              onError={(e) => console.log(`Failed to load image ${index}:`, image.src)}
            />
            <div className="image-info">
              <h3 className="image-title">{image.title}</h3>
              <p className="image-code">{image.code}</p>
            </div>
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