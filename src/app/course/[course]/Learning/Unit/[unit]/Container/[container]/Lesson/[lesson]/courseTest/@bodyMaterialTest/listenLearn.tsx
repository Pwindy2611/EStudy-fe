import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVocabListen } from '@/service/api/apiVocabRequest';
import { useSearchParams } from 'next/navigation';
import LoadingContent from "@/app/components/partialView/loadingContent";
interface ListenLearnProps {
  params: any;
}

export const ListenLearn: React.FC<ListenLearnProps> = ({ params }) => {
  const searchParams = useSearchParams();
  const tag = searchParams.get('TAG');
  const dispatch = useDispatch();
  const idLesson = { lessonId: params.lesson };
  const ListChunk = useSelector((state: any) => state.ThunkReducer?.vocab?.VocabListen?.data?.data);
  const tagCheck = useSelector((state: any) => state.ThunkReducer?.vocab?.VocabListen?.data?.lessonTag?.lessonTag);

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedVocab, setSelectedVocab] = useState<number | null>(null);
  const [feedbackIndices, setFeedbackIndices] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [autoMove, setAutoMove] = useState(false); // State để lưu trạng thái của checkbox
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null); // State để lưu trữ tạm thời index được highlight
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    getVocabListen(idLesson, dispatch).finally(() => setIsLoading(false));
  }, [dispatch,tagCheck]);

  useEffect(() => {
    if (audioRef.current && ListChunk && ListChunk[currentPage]) {
      audioRef.current.src = ListChunk[currentPage].url;
      audioRef.current.load();
      setTimeout(() => audioRef.current?.play(), 1000);
    }
  }, [currentPage, ListChunk]);

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setSelectedVocab(null);
      setFeedback(null);
      setFeedbackIndices([]);
      setHighlightedIndex(null); // Reset khi chuyển trang
    }
  };

  const handleNext = () => {
    if (ListChunk && currentPage < ListChunk.length - 1) {
      setCurrentPage(currentPage + 1);
      setSelectedVocab(null);
      setFeedback(null);
      setFeedbackIndices([]);
      setHighlightedIndex(null); // Reset khi chuyển trang

      // Nếu autoMove được chọn và đang ở trang cuối cùng, tự động chuyển sang trang kế tiếp
      if (autoMove && currentPage === ListChunk.length - 1) {
        handleNextPage();
      }
    }
  };

  const handleNextPage = () => {
    if (currentPage < ListChunk.length - 1) {
      setCurrentPage(currentPage + 1);
      setSelectedVocab(null);
      setFeedback(null);
      setFeedbackIndices([]);
      setHighlightedIndex(null); // Reset khi chuyển trang
    }
  };

  const handlePageClick = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    setSelectedVocab(null);
    setFeedback(null);
    setFeedbackIndices([]);
    setHighlightedIndex(null); // Reset khi chuyển trang
  };

  const handleVocabClick = (vocabId: number, index: number) => {
    setSelectedVocab(vocabId);
    const isCorrect = ListChunk[currentPage]?.correct === vocabId;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setFeedbackIndices([index]);
  
    if (isCorrect) {
      // Nếu là từ vựng đúng, chỉnh highlightedIndex để duy trì màu nền xanh
      setHighlightedIndex(index);
      if (autoMove && isCorrect) {
      setTimeout(() =>{ handleNextPage();},1000)
      }
    }
    else{
      setTimeout(() => {
        setFeedback(null);
        setFeedbackIndices([]);
      }, 500);
    }
  };

  const toggleAutoMove = () => {
    setAutoMove(!autoMove);
  };

  const currentChunk = ListChunk ? ListChunk[currentPage] : null;
  
  if (isLoading) {
    return <LoadingContent />;
  }

  if (tagCheck !== tag) {
    return <div>Page không tồn tại</div>;
  }

 
  return (
    <div>
      <div className="">
        <div className="flex flex-col gap-11 items-center justify-center">
          <div className='w-[800px] p-10 bg-white rounded-xl shadow-2xl'>
            {currentChunk && (
              <audio ref={audioRef}  className="spell__audio my-10" controls>
                <source src={currentChunk.url} type="audio/mpeg" />
              </audio>
            )}
            <div className="grid h-full w-full grid-cols-3 grid-rows-3">
              {currentChunk?.listVocab?.map((vocab: any, index: number) => (
                <div 
                  key={index} 
                  className={`p-5 w-full transition duration-300 h-full flex flex-col items-center justify-center cursor-pointer hover:bg-slate-200 border-[1px] border-slate-200 min-h-[160px]
                    ${feedbackIndices.includes(index) ? (feedback === 'correct' ? '' : '!bg-red-500') : ''} ${highlightedIndex === index ? '!bg-green-500' : ''}`}
                  onClick={() => handleVocabClick(vocab.vocabId, index)}
                >
                  <p className="spell__text">{vocab.vocabTitle}</p>
                  <br />
                  <p className="spell__text">({vocab.vocabMean})</p>
                </div>
              ))}
            </div>
          </div>
          <div className="multichoice__option w-full">
            <button onClick={handlePrevious} className={`multichoice__option-link ${currentPage === 0 ? 'invisible' : ''}`} disabled={currentPage === 0}>
              <i className="fa-solid fa-angle-left"></i> Câu trước
            </button>
            <div className="multichoice__auto-container">
              <input 
                type="checkbox" 
                id="multichoice__checkbox" 
                checked={autoMove} 
                onChange={toggleAutoMove} 
              />
              <label htmlFor="multichoice__checkbox" className="multichoice__auto">Tự động chuyển câu</label>
            </div>
            <button 
              onClick={handleNext} 
              className={`multichoice__option-link ${!ListChunk || currentPage === ListChunk.length - 1  ? 'invisible' : ''}`} 
              disabled={!ListChunk || currentPage === ListChunk.length - 1}
            >
              Câu sau <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
          <div className="content__box">
            <h3 className="multichoice__list-text">Danh sách bài tập:</h3>
            <div className="multichoice__list-box cursor-pointer">
              {ListChunk && ListChunk.map((_: any, index: number) => (
                <div key={index} onClick={() => handlePageClick(index)} className={`multichoice__list-number ${index === currentPage ? 'multichoice__list-number--chosen' : ''}`}>
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
