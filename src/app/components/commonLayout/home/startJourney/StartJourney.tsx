import Image from "next/image";
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';


const StartJourney = () => {
    return (
        <div className="bg-white md:px-0 px-4">
            <div className="container mx-auto py-20 md:flex justify-between items-center gap-8 lg:w-2/3">
                <div className="border border-gray-400 text-sm md:hidden inline-block bg-white rounded-full p-1 pr-4 mb-8">
                    <h3 className="flex items-center gap-2"><span className="bg-gradient-to-r from-[#07a698] to-[#04d9c2] rounded-full flex items-center justify-center text-white"><BoltOutlinedIcon/></span> How We Start Journey</h3>
                </div>
                <div className="flex md:gap-6 gap-4 items-center flex-1 justify-end">
                    <div className="flex-1">
                        <Image className="w-[280px] lg:h-[450px] lg:rounded-tl-[60px] rounded-tl-[30px]" src='https://wp.rrdevs.net/edcare/wp-content/uploads/2024/12/content-img-1.png' alt="start_journey_1" width={250} height={250} />
                    </div>
                    <div className="space-y-6 flex-1">
                        <Image className="w-full lg:h-[280px] lg:rounded-tr-[60px] lg:rounded-bl-[60px] rounded-tr-[30px] rounded-bl-[30px]" src='https://wp.rrdevs.net/edcare/wp-content/uploads/2024/12/content-img-2.png' alt="start_journey_1" width={250} height={250} />
                        <Image className="w-full lg:h-[280px] lg:rounded-tl-[60px] lg:rounded-br-[60px] rounded-tl-[30px] rounded-br-[30px]" src='https://wp.rrdevs.net/edcare/wp-content/uploads/2024/12/content-img-3.png' alt="start_journey_1" width={250} height={250} />
                    </div>
                </div>
                <div className="flex-1">
                    <div className="border border-gray-400 text-sm hidden md:inline-block bg-white rounded-full p-1 pr-4">
                        <h3 className="flex items-center gap-2"><span className="bg-gradient-to-r from-[#07a698] to-[#04d9c2] rounded-full flex items-center justify-center text-white"><BoltOutlinedIcon/></span> How We Start Journey</h3>
                    </div>
                    <h2 className="lg:text-[40px] md:text-[30px] text-[20px] font-bold my-4">We Care About Your Life For
                        Better Future </h2>
                    <p className="text-gray-500 text-sm">This includes offering personalized feedback, fostering a sense of community through discussion forums and group projects, and providing continuous support to address challenges and improve.</p>
                    <div className="border border-gray-300 p-6 rounded-lg mt-8 flex gap-6 items-center">
                        <div className="w-[90px] h-[70px] rounded-full bg-[#07a6992a] flex items-center justify-center p-4 hover:text-white transition-colors duration-300">
                            <Image src="https://wp.rrdevs.net/edcare/wp-content/uploads/2024/12/content-1.png" alt="certified" width={35} height={35} />
                        </div>
                        <div>
                            <h3 className="text-[18px] font-semibold">Master Certified Trainer</h3>
                            <p>This includes offering personalized feedback, fostering a sense of community through discussion.</p>
                        </div>
                    </div>
                    <div className="border border-gray-300 p-6 rounded-lg mt-8 flex gap-6 items-center">
                        <div className="w-[90px] h-[70px] rounded-full bg-[#07a6992a] flex items-center justify-center p-4 hover:text-white transition-colors duration-300">
                            <Image src="https://wp.rrdevs.net/edcare/wp-content/uploads/2024/12/content-2.png" alt="certified" width={35} height={35} />
                        </div>
                        <div>
                            <h3 className="text-[18px] font-semibold">Coach Certification Program</h3>
                            <p>This includes offering personalized feedback, fostering a sense of community through discussion.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartJourney;