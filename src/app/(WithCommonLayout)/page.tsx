import { getCurrentUser } from "@/services/auth";
import About from "../components/commonLayout/home/about/About";
import Banner from "../components/commonLayout/home/banner/Banner";
import Category from "../components/commonLayout/home/category/Category";
import FeatureCourses from "../components/commonLayout/home/featureCourses/FeatureCourses";


const HomePage = async() => {
    const user = await getCurrentUser();
    return (
        <div>
           <Banner/>
           <About/>
           <Category/>
           <FeatureCourses/>
        </div>
    );
};

export default HomePage;