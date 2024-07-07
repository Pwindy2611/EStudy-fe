 export default function NavLeftCourse({ children }: { children: React.ReactNode }){
    return(
        <div className=" h-full peer-checked/checkboxTranslate:translate-x-[-90%] transition duration-300 ease-in-out animate-out absolute bottom-0 top-0 z-[2] bg-white w-[300px] translate-x-0 max-lg:hidden">
        {children}
        </div>
    )
 }