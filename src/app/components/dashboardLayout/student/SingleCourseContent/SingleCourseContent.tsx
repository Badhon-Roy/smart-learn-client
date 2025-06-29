"use client";

import React, { useEffect, useState } from "react";
import { getSingleCourse } from "@/services/course";
import { ILessons } from "@/types";

function getYouTubeEmbedUrl(url: string) {
  if (url.includes("youtube.com/embed/")) return url;
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  const videoId = match ? match[1] : null;
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : "";
}

const SingleCourseContent = ({ courseId } : {courseId : string}) => {
  const [course, setCourse] = useState<null | { title: string; lessons: ILessons[] }>(null);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number>(0);

  useEffect(() => {
    async function fetchCourse() {
      const { data } = await getSingleCourse({ id: courseId });
      setCourse(data);
      setSelectedLessonIndex(0);
    }
    fetchCourse();
  }, [courseId]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#0a1120]">
        Loading course...
      </div>
    );
  }

  const selectedLesson = course.lessons[selectedLessonIndex];
  if (!selectedLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#0a1120]">
        No lessons available
      </div>
    );
  }

  const embedUrl = getYouTubeEmbedUrl(selectedLesson.videoUrl);

  const goPrev = () => {
    if (selectedLessonIndex > 0) setSelectedLessonIndex(selectedLessonIndex - 1);
  };

  const goNext = () => {
    if (course && selectedLessonIndex < course.lessons.length - 1) {
      setSelectedLessonIndex(selectedLessonIndex + 1);
    }
  };

  return (
    <div className="max-h-[90vh] px-4 md:px-8 py-6 text-white flex flex-col bg-[#0a1120]">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#07A698] text-center sm:text-left">{course.title}</h2>
      <hr className="border-white/10 mb-6" />

      <div className="flex flex-col xl:flex-row gap-8 flex-grow">
        {/* === Video Section === */}
        <div className="w-full xl:w-2/3 flex flex-col">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">{selectedLesson.title}</h3>
          <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={embedUrl}
              title={selectedLesson.title}
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          <div className="flex justify-between items-center mt-6 gap-3">
            <button
              onClick={goPrev}
              disabled={selectedLessonIndex === 0}
              className={`px-4 py-2 rounded font-semibold shadow-md transition sm:w-auto
                ${selectedLessonIndex === 0
                  ? "bg-gray-600 cursor-not-allowed"
                  : "border border-[#07A698] hover:bg-[#05907a] cursor-pointer text-white"
                }`}
            >
              Previous
            </button>

            <button
              onClick={goNext}
              disabled={selectedLessonIndex === course.lessons.length - 1}
              className={`px-4 py-2 rounded font-semibold shadow-md transition sm:w-auto
                ${selectedLessonIndex === course.lessons.length - 1
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#07A698] hover:bg-[#05907a] cursor-pointer text-white"
                }`}
            >
              Next
            </button>
          </div>

          <div className="mt-6 space-y-2">
            <h3 className="text-lg sm:text-xl font-semibold">📖 Course Overview</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Dive into the lessons using the player above. Select a lesson on the right panel to start.
            </p>
          </div>
        </div>

        {/* === Sidebar Section === */}
        <div className="w-full xl:w-1/3 max-h-[600px] overflow-y-auto p-4 bg-[#0d1628] rounded-lg scrollbar-thin scrollbar-thumb-[#07A698]/70 scrollbar-track-transparent">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">🧩 Lessons</h3>

          {course.lessons.length > 0 ? (
            <div className="space-y-4">
              {course.lessons.map((lesson, index) => (
                <div
                  key={lesson.title || index}
                  onClick={() => setSelectedLessonIndex(index)}
                  className={`p-4 rounded-xl cursor-pointer flex items-center gap-3 border
                    ${selectedLessonIndex === index
                      ? "border-[#07A698] bg-[#07A698]/10"
                      : "border-white/10 bg-gradient-to-br from-[#131c2c] to-[#1f2a41]"
                    }
                    shadow-sm hover:shadow-lg transition group`}
                >
                  <div className="flex-1">
                    <h4
                      className={`text-sm sm:text-md font-semibold 
                      ${selectedLessonIndex === index ? "text-[#07A698]" : "text-white"} 
                      group-hover:text-[#07A698] transition`}
                    >
                      {index + 1}. {lesson.title}
                    </h4>
                    {lesson.duration && (
                      <p className="text-xs text-gray-400 mt-1">Duration: {lesson.duration}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#131c2c] p-6 rounded-xl text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-white">No Lessons Available</h3>
              <p className="text-gray-400 mt-2">Please check back later or contact your instructor.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCourseContent;
