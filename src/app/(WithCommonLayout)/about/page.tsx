import OurTeam from "@/app/components/commonLayout/about/ourTeam/OurTeam";
import About from "@/app/components/commonLayout/home/about/About";
import Faq from "@/app/components/commonLayout/home/faq/Faq";
import Testimonial from "@/app/components/commonLayout/home/testimonial/Testimonial";
import { lazy } from "react";
const CommonBanner = lazy(() => import("@/app/common/CommonBanner"));

const AboutPage = () => {
    return (
        <div>
            <CommonBanner title="About Us" />
            <OurTeam/>
            <Faq/>
            <Testimonial/>
        </div>
    );
};

export default AboutPage;