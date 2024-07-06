import Link from 'next/link';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getVocabOfLesson } from "@/service/api/apiVocabRequest";
import LoadingContent from "@/app/components/partialView/loadingContent";
interface VocabFlashcardProps {
  params: any;
}

export const VocabularyFlashCard: React.FC<VocabFlashcardProps> = ({ params }) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const tag = searchParams.get('TAG');
  const idLesson = { lessonId: Number(params.lesson) };
  const ListFlashcard = useSelector((state: any) => state.ThunkReducer?.vocab?.VocabByLesson?.data?.data);
  const tagCheck= useSelector((state: any) => state.ThunkReducer?.vocab?.VocabByLesson?.data?.lessonTag?.lessonTag);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [remainingCards, setRemainingCards] = useState<any[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getVocabOfLesson(idLesson, dispatch).finally(() => {
      setTimeout(() => setIsLoading(false), 1000);
    }); 
  }, [dispatch]);

  useEffect(() => {
    if (ListFlashcard && ListFlashcard.length > 0) {
      const shuffledCards = shuffleArray(ListFlashcard);
      setRemainingCards(shuffledCards);
   
    }
  }, [ListFlashcard]);

  useEffect(() => {
    setCurrentCardIndex(0);
    setIsRotated(false);
    setIsCompleted(false);
    if (ListFlashcard && ListFlashcard.length > 0) {
      const shuffledCards = shuffleArray(ListFlashcard);
      setRemainingCards(shuffledCards);
    }
  }, [tag]);

  const shuffleArray = (array: any[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleNextCard = () => {
    if (remainingCards.length > 1) {
      const newRemainingCards = [...remainingCards];
      newRemainingCards.splice(currentCardIndex, 1);
      setRemainingCards(newRemainingCards);
      const nextIndex = Math.floor(Math.random() * newRemainingCards.length);
      setCurrentCardIndex(nextIndex);
      setIsRotated(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRotate = () => {
    setIsRotated(!isRotated);
  };

  const currentCard: any = remainingCards[currentCardIndex];

  const playAudio = (vocabAudioUrl: any, idAudio: string) => {
    if (!vocabAudioUrl || !vocabAudioUrl.length) {
      console.error('Invalid audio URL');
      return;
    }
    const audioElement: any = document.getElementById(idAudio);
    audioElement.src = vocabAudioUrl; // Set the source of the audio element
    audioElement.play().catch((error: any) => {
      console.error('Failed to play audio:', error.message);
    });
  };
  if (isLoading) {
    return <LoadingContent></LoadingContent>
  }

  if(tagCheck!=tag&&tag!='flashCardDetail'){
    return <div>Page không tồn tại</div>
  }
  else{
    if (isCompleted) {
      return (
        <div className="content-right__container">
          <div className="grid wide grid-wide-course-learn">
            <div className="aleart__box">
              <p className="aleart__text">Bạn đã hoàn thành toàn bộ list từ. Chúc mừng!</p>
              <Link href={`/course/${params.course}/Learning/Unit/${params.unit}/Container/${params.container}/Lesson/${params.lesson}/courseTest?TAG=FLASH_CARD`} className="block text-center no-underline text-black text-base border-[1px] border-primary-bg-color rounded p-3 bg-tag-search-bg-color font-semibold hover:text-white hover:bg-primary-bg-color-hover transition duration-300">Quay lại</Link>
            </div>
          </div>
        </div>
      );
    }
  
    if (!currentCard) {
      return <p>Loading...</p>;
    }
    
    if (tag === 'FLASH_CARD') {
      return (
        <>
          <Link href={`/course/${params.course}/Learning/Unit/${params.unit}/Container/${params.container}/Lesson/${params.lesson}/courseTest?TAG=flashCardDetail`} className="block text-center no-underline text-black text-base border-[1px] border-primary-bg-color rounded p-3 bg-tag-search-bg-color font-semibold hover:text-white hover:bg-primary-bg-color-hover transition duration-300 mb-10">Luyện tập flashcards</Link>
          <p className="text-xl">List có {remainingCards.length} từ</p>
          {remainingCards.map((card: any) => (
            <div key={card.vocabId} className="bg-white max-w-3xl m-auto p-5 border-[1px] border-course-border-color rounded-xl shadow-md text-base my-[40px] w-full">
              <div className="vocabulary__container row">
                <div className="col l-8">
                  <div className="vocabulary__flex-header justify-between">
                    <h2 className="vocabulary__content-header text-2xl font-semibold">{card.vocabTitle}</h2>
                    <button onClick={()=>playAudio(card.audioUrlUk,card.vocabTitle)} className="vocabulary__speaker pl-8">
                    <audio id={card.vocabTitle} data-lang="en" preload='none'>
                    </audio>
                      <i className="fa-solid fa-volume-high vocabulary__content-icon"></i>
                    </button>
                  </div>
                  <br />
                  <div className="vocabulary__study">
                    <h4 className="vocabulary__study-header font-semibold">Định nghĩa:</h4>
                    <p className="vocabulary__study-content">{card.mean}</p>
                    <p>= {card.explanation}</p>
                    <br />
                    <h4 className="vocabulary__study-header font-semibold">Ví dụ:</h4>
                    {card.example}
                  </div>
                </div>
                <div className="col l-4">
                  <Image
                    width={100}
                    height={100}
                    src="https://study4.com/media/toeic_course_vocabs/media/02_Accounting.jpg.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
          ))}
          <Link href="#" className="mt-[30px] text-base text-white bg-nav-hover-text-color px-[14px] py-[10px] rounded no-underline w-fit">1</Link>
        </>
      );
    } else if (tag === 'flashCardDetail') {
      return (
        <>
          <div className="">
            <div className="grid wide grid-wide-course-learn">
              <div className="train__flex-container">
                <a href="" className="flashcard__train-link flashcard__train-link--random">
                  Xem tất cả
                </a>
                <a href="" className="flashcard__train-link flashcard__train-link--stop">
                  <i className="fa-solid fa-ban flashcard__train-icon"></i> Dừng học list từ này
                </a>
              </div>
              <div className="aleart__box">
                <p className="aleart__text">
                  Chú ý: bạn đã học xong số lượng từ cần ôn tập trong hôm nay. Bạn có thể dừng lại việc ôn tập và quay lại vào hôm sau. TUY NHIÊN, nếu bây giờ bạn vẫn muốn ôn tập tiếp, các từ bạn đang học sẽ xuất hiện NGẪU NHIÊN ở dưới.
                </p>
              </div>
              <div key={currentCard.vocabId} className="bg-white rounded-lg shadow-xl my-7 h-[365px] w-[650px] relative cursor-pointer mx-auto" onClick={handleRotate}>
                <div className={`flashcard ease-in-out h-full ${isRotated ? 'toTateY-180' : ''}`}>
                  <div className="absolute h-full py-4 px-8 top-0 bottom-0 right-0 left-0 flex w-full z-[2] flex-col justify-center items-center backface toTateX-0">
                    <div className="vocab__flashcard-container">
                      <div >
                        <span className="vocab__text">{currentCard.vocabTitle} ({currentCard.vocabType})</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-full py-4 px-8 top-0 bottom-0 right-0 left-0 flex w-full justify-center items-center backface toTateY-180">
                    <div className="vocab__flashcard-translate-left">
                      <b>Định nghĩa:</b>
                      <p>{currentCard.mean}</p>
                      <p>= {currentCard.explanation}</p>
                      <b>Ví dụ:</b>
                      <ul className="vocab__flashcard-list">
                        {currentCard.example}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content__box">
                <div className="vocabulary__container rate__container">
                  <div className="vocab__flashcard-container--rate">
                    <div className="vocab__rate-category vocab__rate-category--easy" onClick={handleNextCard}>
                      <i className="fa-regular fa-face-smile"></i>
                      <p className="vocab__rate-text">Dễ</p>
                    </div>
                    <div className="vocab__rate-category vocab__rate-category--medium" onClick={handleNextCard}>
                      <i className="fa-regular fa-face-meh"></i>
                      <p className="vocab__rate-text">Trung bình</p>
                    </div>
                    <div className="vocab__rate-category vocab__rate-category--hard" onClick={handleNextCard}>
                      <i className="fa-regular fa-face-tired"></i>
                      <p className="vocab__rate-text">Khó</p>
                    </div>
                    <div className="vocab__rate-category" onClick={handleNextCard}>
                      <i className="fa-solid fa-forward-step"></i>
                      <p className="vocab__rate-text">Đã biết, loại khỏi</p>
                      <p>danh sách ôn tập</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return  <div>Page không tồn tại</div>;
    }
  }
};
