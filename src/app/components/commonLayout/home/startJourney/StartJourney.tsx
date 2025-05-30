import Image from "next/image";
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';


const StartJourney = () => {
    return (
        <div className="bg-white">
            <div className="container mx-auto py-20 flex justify-between items-center gap-8 w-2/3">
                <div className="flex gap-6 items-center flex-1 justify-end">
                    <div>
                        <Image className="w-[280px] h-[450px] rounded-tl-[60px]" src='https://wp.rrdevs.net/edcare/wp-content/uploads/2024/12/content-img-1.png' alt="start_journey_1" width={250} height={250} />
                    </div>
                    <div className="space-y-6">
                        <Image className="w-full h-[280px] rounded-tr-[60px] rounded-bl-[60px]" src='https://wp.rrdevs.net/edcare/wp-content/uploads/2024/12/content-img-2.png' alt="start_journey_1" width={250} height={250} />
                        <Image className="w-full h-[280px] rounded-tl-[60px] rounded-br-[60px]" src='https://wp.rrdevs.net/edcare/wp-content/uploads/2024/12/content-img-3.png' alt="start_journey_1" width={250} height={250} />
                    </div>
                </div>
                <div className="flex-1">
                    <div className="border border-gray-400 text-sm inline-block bg-white rounded-full p-1 pr-4">
                        <h3 className="flex items-center gap-2"><span className="bg-[#07a6992a] w-6 h-6 p-1 flex items-center justify-center rounded-full"><BoltOutlinedIcon className="text-[#07a698]" /></span> How We Start Journey</h3>
                    </div>
                    <h2 className="text-[40px] font-bold my-4">We Care About Your Life For
                        Better Future </h2>
                    <p className="text-gray-500 text-sm">This includes offering personalized feedback, fostering a sense of community through discussion forums and group projects, and providing continuous support to address challenges and improve.</p>
                    <div className="border border-gray-300 p-6 rounded-lg mt-8 flex gap-6 items-center">
                        <div className="w-[90px] h-[70px] rounded-full bg-[#07a6992a] flex items-center justify-center p-4 hover:text-white transition-colors duration-300">
                            <Image src="https://wp.rrdevs.net/edcare/wp-content/uploads/2024/12/content-1.png" alt="certified" width={35} height={35}/>
                        </div>
                        <div>
                            <h3 className="text-[18px] font-semibold">Master Certified Trainer</h3>
                            <p>This includes offering personalized feedback, fostering a sense of community through discussion.</p>
                        </div>
                    </div>
                    <div className="border border-gray-300 p-6 rounded-lg mt-8 flex gap-6 items-center">
                        <div className="w-[90px] h-[70px] rounded-full bg-[#07a6992a] flex items-center justify-center p-4 hover:text-white transition-colors duration-300">
                            <Image src="https://wp.rrdevs.net/edcare/wp-content/uploads/2024/12/content-2.png" alt="certified" width={35} height={35}/>
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