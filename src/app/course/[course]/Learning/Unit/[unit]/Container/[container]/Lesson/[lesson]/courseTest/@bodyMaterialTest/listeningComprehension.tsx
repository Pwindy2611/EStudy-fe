import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { Bounce, toast } from 'react-toastify';
import { getAllListenSpeech } from "@/service/api/apiQuestionRequest";
import "react-toastify/dist/ReactToastify.css";
import LoadingContent from "@/app/components/partialView/loadingContent";

interface ListeningComprehensionProps {
  params: any;
}

export const ListeningComprehension: React.FC<ListeningComprehensionProps> = ({ params }) => {
  const searchParams = useSearchParams();
  const tag = searchParams.get('TAG');
  const dispatch = useDispatch();
  const idLesson = { lessonId: params.lesson };
  const ListQuestion = useSelector((state: any) => state.ThunkReducer?.listen?.ListenSpeech?.data?.data);
  const tagCheck = useSelector((state: any) => state.ThunkReducer?.listen?.ListenSpeech?.data?.lessonTag?.lessonTag);
  
  const [isTranscriptVisible, setTranscriptVisible] = useState(false);
  const [isMeanVisible, setMeanVisible] = useState(false);
  const [isTranslationVisible, setTranslationVisible] = useState(false);
  const [isAnswerChecked, setAnswerChecked] = useState(false); 
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    getAllListenSpeech(idLesson, dispatch).finally(() => {
      setTimeout(() => setIsLoading(false), 1000);
    }); 
  }, [dispatch, tagCheck]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
  }, [currentPage]);

  const handlePrevious = () => {
    resetState();
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    resetState();
    if (ListQuestion && currentPage < ListQuestion.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageIndex: number) => {
    resetState();
    setCurrentPage(pageIndex);
  };

  const resetState = () => {
    setTranslationVisible(false);
    setAnswerChecked(false);
    setSelectedAnswer('');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setSelectedAnswer('');
    const radioButtons = document.querySelectorAll('input[name="fav_language"]');
    radioButtons.forEach((radio: any) => (radio.checked = false));
  };

  const currentQuestion = ListQuestion ? ListQuestion[currentPage] : null;

  const handleTranscriptToggle = () => {
    setTranscriptVisible(!isTranscriptVisible);
  };

  const handleMeanToggle = () => {
    setMeanVisible(!isMeanVisible);
  };

  const handleTranslationToggle = () => {
    setTranslationVisible(!isTranslationVisible);
  };

  const handleAnswerCheck = () => {
    if (selectedAnswer) {
      setAnswerChecked(true);
    } else {
      toast.info('Hãy chọn đáp án trước', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
  };

  if (isLoading) {
    return <LoadingContent />;
  }

  if (tagCheck !== tag) {
    return <div>Page không tồn tại</div>;
  }

  return (
    <div>
      {currentQuestion && (
        <div className="bg-white shadow-xl rounded-xl p-9 my-9">
          <div className='flex gap-4'>
            <button
              className="py-2 px-4 bg-blue-100 text-base text-nav-hover-text-color rounded-sm shadow-md hover:shadow-xl transition duration-500 hover:-translate-y-1 ease-in-out cursor-pointer flex gap-2 w-fit items-center" 
              onClick={handleAnswerCheck}
            >
              <i className="fa-regular fa-circle-check"></i>
              Kiểm tra đáp án
            </button>
            <button
              className="py-2 px-4 bg-white text-base text-nav-hover-text-color rounded-sm shadow-md hover:shadow-xl transition duration-500 hover:-translate-y-1 ease-in-out cursor-pointer flex gap-2 w-fit items-center"
              onClick={resetState}
            >
              <i className="fa-regular fa-circle-xmark"></i>
              Xoá hết
            </button>
          </div>
          <div className='flex mt-7 min-h-[200px] w-full gap-6'>
            <div className="w-1/2 bg-slate-100 p-7">
              <div className="transcript cursor-pointer" onClick={handleTranscriptToggle}>
                Transcript <i className="fa-solid fa-chevron-down"></i>
              </div>
              <div className={`bg-tag-search-text-color transition-all duration-500 ease-in-out overflow-hidden rounded-xl ${isTranscriptVisible ? 'max-h-[1000px] border-[1px] border-black' : 'max-h-0 border-0'}`}>
                <span className='w-full h-full block px-5 py-3'>
                {currentQuestion.questionParagraph}
                </span>
              </div>
              <div className="transcript cursor-pointer" onClick={handleMeanToggle}>
                Dịch nghĩa <i className="fa-solid fa-chevron-down"></i>
              </div>
              <div className={`bg-tag-search-text-color transition-all duration-500 ease-in-out overflow-hidden rounded-xl ${isMeanVisible ? 'max-h-[1000px] border-[1px] border-black' : 'max-h-0 border-0'}`}>
                <span className='w-full h-full block px-5 py-3'>
                  {currentQuestion.paragraph_Mean}
                </span>
              </div>
            </div>
            <div className="w-1/2">
            <span>{currentQuestion.questionTitle}</span>
            <br/>
            <input
                type="radio"
                id="A"
                name="fav_language"
                value="A"
                onChange={handleAnswerChange}
              />
              <label
                className={`pl-2 cursor-pointer ${isAnswerChecked && (currentQuestion.correctAnswer === 'A' ? 'text-green-500' : selectedAnswer === 'A' ? 'text-red-500' : '')}`}
                htmlFor="A"
              >
                A. {currentQuestion.optionA}
              </label>
              <br />
              <input
                type="radio"
                id="B"
                name="fav_language"
                value="B"
                onChange={handleAnswerChange}
              />
              <label
                className={`pl-2 cursor-pointer ${isAnswerChecked && (currentQuestion.correctAnswer === 'B' ? 'text-green-500' : selectedAnswer === 'B' ? 'text-red-500' : '')}`}
                htmlFor="B"
              >
                B. {currentQuestion.optionB}
              </label>
              <br />
              <input
                type="radio"
                id="C"
                name="fav_language"
                value="C"
                onChange={handleAnswerChange}
              />
              <label
                className={`pl-2 cursor-pointer ${isAnswerChecked && (currentQuestion.correctAnswer === 'C' ? 'text-green-500' : selectedAnswer === 'C' ? 'text-red-500' : '')}`}
                htmlFor="C"
              >
                C. {currentQuestion.optionC}
              </label>
              <br />
              <input
                type="radio"
                id="D"
                name="fav_language"
                value="D"
                onChange={handleAnswerChange}
              />
              <label
                className={`pl-2 cursor-pointer ${isAnswerChecked && (currentQuestion.correctAnswer === 'D' ? 'text-green-500' : selectedAnswer === 'D' ? 'text-red-500' : '')}`}
                htmlFor="D"
              >
                D. {currentQuestion.optionD}
              </label>
              {isAnswerChecked && (
                <div>
                  <div className="transcript cursor-pointer" onClick={handleTranslationToggle}>
                    Giải thích đáp án <i className="fa-solid fa-chevron-down"></i>
                  </div>
                  <div className={`bg-tag-search-text-color transition-all duration-500 ease-in-out overflow-hidden rounded-xl ${isTranslationVisible ? 'max-h-[1000px] border-[1px] border-black' : 'max-h-0 border-0'}`}>
                    <div className='w-full h-full block px-5 py-3'>
                    <span>Đáp án đúng : <strong>{currentQuestion.correctAnswer}</strong></span>
                    <br/>
                    {currentQuestion.title_Mean}
                    <br/>
                    <span>A. {currentQuestion.a_Mean}</span>
                    <br/>
                    <span>B. {currentQuestion.b_Mean}</span> 
                    <br/>
                    <span>C. {currentQuestion.c_Mean}</span>
                    <br/>
                    <span>D. {currentQuestion.d_Mean}</span>
                    <br/>
                    ={'>'}  {currentQuestion.questionTranslate}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="multichoice__option">
        <button
          onClick={handlePrevious}
          className={`multichoice__option-link ${currentPage === 0 ? 'invisible' : ''}`}
          disabled={currentPage === 0}
        >
          <i className="fa-solid fa-angle-left"></i> Câu trước
        </button>
        <div className="multichoice__auto-container"></div>
        <button
          onClick={handleNext}
          className={`multichoice__option-link ${!ListQuestion || currentPage === ListQuestion.length - 1 ? 'invisible' : ''}`}
          disabled={!ListQuestion || currentPage === ListQuestion.length - 1}
        >
          Câu sau <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
      <div className="content__box">
        <h3 className="multichoice__list-text">Danh sách bài tập:</h3>
        <div className="multichoice__list-box cursor-pointer">
          {ListQuestion &&
            ListQuestion.map((_:any, index:any) => (
              <div
                key={index}
                onClick={() => handlePageClick(index)}
                className={`multichoice__list-number ${index === currentPage ? 'multichoice__list-number--chosen' : ''}`}
              >
                {index + 1}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
