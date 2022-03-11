import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./Slider.scss";

// import required modules
import { Pagination } from "swiper";

import Nft from '../../nft/Nft'
import video1 from '../../../assets/MP4/IMG_1324.MP4'
import video2 from '../../../assets/MP4/IMG_1325.MP4'
import video3 from '../../../assets/MP4/IMG_1326.MP4'

export default function Slider() {
    var imgPath1 = 'img_nft1.png'
    var imgPath2 = 'img_nft2.png'
    return (
        <>
            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                pagination={{
                clickable: true,
                }}
                // breakpoints={{
                //     640: {
                //         slidesPerView: 2,
                //         spaceBetween: 20,
                //     },
                //     768: {
                //         slidesPerView: 4,
                //         spaceBetween: 40,
                //     },
                //     1024: {
                //         slidesPerView: 3,
                //         spaceBetween: 50,
                //     },
                //     1480: {
                //         slidesPerView: 4,
                        
                //     }
                // }}
                
                grabCursor={true}
                modules={[Pagination]}
                // loop={true}
                className="mySwiper"
            >
                <SwiperSlide><Nft type='1' imgPath={imgPath1} video={video1} /></SwiperSlide>
                <SwiperSlide><Nft type='1' imgPath={imgPath1} video={video1} /></SwiperSlide>
                <SwiperSlide><Nft type='1' imgPath={imgPath1} video={video1} /></SwiperSlide>
                <SwiperSlide><Nft type='1' imgPath={imgPath1} video={video1} /></SwiperSlide>
                <SwiperSlide><Nft type='1' imgPath={imgPath1} video={video1} /></SwiperSlide>
                <SwiperSlide><Nft type='1' imgPath={imgPath1} video={video1} /></SwiperSlide>
                <SwiperSlide><Nft type='1' imgPath={imgPath1} video={video1} /></SwiperSlide>
                <SwiperSlide><Nft type='1' imgPath={imgPath1} video={video1} /></SwiperSlide>
                <SwiperSlide><Nft type='1' imgPath={imgPath1} video={video1} /></SwiperSlide>
            </Swiper>
        </>
    );
}
