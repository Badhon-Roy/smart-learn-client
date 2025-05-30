import About from "../components/commonLayout/home/about/About";
import Banner from "../components/commonLayout/home/banner/Banner";
import Category from "../components/commonLayout/home/category/Category";
import OngoingCourses from "../components/commonLayout/home/ongoingCourses/OngoingCourses";
import StartJourney from "../components/commonLayout/home/startJourney/StartJourney";
import UpcomingCourses from "../components/commonLayout/home/upcomingCourses/UpcomingCourses";


const HomePage = async () => {
    return (
        <div>
            <Banner />
            <About />
            <Category />
            <OngoingCourses />
            <UpcomingCourses/>
            <StartJourney/>
        </div>
    );
};

export default HomePage;