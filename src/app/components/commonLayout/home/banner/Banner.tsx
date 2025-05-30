import Image from "next/image";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const Banner = () => {
    return (
        <div className="bg-[#1f2b2a] min-h-[70vh] flex flex-col justify-center items-center relative">
            <Image className="absolute left-20 -bottom-25 z-20" src="https://wp.rrdevs.net/edcare/wp-content/uploads/2025/02/hero-men-1-1.png" alt="Banner_image" width={500} height={400}></Image>
            <Image className="absolute right-20 -bottom-25 z-20" src="https://wp.rrdevs.net/edcare/wp-content/uploads/2025/02/hero-men-2.png" alt="Banner_image" width={500} height={400}></Image>

            <div className="absolute left-0 top-15 z-10 md:h-[450px] h-[250px] w-[240px] md:w-[430px] rotate-45 bg-gradient-to-l from-[#07e0cb] to-cyan-400 opacity-30 blur-[150px] filter dark:opacity-50"></div>
            <div className="absolute right-0 -bottom-10 z-10 md:h-[450px] h-[250px] w-[240px] md:w-[430px] rotate-45 bg-gradient-to-l from-[#07e0cb] to-cyan-400 opacity-30 blur-[150px] filter dark:opacity-50"></div>

            <div className="absolute -bottom-25 left-0 w-full h-[100px] bg-[#1f2b2a] rounded-b-full"></div>

            <div className="text-center z-20 text-white">
                <h2 className="text-[64px] font-bold">Start learning from <br />
                    the world’s <span className="text-[#07a698]">best institutions</span></h2>
                <div className="flex items-center justify-center gap-8 text-lg">
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
                <h2 className="text-lg mt-8">Explore <span className="text-[#07e0cb]">1350+</span> Courses within Subject</h2>
      
            </div>
            <div className="absolute -bottom-50 grid grid-cols-4 gap-8 z-20">
                <div className="bg-white rounded-lg py-8 px-12 relative group overflow-hidden">
                    <div className="absolute top-[-40px] right-[-40px] w-[157px] h-[157px] bg-[#07A698] blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full z-0"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <Image
                            className="rounded-full bg-[#f2f4f7] p-3"
                            src="https://wp.rrdevs.net/edcare/wp-content/uploads/2025/02/cat-icon-1.png"
                            alt="category"
                            width={100}
                            height={100}
                        />
                        <h2 className="text-lg text-center font-bold text-black mt-4">Category</h2>
                        <p className="text-black text-center">15 Courses</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg py-8 px-12 relative group overflow-hidden">
                    <div className="absolute top-[-40px] right-[-40px] w-[157px] h-[157px] bg-[#07A698] blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full z-0"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <Image
                            className="rounded-full bg-[#f2f4f7] p-3"
                            src="https://wp.rrdevs.net/edcare/wp-content/uploads/2025/02/cat-icon-1.png"
                            alt="category"
                            width={100}
                            height={100}
                        />
                        <h2 className="text-lg text-center font-bold text-black mt-4">Category</h2>
                        <p className="text-black text-center">15 Courses</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg py-8 px-12 relative group overflow-hidden">
                    <div className="absolute top-[-40px] right-[-40px] w-[157px] h-[157px] bg-[#07A698] blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full z-0"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <Image
                            className="rounded-full bg-[#f2f4f7] p-3"
                            src="https://wp.rrdevs.net/edcare/wp-content/uploads/2025/02/cat-icon-1.png"
                            alt="category"
                            width={100}
                            height={100}
                        />
                        <h2 className="text-lg text-center font-bold text-black mt-4">Category</h2>
                        <p className="text-black text-center">15 Courses</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg py-8 px-12 relative group overflow-hidden">
                    <div className="absolute top-[-40px] right-[-40px] w-[157px] h-[157px] bg-[#07A698] blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full z-0"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <Image
                            className="rounded-full bg-[#f2f4f7] p-3"
                            src="https://wp.rrdevs.net/edcare/wp-content/uploads/2025/02/cat-icon-1.png"
                            alt="category"
                            width={100}
                            height={100}
                        />
                        <h2 className="text-lg text-center font-bold text-black mt-4">Category</h2>
                        <p className="text-black text-center">15 Courses</p>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Banner;