import React, { useEffect, useRef, useState } from 'react';
import { getVideoByLesson } from "@/service/api/apiVideoRequest";
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import LoadingContent from "@/app/components/partialView/loadingContent";

interface VideoLayerProps {
    params: {
        lesson: string;
    };
}

export const VideoLayer: React.FC<VideoLayerProps> = ({ params }) => {
    const searchParams = useSearchParams();
    const tag = searchParams.get('TAG');
    const dispatch = useDispatch();
    const idLesson = { lessonId: params.lesson };
    const Video = useSelector((state: any) => state.ThunkReducer?.video?.videos?.data?.data);
    const tagCheck = useSelector((state: any) => state.ThunkReducer?.video?.videos?.data?.lessonTag?.lessonTag);
    const videoRef = useRef<HTMLIFrameElement | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getVideoByLesson(idLesson, dispatch).finally(() => {
            setTimeout(() => setIsLoading(false), 1000);
        }); 
    }, [dispatch, idLesson, tagCheck]);

    if (isLoading) {
        return <LoadingContent />;
    }

    return (
        <>
            {Video && Video.length > 0 ? Video.map((child: any) => (
                <div key={child.videoId} className="absolute top-[50px] right-0 left-0 bottom-0 w-full h-[700px]">
                    <iframe
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full"
                        src={child.videoUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    ></iframe>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                        {/* Add controls or additional content here if needed */}
                    </div>
                </div>
            )) : <p>No videos available</p>}
        </>
    );
};
