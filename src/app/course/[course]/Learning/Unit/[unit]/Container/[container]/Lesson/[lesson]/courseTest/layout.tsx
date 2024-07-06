 "use client"
import React from 'react';
import NavLeftCourse from '@/app/components/course/navLeftCourse'; // Correct import
import BodyMainCourse from '@/app/components/course/bodyMainCourse';
import useCheckoutUnitHook from '@/hook/checkoutUnitHook';

interface CourseTestProps {
  navLeft: React.ReactNode;
  bodyMaterialTest: React.ReactNode;
  params: { course: string };
}
const CourseTest: React.FC<CourseTestProps > = ({ navLeft, bodyMaterialTest, params }) =>{
      const {currentCourse } = useCheckoutUnitHook(params);

      if (currentCourse) {
        return (
          <div className="content__container relative">
            <input type="checkbox" id="content_checkbox" className="peer/checkboxTranslate hidden" />
            <NavLeftCourse>
              {navLeft}
            </NavLeftCourse>
            <BodyMainCourse>
            {bodyMaterialTest}
            </BodyMainCourse>
          </div>
        );
      }
  return null;
  }

  export default CourseTest;

