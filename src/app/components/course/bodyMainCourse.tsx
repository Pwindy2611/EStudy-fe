 export default function BodyMainCourse({ children }: { children: React.ReactNode }){
    return(
        <div className="peer-checked/checkboxTranslate:ml-[30px] transition duration-500 ease-linear animate-out lg:ml-[300px] bg-[#f8f9fa] min-h-[800px]">
         {children}
        </div>
    )
 }