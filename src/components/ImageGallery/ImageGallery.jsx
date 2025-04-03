import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import "./ImageGallery.css";
import "./reset.css";

const ImageGallery = () => {
  const [images] = useState([
    { src: "/src/assets/images/gallery-image (1).png", code: "1girl, stellar loussier, gundam" },
    { src: "/src/assets/images/gallery-image (2).png", code: "1girl, sinon (sao-alo), sword art online" },
    { src: "/src/assets/images/gallery-image (3).png", code: "1girl, leafa, sword art online" },
    { src: "/src/assets/images/gallery-image (4).png", code: "1girl, yuuki (sao), sword art online" },
    { src: "/src/assets/images/gallery-image (5).png", code: "1girl, silica (sao-alo), sword art online" },
    { src: "/src/assets/images/gallery-image (6).png", code: "1girl, bambietta basterbine, bleach" },
    { src: "/src/assets/images/gallery-image (7).png", code: "1girl, matsumoto rangiku, bleach" },
    { src: "/src/assets/images/gallery-image (8).png", code: "1girl, alice zuberg, sword art online" },
    { src: "/src/assets/images/gallery-image (9).png", code: "1girl, hyuuga hinata, naruto (series)" },
    { src: "/src/assets/images/gallery-image (10).png", code: "1girl, hyuuga hinata, naruto (series)" },
    { src: "/src/assets/images/gallery-image (11).png", code: "1girl, haruno sakura, pink hair, naruto (series)" },
    { src: "/src/assets/images/gallery-image (12).png", code: "1girl, uchiha sarada, naruto (series)" },
    { src: "/src/assets/images/gallery-image (13).png", code: "1girl, inoue orihime, bleach" },
    { src: "/src/assets/images/gallery-image (14).png", code: "1girl, shizuku (kantoku), original" },
    { src: "/src/assets/images/gallery-image (15).png", code: "1girl, chitanda eru, hyouka" },
    { src: "/src/assets/images/gallery-image (16).png", code: "1girl, izayoi sakuya, touhou" },
    { src: "/src/assets/images/gallery-image (17).png", code: "1girl, nena trinity, gundam" },
    { src: "/src/assets/images/gallery-image (18).png", code: "1girl, hayakawa tazuna, umamusume" },
    { src: "/src/assets/images/gallery-image (19).png", code: "1girl, arona's sensei doodle (blue archive), blue archive" },
    { src: "/src/assets/images/gallery-image (20).png", code: "1girl, eva 02, neon genesis evangelion" },
    { src: "/src/assets/images/gallery-image (21).png", code: "1girl, ogami sakura, danganronpa (series)" },
    { src: "/src/assets/images/gallery-image (22).png", code: "1girl, kiana kaslana (herrscher of finality), honkai (series)" },
    { src: "/src/assets/images/gallery-image (23).png", code: "1girl, pneuma (xenoblade), xenoblade chronicles (series)" },
    { src: "/src/assets/images/gallery-image (24).png", code: "1girl, mythra (xenoblade), xenoblade chronicles (series)" },
    { src: "/src/assets/images/gallery-image (25).png", code: "1girl, dokugamine riruka, bleach" },
    { src: "/src/assets/images/gallery-image (26).png", code: "1girl, koshimizu toru, nijisanji" },
    { src: "/src/assets/images/gallery-image (27).png", code: "1girl, aura (sousou no frieren), sousou no frieren" },
    { src: "/src/assets/images/gallery-image (28).png", code: "1girl, nishikino maki, love live!" },
    { src: "/src/assets/images/gallery-image (29).png", code: "1girl, hoshimachi suisei (school uniform), hololive" },
    { src: "/src/assets/images/gallery-image (30).png", code: "1other, pom-pom (honkai star rail), honkai star rail" },
    { src: "/src/assets/images/gallery-image (31).png", code: "1girl, yonah, nier (series)" },
    { src: "/src/assets/images/gallery-image (32).png", code: "1girl, pavolia reine (1st costume), hololive" },
    { src: "/src/assets/images/gallery-image (33).png", code: "1girl, enterprise (azur lane), azur lane" },
    { src: "/src/assets/images/gallery-image (34).png", code: "1girl, murasaki shion (5th costume), hololive" },
    { src: "/src/assets/images/gallery-image (35).png", code: "1girl, okita souji alter (first ascension) (fate), fate/grand order" },
    { src: "/src/assets/images/gallery-image (36).png", code: "1girl, fran (ff12), final fantasy" },
  ]);

  // モーダルの状態管理
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  // 表示状態を管理する配列
  const [visibleImages, setVisibleImages] = useState([]);

  // コンポーネントマウント時に画像を順次表示
  useEffect(() => {
    const timers = images.map((_, index) =>
      setTimeout(() => {
        setVisibleImages((prev) => [...prev, index]);
      }, index * 300) // 0.3秒ごとに表示
    );
    return () => timers.forEach(clearTimeout); // クリーンアップ
  }, [images]);

  // 画像クリック時にモーダルを表示
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // モーダルを閉じる
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
            />
            <div className="image-info">
              <h3 className="image-title">{image.title}</h3>
              <p className="image-code">{image.code}</p>
            </div>
          </div>
        ))}
      </Masonry>

      {/* モーダル */}
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