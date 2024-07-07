import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { getVocabFindPair } from "@/service/api/apiVocabRequest";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import LoadingContent from "@/app/components/partialView/loadingContent";

interface FindPairProps {
  params: any;
}

export const FindPairLearn: React.FC<FindPairProps> = ({ params }) => {
  const searchParams = useSearchParams();
  const tag = searchParams.get('TAG');
  const dispatch = useDispatch();
  const idLesson = { lessonId: params.lesson };
  const ListChunk = useSelector((state: any) => state.ThunkReducer?.vocab?.VocabFindPair?.data?.data);
  const tagCheck = useSelector((state: any) => state.ThunkReducer?.vocab?.VocabFindPair?.data?.lessonTag?.lessonTag);

  const [currentPage, setCurrentPage] = useState(0);
  const [autoMove, setAutoMove] = useState(false);
  const [currentChunk, setCurrentChunk] = useState<any[]>([]);
  const [selectedPair, setSelectedPair] = useState<any[]>([]);
  const [correctPairs, setCorrectPairs] = useState<Set<number>>(new Set());
  const [feedback, setFeedback] = useState<{ indices: number[], correct: boolean } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getVocabFindPair(idLesson, dispatch).finally(() => {
      setTimeout(() => setIsLoading(false), 2000);
    }); 
  }, [dispatch, tagCheck]);

  useEffect(() => {
    if (ListChunk && ListChunk.length > 0) {
      updateCurrentChunk(currentPage);
    }
  }, [ListChunk, currentPage]);

  const updateCurrentChunk = (pageIndex: number) => {
    if (ListChunk && ListChunk.length > 0) {
      const chunk = ListChunk[pageIndex];
      const combinedVocab: any[] = [];
      chunk.vocabulary.forEach((vocab: any) => {
        combinedVocab.push({
          vocabId: vocab.vocabId,
          type: 'title',
          content: vocab.vocabTitle,
        });
        combinedVocab.push({
          vocabId: vocab.vocabId,
          type: 'mean',
          content: `${vocab.vocabMean} = ${vocab.vocabExplanation}`,
        });
      });
      setCurrentChunk(shuffleArray(combinedVocab));
    }
  };

  const shuffleArray = (array: any[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (ListChunk && currentPage < ListChunk.length - 1) {
      setCorrectPairs(new Set<number>());
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageIndex: number) => {
    setCorrectPairs(new Set<number>());
    setCurrentPage(pageIndex);
  };

  const handleAutoMoveChange = () => {
    setAutoMove(!autoMove);
  };

  const handleCardClick = (item: any, index: number) => {
    if (correctPairs.has(item.vocabId)) return;
  
    const newSelectedPair = [...selectedPair, { ...item, index }];
    setSelectedPair(newSelectedPair);
  
    if (newSelectedPair.length === 2) {
      const [first, second] = newSelectedPair;
  
      if (first.vocabId === second.vocabId && first.type !== second.type) {
        setCorrectPairs((prev:any) => new Set([...prev, first.vocabId]));
        setFeedback({ indices: [first.index, second.index], correct: true });
  
        setTimeout(() => {
          setFeedback(null);
          setSelectedPair([]);
          if (autoMove && correctPairs.size === currentChunk.length / 2 - 1) {
            handleNext();
          }
        }, 500);
      } else {
        setFeedback({ indices: [first.index, second.index], correct: false });
  
        setTimeout(() => {
          setFeedback(null);
          setSelectedPair([]);
        }, 500);
      }
    }
  };

  const currentQuestion = currentChunk.length > 0 ? currentChunk.slice(0, 16) : null;

  if (isLoading) {
    return <LoadingContent />;
  }

  if (tagCheck !== tag) {
    return <div>Page không tồn tại</div>;
  }

  return (
    <div className="grid w-full wide grid-wide-course-learn pt-11">
      {currentQuestion && (
        <div className="grid max-w-[800px] m-auto grid-cols-4 gap-2 mb-10 max-md:grid-cols-3 max-[660px]:grid-cols-2 max-[480px]:grid-cols-1">
          {currentQuestion.map((item: any, index: number) => (
            <div
              key={index}
              onClick={(e) => { e.preventDefault(); handleCardClick(item, index); }}
              className={`p-5 text-center aspect-square transition duration-300 flex items-center justify-center text-wrap cursor-pointer
                ${item.type === 'title' ? 'paircard__box-volcabulary' : 'text-nav-hover-text-color'}
                ${correctPairs.has(item.vocabId) && !(feedback && feedback.indices.includes(index)) ? 'invisible' : ''}
                ${selectedPair.some(pair => pair.index === index) ? 'bg-gray-300' : 'bg-white'}
                ${feedback && feedback.indices.includes(index) ? (feedback.correct ? '!bg-green-500' : '!bg-red-500') : ''}`}
            >
              <span className='w-full break-words'> {item.content}</span>
             
            </div>
          ))}
        </div>
      )}
      <div className="multichoice__option">
        <button onClick={handlePrevious} className={`multichoice__option-link ${currentPage === 0 ? 'invisible' : ''}`} disabled={currentPage === 0}>
          <i className="fa-solid fa-angle-left"></i> Câu trước
        </button>
        <div className="multichoice__auto-container">
          <input type="checkbox" id="multichoice__checkbox" checked={autoMove} onChange={handleAutoMoveChange} />
          <label htmlFor="multichoice__checkbox" className="multichoice__auto">
            Tự động chuyển câu
          </label>
        </div>
        <button onClick={handleNext} className={`multichoice__option-link ${!ListChunk || currentPage === ListChunk.length - 1 ? 'invisible' : ''}`} disabled={!ListChunk || currentPage === ListChunk.length - 1}>
          Câu sau <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
      <div className="content__box">
        <h3 className="multichoice__list-text">Danh sách bài tập:</h3>
        <div className="multichoice__list-box cursor-pointer">
          {ListChunk && ListChunk.map((_: any, index: any) => (
            <div key={index} onClick={() => handlePageClick(index)} className={`multichoice__list-number ${index === currentPage ? 'multichoice__list-number--chosen' : ''}`}>
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
