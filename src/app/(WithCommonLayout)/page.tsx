import { getCurrentUser } from "@/services/auth";
import About from "../components/commonLayout/home/about/About";
import Banner from "../components/commonLayout/home/banner/Banner";
import Category from "../components/commonLayout/home/category/Category";


const HomePage = async() => {
    const user = await getCurrentUser();
    console.log(user);
    return (
        <div>
           <Banner/>
           <About/>
           <Category/>
        </div>
    );
};

export default HomePage;