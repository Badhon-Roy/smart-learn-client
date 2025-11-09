"use client"
import NotFoundImg from "@/assets/images/not-found.png"
import { ChevronLeft } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
    return (
        <div className="max-h-screen h-screen bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center px-4"
            style={{
                backgroundImage:
                    "url('https://wprtl.rrdevs.net/edcare/wp-content/uploads/2025/02/lang-exam-bg-shape.png')"
            }}>
            <Image className="w-fit h-fit" src={NotFoundImg} alt="Not found image" width={1000} height={500} />
            <h2 className="lg:text-[40px] md:text-[30px] text-[20px] font-bold my-4">404 - Page Not Found</h2>
            <p className="text-lg">The page you are looking for does not exist</p>
            <Link href="/" className="bg-[#07a698] text-white font-bold px-8 py-4 rounded-full mt-4 flex justify-center items-center gap-2"><ChevronLeft /> Back to Home</Link>
        </div>
    );
};

export default NotFoundPage;