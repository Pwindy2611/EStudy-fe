import Link from 'next/link';
import {
  AlignCenter,
    Atom,
    Cloud,
    Github,
    LifeBuoy,
    LogOut,
    SquareTerminal,
    User,
    WalletCards,
  } from "lucide-react"
   
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {AvatarDemo} from "./avatar"
  import { useRouter } from 'next/navigation';
  import {useDispatch} from "react-redux";
  import { logOut } from "@/service/api/apiAuthRequest";
  import { Bounce, toast } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";
  interface UserAccount {
    UserName: any;
    UserImage:any;
  }
  export const DropdownMenuDemo: React.FC<UserAccount> = ({UserName,UserImage}) => {
    const dispatch = useDispatch();
    const navigate = useRouter();
     const handleLogOut = () => {
      const idToast =  toast.loading('Đang xử lí...', {
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
      logOut(dispatch);
      toast.update(idToast, {
        render:'Đăng xuất thành công!',
        type: "success",
        isLoading: false,
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
         navigate.push('/login')
     }
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className=" bg-transparent outline-none"><AvatarDemo SrcImage={UserImage}></AvatarDemo></button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className='text-primary-bg-color text-center'>{UserName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/profile">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <div className=' hidden max-lg:block'>
              <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <AlignCenter className="mr-2 h-4 w-4" />
                <span>Menu</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Link href="/courseOnline" className=" text-base font-medium">Khoá học online</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                  <Link href="/examOnline" className=" text-base font-medium">Đề thi online</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                  <Link href="/activeCourse" className=" text-base font-medium">Kích hoạt khoá học</Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          </div>
        
          <DropdownMenuSeparator />
          <Link href="">
          <DropdownMenuSub>
              <DropdownMenuSubTrigger>
              <Github className="mr-2 h-4 w-4" />
              <span>GitHub</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Atom className="mr-2 h-4 w-4"></Atom>
                    <Link href="https://github.com/YunneeToiChoi/EStudy-fe.git">Front-end</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SquareTerminal className="mr-2 h-4 w-4"></SquareTerminal>
                  <Link href="https://github.com/YunneeToiChoi/EStudy-be.git">Back-end</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
           </Link>
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <Link href="https://huflitconfessions.com/?fbclid=IwY2xjawGYF4hleHRuA2FlbQIxMAABHYIOG1Qw3qSJnHeuCYV2PpsFUfUCV0oHUuOGSgE9HyxR2yF_sbjvYuXqbw_aem_wkKy61NwksX4o4_2xqvr0w">Hỗ trợ</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <WalletCards className="mr-2 h-4 w-4" />
            <Link href="/purchases/purchase-history">My Purchases</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Đăng xuất</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }