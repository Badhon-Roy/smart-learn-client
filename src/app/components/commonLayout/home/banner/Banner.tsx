"use client"
import Image from "next/image";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const Banner = () => {
    const categories = [
        {
            title: "Category",
            courses: "15",
            img: "https://wp.rrdevs.net/edcare/wp-content/uploads/2025/02/cat-icon-1.png",
        },
        {
            title: "Category",
            courses: "15",
            img: "https://wp.rrdevs.net/edcare/wp-content/uploads/2025/02/cat-icon-1.png",
        },
        {
            title: "Category",
            courses: "15",
            img: "https://wp.rrdevs.net/edcare/wp-content/uploads/2025/02/cat-icon-1.png",
        },
        {
            title: "Category",
            courses: "15",
            img: "https://wp.rrdevs.net/edcare/wp-content/uploads/2025/02/cat-icon-1.png",
        },
        // Repeat or map more as needed
    ];
    return (
        <div className="bg-[#1f2b2a] lg:min-h-[70vh] md:min-h-[60vh] min-h-[50vh] flex flex-col justify-center items-center relative">
            <Image className="absolute left-20 -bottom-25 z-20 lg:flex hidden" src="https://wp.rrdevs.net/edcare/wp-content/uploads/2025/02/hero-men-1-1.png" alt="Banner_image" width={500} height={400}></Image>
            <Image className="absolute right-20 -bottom-25 z-20 lg:flex hidden" src="https://wp.rrdevs.net/edcare/wp-content/uploads/2025/02/hero-men-2.png" alt="Banner_image" width={500} height={400}></Image>

            <div className="absolute left-0 top-15 z-10 md:h-[450px] h-[250px] w-[240px] md:w-[430px] rotate-45 bg-gradient-to-l from-[#07e0cb] to-cyan-400 opacity-30 blur-[150px] filter dark:opacity-50"></div>
            <div className="absolute right-50 -bottom-10 z-10 md:h-[450px] h-[250px] w-[240px] md:w-[400px] rotate-45 bg-gradient-to-l from-[#07e0cb] to-cyan-400 opacity-30 blur-[150px] filter dark:opacity-50 md:block hidden"></div>

            <div className="absolute -bottom-25 left-0 w-full h-[100px] bg-[#1f2b2a] rounded-b-full"></div>

            <div className="text-center z-20 text-white">
                <h2 className="lg:text-[64px] md:text-[44px] text-[34px] font-bold">Start learning from <br />
                    the world’s <span className="text-[#07a698]">best institutions</span></h2>
                <div className="md:flex hidden items-center justify-center gap-8 md:text-lg">
                    <h3 className="flex gap-2 items-center">
                        <span className="bg-[#07e0cb] rounded-full p-1 flex items-center justify-center">
                            <CheckOutlinedIcon className="text-black" /></span>
                        Get Certified</h3>
                    <h3 className="flex gap-2 items-center">
                        <span className="bg-[#07e0cb] rounded-full p-1 flex items-center justify-center">
                            <CheckOutlinedIcon className="text-black" /></span>
                        Gain Job-ready Skills</h3>
                    <h3 className="flex gap-2 items-center">
                        <span className="bg-[#07e0cb] rounded-full p-1 flex items-center justify-center">
                            <CheckOutlinedIcon className="text-black" /></span>
                        Great Life</h3>
                </div>
                <h2 className="text-lg mt-8">Explore <span className="text-[#07e0cb] font-bold">1350+</span> Courses within Subject</h2>

            </div>

            <div className="absolute md:-bottom-50 -bottom-40 z-20 md:w-auto w-full">
                {/* Grid for md and up */}
                <div className="hidden md:grid grid-cols-4 gap-8">
                    {
                        categories?.map((category, idx) => (
                            <div key={idx} className="bg-white rounded-lg py-8 px-12 relative group overflow-hidden">
                                <div className="absolute top-[-40px] right-[-40px] w-[157px] h-[157px] bg-[#07A698] blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full z-0"></div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <Image
                                        className="rounded-full bg-[#f2f4f7] p-3"
                                        src={category?.img}
                                        alt="category"
                                        width={100}
                                        height={100}
                                    />
                                    <h2 className="text-lg text-center font-bold text-black mt-4">{category?.title}</h2>
                                    <p className="text-black text-center">{category?.courses} Courses</p>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* Slider for sm and below */}
                <div className="md:hidden">
                    <Swiper spaceBetween={4} slidesPerView={1.9}>
                        {categories.map((category, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="bg-white rounded-lg p-4 relative group overflow-hidden w-[200px] mx-10">
                                    <div className="absolute top-[-20px] right-[-20px] bg-[#07A698] blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full z-0"></div>
                                    <div className="relative z-10 flex flex-col items-center">
                                        <Image
                                            className="rounded-full bg-[#f2f4f7] p-3"
                                            src={category?.img}
                                            alt="category"
                                            width={80}
                                            height={80}
                                        />
                                        <h2 className="text-lg text-center font-bold text-black mt-4">{category?.title}</h2>
                                        <p className="text-black text-center">{category?.courses} Courses</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Banner;