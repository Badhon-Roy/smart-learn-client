import OurTeam from "@/app/components/commonLayout/about/ourTeam/OurTeam";
import About from "@/app/components/commonLayout/home/about/About";
import { lazy } from "react";
const CommonBanner = lazy(() => import("@/app/common/CommonBanner"));

const AboutPage = () => {
    return (
        <div>
            <CommonBanner title="About Us" />
            <OurTeam/>
        </div>
    );
};

export default AboutPage;