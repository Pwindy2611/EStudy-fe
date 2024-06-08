import ListUnitsComponent from "../getUnit"
import  Link  from 'next/link';
export default function NavLeftOptionCourse({ params }: { params: {course: string } }){
    return(
      <div>
        <div className="flex px-2 py-5 bg-nav-hover-text-color items-center justify-between">
          <Link href="" className="text-xl no-underline text-white">IELTS General Reading</Link>
          <label htmlFor="content_checkbox">
            <i className="text-white text-xl cursor-pointer fa-solid fa-angle-left"></i>
          </label>
        </div>
        <ListUnitsComponent params={params}></ListUnitsComponent>
        </div>
    )
}