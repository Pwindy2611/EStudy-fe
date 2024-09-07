import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { getAllQuestionOfLesson } from "@/service/api/apiQuestionRequest";
import { Bounce, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import LoadingContent from "@/app/components/partialView/loadingContent";

interface PictureQuizProps {
  params: any;
}

export const PictureQuiz: React.FC<PictureQuizProps> = ({ params }) => {
  const searchParams = useSearchParams();
  const tag = searchParams.get('TAG');
  const dispatch = useDispatch();
  const idLesson = { lessonId: params.lesson };
  const ListQuestion = useSelector((state: any) => state.ThunkReducer?.question?.questions?.data?.allQuestionOfLesson);
  const tagCheck = useSelector((state: any) => state.ThunkReducer?.question?.questions?.data?.lessonTag?.lessonTag);

  const [isTranslationVisible, setTranslationVisible] = useState(false);
  const [isAnswerChecked, setAnswerChecked] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    getAllQuestionOfLesson(idLesson, dispatch).finally(() => {
      setIsLoading(false);
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
    setTranslationVisible(false);
    setAnswerChecked(false);
    setSelectedAnswer('');
    handleClearAnswer();
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  const handleNext = () => {
    setTranslationVisible(false);
    setAnswerChecked(false);
    setSelectedAnswer('');
    handleClearAnswer();
    if (ListQuestion && currentPage < ListQuestion.length - 1) {
      setCurrentPage(currentPage + 1);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  const handlePageClick = (pageIndex: number) => {
    setTranslationVisible(false);
    setAnswerChecked(false);
    setSelectedAnswer('');
    handleClearAnswer();
    setCurrentPage(pageIndex);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const currentQuestion = ListQuestion ? ListQuestion[currentPage] : null;

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

  const handleClearAnswer = () => {
    setAnswerChecked(false);
    setSelectedAnswer('');
    const radioButtons = document.querySelectorAll('input[name="fav_language"]');
    radioButtons.forEach((radio: any) => (radio.checked = false));
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
        <>
          <div className="bg-white shadow-xl rounded-xl p-9 my-9">
            <div className="flex gap-4">
              <button
                className="py-2 px-4 bg-blue-100 text-base text-nav-hover-text-color rounded-sm shadow-md hover:shadow-xl transition duration-500 hover:-translate-y-1 ease-in-out cursor-pointer flex gap-2 w-fit items-center"
                onClick={handleAnswerCheck}
              >
                <i className="fa-regular fa-circle-check"></i>
                kiểm tra đáp án
              </button>
              <button
                className="py-2 px-4 bg-white text-base text-nav-hover-text-color rounded-sm shadow-md hover:shadow-xl transition duration-500 hover:-translate-y-1 ease-in-out cursor-pointer flex gap-2 w-fit items-center"
                onClick={handleClearAnswer}
              >
                <i className="fa-regular fa-circle-xmark"></i>
                Xoá hết
              </button>
            </div>
            <audio ref={audioRef} className="spell__audio my-10" controls>
              <source src={currentQuestion.questionAudio} type="audio/mpeg" />
              <track kind="captions" src="captions_en.vtt" srcLang="en" label="English" />
            </audio>
            <div className="flex w-full gap-6">
              <div className="w-1/2">
                <Image
                  width={1000}
                  height={1000}
                  src={currentQuestion.questionImage}
                  alt=""
                  className="text-transparent rounded-[10px] w-full"
                />
              </div>
              <div className="w-1/2">
                <input
                  type="radio"
                  id="A"
                  name="fav_language"
                  value="A"
                  onChange={handleAnswerChange}
                />
                <label
                  className={`pl-2 cursor-pointer ${
                    isAnswerChecked &&
                    (currentQuestion.correctAnswer === 'A'
                      ? 'text-green-500'
                      : selectedAnswer === 'A'
                      ? 'text-red-500'
                      : '')
                  }`}
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
                  className={`pl-2 cursor-pointer ${
                    isAnswerChecked &&
                    (currentQuestion.correctAnswer === 'B'
                      ? 'text-green-500'
                      : selectedAnswer === 'B'
                      ? 'text-red-500'
                      : '')
                  }`}
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
                  className={`pl-2 cursor-pointer ${
                    isAnswerChecked &&
                    (currentQuestion.correctAnswer === 'C'
                      ? 'text-green-500'
                      : selectedAnswer === 'C'
                      ? 'text-red-500'
                      : '')
                  }`}
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
                  className={`pl-2 cursor-pointer ${
                    isAnswerChecked &&
                    (currentQuestion.correctAnswer === 'D'
                      ? 'text-green-500'
                      : selectedAnswer === 'D'
                      ? 'text-red-500'
                      : '')
                  }`}
                  htmlFor="D"
                >
                  D. {currentQuestion.optionD}
                </label>
                <br />
                <input
                  type="checkbox"
                  id="answer__checkbox"
                  className="answer__checkbox"
                />
                <div className={isAnswerChecked ? 'block' : 'hidden'}>
                  <div
                    className="transcript cursor-pointer"
                    onClick={handleTranslationToggle}
                  >
                    Dịch nghĩa <i className="fa-solid fa-chevron-down"></i>
                  </div>
                  <div
                    className={` bg-tag-search-text-color  transition-all duration-500 ease-in-out overflow-hidden rounded-xl ${
                      isTranslationVisible
                        ? 'max-h-[1000px] border-[1px] border-black'
                        : 'max-h-0 border-0'
                    }`}
                  >
                    <span className=" w-full h-full block px-5 py-3">
                    <strong>Đáp án đúng: {currentQuestion.correctAnswer}</strong>
                    <div>Dịch nghĩa từng đáp án:</div>
                    <div>(A) {currentQuestion.optionMeanA}</div>
                    <div>(B) {currentQuestion.optionMeanB}</div>
                    <div>(C) {currentQuestion.optionMeanC}</div>
                    <div>(D) {currentQuestion.optionMeanD}</div>
                    <div className='pt-2'>Nhìn vào bức tranh -{'>'} chọn đáp án {currentQuestion.correctAnswer}</div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="multichoice__option">
            <button
              onClick={handlePrevious}
              className={`multichoice__option-link ${
                currentPage === 0 ? ' invisible' : ''
              }`}
              disabled={currentPage === 0}
            >
              <i className="fa-solid fa-angle-left"></i> Câu trước
            </button>
            <div className="multichoice__auto-container">
            </div>
            <button
              onClick={handleNext}
              className={`multichoice__option-link ${
                !ListQuestion || currentPage === ListQuestion.length - 1
                  ? ' invisible'
                  : ''
              }`}
              disabled={!ListQuestion || currentPage === ListQuestion.length - 1}
            >
              Câu sau <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </>
      )}
      <div className="content__box">
        <h3 className="multichoice__list-text">Danh sách bài tập:</h3>
        <div className="multichoice__list-box cursor-pointer">
          {ListQuestion &&
            ListQuestion.map((_: any, index: any) => (
              <button
                key={index}
                onClick={() => handlePageClick(index)}
                className={`multichoice__list-number ${
                  index === currentPage ? 'multichoice__list-number--chosen' : ''
                }`}
              >
                {index + 1}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
