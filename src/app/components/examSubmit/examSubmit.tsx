import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getCompleteExam, submitPart9,submitPart9Question7 } from '@/service/api/apiExamRequest';
import { Bounce, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface examDialogProps {
  examId: any;
}

const ExamDialog: React.FC<examDialogProps> = ({ examId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: any) => state.persistedReducer.auth.getAllInfoUser?.data?.user);

  const submit = async () => {
    const idToast = toast.loading('Đang xác nhận...', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    const storedAnswers = JSON.parse(sessionStorage.getItem('answerTest') || '{}');
    // const part9Answers = JSON.parse(sessionStorage.getItem('answerTestPart9') || '{}');
    // const part9AnswersQuestion7 = JSON.parse(sessionStorage.getItem('answerQuestion7') || '{}');
    const time = JSON.parse(sessionStorage.getItem('countdown') || '{}');

    const answersToSend = Object.keys(storedAnswers).map(key => ({
      QuestionId: parseInt(key),
      Answer: storedAnswers[key].Answer,
      State: storedAnswers[key].State,
    }));

    const data = {
      examId: examId,
      userId: user.userId,
      score: 0,
      answer: answersToSend,
      userTime: time,
    };

    // Fetch userExamId
    const rest = await getCompleteExam(data, dispatch);
    if (rest.status !== 200) {
      showErrorToast(idToast);
      return;
    }

    const userExamId = rest.responseUserExam.userExamId;

    // Prepare FormData for Part 9 answers
    // const formData = await preparePart9FormData(part9Answers, userExamId, idToast);
    // if (!formData) return; // Handle if there was an error in preparing data

  //   if (part9AnswersQuestion7.AudioURL) {
  //     try {
  //         const audioBlob = await fetch(part9AnswersQuestion7.AudioURL).then(res => {
  //             if (!res.ok) throw new Error('Failed to fetch audio file for question 7');
  //             return res.blob();
  //         });

  //         // Tạo FormData mới cho câu hỏi 7
  //         const question7FormData = new FormData();
  //         question7FormData.append("audioFile", audioBlob, 'audio_question7.wav'); // Thêm audio file
  //         question7FormData.append("followUpQuestion", part9AnswersQuestion7.followUpQuestion); // Thêm câu hỏi theo dõi
  //         question7FormData.append("userExamId", userExamId); // Thêm userExamId nếu cần

  //         // Gọi hàm submitPart9Question7 để gửi dữ liệu
  //         const responseQuestion7 = await submitPart9Question7(question7FormData);
  //         if (!responseQuestion7) {
  //             showErrorToast(idToast);
  //             return;
  //         }
  //     } catch (error) {
  //         console.error('Error fetching audio for question 7:', error);
  //         showErrorToast(idToast);
  //         return;
  //     }
  // }
    

    // Send request to submit Part 9 answers
    // const responsePart9 = await submitPart9(formData);
    // if (!(responsePart9 && responsePart9.length > 0)) {
    //   showErrorToast(idToast);
    //   return;
    // }

    // Clear session storage and notify success
    clearSessionStorage();
    toast.update(idToast, {
      render: 'Nộp bài thành công!',
      type: "success",
      isLoading: false,
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    
    router.push(`/exam/${examId}/examDetails`);
  };

  const preparePart9FormData = async (part9Answers: any, userExamId: string, idToast: any) => {
    const questionIds: number[] = [];
    const audioFiles: Blob[] = [];

    for (const key of Object.keys(part9Answers)) {
      if (questionIds.length >= 5) break;
      const answer = part9Answers[key];
      try {
        const audioBlob = await fetch(answer.Answer).then(res => {
          if (!res.ok) throw new Error('Failed to fetch audio file');
          return res.blob();
        });
        questionIds.push(answer.QuestionId);
        audioFiles.push(audioBlob);
      } catch (error) {
        console.error('Error fetching audio:', error);
        showErrorToast(idToast);
        return null; // Return null if there's an error
      }
    }

    // Create FormData
    const formData = new FormData();
    formData.append("userExamId", userExamId);
    questionIds.forEach(id => formData.append("questionIds", id.toString())); // Append question IDs
    audioFiles.forEach((file, index) => formData.append("audioFiles", file, `audio_${questionIds[index]}.wav`)); // Append audio files

    return formData; // Return FormData for submission
  };

  const clearSessionStorage = () => {
    sessionStorage.removeItem('answerTest');
    sessionStorage.removeItem('answerTestPart9');
    sessionStorage.removeItem('countdown');
    sessionStorage.removeItem('answerQuestion7');
  };

  const showErrorToast = (idToast: any) => {
    toast.update(idToast, {
      render: 'Nộp bài thất bại!',
      type: "error",
      isLoading: false,
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Nộp bài</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn muốn nộp bài?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='bg-slate-300 w-full text-black block mt-[10px] p-[10px] rounded-[10px] no-underline text-base text-center border-[1px] border-transparent'>
            Huỷ
          </AlertDialogCancel>
          <AlertDialogAction onClick={submit}
            className="bg-primary-bg-color w-full text-white block mt-[10px] p-[10px] rounded-[10px] no-underline text-base text-center border-[1px] border-transparent">
            Tiếp tục
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ExamDialog;
