"use client"
import useGetAllUnits from "@/hook/getAllUnitHook"; // Ensure correct path
import Link from 'next/link';

interface UnitsListProps {
    params: any;
}

const ListUnitsComponent: React.FC<UnitsListProps> = ({ params }) => {
    const ListUnits = useGetAllUnits(params);
    const idUnit = Number(params.unit)
    const checkExtentCourse=params.unit;

    return (
        <div className="border-r-[1px] border-r-[#e0e0e0]">
            <ul className="list-none">
                {Array.isArray(ListUnits) && ListUnits.length > 0 ? (
                    ListUnits.map((units: any) => (
                        <li key={units.unitId} className="course-learn__item">
                            <Link
                                href={`/course/${params.course}/Learning/Unit/${units.unitId}/courseOption`}
                                className={`border-l-4 border-l-transparent hover:border-primary-bg-color hover:bg-tag-search-bg-color block px-5 py-4 no-underline text-base text-black transition duration-300 ease-in-out ${idUnit === units.unitId ? 'border-l-nav-hover-text-color bg-tag-search-bg-color' : ''}`}
                            >
                                {units?.unitTittle}
                            </Link>
                        </li>
                    ))
                ) : (
                    <li>No units available</li>
                )}
                  <li className="course-learn__item">
                            <Link
                                href={`/course/${params.course}/Learning/Unit/ExtendCourse/courseOption`}
                                className={`border-l-4 border-l-transparent hover:border-primary-bg-color hover:bg-tag-search-bg-color block px-5 py-4 no-underline text-base text-black transition duration-300 ease-in-out ${checkExtentCourse==='ExtendCourse' ? 'border-l-nav-hover-text-color bg-tag-search-bg-color' : ''}`}
                            >
                                Gia hạn khoá học
                            </Link>
                    </li>
            </ul>
        </div>
    );
};

export default ListUnitsComponent;
