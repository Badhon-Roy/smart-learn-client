import Image from "next/image";
import Link from "next/link";
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import TeamMember1 from "@/assets/images/team-member-1.jpg"
import TeamMember2 from "@/assets/images/team-member-2.jpg"
import TeamMember3 from "@/assets/images/team-member-3.jpg"
import TeamMember4 from "@/assets/images/team-member-4.jpg"
import TeamMember5 from "@/assets/images/team-member-5.jpg"
import TeamMember6 from "@/assets/images/team-member-6.jpg"
import TeamMember7 from "@/assets/images/team-member-7.jpg"
import TeamMember8 from "@/assets/images/team-member-8.jpg"
import TeamMember9 from "@/assets/images/team-member-9.jpg"
import TeamMember10 from "@/assets/images/team-member-10.jpg"
import TeamMember11 from "@/assets/images/team-member-11.jpg"
import TeamMember12 from "@/assets/images/team-member-12.jpg"

const ourTeam = [
    {
        id: 1,
        name: "Badhon Roy",
        role: "Founder & CEO",
        img: TeamMember1,
        bio: "Visionary leader driving the platform to make learning accessible for everyone.",
        social: {
            linkedin: "https://www.linkedin.com/in/badhonroy",
            twitter: "https://twitter.com/badhonroy"
        }
    },
    {
        id: 2,
        name: "Ayesha Karim",
        role: "Lead Instructor",
        img: TeamMember2,
        bio: "Expert in React and modern web development; creates engaging course content.",
        social: {
            linkedin: "https://www.linkedin.com/in/ayeshakarim",
            twitter: "https://twitter.com/ayeshakarim"
        }
    },
    {
        id: 3,
        name: "Rahim Hossain",
        role: "Backend Developer",
        img: TeamMember3,
        bio: "Handles server-side logic, database management, and API integrations for courses.",
        social: {
            linkedin: "https://www.linkedin.com/in/rahimhossain",
            twitter: "https://twitter.com/rahimhossain"
        }
    },
    {
        id: 4,
        name: "Nafisa Chowdhury",
        role: "Content Designer",
        img: TeamMember4,
        bio: "Designs interactive learning materials and visually appealing course modules.",
        social: {
            linkedin: "https://www.linkedin.com/in/nafisa",
            twitter: "https://twitter.com/nafisa"
        }
    },
    {
        id: 5,
        name: "Samiul Islam",
        role: "Student Support",
        img: TeamMember5,
        bio: "Assists students with queries and ensures smooth learning experience on the platform.",
        social: {
            linkedin: "https://www.linkedin.com/in/samiulislam",
            twitter: "https://twitter.com/samiulislam"
        }
    },
    {
        id: 6,
        name: "Rina Sultana",
        role: "UI/UX Designer",
        img: TeamMember6,
        bio: "Crafts intuitive and visually appealing user interfaces for an enhanced learning experience.",
        social: {
            linkedin: "https://www.linkedin.com/in/rinasultana",
            twitter: "https://twitter.com/rinasultana"
        }
    },
    {
        id: 7,
        name: "Tanvir Ahmed",
        role: "Full Stack Developer",
        img: TeamMember7,
        bio: "Works on both front-end and back-end development, ensuring seamless course platform functionality.",
        social: {
            linkedin: "https://www.linkedin.com/in/tanvirahmed",
            twitter: "https://twitter.com/tanvirahmed"
        }
    },
    {
        id: 8,
        name: "Moushumi Begum",
        role: "Course Strategist",
        img: TeamMember8,
        bio: "Plans and structures courses to optimize student engagement and learning outcomes.",
        social: {
            linkedin: "https://www.linkedin.com/in/moushumibegum",
            twitter: "https://twitter.com/moushumibegum"
        }
    },
    {
        id: 9,
        name: "Shakil Khan",
        role: "QA Engineer",
        img: TeamMember9,
        bio: "Ensures all platform features work flawlessly and maintains high-quality standards.",
        social: {
            linkedin: "https://www.linkedin.com/in/shakilkhan",
            twitter: "https://twitter.com/shakilkhan"
        }
    },
    {
        id: 10,
        name: "Farhana Akter",
        role: "Marketing Lead",
        img: TeamMember10,
        bio: "Promotes courses and manages outreach to attract more students and grow platform reach.",
        social: {
            linkedin: "https://www.linkedin.com/in/farhanaakter",
            twitter: "https://twitter.com/farhanaakter"
        }
    },
    {
        id: 11,
        name: "Imran Hossain",
        role: "DevOps Engineer",
        img: TeamMember11,
        bio: "Manages cloud infrastructure, deployments, and ensures smooth platform performance.",
        social: {
            linkedin: "https://www.linkedin.com/in/imranhossain",
            twitter: "https://twitter.com/imranhossain"
        }
    },
    {
        id: 12,
        name: "Rokeya Sultana",
        role: "Content Moderator",
        img: TeamMember12,
        bio: "Reviews course materials and student submissions to maintain quality and compliance.",
        social: {
            linkedin: "https://www.linkedin.com/in/rokeyasultana",
            twitter: "https://twitter.com/rokeyasultana"
        }
    }
];


