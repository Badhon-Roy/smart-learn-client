/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Delete } from "@mui/icons-material";
import { useEffect } from "react";
import { ICategory, IUser } from "@/types";
import { toast } from "sonner";
import { updateCourse } from "@/services/course";
import { useRouter } from "next/navigation";

const courseSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long" }),
  thumbnail: z.string().url({ message: "Thumbnail must be a valid URL" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }),

  instructors: z.array(
    z.object({
      instructor: z.string().min(5, { message: "Instructor is required" }),
      subject: z.string().min(2, { message: "Subject must be at least 2 characters" }),
    })
  ).min(1, { message: "At least one instructor must be added" }),
  category: z.string().min(5, { message: "Category is required" }),
  price: z.number().min(0, { message: "Price must be a positive number" }),
  discountPrice: z.number().min(0, { message: "Discount price must be a positive number" }).optional(),
  duration: z.string().min(1, { message: "Duration is required" }),
  class: z.string().min(1, { message: "Class is required" }),

  subject: z.array(
    z.object({
      name: z.string().min(2, { message: "Subject name must be at least 2 characters long" })
    })
  ).optional(),

  classLevel: z.enum(["Beginner", "Intermediate", "Advanced"], {
    required_error: "Class level is required",
    invalid_type_error: "Class level must be Beginner, Intermediate, or Advanced"
  }),

  lessons: z.array(
    z.object({
      title: z.string({ required_error: "Lesson title is required" }),
      videoUrl: z.string().url({ message: "Video URL must be valid" }),
      isView: z.boolean().optional(),
      duration: z.string().optional(),
    })
  ).min(1, { message: "At least one lesson is required" }),

  whatYouWillLearn: z.array(z.string({ required_error: "Learning point must be a string" })).optional(),

  faqs: z.array(
    z.object({
      question: z.string().min(5, { message: "Question must be at least 5 characters" }),
      answer: z.string().min(5, { message: "Answer must be at least 5 characters" }),
    })
  ).optional(),
});

type CourseFormData = z.infer<typeof courseSchema>;

type UpdateCourseFormProps = {
  courseId: string;
  courseData: CourseFormData;
  filterInstructors: IUser[];
  allCategories: ICategory[]
};

