import {IoBarChartSharp} from "react-icons/io5";
import {FaUsers,FaFileInvoiceDollar,FaFileInvoice} from "react-icons/fa";


const links = [
    {
        id:1,
        text:'štatistika',
        path:'/',
        icon:<IoBarChartSharp/>
    },
    {
        id:2,
        text:'všetky faktúry',
        path:'/all-jobs',
        icon:<FaFileInvoiceDollar/>
    },
    {
        id:3,
        text:'pridať faktúru',
        path:'/add-job',
        icon:<FaFileInvoice/>
    },
    {
        id:4,
        text:"Odoberatelia",
        path: "client",
        icon: <FaUsers/>

    }
]

export default links