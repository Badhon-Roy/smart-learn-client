"use client";
import { useUser } from "@/context/UserContext";
import { createOrder } from "@/services/order";
import { ICourse } from "@/types";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";


const Payment = ({ course }: { course: ICourse }) => {
  const { _id,title, price, discountPrice } = course || {};
  const { user } = useUser();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const modifyData = {
      name: user?.name,
      email: user?.email,
      userId: user?.userId,
      mobile: data?.mobile,
      courseId: _id
    }
    const toastLoading = toast.loading("Paying...")
    try {
      const res = await createOrder(modifyData)
      console.log(res);
      if (res?.session?.url) {

        toast.dismiss(toastLoading);
        window.location.href = res?.session?.url;
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastLoading })
    }
  };

  const getDeviceName = () => {
    const ua = navigator.userAgent;

    if (/iPhone/i.test(ua)) return "iPhone";
    if (/iPad/i.test(ua)) return "iPad";
    if (/Android/i.test(ua)) return "Android Device";
    if (/Windows/i.test(ua)) return "Windows PC";
    if (/Macintosh/i.test(ua)) return "Mac";
    if (/Linux/i.test(ua)) return "Linux Device";

    return "Unknown Device";
  };
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 transition-all md:flex justify-between gap-8">
      <div className=" flex-1 ">
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-dashed border-[#07a698] mb-8">
          <h4 className="text-2xl font-semibold mb-4 text-teal-700">অর্ডার সারাংশ</h4>

          <div className="space-y-8 text-gray-700">
            <div className="flex justify-between">
              <span>{title}</span>
              <span className="font-semibold">৳{price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-dashed border-b pb-2">
              <span>ডেলিভারি চার্জ</span>
              <span className="font-semibold">৳0.00</span>
            </div>
            <div className="flex justify-between">
              <span>সাব টোটাল</span>
              <span className="font-semibold">৳{price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b border-gray-400 pb-2">
              <span>টোটাল ডিস্কাউন্ট</span>
              <span>{
                discountPrice
                  ? <span className="text-red-500 font-semibold">- ৳{(discountPrice * 0.01 * price).toFixed(2)}</span>
                  : <span>৳0.00</span>
              }</span>
            </div>

            <div className="flex justify-between text-lg font-bold text-gray-800">
              <span>সর্বমোট</span>
              <span>
                ৳{discountPrice
                  ? (price - discountPrice * 0.01 * price).toFixed(2)
                  : price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-dashed border-[#07a698] flex-1">
          <h4 className="text-2xl font-semibold mb-4 text-teal-700">ক্রেতার বিস্তারিত</h4>

          <div className="space-y-8 text-gray-700">
            <div className="flex justify-between">
              <span>নাম</span>
              <span className="font-semibold">{user?.name}</span>
            </div>
            <div className="flex justify-between border-dashed border-b pb-2">
              <span>ইমেইল</span>
              <span className="font-semibold">{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span>ডিভাইস</span>
              <span className="font-semibold">{getDeviceName()}</span>
            </div>

          </div>
        </div>
      </div>
      <div className="bg-white shadow-xl rounded-2xl p-6 border border-dashed border-[#07a698] flex-1 mt-8 md:mt-0 h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gradient-to-br from-[#e0f7fa] to-[#e0f2f1] p-6 rounded-xl shadow-inner space-y-5 transition-all duration-300"
        >
          {/* মোবাইল নাম্বার */}
          <label className="block">
            <span className="text-gray-700 font-medium">মোবাইল নাম্বার</span>
            <input
              type="text"
              placeholder="e.g. 017XXXXXXXX"
              {...register("mobile", { required: "মোবাইল নাম্বার আবশ্যক" })}
              className="mt-2 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07a698] border-gray-300"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile.message as string}</p>
            )}
          </label>

          <button
            type="submit"
            className="w-full bg-[#07a698] hover:bg-[#01887f] text-white font-semibold py-3 rounded-xl transition-all shadow-lg"
          >
            সাবমিট করে এনরোল করুন
          </button>
        </form>

      </div>
    </div>
  );
};

export default Payment;