const UpdateCourseForm = ({ courseId, courseData, filterInstructors,allCategories }: UpdateCourseFormProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: courseData,
  });

  useEffect(() => {
    reset(courseData);
  }, [courseData, reset]);

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
    const toastLoading = toast.loading("Updating course...");
    try {
      const res = await updateCourse(courseId, data);
      if (res.success) {
        toast.success(res.message || "Course updated successfully!", { id: toastLoading });
        router.push("/dashboard/instructor/manage-course");
      } else {
        toast.error(res.message || "Something went wrong!", { id: toastLoading });
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update course", { id: toastLoading });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={handleKeyDown}
      className="p-6 bg-[#101929]/60 rounded-lg space-y-6 border border-white/20 md:m-8 md:my-0 my-8"
    >
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <input {...register("title")} placeholder="Course Title" className="input input-bordered border rounded border-white/50 w-full p-3" />
          {errors && <p className="text-red-500">{errors?.title?.message}</p>}
        </div>

        <div>
          <input {...register("thumbnail")} placeholder="Thumbnail URL" className="input input-bordered border rounded border-white/50 w-full p-3" />
          {errors && <p className="text-red-500">{errors?.thumbnail?.message}</p>}
        </div>
        <div>
          <input type="number" {...register("price", { valueAsNumber: true })} placeholder="Price" className="input input-bordered border rounded border-white/50 w-full p-3" />
          {errors && <p className="text-red-500">{errors?.price?.message}</p>}
        </div>
        <div>
          <input type="number" {...register("discountPrice", { valueAsNumber: true })} placeholder="Discount Price" className="input input-bordered border rounded border-white/50 w-full p-3" />
          {errors && <p className="text-red-500">{errors?.discountPrice?.message}</p>}
        </div>
        <div>
          <input {...register("class")} placeholder="Class Name" className="input input-bordered border rounded border-white/50 w-full p-3" />
          {errors && <p className="text-red-500">{errors?.class?.message}</p>}
        </div>
        <div>
          <input {...register("duration")} placeholder="Course Duration" className="input input-bordered border rounded border-white/50 w-full p-3" />
          {errors.duration && <p className="text-red-500">{errors?.duration?.message}</p>}
        </div>
        <div>
          <select {...register("classLevel")} className="select select-bordered border rounded border-white/50 w-full p-3">
            <option className="text-black" value="">Select Level</option>
            <option className="text-black" value="Beginner">Beginner</option>
            <option className="text-black" value="Intermediate">Intermediate</option>
            <option className="text-black" value="Advanced">Advanced</option>
          </select>
          {errors && <p className="text-red-500">{errors?.classLevel?.message}</p>}
        </div>
        <div>
          <select {...register("category")} className="select select-bordered border rounded border-white/50 p-3 w-full">
            <option className="text-black" value="">Select Category</option>
            {
              allCategories?.map((category) => (
                <option className="text-black" key={category?._id} value={category?._id}>
                  {category?.name}
                </option>
              ))
            }
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <textarea {...register("description")} placeholder="Description" className="textarea textarea-bordered border rounded border-white/50 w-full p-3" rows={4} />
        {errors && <p className="text-red-500">{errors?.description?.message}</p>}
      </div>

      {/* Subjects */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Subjects</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {subjectFields.map((item, index) => (
            <div key={item.id} className="flex gap-2">
              <input {...register(`subject.${index}.name`)} placeholder={`Subject ${index + 1}`} className="input input-bordered border rounded border-white/50 w-full p-3" />
              <button type="button" onClick={() => removeSubject(index)} className="cursor-pointer" ><Delete className="text-red-600" /></button>
            </div>
          ))}
          <button type="button" onClick={() => appendSubject({ name: "" })} className="w-fit cursor-pointer hover:text-amber-500">+ Add Subject</button>
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
                <option value="" className="text-black">Select Instructor</option>
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
                <p className="text-red-500">
                  {errors.instructors[index].instructor.message}
                </p>
              )}
              {errors?.instructors?.[index]?.subject && (
                <p className="text-red-500">
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

      {/* Lessons */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Lessons</h3>
        <div className="space-y-4">
          {lessonFields.map((item, index) => (
            <div key={item.id} className="border p-4 rounded bg-base-200 space-y-2">
              <input {...register(`lessons.${index}.title`)} placeholder="Lesson Title" className="input input-bordered border rounded border-white/50 w-full p-3" />
              <input {...register(`lessons.${index}.videoUrl`)} placeholder="Video URL" className="input input-bordered border rounded border-white/50 w-full p-3" />
              <input {...register(`lessons.${index}.duration`)} placeholder="Duration" className="input input-bordered border rounded border-white/50 w-full p-3" />
              <label className="label cursor-pointer">
                <span className="label-text">Viewable?</span>
                <input type="checkbox" {...register(`lessons.${index}.isView`)} className="checkbox" />
              </label>
              <button type="button" onClick={() => removeLesson(index)} className="">Remove Lesson</button>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => appendLesson({ title: "", videoUrl: "", isView: false })} className="cursor-pointer hover:text-amber-500 mt-4">+ Add Lesson</button>
      </div>

      {/* FAQs */}
      <div>
        <h3 className="text-lg font-semibold mb-4">FAQs</h3>
        <div className="space-y-4">
          {faqFields.map((item, index) => (
            <div key={item.id} className="grid md:grid-cols-2 gap-4">
              <input {...register(`faqs.${index}.question`)} placeholder="Question" className="input input-bordered border rounded border-white/50 w-full p-3" />
              <input {...register(`faqs.${index}.answer`)} placeholder="Answer" className="input input-bordered border rounded border-white/50 w-full p-3" />
              <div className="md:col-span-2">
                <button type="button" onClick={() => removeFaq(index)} className="cursor-pointer hover:text-red-500">Remove FAQ</button>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => appendFaq({ question: "", answer: "" })} className="cursor-pointer hover:text-amber-500 mt-4">+ Add FAQ</button>
      </div>

      {/* What You Will Learn */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What You Will Learn</h3>
        <textarea {...register("whatYouWillLearn.0")} placeholder="One per line or comma-separated" className="textarea textarea-bordered border rounded border-white/50 w-full p-3" rows={3} />
      </div>

      {/* Submit */}
      <button type="submit" className="w-full bg-amber-500 py-4 rounded-xl text-lg font-medium cursor-pointer">Update Course</button>
    </form>
  );
};

export default UpdateCourseForm;
