"use client";
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { BreadcrumbWithCustomSeparator } from '@/components/handicraft/params/paramsCourseLearn';
import ListUnitsComponent from "../getUnit";
import Container from "./containersUnit";
import ExtentCourse from './extentCourse';
import LoadingBody from "@/app/components/partialView/loadingBody";
import {BackgroundBoxesDemo} from "./LandingCom"
export default function BodyCourseOption({ params }: { params: { course: string, unit: string } }) {
  const units = useSelector((state: any) => state.ThunkReducer.unit?.units?.data?.units);
  const ContentsUnit = useSelector((state: any) => state.ThunkReducer.contentUnits?.ContentUnit?.data);
  const isValidUnit = Array.isArray(units) && units.some((unit: any) => 
    unit.unitId === Number(params.unit) && unit.courseId === Number(params.course)||params.unit=="ExtendCourse"
  );

  if (params.unit === "LandingCourse") {
    return <BackgroundBoxesDemo></BackgroundBoxesDemo>
  }{
    if (!isValidUnit||!ContentsUnit ) {
      return <LoadingBody></LoadingBody>
    }
    else{
      return (
        <div>
          <nav className="fixed bg-white border-b-[1px] border-b-course-border-color w-full p-6 flex items-center justify-between">
            <BreadcrumbWithCustomSeparator params={params} />
            <label className="lg:hidden" htmlFor="content_checkbox_mb">
              <i className="fa-solid fa-bars text-xl mr-5 cursor-pointer"></i>
            </label>
          </nav>
          <input
            type="checkbox"
            id="content_checkbox_mb"
            className="peer/blockMenu nav-mobile-course__input"
          />
          <div className="peer-checked/blockMenu:-translate-x-0 fixed bg-white pt-[120px] h-full top-0 bottom-0 right-0 left-0 -translate-x-full transition duration-500 ease-in-out">
            <div>
              <div className="flex px-2 py-5 bg-primary-bg-color items-center justify-between">
                <Link href="" className="text-xl no-underline text-white">IELTS General Reading</Link>
                <label htmlFor="content_checkbox_mb">
                  <i className="text-white text-xl cursor-pointer fa-solid fa-angle-left"></i>
                </label>
              </div>
              <ListUnitsComponent params={params} />
            </div>
          </div>
          {
            params.unit==="ExtendCourse" ? <ExtentCourse></ExtentCourse> :  <Container params={params}  contentsUnit={ContentsUnit} />
          }
        </div>
      );
    }
  }
}
