import { getCurrentUser } from "@/services/auth";
import About from "../components/commonLayout/about/About";
import Banner from "../components/commonLayout/banner/Banner";


const HomePage = async() => {
    const user = await getCurrentUser();
    console.log(user);
    return (
        <div>
           <Banner/>
           <About/>
        </div>
    );
};

export default HomePage;