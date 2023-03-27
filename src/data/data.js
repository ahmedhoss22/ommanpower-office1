import { AiOutlineHome, AiOutlineFileAdd, AiFillPlusSquare } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { BiFoodMenu } from 'react-icons/bi';
import { SiMicrosoftteams } from 'react-icons/si';
import { GrUserManager } from 'react-icons/gr';
import { DiGoogleAnalytics } from 'react-icons/di';
import { CgNotes } from 'react-icons/cg';
import { CiMoneyBill } from 'react-icons/ci';
import { BsChatDots, BsSearch, BsFillGearFill } from 'react-icons/bs';
import { MdDateRange } from 'react-icons/md';
import DoneAllIcon from '@mui/icons-material/DoneAll';


let type
if(localStorage.getItem('office')){
     type=JSON.parse(localStorage.getItem('office')).type =="admin"
}else{
    let url=window.location.href.split('/')
    let len=url.length-1
    if(url[len]!=='signin') window.location.href='/signin'
}
export const links =type?  
[
    {
        title: 'Pages',
        links: [
            {
                name: 'visitor registration',
                name_ar:"تسجيل الزوار",
                icon: <FiUsers />,
            },
            {
                name: `unfinshed orders`,
                name_ar: 'الطلبات الغير مكتملة',
                icon: <BiFoodMenu />,
            },
            {
                name: 'finshed orders',
                name_ar: 'الطلبات المكتملة',
                icon: <DoneAllIcon style={{fontSize:"1.1rem"}}/>,
            },
            {
                name: 'staff registration',
                name_ar: 'تسجيل الموظفين',
                icon: <SiMicrosoftteams />,
            },
            {
                name: 'register a new worker',
                name_ar: 'تسجيل عامل جديد',
                icon: <AiFillPlusSquare />
            },
            {
                name: 'Workers',
                name_ar: 'العمال',
                icon: <AiFillPlusSquare />
            },
            {
                name: 'sponsor registration',
                name_ar: 'تسجيل بيانات الكفيل',
                icon: <GrUserManager />
            },
            {
                name: 'data analysis',
                name_ar: 'تحليل البيانات',
                icon: <DiGoogleAnalytics />
            },
            {
                name: 'guarantee',
                name_ar: 'الضمانات',
                icon: <CgNotes />
            },
            {
                name: 'Expenses',
                name_ar: 'مصاريف المكتب',
                icon: <CgNotes />
            },
            {
                name: 'Finance',
                name_ar: 'المالية',
                icon: <CiMoneyBill />
            },
            // {
            //     name: 'chat',
            //     name_ar: 'الدردشة',
            //     icon: <BsChatDots />
            // },
            // {
            //     name: 'attachments',
            //     icon: <AiOutlineFileAdd />
            // },
            {
                name: 'search',
                name_ar: 'البحث',
                icon: <BsSearch />
            },
            {
                name: 'settings',
                name_ar: 'الاعدادات',
                icon: <BsFillGearFill />
            },
        ],
    },
]:[
    // {
    //     title: 'Dashboard',
    //     // links: [
    //     //     {
    //     //         name: 'home',
    //     //         icon: <AiOutlineHome />,
    //     //     },
    //     // ],
    // },
    {
        title: 'Pages',
        links: [
            {
                name: 'visitor registration',
                icon: <FiUsers />,
            },
            {
                name: 'unfinshed orders',
                icon: <BiFoodMenu />,
            },
            {
                name: 'finshed orders',
                icon: <DoneAllIcon style={{fontSize:"1.1rem"}}/>,
            },
            {
                name: 'register a new worker',
                icon: <AiFillPlusSquare />
            },
            {
                name: 'Workers',
                icon: <AiFillPlusSquare />
            },
            {
                name: 'sponsor registration',
                icon: <GrUserManager />
            },
            {
                name: 'data analysis',
                icon: <DiGoogleAnalytics />
            },
            {
                name: 'guarantee',
                icon: <CgNotes />
            },
            // {
            //     name: 'chat',
            //     icon: <BsChatDots />
            // },
            // {
            //     name: 'attachments',
            //     icon: <AiOutlineFileAdd />
            // },
            {
                name: 'search',
                icon: <BsSearch />
            },
            {
                name: 'settings',
                icon: <BsFillGearFill />
            },
        ],
    },
]
