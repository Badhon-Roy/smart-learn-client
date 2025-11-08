"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Add, Remove } from "@mui/icons-material";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import Image from "next/image";

const faqData = [
    {
        question: "How does Smart Learn help students learn effectively?",
        answer:
            "Smart Learn provides structured video lessons, quizzes, and progress tracking tools that help students learn at their own pace. Each course includes real-world projects and mentor support to ensure deep understanding.",
    },
    {
        question: "Can I access my courses from any device?",
        answer:
            "Yes, Smart Learn is fully responsive and cloud-based — you can continue your learning journey seamlessly across mobile, tablet, and desktop devices.",
    },
    {
        question: "Do I get a certificate after course completion?",
        answer:
            "Of course! Once you complete a course, you’ll receive a digital certificate verified by Smart Learn that can be added to your LinkedIn profile or resume.",
    },
    {
        question: "Can instructors upload their own courses?",
        answer:
            "Yes! Instructors can easily create and manage their courses through the Smart Learn dashboard — complete with modules, assessments, and analytics.",
    },
    {
        question: "Is there any free course or trial available?",
        answer:
            "Absolutely. You can start with our free demo courses to explore our platform before enrolling in premium programs.",
    }
];

const Faq = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative py-20 flex flex-col items-center justify-center overflow-hidden">

            {/* Header */}
            <div className="flex flex-col items-center justify-center">
                <div className="border border-gray-400 text-sm inline-block bg-white rounded-full p-1 pr-4">
                    <h3 className="flex items-center gap-2 font-bold"><span className="bg-gradient-to-r from-[#07a698] to-[#04d9c2] rounded-full flex items-center justify-center text-white"><BoltOutlinedIcon /></span> FAQ</h3>
                </div>
                <h2 className="lg:text-[40px] md:text-[30px] text-[20px] font-bold my-4">Frequently Asked Questions</h2>
            </div>


            {/* FAQ Section */}
            {/* FAQ Section */}
            <div className="container flex justify-between items-stretch gap-8 mx-auto w-full px-4 mt-8">
                {/* Left: FAQ List */}
                <div className="space-y-5 w-3/5 flex flex-col justify-center">
                    {faqData.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`relative group backdrop-blur-2xl border bg-gradient-to-r from-transparent via-[#07e0cb]/10 to-transparent transition duration-700 rounded-2xl overflow-hidden ${openIndex === index
                                ? "bg-white/30 border-gray-300"
                                : "border-gray-300 bg-white/20"
                                }`}
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="flex justify-between cursor-pointer items-center w-full text-left px-6 py-5 relative z-10"
                            >
                                <h3 className="text-lg md:text-xl font-semibold text-gray-700">
                                    {faq.question}
                                </h3>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-[#07e0cb]"
                                >
                                    {openIndex === index ? (
                                        <Remove fontSize="medium" />
                                    ) : (
                                        <Add fontSize="medium" />
                                    )}
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="overflow-hidden relative z-10"
                                    >
                                        <div className="px-6 pb-6 text-base md:text-lg text-gray-700">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Right: Image Section */}
                <div className="relative w-2/5 flex justify-center items-center border border-gray-300 rounded-3xl p-2">
                    <div className="absolute -z-10 w-[400px] h-[400px] bg-gradient-to-tr from-[#07e0cb]/30 via-[#0ef2d3]/40 to-[#c7fff7]/20 rounded-full blur-3xl"></div>
                    <Image
                        src="https://www.wealthalliance.ie/wp-content/uploads/2018/06/FAQ-orange-1.png"
                        alt="faq image"
                        width={800}
                        height={500}
                        className="object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default Faq;
