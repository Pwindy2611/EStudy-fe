"use client";
import React from 'react';
import NavLeftCourse from '@/app/components/course/navLeftCourse'; 
import BodyMainCourse from '@/app/components/course/bodyMainCourse';
import useCheckoutUnitHook from '@/hook/checkoutUnitHook'; // Update the path to the correct location

interface CourseOptionProps {
  navLeft: React.ReactNode;
  bodyMaterialCourse: React.ReactNode;
  params: { course: string };
}

const CourseOption: React.FC<CourseOptionProps> = ({ navLeft, bodyMaterialCourse, params }) => {
  const {currentCourse } = useCheckoutUnitHook(params);

  if (currentCourse) {
    return (
      <div className="content__container relative">
        <input type="checkbox" id="content_checkbox" className="peer/checkboxTranslate hidden" />
        <NavLeftCourse>
          {navLeft}
        </NavLeftCourse>
        <BodyMainCourse>
          {bodyMaterialCourse}
        </BodyMainCourse>
      </div>
    );
  }

  return null;
};

export default CourseOption;
