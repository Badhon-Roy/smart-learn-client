import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import Image from 'next/image';

const whatNewData = [
    { id: 1, image: "https://dreamslms.dreamstechnologies.com/html/template/assets/img/icons/icon-22.svg", description: "Stay motivated with engaging instructors" },
    { id: 2, image: "https://dreamslms.dreamstechnologies.com/html/template/assets/img/icons/icon-17.svg", description: "Keep up with in the latest in cloud" },
    { id: 3, image: "https://dreamslms.dreamstechnologies.com/html/template/assets/img/icons/icon-23.svg", description: "Get certified with 100+ certification courses" },
    { id: 4, image: "https://dreamslms.dreamstechnologies.com/html/template/assets/img/icons/icon-16.svg", description: "Build skills your way, from labs to courses" }
]

const WhatNew = () => {
    return (
        <div className="w-full bg-gradient-to-br from-[#F6FFFE] via-[#F9FFFB] to-[#E9FFF8] ">
            <div className='container mx-auto md:px-0 px-4 pt-24 flex flex-col lg:flex-row justify-between'>
                <div className='flex-1'>
                    <div className="border border-gray-400 text-sm inline-block bg-white rounded-full p-1 pr-4">
                        <h3 className="flex items-center gap-2 font-bold"><span className="bg-gradient-to-r from-[#07a698] to-[#04d9c2] rounded-full flex items-center justify-center text-white"><BoltOutlinedIcon /></span > What's new</h3>
                    </div>
                    <h2 className="lg:text-[40px] md:text-[30px] text-[20px] font-bold my-4">Master the skills to drive your career</h2>
                    <p className='md:text-lg text-gray-700'>Get certified, master modern tech skills, and level up your career — whether you’re starting out or a seasoned pro. 95% of eLearning learners report our hands-on content directly helped their careers.</p>
                    <div className='grid md:grid-cols-2 gap-4 md:gap-6 my-8'>
                        {
                            whatNewData?.map(data => (
                                <div key={data?.id} className='flex justify-center items-center gap-4 border border-gray-400 p-4 rounded-lg'>
                                    <div className='bg-[#FFEDF0] w-15 h-15 rounded-full flex justify-center items-center'>
                                        <Image className='w-9 h-8' src={data?.image} alt='icon one' width={100} height={100} />
                                    </div>
                                    <div className='flex-1'>
                                        <p className='text-lg text-gray-700'>{data?.description}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div
                    style={{
                        backgroundImage: `url('https://dreamslms.dreamstechnologies.com/html/template/assets/img/bg/bg-2.png')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    className="flex-1 flex justify-center items-end relative lg:pt-0 pt-16" 
                >
                    <Image className='absolute top-0 -left-10 md:left-0 w-[150px] h-[150px] md:w-[200px]  md:h-[200px]' src="https://dreamslms.dreamstechnologies.com/html/template/assets/img/icons/icon-18.svg" alt='svg icon' width={200} height={200} />
                    <Image className='absolute top-0 -right-10 md:right-0 w-[150px] h-[150px] md:w-[200px]  md:h-[200px]' src="https://dreamslms.dreamstechnologies.com/html/template/assets/img/icons/icon-19.svg" alt='svg icon' width={200} height={200} />
                    <Image className='absolute -left-10 md:left-0 top-1/2 w-[150px] h-[150px] md:w-[200px]  md:h-[200px]' src="https://dreamslms.dreamstechnologies.com/html/template/assets/img/icons/icon-20.svg" alt='svg icon' width={200} height={200} />
                    <Image className='absolute bottom-0 -right-10 md:right-0 w-[150px] h-[150px] md:w-[200px]  md:h-[200px]' src="https://dreamslms.dreamstechnologies.com/html/template/assets/img/icons/icon-21.svg" alt='svg icon' width={200} height={200} />
                    <div className="absolute top-[-40px] right-[-40px] w-[157px] h-[157px] bg-[#07A698] blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full z-0"></div>

                    <Image
                        className="w-[450px] h-full object-cover"
                        src="https://dreamslms.dreamstechnologies.com/html/template/assets/img/feature/feature-16.png"
                        alt="what's new image"
                        width={1000}
                        height={500}
                    />
                </div>

            </div>
        </div>
    );
};

export default WhatNew;