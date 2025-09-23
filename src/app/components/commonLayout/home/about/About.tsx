"use client"
import Image from "next/image";
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import { Box, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from "react";
const About = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <div className=" bg-[#f2f4f7]">
            <div className="md:flex justify-between items-center container mx-auto md:pt-72 pt-64 pb-32 md:px-0 px-4 gap-6">
                <div className="md:hidden flex justify-center">
                    <div className="border border-gray-400 text-sm inline-block bg-white rounded-full p-1 pr-4 mb-8">
                        <h3 className="flex items-center gap-2"><span className="bg-gradient-to-r from-[#07a698] to-[#04d9c2] rounded-full flex items-center justify-center text-white"><BoltOutlinedIcon /></span> About Company</h3>
                    </div>
                </div>
                <div className="relative flex-1">
                    <Image className="rounded-3xl md:h-[400px] h-[200px] object-cover" src="https://wp.rrdevs.net/edcare/wp-content/uploads/2025/02/about-img-1-1.png" alt="about_banner_image" width={500} height={400} />
                    <Image className="lg:h-[300px] md:h-[200px] h-[140px] md:w-[300px] w-[140px] absolute -bottom-10 md:-bottom-20 md:right-30 right-10 rounded-t-full border-4 md:border-8 border-white" src="https://wp.rrdevs.net/edcare/wp-content/uploads/2025/02/about-img-2-1.png" alt="about_banner_image" width={300} height={200} />

                </div>
                <div className="flex-1">
                    <div className="hidden border border-gray-400 text-sm md:inline-block bg-white rounded-full p-1 pr-4">
                        <h3 className="flex items-center gap-2"><span className="bg-gradient-to-r from-[#07a698] to-[#04d9c2] rounded-full flex items-center justify-center text-white"><BoltOutlinedIcon /></span> About Company</h3>
                    </div>
                    <h2 className="lg:text-[40px] md:text-[30px] text-[20px] md:mt-0 mt-16 font-bold my-4">The Ultimate Online Platform for Interactive and Personalized Learning</h2>
                    <Box sx={{ width: '100%' }}>
                        <TabContext value={value}>
                            <Box className="flex md:mb-6 border-b border-gray-200">
                                <TabList
                                    onChange={handleChange}
                                    aria-label="minimal tabs"
                                    TabIndicatorProps={{
                                        style: { backgroundColor: '#07a698', height: '3px', borderRadius: '3px' },
                                    }}
                                >
                                    {['Mission', 'Vision', 'Our Goal'].map((label, idx) => (
                                        <Tab
                                            key={label}
                                            value={`${idx + 1}`}
                                            label={
                                                <span
                                                    className={`font-medium md:text-[16px] text-sm transition-all duration-300 ${value === `${idx + 1}` ? 'text-[#07a698]' : 'text-gray-600 hover:text-[#07a698]'
                                                        }`}
                                                >
                                                    {label}
                                                </span>
                                            }
                                            className="px-6"
                                        />
                                    ))}
                                </TabList>
                            </Box>

                            <TabPanel value="1">
                               <Typography variant="h6" className="mb-2">Our Mission</Typography>
                                <div>
                                    <p className="text-gray-700 md:text-[16px] text-sm">
                                        Our mission is to democratize education by providing high-quality, accessible, and flexible online courses that empower learners of all backgrounds to achieve their personal and professional goals.
                                    </p>
                                    <div className="my-4 space-y-4">
                                        <h2>
                                            <span className="text-[#07a698] rounded-full border bg-white shadow-lg md:p-2 p-1 font-bold mr-2">01</span>
                                            Deliver Industry-Relevant Content Taught by Experts
                                        </h2>
                                        <h2>
                                            <span className="text-[#07a698] rounded-full border bg-white shadow-lg md:p-2 p-1 font-bold mr-2">02</span>
                                            Foster Continuous Learning and Career Advancement
                                        </h2>
                                        <h2>
                                            <span className="text-[#07a698] rounded-full border bg-white shadow-lg md:p-2 p-1 font-bold mr-2">03</span>
                                            Make Learning Affordable and Globally Accessible
                                        </h2>
                                    </div>
                                </div>
                            </TabPanel>

                            <TabPanel value="2">
                                <Typography variant="h6" className="mb-2">Our Vision</Typography>
                                <p className="text-gray-700">
                                    Our vision is to become the leading global platform for online learning—bridging the gap between education and employment by equipping learners with practical, in-demand skills.
                                </p>
                                <div className="my-4 space-y-4">
                                    <h2>
                                        <span className="text-[#07a698] rounded-full border bg-white shadow-lg md:p-2 p-1 font-bold mr-2">01</span>
                                        Build a thriving global learning community
                                    </h2>
                                    <h2>
                                        <span className="text-[#07a698] rounded-full border bg-white shadow-lg md:p-2 p-1 font-bold mr-2">02</span>
                                        Collaborate with top institutions and industry leaders
                                    </h2>
                                    <h2>
                                        <span className="text-[#07a698] rounded-full border bg-white shadow-lg md:p-2 p-1 font-bold mr-2">03</span>
                                        Drive innovation in e-learning technologies and delivery
                                    </h2>
                                </div>
                            </TabPanel>

                            <TabPanel value="3">
                                <Typography variant="h6" className="mb-2">Our Goal</Typography>
                                <p className="text-gray-700">
                                    Our primary goal is to help learners achieve real-world success by:
                                </p>
                                <div className="my-4 space-y-4">
                                    <h2>
                                        <span className="text-[#07a698] rounded-full border bg-white shadow-lg md:p-2 p-1 font-bold mr-2">01</span>
                                        Offering career-aligned certification programs
                                    </h2>
                                    <h2>
                                        <span className="text-[#07a698] rounded-full border bg-white shadow-lg md:p-2 p-1 font-bold mr-2">02</span>
                                        Supporting learners with mentorship and job placement tools
                                    </h2>
                                    <h2>
                                        <span className="text-[#07a698] rounded-full border bg-white shadow-lg md:p-2 p-1 font-bold mr-2">03</span>
                                        Continuously updating content to match evolving industry needs
                                    </h2>
                                </div>
                            </TabPanel>

                        </TabContext>
                    </Box>
                    <button className="bg-[#07a698] text-white font-bold px-8 py-4 rounded-full">Get A Free Lesson</button>
                </div>
            </div>
        </div>
    );
};

export default About;