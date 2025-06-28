import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";


const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <main className='min-h-[70vh]'>{children}</main>
            <Footer/>
        </>
    );
};

export default CommonLayout;