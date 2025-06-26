import Payment from "@/app/components/commonLayout/payment/Payment";
import { getSingleCourse } from "@/services/course";

 
const PaymentPage =async ({params} : {params : Promise<{id : string}>}) => {
    const { id } = await params;
    const {data : course} = await getSingleCourse({id});
    return (
        <div>
            <Payment course={course} />
        </div>
    );
};

export default PaymentPage;