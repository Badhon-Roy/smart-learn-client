/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Delete } from "@mui/icons-material";
import { toast } from "sonner";
import { createCourse } from "@/services/course";
import { useRouter } from "next/navigation";
import { IUser } from "@/types";


const courseSchema = z.object({
    title: z.string().min(3),
    thumbnail: z.string().url(),
    description: z.string().min(10),
    instructors: z.array(
        z.object({
            instructor: z.string().min(5, "Instructor ID is required"),
            subject: z.string().min(2, "Subject must be at least 2 characters"),
        })
    ),
    price: z.number().min(0),
    discountPrice: z.number().min(0).optional(),
    class: z.string().min(1),
    subject: z.array(
        z.object({
            name: z.string().min(2)
        })
    ).optional(),
    classLevel: z.enum(["Beginner", "Intermediate", "Advanced"]),
    lessons: z.array(
        z.object({
            title: z.string(),
            videoUrl: z.string().url(),
            isView: z.boolean().default(false).optional(),
            duration: z.string().optional(),
        })
    ),
    whatYouWillLearn: z.array(z.string()).optional(),
    faqs: z.array(
        z.object({
            question: z.string().min(5),
            answer: z.string().min(5),
        })
    ).optional(),
});

type CourseFormData = z.infer<typeof courseSchema>;

