"use client";

import { ICourse } from "@/types";
import Image from "next/image";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { AccessTime, People, PriceChange, School } from "@mui/icons-material";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import GroupsIcon from '@mui/icons-material/Groups';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CourseCard from "@/app/shared/CourseCard";

const CourseDetails = ({ course, filterCourse }: { course: ICourse, filterCourse: ICourse[] }) => {
    const { title, thumbnail, category, description, duration, price, discountPrice, classLevel, instructors, subject, faqs, rating = 5, reviews, whatYouWillLearn, status, studentsEnrolled } = course;
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<StarIcon key={i} className="text-yellow-400" />);
            } else if (rating >= i - 0.5) {
                stars.push(<StarHalfIcon key={i} className="text-yellow-400" />);
            } else {
                stars.push(<StarBorderIcon key={i} className="text-yellow-400" />);
            }
        }
        return stars;
    };
    const uniqueInstructors = instructors?.reduce((acc: any[], curr) => {
        const email = curr?.instructor?.email;
        const existing = acc.find(item => item.instructor?.email === email);
        if (existing) {
            if (!existing.subjects.includes(curr.subject)) {
                existing.subjects.push(curr.subject);
            }
        } else {
            acc.push({
                instructor: curr.instructor,
                subjects: [curr.subject]
            });
        }
        return acc;
    }, []);

    return (
        <div>
            <div className="bg-[#0e1523] min-h-[250px] ">
                <div className="container mx-auto py-8 px-4 text-white">
                    <div className="max-w-2/3">
                        <span className="border border-gray-500 px-4 py-2 rounded-full">{category?.name}</span>
                        <h2 className="lg:text-[40px] md:text-[30px] text-[20px] ">{title}</h2>
                        <p className="text-white/60">{description}</p>
                        <div className="flex items-center gap-1 mt-2">
                            {renderStars(rating)}
                            <span className="ml-2 text-sm text-gray-400">({rating})</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto py-8 px-4 flex justify-between gap-8">
                <div className="w-full md:w-2/3">
                    <h2 className="text-[24px] font-medium">Course Instructors</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {uniqueInstructors?.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 border border-gray-300 px-4 py-2 rounded-lg">
                                <Image
                                    className="w-[90px] h-[90px] object-cover rounded-full mb-2"
                                    src={item.instructor?.photo || "https://img.freepik.com/premium-vector/circular-gray-user-icon-dark-gray-silhouette-inside-lighter-circle-simple-minimal-design_213497-5014.jpg?semt=ais_items_boosted&w=740"}
                                    alt="instructor"
                                    width={200}
                                    height={200}
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{item.instructor?.name}</h3>
                                    <p className="text-sm text-gray-600">{item.instructor?.email}</p>
                                    <p className="text-sm text-gray-600">
                                        Sub/Topic: {item.subjects.join(', ')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2 className="text-[24px] font-medium mt-8">Subject/Topic</h2>
                        {
                            subject?.map((sub, idx) => (
                                <span key={idx} className="inline-block bg-[#07a698] text-white px-3 py-1 rounded-full mr-2 mb-2">
                                    {sub?.name}
                                </span>
                            ))
                        }
                    </div>

                    <h2 className="text-[24px] font-medium mt-8">What you will learn by doing the course</h2>


                    <ul className="bg-[#f3e0f8] p-6 rounded-xl text-black backdrop-blur-md shadow-lg">
                        {whatYouWillLearn?.map((item, idx) => (
                            <li key={idx} className="flex gap-2 mb-2">
                                <CheckCircleIcon className="text-green-400 mt-1" fontSize="small" />
                                <span>{item.trim()}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex items-center gap-4 mt-8 bg-[#fff0f8] p-8 rounded-2xl">
                            <div className="w-2/3">
                                <span className="bg-[#a66bfe] px-6 py-3 rounded-full text-white">মেন্টরশিপ</span>
                                <h2 className="text-lg font-semibold mt-4 mb-2">১:১ মেন্টরশিপ</h2>
                                <p className="text-sm text-gray-600">একদল দক্ষ মেন্টর তোমার পাশে থাকবে, প্রয়োজনে তোমার সাথে আলাদাভাবে গুগল মিটে বসে তোমার জন্য প্ল্যান সাজাবে, প্রব্লেম সলভ করবে, গাইড করবে লক্ষ্যে পৌছাতে।</p>
                            </div>
                            <div>
                                <Image src="https://web.programming-hero.com/home/_next/image?url=%2Fhome%2Fhome2%2Ficons%2Fboot-camp%2Fstep.png&w=96&q=75" alt="mentrorship_icon" width={100} height={100} />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mt-8 bg-[#fff0f8] p-8 rounded-2xl">
                            <div className="w-2/3">
                                <span className="bg-[#ea872c] px-6 py-3 rounded-full text-white">সাপোর্ট সিস্টেম</span>
                                <h2 className="text-lg font-semibold mt-4 mb-2">২৪/৭ কমিউনিটি সাপোর্ট</h2>
                                <p className="text-sm text-gray-600">দিন-রাত ২৪ ঘন্টা, সপ্তাহের ৭ দিন, যেখানে তোমার যেকোনো সমস্যা থাকবে সহজেই পাবে সমাধান। ডেডিকেটেড ফেসবুক গ্রুপ ও নিজস্ব হেল্পডেস্ক প্লাটফর্মে।</p>
                            </div>
                            <div>
                                <Image src="https://web.programming-hero.com/home/_next/image?url=%2Fhome%2Fhome2%2Ficons%2Fboot-camp%2Fclock.png&w=96&q=75" alt="mentrorship_icon" width={100} height={100} />
                            </div>
                        </div>
                        {/* Lifetime Access */}
                        <div className="flex items-center gap-4 mt-8 bg-[#f0faff] p-8 rounded-2xl">
                            <div className="w-2/3">
                                <span className="bg-[#1da1f2] px-6 py-3 rounded-full text-white">লাইফটাইম এক্সেস</span>
                                <h2 className="text-lg font-semibold mt-4 mb-2">লাইফটাইম কোর্স এক্সেস</h2>
                                <p className="text-sm text-gray-600">
                                    একবার এনরোল করলে চিরজীবনের জন্য থাকবে তোমার এক্সেস। যখন খুশি, যতবার খুশি দেখে নিতে পারবে ভিডিও, রিসোর্স, অ্যাসাইনমেন্ট।
                                </p>
                            </div>
                            <div>
                                <Image src="https://img.icons8.com/color/96/000000/infinity.png" alt="lifetime_access" width={100} height={100} />
                            </div>
                        </div>

                        {/* Real Projects */}
                        <div className="flex items-center gap-4 mt-8 bg-[#e8fff5] p-8 rounded-2xl">
                            <div className="w-2/3">
                                <span className="bg-[#16a34a] px-6 py-3 rounded-full text-white">প্রজেক্ট ভিত্তিক শেখা</span>
                                <h2 className="text-lg font-semibold mt-4 mb-2">রিয়েল লাইফ প্রজেক্টস</h2>
                                <p className="text-sm text-gray-600">
                                    কোর্সের প্রতিটি মডিউলে থাকবে প্র্যাক্টিক্যাল রিয়েল-ওয়ার্ল্ড প্রজেক্ট। শিখতে শিখতেই তৈরী হবে প্রফেশনাল প্রজেক্ট পোর্টফোলিও।
                                </p>
                            </div>
                            <div>
                                <Image src="https://cdn-icons-png.freepik.com/256/5956/5956592.png" alt="real_projects" width={100} height={100} />
                            </div>
                        </div>

                        {/* Job Preparation */}
                        <div className="flex items-center gap-4 mt-8 bg-[#fffbe6] p-8 rounded-2xl">
                            <div className="w-2/3">
                                <span className="bg-[#facc15] px-6 py-3 rounded-full text-black">জব প্রিপারেশন</span>
                                <h2 className="text-lg font-semibold mt-4 mb-2">জব রেডিনেস প্রোগ্রাম</h2>
                                <p className="text-sm text-gray-600">
                                    রিজিউমে বানানো থেকে শুরু করে ইন্টারভিউ প্রস্তুতি, মক ইন্টারভিউ এবং লিংকডইন অপ্টিমাইজেশন পর্যন্ত – সম্পূর্ণ জব প্রস্তুতির জন্য আলাদা সেশন থাকবে।
                                </p>
                            </div>
                            <div>
                                <Image src="https://img.icons8.com/color/96/resume.png" alt="job_ready" width={100} height={100} />
                            </div>
                        </div>

                        {/* Certificates */}
                        <div className="flex items-center gap-4 mt-8 bg-[#f5eaff] p-8 rounded-2xl">
                            <div className="w-2/3">
                                <span className="bg-[#8b5cf6] px-6 py-3 rounded-full text-white">সার্টিফিকেট</span>
                                <h2 className="text-lg font-semibold mt-4 mb-2">ইন্ডাস্ট্রি রেকগনাইজড সার্টিফিকেট</h2>
                                <p className="text-sm text-gray-600">
                                    কোর্স শেষে সফলভাবে সম্পন্ন করলে পাবে ইন্ডাস্ট্রি স্ট্যান্ডার্ড সার্টিফিকেট যা তোমার ক্যারিয়ারে যুক্ত করবে মূল্য।
                                </p>
                            </div>
                            <div>
                                <Image src="https://img.icons8.com/color/96/diploma.png" alt="certificate" width={100} height={100} />
                            </div>
                        </div>

                    </div>

                    <h2 className="text-[24px] font-medium mt-8">Frequently Ask Questions</h2>
                    <div className="mt-8">
                        {faqs?.map((faq, index) => (
                            <Accordion
                                key={index}
                                expanded={expanded === `panel${index}`}
                                onChange={handleChange(`panel${index}`)}
                                sx={{
                                    color: "black",
                                    boxShadow: "0 0 20px rgba(0,0,0,0.3)",
                                    borderRadius: 2,
                                    mb: 2,
                                    mt: 2,
                                    "&.Mui-expanded": {
                                        margin: "auto",
                                    },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ color: "#07a698" }} />}
                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}
                                >
                                    <Typography sx={{ fontWeight: 600 }}>{faq?.question}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography sx={{ opacity: 0.9 }}>{faq?.answer}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>

                </div>
                <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md h-full border border-gray-300">
                    <Image className="w-full h-[200px] object-cover rounded-lg mb-4" src={thumbnail} alt="course-thumbnail" width={500} height={300} />
                    <div className="mb-4">
                        {discountPrice ? (
                            <p className="text-2xl font-bold text-[#07a698]">
                                <span className="line-through text-gray-400">৳{price}</span>{" "}
                                ৳{(price - discountPrice * 0.01 * price).toFixed(2)}
                            </p>
                        ) : (
                            <p className="text-2xl font-bold text-[#07a698]">৳{price}</p>
                        )}
                    </div>
                    <button className="bg-[#07a698] text-white font-bold px-8 py-4 rounded-lg w-full">Enroll now</button>
                    <div className="space-y-3 my-4">
                        <h2 className="font-medium">এই কোর্সে যা থাকছে</h2>
                        <div className="flex items-center gap-2">
                            <AccessTime /> <span>Duration: {duration}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <School />  Skill Level: {classLevel}
                        </div>
                        <div className="flex items-center gap-2">
                            <People />Total Enrolled: {studentsEnrolled?.length || 0}
                        </div>
                        <div className="flex items-center gap-2">
                            <WorkspacePremiumIcon className="text-primary" /> Certificate: Yes
                        </div>
                        <div className="flex items-center gap-2">
                            <GroupsIcon className="text-primary" /> Facebook Support Group
                        </div>
                        <div className="flex items-center gap-2">
                            <AllInclusiveIcon className="text-primary" /> Course Validity Lifetime
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto py-8 px-4 ">
                <h2>আপনার জন্য আরও কিছু কোর্স</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                    {
                        filterCourse?.slice(0, 4)?.map((course: ICourse) => (
                            <CourseCard key={course?._id} course={course} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;