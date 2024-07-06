"use client"
import useGetAllLessons from "@/hook/getAllLessonHook"; // Ensure correct path
import Link from 'next/link';
import LoadingNavLeft from "@/app/components/partialView/loadingNavLeft";

interface LessonListProps {
  params: any;
}
const ListLessonComponent: React.FC<LessonListProps> = ({ params }) => {
  const ListLesson = useGetAllLessons(params);
  const LessonId=Number(params.lesson)
    return(
          <div className="border-r-[1px] h-full border-r-[#e0e0e0]">
            <ul className="list-none h-full">
            {Array.isArray(ListLesson) && ListLesson.length > 0 ? (
                    ListLesson.map((lesson: any) => (
                      <li key={lesson.lessonId} className="course-learn__item">
                      <Link
                         href={`/course/${params.course}/Learning/Unit/${params.unit}/Container/${params.container}/Lesson/${lesson.lessonId}/courseTest?TAG=${lesson.tagId}`}
                        className={` text-sm border-l-[4px] border-l-transparent flex items-center p-3 no-underline text-black hover:border-primary-bg-color hover:bg-exam-bg-color transition duration-200 ${LessonId === lesson.lessonId ? 'border-l-nav-hover-text-color bg-tag-search-bg-color' : ''}`}>
                        <i className="fa-solid fa-circle-check text-green-600"></i>
                        <h3 className=" mx-2 text-base font-medium">{lesson.lessonType}:</h3>
                        <span
                          className=" "
                        >
                          {lesson.lessonTitle}</span>
                      </Link>
                    </li>
                    ))
                ) : (
                  <div className="w-full h-2/4 flex">
                    <div className=" m-auto">
                      <LoadingNavLeft></LoadingNavLeft>
                    </div>
                  </div>
                )}
            </ul>
          </div>
        
    )
}

export default ListLessonComponent;