const CreateCourseForm = ({ filterInstructors }: { filterInstructors: IUser[] }) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }, reset
    } = useForm<CourseFormData>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            subject: [{ name: "" }],
            lessons: [{ title: "", videoUrl: "", isView: false }],
            faqs: [{ question: "", answer: "" }],
            instructors: [{ instructor: "", subject: "" }],
            whatYouWillLearn: [""],
        },
    });

    const { fields: lessonFields, append: appendLesson, remove: removeLesson } = useFieldArray({
        control,
        name: "lessons",
    });

    const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({
        control,
        name: "faqs",
    });
    const { fields: insFields, append: appendIns, remove: removeIns } = useFieldArray({
        control,
        name: "instructors",
    });

    const { fields: subjectFields, append: appendSubject, remove: removeSubject } = useFieldArray({
        control,
        name: "subject",
    });

    const onSubmit: SubmitHandler<CourseFormData> = async (data) => {
        const toastLoading = toast.loading("Creating course...")
        try {
            const res = await createCourse(data)
            if (res.success) {
                toast.success(res.message, { id: toastLoading })
                reset();
                router.push('/dashboard/instructor/manage-course')
            } else if (res.err) {
                console.log(res.err);
                toast.error(res?.message || "Something went wrong!", { id: toastLoading })
            }
        } catch (error: any) {
            toast.error(error.message, { id: toastLoading })
        }
    };

    // Prevent form submission on "Enter" key press
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={handleKeyDown}
            className="p-6 bg-[#101929]/60 rounded-lg space-y-6 border border-white/20 md:m-8 md:my-0 my-8">

            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                    <input {...register("title")} placeholder="Course Title" className="input input-bordered border rounded border-white/50 w-full p-3" />
                    <p className="text-red-500 text-sm">{errors.title?.message}</p>
                </div>
                <div>
                    <input {...register("thumbnail")} placeholder="Thumbnail URL" className="input input-bordered border rounded border-white/50 w-full p-3" />
                    <p className="text-red-500 text-sm">{errors.thumbnail?.message}</p>
                </div>
                <div>
                    <input type="number" {...register("price", { valueAsNumber: true })} placeholder="Price" className="input input-bordered border rounded border-white/50 w-full p-3" />
                </div>
                <div>
                    <input type="number" {...register("discountPrice", { valueAsNumber: true })} placeholder="Discount Price" className="input input-bordered border rounded border-white/50 w-full p-3" />
                </div>
                <div>
                    <input {...register("class")} placeholder="Class Name" className="input input-bordered border rounded border-white/50 w-full p-3" />
                </div>
                <div>
                    <select {...register("classLevel")} className="select select-bordered border rounded border-white/50 p-3 w-full">
                        <option className="text-black" value="">Select Level</option>
                        <option className="text-black" value="Beginner">Beginner</option>
                        <option className="text-black" value="Intermediate">Intermediate</option>
                        <option className="text-black" value="Advanced">Advanced</option>
                    </select>
                </div>
            </div>

            {/* Description */}
            <div>
                <textarea {...register("description")} placeholder="Course Description" className="textarea textarea-bordered border rounded border-white/50 p-3 w-full" rows={4} />
                <p className="text-red-500 text-sm">{errors.description?.message}</p>
            </div>

            {/* Subject Section */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Subjects</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {subjectFields.map((item, index) => (
                        <div key={item.id} className="flex gap-2">
                            <input {...register(`subject.${index}.name`)} placeholder={`Subject ${index + 1}`} className="input input-bordered border rounded border-white/50 w-full p-3" />
                            <button type="button" onClick={() => removeSubject(index)} className="cursor-pointer"><Delete className="text-red-600" /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => appendSubject({ name: "" })} className="btn btn-secondary w-fit cursor-pointer hover:text-amber-500">+ Add Subject</button>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4">Instructors</h3>
                <div className="grid gap-4">
                    {insFields?.map((item, index) => (
                        <div key={item.id} className="grid md:grid-cols-2 gap-2">
                            <select
                                {...register(`instructors.${index}.instructor`)}
                                className="select select-bordered border rounded border-white/50 p-3 w-full text-white"
                            >
                                <option value="">Select Instructor</option>
                                {filterInstructors?.map((inst) => (
                                    <option className="text-black" key={inst?._id} value={inst?._id}>
                                        {inst?.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                {...register(`instructors.${index}.subject`)}
                                placeholder="Subject"
                                className="input input-bordered border rounded border-white/50 w-full p-3"
                            />
                            <div className="md:col-span-2">
                                <button
                                    type="button"
                                    onClick={() => removeIns(index)}
                                    className="btn btn-error hover:text-red-500 cursor-pointer"
                                >
                                    Remove Instructor
                                </button>
                            </div>
                            {/* Display validation errors if any */}
                            {errors?.instructors?.[index]?.instructor && (
                                <p className="text-red-500 text-sm">
                                    {errors.instructors[index].instructor.message}
                                </p>
                            )}
                            {errors?.instructors?.[index]?.subject && (
                                <p className="text-red-500 text-sm">
                                    {errors.instructors[index].subject.message}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={() => appendIns({ instructor: "", subject: "" })}
                    className="btn btn-secondary mt-4 hover:text-amber-500"
                >
                    + Add Instructor
                </button>
            </div>



            {/* Lessons Section */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Lessons</h3>
                <div className="grid gap-4">
                    {lessonFields.map((item, index) => (
                        <div key={item.id} className="border rounded-lg p-4 space-y-2 bg-base-200">
                            <input {...register(`lessons.${index}.title`)} placeholder="Lesson Title" className="input input-bordered border rounded border-white/50 w-full p-3" />
                            <input {...register(`lessons.${index}.videoUrl`)} placeholder="Video URL" className="input input-bordered border rounded border-white/50 w-full p-3" />
                            <input {...register(`lessons.${index}.duration`)} placeholder="Duration (e.g. 10m 30s)" className="input input-bordered border rounded border-white/50 w-full p-3" />
                            <label className="label cursor-pointer">
                                <span className="label-text">Viewable?</span>
                                <input type="checkbox" {...register(`lessons.${index}.isView`)} className="checkbox" />
                            </label>
                            <button type="button" onClick={() => removeLesson(index)} className="btn btn-error">Remove Lesson</button>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={() => appendLesson({ title: "", videoUrl: "", isView: false })} className="btn btn-secondary cursor-pointer hover:text-amber-500 mt-4">+ Add Lesson</button>
            </div>

            {/* FAQ Section */}
            <div>
                <h3 className="text-lg font-semibold mb-4">FAQs</h3>
                <div className="grid gap-4">
                    {faqFields.map((item, index) => (
                        <div key={item.id} className="grid md:grid-cols-2 gap-2">
                            <input {...register(`faqs.${index}.question`)} placeholder="Question" className="input input-bordered border rounded border-white/50 w-full p-3" />
                            <input {...register(`faqs.${index}.answer`)} placeholder="Answer" className="input input-bordered border rounded border-white/50 w-full p-3" />
                            <div className="md:col-span-2">
                                <button type="button" onClick={() => removeFaq(index)} className="btn btn-error hover:text-red-500 cursor-pointer">Remove FAQ</button>
                            </div>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={() => appendFaq({ question: "", answer: "" })} className="btn btn-secondary mt-4 hover:text-amber-500">+ Add FAQ</button>
            </div>

            {/* What You Will Learn */}
            <div>
                <h3 className="text-lg font-semibold mb-4">What You Will Learn</h3>
                <textarea {...register("whatYouWillLearn.0")} placeholder="Enter key learning points (one per line or comma-separated)" className="textarea textarea-bordered border rounded border-white/50 p-3 w-full" rows={3} />
            </div>

            {/* Submit */}
            <div>
                <button type="submit" className="w-full bg-amber-500 py-4 rounded-xl cursor-pointer text-lg font-medium">Submit Course</button>
            </div>
        </form>
    );
};

export default CreateCourseForm;
