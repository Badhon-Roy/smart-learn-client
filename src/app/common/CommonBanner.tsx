import CommonBannerImg from "@/assets/images/common-banner.jpg";
import { Breadcrumbs } from "@mui/material";
import Link from "next/link";

const CommonBanner = ({title} : {title: string}) => {
    return (
        <div
            className="w-full h-64 md:h-74 bg-cover bg-center relative mb-16"
            style={{ backgroundImage: `url(${CommonBannerImg.src})` }}
        >

            {/* content */}
            <div className="container mx-auto relative z-10 flex flex-col justify-center items-start h-full text-center px-4">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link className="hover:underline font-bold text-gray-700" href="/">
                        Home
                    </Link>
                    <p className="text-[#07a698] font-bold">{title}</p>
                </Breadcrumbs>
                <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg mt-4">{title}</h1>
            </div>
        </div>
    );
};

export default CommonBanner;