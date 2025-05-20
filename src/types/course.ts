import { ICategory } from "./category";
import { IUser } from "./user";

export interface ICourse {
    _id?: string;
  thumbnail: string;
  title: string;
  description: string;
  instructors: {
    instructor: IUser;
    subject: string;
  }[];
  price: number;
  discountPrice?: number;
  class: string;
  subject: {
    name: string;
  }[];
  category: ICategory;
  duration?: string;
  classLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  lessons: {
    title: string;
    videoUrl: string;
    isView: boolean;
    duration?: string;
  }[];
  isApproved: boolean;
  studentsEnrolled?: IUser[];
  rating?: number;
  reviews?: {
    student: IUser;
    comment: string;
    rating: number;
    date: string | Date;
  }[];
  whatYouWillLearn?: string[];
  faqs?: {
    question: string;
    answer: string;
  }[];
  status: "Ongoing" | "Upcoming" | "Completed";
}
