"use client"
import useGetAllLessons from "@/hook/getAllLessonHook"; // Ensure correct path
import Link from 'next/link';

interface LessonListProps {
  params: any;
}
const ListLessonComponent: React.FC<LessonListProps> = ({ params }) => {
  const ListLesson = useGetAllLessons(params);
  const LessonId=Number(params.lesson)
    return(
          <div className="course-learn__container">
            <ul className="course-learn__list">
            {Array.isArray(ListLesson) && ListLesson.length > 0 ? (
                    ListLesson.map((lesson: any) => (
                      <li key={lesson.lessonId} className="course-learn__item">
                      <Link
                         href={`/course/${params.course}/Learning/Unit/${params.unit}/Container/${params.container}/Lesson/${lesson.lessonId}/courseTest?TAG=${lesson.tagID}`}
                        className={` text-sm border-l-[4px] border-l-transparent flex items-center p-3 no-underline text-black hover:border-l-nav-hover-text-color hover:bg-exam-bg-color transition duration-200 ${LessonId === lesson.lessonId ? 'border-l-nav-hover-text-color bg-tag-search-bg-color' : ''}`}>
                        <i className="fa-solid fa-circle-check text-green-600"></i>
                        <h3 className=" mx-2">{lesson.lessonTitle}</h3>
                        <span
                          className=" text-base"
                        >
                          {lesson.lessonType}</span>
                      </Link>
                    </li>
                    ))
                ) : (
                    <li>No Lesson available</li>
                )}
            </ul>
          </div>
        
    )
}

export default ListLessonComponent;