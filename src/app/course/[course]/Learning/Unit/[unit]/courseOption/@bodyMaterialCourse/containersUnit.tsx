import { useSelector } from 'react-redux';
import Link from 'next/link';
import LoadingBody from "@/app/components/partialView/loadingBody";
interface UnitsIdProps {
    params: any;
    contentsUnit:any
}

const Container: React.FC<UnitsIdProps> = ({ params,contentsUnit}) => {
    const listContainers = contentsUnit?.find((content: any) => content.unitId === Number(params.unit));
    const listContainersCount = listContainers?.containers;

    
    return (
        <div className="flex py-[60px]">
            <div className="mx-auto max-2xl:mx-[40px] w-[1000px] grid">
                <h1 className="text-3xl font-semibold mt-[50px]">{listContainers?.unitName}</h1>
                <div className="bg-white p-5 border-[1px] border-course-border-color rounded-[10px] shadow-lg text-base my-[40px] w-full">
                    <h2 className="content__box-header">Tiến độ học tập</h2>
                    <p className="content__box-percent">0%</p>
                    <div className="p-1 w-full bg-[#e0e0e0] rounded-[10px]"></div>
                </div>
                {listContainersCount?.map((container: any, index: number) => (
                    <div key={index} className="bg-white p-5 border-[1px] border-course-border-color rounded-[10px] shadow-lg text-base my-[40px] w-full">
                        <h2 className="content__box-header text-xl font-bold tracking-normal">{container.containerTitle}</h2>
                        {container.lessons?.map((lesson: any, lessonIndex: number) => (
                            <Link key={lessonIndex} href={`/course/${params.course}/Learning/Unit/${params.unit}/Container/${container.containerId}/Lesson/${lesson.lessonId}/courseTest?TAG=${lesson.tagId}`} className="flex items-center text-base p-3 no-underline text-black hover:bg-exam-bg-color transition duration-100">
                                <i className="fa-regular fa-circle-play"></i>
                                <h3 className="mx-2 font-medium text-base">{lesson.lessonType}: </h3>
                                <span className="">{lesson.lessonTitle}</span>
                            </Link>
                        ))}
                    </div>
                ))}
                <Link href="#" className="mt-[30px] text-base text-white bg-nav-hover-text-color px-[14px] py-[10px] rounded no-underline w-fit">1</Link>
            </div>
        </div>
    );
}

export default Container;
