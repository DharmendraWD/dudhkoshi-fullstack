"use client";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import img1 from "../../../../public/img/blog/blog2.png";
import img2 from "../../../../public/img/proj/22.png";
import img3 from "../../../../public/img/proj/23.png";
import img4 from "../../../../public/img/proj/24.png";
import img5 from "../../../../public/img/proj/25.png";
import img6 from "../../../../public/img/proj/26.png";

const images = [
  {
    original: img1.src,
    thumbnail: img1.src,
  },
  {
    original: img2.src,
    thumbnail:img2.src,
  },
  {
    original: img3.src,
    thumbnail: img3.src,
  },
  {
    original: img4.src,
    thumbnail: img4.src,
  },
  {
    original: img5.src,
    thumbnail:img5.src,
  },
  {
    original: img6.src,
    thumbnail: img6.src,
  },
];

export default function MyGallery() {
  return(
    <div className="" id="gallery">
     <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-12 lg:mb-16">
         Gallery        </h2>
    <ImageGallery items={images} />
    
    </div>
  )
  
  ;
}
