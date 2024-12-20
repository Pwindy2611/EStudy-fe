import Image from 'next/image';
import  { useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface InfoQuestionProps {
  examName: string;
  ObjectAnswer: {
    correctAnswer: string;
    optionA?: string;
    optionB?: string;
    optionC?: string;
    optionD?: string;
    questionId: number;
    questionImage?: string;
    questionParagraph?: string;
    questionText?: string;
    state: boolean;
    userAnswer?: string;
  };
  examAudio:any;
}

export const BoxRevision: React.FC<InfoQuestionProps> = ({ examName, ObjectAnswer,examAudio }) => {
  const {
    correctAnswer,
    optionA,
    optionB,
    optionC,
    optionD,
    questionImage,
    questionParagraph,
    questionText,
    userAnswer,
  } = ObjectAnswer;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const renderOption = (option: string | undefined, label: string) => {
    if (option=='Null') return null;

    let optionClass = '';
    if (userAnswer && userAnswer === label) {
      optionClass = correctAnswer === label ? 'text-green-500' : 'text-red-500 line-through';
    } else if (correctAnswer === label) {
      optionClass = 'text-green-500';
    }
    return (
      <div className={optionClass}>
        ({label}) {option}
      </div>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="text-blue-500 cursor-pointer">[Chi tiết]</div>
      </DialogTrigger>
      <DialogContent className=" max-h-[600px] overflow-scroll scrollbar-none">
        <div className=" text-xl font-medium">{examName}</div>
        <audio ref={audioRef}  className="spell__audio my-10" controls>
            <source src={examAudio} type="audio/mpeg" />
        </audio>
        {questionImage && <Image width={1000} height={1000} quality={100} src={questionImage} alt="Question Image" ></Image>}
        {questionParagraph !== "Null" && (
         <p className="mb-4">{questionParagraph}</p>
        )}
        {questionText !== "Null" &&(<p className="mb-4">{questionText}</p>)}
        <div className="mb-4">
        {optionA && renderOption(optionA, 'A')}
        {optionB && renderOption(optionB, 'B')}
        {optionC && renderOption(optionC, 'C')}
        {optionD && renderOption(optionD, 'D')}
    </div>
      </DialogContent>
    </Dialog>
  );
};
