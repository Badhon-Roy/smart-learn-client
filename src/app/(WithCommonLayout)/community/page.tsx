import CommonBanner from "@/app/common/CommonBanner";
import Faq from "@/app/components/commonLayout/home/faq/Faq";
import Testimonial from "@/app/components/commonLayout/home/testimonial/Testimonial";


const CommunityPage = () => {
  return (
    <div>
      <CommonBanner title="Community"/>
      <Faq />
      <Testimonial />
    </div>
  );
};

export default CommunityPage;