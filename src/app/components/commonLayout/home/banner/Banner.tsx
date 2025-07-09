"use client"
import Image from "next/image";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from "next/link";
import { ICourse } from "@/types";

const Banner = ({courses} : {courses : ICourse[]}) => {
    const categories = [
        {
            title: "Class 6",
            value: "6",
            courses: "15",
            img: "https://cdn.10minuteschool.com/images/image_6344663_1733036653015.png?w=300&h=300",
        },
        {
            title: "Class 7",
            value: "7",
            courses: "15",
            img: "https://cdn.10minuteschool.com/images/9-10_1732778140427.png?w=300&h=300",
        },
        {
            title: "Class 8",
            value: "8",
            courses: "15",
            img: "https://cdn.10minuteschool.com/images/ssc_1732778162589.png?w=300&h=300",
        },
        {
            title: "Class 9-10",
            value: "9-10",
            courses: "15",
            img: "https://cdn.10minuteschool.com/images/hscbag_1732778180651.png?w=300&h=300",
        },
        {
            title: "Class 11-12",
            value: "11-12",
            courses: "15",
            img: "https://i.postimg.cc/ydbVZjnz/Screenshot-27-removebg-preview.png",
        },
    ];


    return (
        <div className="bg-[#1f2b2a] lg:min-h-[70vh] md:min-h-[60vh] min-h-[50vh] flex flex-col justify-center items-center relative">
            {/* Left and Right Hero Images */}
            <Image
                className="absolute left-20 -bottom-25 z-20 lg:flex hidden"
                src="https://wp.rrdevs.net/edcare/wp-content/uploads/2025/02/hero-men-1-1.png"
                alt="Banner_image"
                width={500}
                height={400}
            />
            <Image
                className="absolute right-20 -bottom-25 z-20 lg:flex hidden"
                src="https://wp.rrdevs.net/edcare/wp-content/uploads/2025/02/hero-men-2.png"
                alt="Banner_image"
                width={500}
                height={400}
            />

            {/* Background Gradients */}
            <div className="absolute left-0 top-15 z-10 md:h-[450px] h-[250px] w-[240px] md:w-[430px] rotate-45 bg-gradient-to-l from-[#07e0cb] to-cyan-400 opacity-30 blur-[150px] filter dark:opacity-50"></div>
            <div className="absolute right-50 -bottom-10 z-10 md:h-[450px] h-[250px] w-[240px] md:w-[400px] rotate-45 bg-gradient-to-l from-[#07e0cb] to-cyan-400 opacity-30 blur-[150px] filter dark:opacity-50 md:block hidden"></div>

            {/* Bottom rounded background */}
            <div className="absolute -bottom-25 left-0 w-full h-[100px] bg-[#1f2b2a] rounded-b-full"></div>

            {/* Title and features */}
            <div className="text-center z-20 text-white px-4">
                <h2 className="lg:text-[64px] md:text-[44px] text-[34px] font-bold">
                    Start learning from <br />
                    the world’s <span className="text-[#07a698]">best institutions</span>
                </h2>
                <div className="md:flex hidden items-center justify-center gap-8 md:text-lg mt-6">
                    {["Get Certified", "Gain Job-ready Skills", "Great Life"].map((text, i) => (
                        <h3 key={i} className="flex gap-2 items-center">
                            <span className="bg-[#07e0cb] rounded-full p-1 flex items-center justify-center">
                                <CheckOutlinedIcon className="text-black" />
                            </span>
                            {text}
                        </h3>
                    ))}
                </div>
                <h2 className="text-lg mt-8">
                    Explore <span className="text-[#07e0cb] font-bold">1350+</span> Courses within Subject
                </h2>
            </div>

            {/* Swiper Slider */}
            <div className="absolute md:-bottom-50 -bottom-40 z-20 w-full px-4 max-w-[1100px] mx-auto">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={15}
                    autoplay={{ delay: 1500, disableOnInteraction: false }}
                    loop={true}
                    grabCursor={true}
                    breakpoints={{
                        0: { slidesPerView: 1.5 },
                        480: { slidesPerView: 2.5 },
                        768: { slidesPerView: 3.5 },
                        1024: { slidesPerView: 4.5 },
                        1280: { slidesPerView: 5.5 },
                    }}
                >
                    {categories?.map((category, idx) => (
                        <SwiperSlide key={idx}>
                            <Link key={idx} href={`/courses?class=${category.value}`}>
                                <div className="bg-white rounded-lg p-4 relative group overflow-hidden cursor-pointer ">
                                    <div className="absolute top-[-40px] right-[-40px] w-[157px] h-[157px] bg-[#07A698] blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full z-0"></div>
                                    <div className="relative z-10 flex flex-col items-center">
                                        <Image
                                            className="rounded-full bg-[#f2f4f7] p-3 w-[100px] h-[100px]"
                                            src={category?.img}
                                            alt="category"
                                            width={100}
                                            height={100}
                                        />
                                        <h2 className="text-lg text-center font-bold text-black mt-4">{category?.title}</h2>
                                        {
                                            courses?.filter(course => course?.class === category.value && course?.status === "Ongoing" && course?.isApproved === true).length > 0 ? (
                                                <p className="text-[#07a698] text-center mt-2">
                                                    {courses.filter(course => course?.class === category.value && course?.status === "Ongoing" && course?.isApproved === true).length} Ongoing
                                                </p>
                                            ) : (
                                                <p className="text-red-500 text-center mt-2">No Ongoing Courses</p>
                                            )
                                        }
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>


                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Banner;