import CreateCard from "../testimonialCard/TestimonialCard";
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
export type TTestimonial = {
    image: string;
    name: string;
    handle: string;
    date: string;
}

const testimonialData: TTestimonial[] = [
    {
        image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
        name: 'Briar Martin',
        handle: '@neilstellar',
        date: 'April 20, 2025'
    },
    {
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
        name: 'Avery Johnson',
        handle: '@averywrites',
        date: 'May 10, 2025'
    },
    {
        image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
        name: 'Jordan Lee',
        handle: '@jordantalks',
        date: 'June 5, 2025'
    },
    {
        image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
        name: 'Avery Johnson',
        handle: '@averywrites',
        date: 'May 10, 2025'
    },
    {
        image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&auto=format&fit=crop&q=60',
        name: 'Harper Collins',
        handle: '@harpercodes',
        date: 'July 15, 2025'
    },
    {
        image: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&auto=format&fit=crop&q=60',
        name: 'Mason Everett',
        handle: '@masonbuilds',
        date: 'August 2, 2025'
    },
    {
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=60',
        name: 'Quinn Parker',
        handle: '@quinnupdates',
        date: 'September 12, 2025'
    },
    {
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=60',
        name: 'Riley Brooks',
        handle: '@rileyinsights',
        date: 'October 8, 2025'
    },
    {
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=60',
        name: 'Taylor West',
        handle: '@taylortrends',
        date: 'November 3, 2025'
    },
    {
        image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&auto=format&fit=crop&q=60',
        name: 'Dakota Hayes',
        handle: '@dakotawrites',
        date: 'December 1, 2025'
    }
];



const Testimonial = () => {
    return (
        <div className="my-16">
            <style>{`
                    @keyframes marqueeScroll {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-300%); }
                    }

                    @media (min-width: 640px) { /* sm */
                    @keyframes marqueeScroll {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-200%); }
                    }
                    }

                    @media (min-width: 1024px) { /* lg */
                    @keyframes marqueeScroll {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                    }
                    }


            .marquee-inner {
                animation: marqueeScroll 25s linear infinite;
                   will-change: transform;
            }

            .marquee-reverse {
                animation-direction: reverse;
            }

            .marquee-row:hover .marquee-inner {
                animation-play-state: paused;
            }

        `}</style>
            <div className="flex flex-col items-center justify-center">
                <div className="border border-gray-400 text-sm inline-block bg-white rounded-full p-1 pr-4">
                    <h3 className="flex items-center gap-2 font-bold"><span className="bg-gradient-to-r from-[#07a698] to-[#04d9c2] rounded-full flex items-center justify-center text-white"><BoltOutlinedIcon /></span> Testimonial</h3>
                </div>
                <h2 className="lg:text-[40px] md:text-[30px] text-[20px] font-bold my-4">What's Our Students Say</h2>
            </div>

            <div className="marquee-row w-full mx-auto overflow-hidden relative mt-12">
                <div className="absolute left-0 top-0 h-full xl:w-130 lg:w-36 md:w-24 w-10 z-10 pointer-events-none bg-linear-to-r from-white to-transparent"></div>
                <div className="marquee-inner flex transform-gpu min-w-[200%] mb-5">
                    {[...testimonialData, ...testimonialData].map((card, index) => (
                        <CreateCard key={index} card={card} />
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full xl:w-130 lg:w-36 md:w-24 w-10 z-10 pointer-events-none bg-linear-to-l from-white to-transparent"></div>
            </div>

            <div className="marquee-row w-full mx-auto overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full xl:w-130 lg:w-36 md:w-24 w-10 z-10 pointer-events-none bg-linear-to-r from-white to-transparent"></div>
                <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] mb-5">
                    {[...testimonialData, ...testimonialData].map((card, index) => (
                        <CreateCard key={index} card={card} />
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full xl:w-130 lg:w-36 md:w-24 w-10 z-10 pointer-events-none bg-linear-to-l from-white to-transparent"></div>
            </div>
        </div>
    )
}

export default Testimonial;