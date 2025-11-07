
import Banner from './../components/commonLayout/home/banner/Banner';
import About from './../components/commonLayout/home/about/About';
import Category from './../components/commonLayout/home/category/Category';
import OngoingCourses from './../components/commonLayout/home/ongoingCourses/OngoingCourses';
import UpcomingCourses from './../components/commonLayout/home/upcomingCourses/UpcomingCourses';
import StartJourney from './../components/commonLayout/home/startJourney/StartJourney';
import { getAllCategory } from '@/services/category';
import { getAllCourse } from '@/services/course';
import { ICourse } from './../../types/course';
import WhatNew from '../components/commonLayout/home/whatNew/WhatNew';


const HomePage = async () => {
    const { data: categories } = await getAllCategory();
    const { data: courses } = await getAllCourse();
    const filteredCourses = courses?.filter((course: ICourse) => course?.status === "Upcoming");
    const filteredOngoingCourses = courses?.filter((course: ICourse) => course?.status === "Ongoing" && course?.isApproved === true );
    return (
        <div>
            <Banner courses={courses}/>
            <About />
            <Category categories={categories}/>
            <OngoingCourses filteredOngoingCourses={filteredOngoingCourses}/>
            <WhatNew/>
            <UpcomingCourses filteredCourses={filteredCourses}/>
            <StartJourney/>
        </div>
    );
};

export default HomePage;