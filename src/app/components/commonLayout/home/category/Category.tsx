import { getAllCategory } from "@/services/category";
import { ICategory } from "@/types";
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import Link from "next/link";

const Category = async () => {
    const { data: categories } = await getAllCategory();
    return (
        <div className="bg-[#143532] relative">
             <div className="absolute right-0 bottom-20 z-10 md:h-[450px] h-[250px] w-[240px] md:w-[430px] rotate-45 bg-gradient-to-l from-[#07e0cb] to-cyan-400 opacity-30 blur-[150px] filter dark:opacity-50"></div>
            <div className="container mx-auto py-32">
                <div className="text-center">
                    <div className="border border-gray-400 text-sm inline-block bg-white rounded-full p-1 pr-4">
                        <h3 className="flex items-center gap-2"><span className="bg-[#07a6992a] w-6 h-6 p-1 flex items-center justify-center rounded-full"><BoltOutlinedIcon className="text-[#07a698]" /></span> Top Categories</h3>
                    </div>
                    <h2 className="text-[40px] font-bold my-4 text-white">Our Popular Categories</h2>
                </div>
                <div className="grid grid-cols-6 gap-8 mt-8">
                    {
                        categories?.slice(0, 12)?.map((category: ICategory) => (
                           <Link href={`/category/${category?._id}`} key={category?._id}>
                            <div className="rounded-lg p-4 relative group overflow-hidden border border-white/20 hover:text-white">
                                <div className="absolute top-[-40px] right-[-40px] w-[157px] h-[157px] bg-[#07A698] blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full z-0"></div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <img
                                        className="p-3"
                                        src={category?.image}
                                        alt="category"
                                        width={120}
                                        height={100}
                                    />
                                    <div className="text-center">
                                        <div>
                                            <h2 className="font-bold text-white/80  mt-4 text-lg">{category?.name.slice(0,20)}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div></Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Category;