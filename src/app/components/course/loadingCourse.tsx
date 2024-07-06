import {SkeletonCard} from "@/app/components/course/courseLoading"

export default function GetLoadingCourse(){
    return(
        <div className="grid grid-cols-4 gap-8">
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
        </div>
    )
}