const OurTeam = () => {
    return (
        <div className="bg-gradient-to-br from-[#F6FFFE] via-[#F9FFFB] to-[#E9FFF8] "> 
            <div className="container mx-auto px-4 py-12 ">
                <div>
                    <div className="border border-gray-400 text-sm inline-block bg-white rounded-full p-1 pr-4">
                        <h3 className="flex items-center gap-2 font-bold">
                            <span className="bg-gradient-to-r from-[#07a698] to-[#04d9c2] rounded-full flex items-center justify-center text-white">
                                <BoltOutlinedIcon />
                            </span>
                            Our Team</h3>
                    </div>
                    <h2 className="lg:text-[40px] md:text-[30px] text-[20px] font-bold my-4">Meet Our Team Member</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3  xl:grid-cols-6 gap-4 mt-8">
                    <div className="flex flex-col gap-4">
                        <Image
                            src={TeamMember1}
                            alt="team member"
                            width={400}
                            height={800}
                            className="h-[280px] md:h-[350px] lg:h-[500px] w-full lg:w-[300px] object-cover rounded-full border border-gray-300 p-2"
                        />
                        <Image
                            src={TeamMember2}
                            alt="team member"
                            width={400}
                            height={800}
                            className="h-[180px] lg:h-[200px] w-full lg:w-[300px] object-cover rounded-full border border-gray-300 p-2"
                        />
                    </div>
                    <div className="flex flex-col-reverse gap-4">
                        <Image
                            src={TeamMember3}
                            alt="team member"
                            width={400}
                            height={800}
                            className="h-[280px] md:h-[350px] lg:h-[500px] w-full lg:w-[300px] object-cover rounded-full border border-gray-300 p-2"
                        />
                        <Image
                            src={TeamMember4}
                            alt="team member"
                            width={400}
                            height={800}
                            className="h-[180px] lg:h-[200px] w-full lg:w-[300px] object-cover rounded-full border border-gray-300 p-2"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <Image
                            src={TeamMember5}
                            alt="team member"
                            width={400}
                            height={800}
                            className="h-[280px] md:h-[350px] lg:h-[500px] w-full lg:w-[300px] object-cover rounded-full border border-gray-300 p-2"
                        />
                        <Image
                            src={TeamMember6}
                            alt="team member"
                            width={400}
                            height={800}
                            className="h-[180px] lg:h-[200px] w-full lg:w-[300px] object-cover rounded-full border border-gray-300 p-2"
                        />
                    </div>
                    <div className="flex flex-col-reverse gap-4">
                        <Image
                            src={TeamMember7}
                            alt="team member"
                            width={400}
                            height={800}
                            className="h-[280px] md:h-[350px] lg:h-[500px] w-full lg:w-[300px] object-cover rounded-full border border-gray-300 p-2"
                        />
                        <Image
                            src={TeamMember8}
                            alt="team member"
                            width={400}
                            height={800}
                            className="h-[180px] lg:h-[200px] w-full lg:w-[300px] object-cover rounded-full border border-gray-300 p-2"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <Image
                            src={TeamMember9}
                            alt="team member"
                            width={400}
                            height={800}
                            className="h-[280px] md:h-[350px] lg:h-[500px] w-full lg:w-[300px] object-cover rounded-full border border-gray-300 p-2"
                        />
                        <Image
                            src={TeamMember10}
                            alt="team member"
                            width={400}
                            height={800}
                            className="h-[180px] lg:h-[200px] w-full lg:w-[300px] object-cover rounded-full border border-gray-300 p-2"
                        />
                    </div>
                    <div className="flex flex-col-reverse gap-4">
                        <Image
                            src={TeamMember11}
                            alt="team member"
                            width={400}
                            height={800}
                            className="h-[280px] md:h-[350px] lg:h-[500px] w-full lg:w-[300px] object-cover rounded-full border border-gray-300 p-2"
                        />
                        <Image
                            src={TeamMember12}
                            alt="team member"
                            width={400}
                            height={800}
                            className="h-[180px] lg:h-[200px] w-full lg:w-[300px] object-cover rounded-full border border-gray-300 p-2"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8 mt-32">
                    {ourTeam.map(member => (
                        <div
                            key={member.id}
                            className="rounded-lg border border-gray-300 bg-white min-h-[300px] md:min-h-[400px]"
                        >
                            <Image
                                src={member.img}
                                alt={member.name}
                                width={800}
                                height={500}
                                className="w-full h-[150px] md:h-[250px] lg:h-[300px] object-cover rounded-t-lg"
                            />
                            <div className="p-4 flex flex-col  justify-center items-center">
                                <h3 className="my-3 text-[18px] md:text-[22px] font-semibold">{member.name}</h3>
                                <p className="text-[#07a698] font-bold mb-3">{member.role}</p>
                                <div className="flex gap-4">
                                    {member.social.linkedin && (
                                        <Link href={member.social.linkedin} className="border border-gray-300 p-2 rounded-full flex justify-center items-center" target="_blank">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 md:h-6 w-4 md:w-6 text-[#0A66C2] hover:scale-110 transition-transform"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.3h.1c.7-1.3 2.5-2.7 5.2-2.7 5.5 0 6.5 3.6 6.5 8.3V24h-5v-7.5c0-1.8 0-4.2-2.5-4.2s-2.9 2-2.9 4.1V24h-5V8z" />
                                            </svg>
                                        </Link>
                                    )}
                                    {member.social.twitter && (
                                        <Link href={member.social.twitter} className="border border-gray-300 p-2 rounded-full flex justify-center items-center" target="_blank">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 md:h-6 w-4 md:w-6 text-[#1DA1F2] hover:scale-110 transition-transform"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.86 9.86 0 01-3.127 1.195 4.918 4.918 0 00-8.384 4.482 13.944 13.944 0 01-10.125-5.138 4.822 4.822 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.085 4.923 4.923 0 004.604 3.417A9.868 9.868 0 010 21.542a13.933 13.933 0 007.548 2.212c9.056 0 14.01-7.496 14.01-13.986 0-.21-.004-.423-.014-.634A10.012 10.012 0 0024 4.557z" />
                                            </svg>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurTeam;