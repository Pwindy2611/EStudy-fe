import ListLessonComponent from "../getLesson"
import  Link  from 'next/link';
export default function NavLeftOptionCourse({ params }: { params: {course: string ,unit:string,container:string,lesson:string} }){
    return(
      <div >
        <div className="flex px-2 py-5 bg-primary-bg-color items-center justify-between">
          <Link href="courseLearn.html" className="text-xl no-underline text-white">List 1</Link>
          <label htmlFor="content_checkbox"
            ><i className="text-white text-xl cursor-pointer fa-solid fa-angle-left"></i></label>
        </div>
      <ListLessonComponent params={params}></ListLessonComponent>
      </div>
    )
}

