export interface IUser{
    _id?: string;
    name?: string;
    photo?:string;
    enrolledCourses: [];
    userId: string
    email: string;
    role: 'student' | 'instructor' | 'admin';
    exp?: number;
    iat?: number;
}