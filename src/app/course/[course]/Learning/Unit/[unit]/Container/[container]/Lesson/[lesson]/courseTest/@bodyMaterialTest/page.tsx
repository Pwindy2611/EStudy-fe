"use client";
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { VocabularyFlashCard } from "./vocabularyFlashCard";
import { TranslateLearn } from "./translateLearn";
import { MultiChoiceLearn } from "./multichoiceLearn";
import { ListenSpell } from "./listenSpell";
import { ListenLearn } from "./listenLearn";
import { GrammarInput } from './grammarInput';
import { GrammarChoice } from './grammarChoice';
import { FindPairLearn } from './findPairLearn';
import {PictureQuiz} from './picListenQuiz';
import {FreAskedQuestions} from './freAskedQuestions';
import {CrazyWordQuiz} from './crazyWordQuiz';
import {ReadingQuiz} from './readingQuiz';
import {ReadingNoPara} from "./readingNopara"
import {ListeningComprehension} from './listeningComprehension';
import ListLessonComponent from "../getLesson";
import { BreadcrumbWithCustomSeparator } from '@/components/handicraft/params/paramsCourseLearn';
import LoadingBody from "@/app/components/partialView/loadingBody";

const DefaultComponent = () => <div>Type not recognized</div>;
DefaultComponent.displayName = 'DefaultComponent';

export default function BodyMaterial({ params }: { params: { course: string, unit: string, container: string, lesson: string } }) {
  const units = useSelector((state: any) => state.ThunkReducer.unit?.units?.data?.units);
  const contentUnits = useSelector((state: any) => state.ThunkReducer?.contentUnits?.ContentUnit?.data);
  const searchParams = useSearchParams();
  const tag = searchParams.get('TAG');

  const isValidUnit = Array.isArray(units) && units.some((unit: any) => 
    unit.unitId === Number(params.unit) && unit.courseId === Number(params.course)
  );
  const unitContent = Array.isArray(contentUnits) && contentUnits.find((unit: any) => unit.unitId === Number(params.unit));
  const containerContent = unitContent && Array.isArray(unitContent.containers) && unitContent.containers.find((container: any) => container.containerId === Number(params.container));
  const lessonContent = containerContent && Array.isArray(containerContent.lessons) && containerContent.lessons.find((lesson: any) => lesson.lessonId === Number(params.lesson));

  if (!lessonContent||!isValidUnit) {
    return <LoadingBody></LoadingBody>
  }

  let Component;

  switch (tag) {
    case 'FLASH_CARD':
      Component = VocabularyFlashCard;
      break;
      case 'flashCardDetail':
      Component = VocabularyFlashCard;
    break;
    case 'Multiple_Choice':
      Component = MultiChoiceLearn;
      break;
    case 'FIND_PAIR':
      Component = FindPairLearn;
      break;
    case 'FILL_WORD':
      Component = TranslateLearn;
      break;
    case 'ListenSpell':
      Component = ListenSpell;
      break;
    case 'LISTEN_VOCAB':
      Component = ListenLearn;
      break;
    case 'GrammarInput':
      Component = GrammarInput;
      break;
    case 'GrammarChoice':
      Component = GrammarChoice;
      break;
    case 'LISTEN_PICTURE':
      Component = PictureQuiz;
      break;
    case 'LISTEN_QUEST_RESPONSE':
      Component = FreAskedQuestions;
      break;
    case 'READING':
      Component = CrazyWordQuiz;
      break;
    case 'WRITTEN_FORM':
      Component = ReadingQuiz;
      break;
    case 'LISTEN_SPEECH':
      Component = ListeningComprehension;
      break;
      case 'READING_NOPARA':
      Component = ReadingNoPara;
      break;
    default:
      Component = DefaultComponent;
      break;
  }

  return (
    <div>
        <nav className="fixed bg-white border-b-[1px] border-b-course-border-color w-full p-6 flex items-center justify-between z-10">
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
            <div className="flex px-2 py-5 bg-nav-hover-text-color items-center justify-between">
              <Link href="" className="text-xl no-underline text-white">IELTS General Reading</Link>
              <label htmlFor="content_checkbox_mb">
                <i className="text-white text-xl cursor-pointer fa-solid fa-angle-left"></i>
              </label>
            </div>
            <ListLessonComponent params={params} />
          </div>
        </div>
        <div className='flex w-full items-center justify-center'>
          <div className='grid max-w-[1100px] mx-auto pb-6 pt-20 max-xl:max-w-[800px] max-md:mx-10'>
            <Component params={params}  />
          </div>
          
        </div>
        
</div>
  );
}