import React ,{useState,useEffect}from 'react'
import { BsBoxSeam, BsCurrencyDollar } from 'react-icons/bs';
import { useTranslation  } from 'react-i18next';
import { HiOutlineRefresh } from 'react-icons/hi';
import Api from './../config/Config';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import AddRefundModal from './../components/AddRefundModal';

const Finance = () => {
  const { t, i18n } = useTranslation();
  const navigate=useNavigate()
  const [modal,setModal]=useState(false)
  const [totalRevenues,setTotalRevenues]=useState()
  const [totalIndebtedness,setTotalIndebtedness]=useState()
  const [totalRefund,setTotalRefund]=useState()
  const [data,setData]=useState([])
  const [open , setOpen] = useState(false);
  const [id,setId]=useState()
  const handleClose=()=> setModal(false)
  console.log(data);
  useEffect(()=>{getData()},[])
  function getData(){
    if(!localStorage.getItem('office')) return navigate('/signin');
    let token=JSON.parse(localStorage.getItem('office')).token
    Api.get('/allfinance',{
      headers:{
      'authorization':`Barear ${token}`
    }})
    .then((res)=>{
      console.log(res.data);
      aggRevenues(res.data)
      aggData(res.data)
    })
    .catch((err)=>{
      console.log(err.message);
    })
  }
  function aggRevenues(data){
    let sum=0
    let ind=0
    let refund=0
    data.map((ele)=>{
      if(ele.item=="Intial Value") sum=sum+ ele.value
      if(ele.item=="Indebtedness") ind+=ele.value
      if(ele.item=="refund") refund+=ele.value
    })
    setTotalRevenues(sum-ind-refund)
    setTotalIndebtedness(ind)
    setTotalRefund(refund)
  }
  function aggData(data){
    let ids=[]
    let temp=[]
      data.map((ele)=>{if(!ids.includes( ele.order_id)) ids.push(ele.order_id)})
      ids.forEach((id)=>{
      let revenue=0
      let refund=0
      let ind=0
      data.map((ele)=>{
        if(ele.order_id==id &&ele.item=='Intial Value') revenue+= ele.value
        if(ele.order_id==id &&ele.item=='Indebtedness') ind+= ele.value
        if(ele.order_id==id &&ele.item=='refund') refund+= ele.value
      })
      let order= data.find((ele)=>ele.order_id==id)
       temp.push({id,clientName:order.clientName,phone:order.phone,worker_name:order.worker_name,revenue:revenue-ind-refund,ind,refund})
      })
      setData(temp)
  }
  function handleModalOpen(id){
    setId(id)
    setModal(true)
  }
  let type=JSON.parse(localStorage.getItem('office')).type =="admin"
  const earningData=[  {
    icon: <BsCurrencyDollar />,
    amount: totalRevenues,
    title: 'Revenues',
    title_ar: 'الإيرادات',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(40, 167, 69)',
    pcColor: 'green-600',
  },
  {
    icon: <BsBoxSeam />,
    amount: totalIndebtedness,
    title: 'Indebtedness',
    title_ar: 'المديونية',
    iconColor: '#fff',
    iconBg: 'rgb(254, 201, 15)',
    pcColor: 'red-600',
  },
  {
    icon: <HiOutlineRefresh />,
    amount: totalRefund,
    title: 'Refund',
    title_ar: 'المسترجع',
    iconColor: '#fff',
    iconBg: '#d32f2f',
    pcColor: 'red-600',
  }
]
  return (
    <div className='mt-16 mx-5' style={{direction:i18n.language=='en'?'ltr':'rtl'}}>
      <h2 className='text-2xl font-bold'>{t("finance.title")}</h2>
      {
        type?
<>
      <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item) => (
            <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button type="button" style={{ color: item.iconColor, backgroundColor: item.iconBg }} className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl">
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
             {i18n.language=='en'&& <p className="text-sm text-gray-400  mt-1">{item.title}</p>}
             {i18n.language=='ar'&& <p className="text-sm text-gray-400  mt-1">{item.title_ar}</p>}
            </div>
          ))}
        </div>
        <TableContainer component={Paper} style={{overflowX:'scroll'}}>
      <Table  aria-label="simple table" style={{overflowX:'scroll'}}>
        <TableHead>
          <TableRow>
            <TableCell align="center">{t('finance.orderId')}</TableCell>
            <TableCell align="center">{t("finance.clientName")}</TableCell>
            <TableCell align="center">{t('finance.phone')}</TableCell>
            <TableCell align="center">{t('finance.revenues')}</TableCell>
            <TableCell align="center">{t('finance.indebtedness')}</TableCell>
            <TableCell align="center">{t('finance.refund')}</TableCell>
            <TableCell align="center">{t('finance.addRefund')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {data.map((row ,ind) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center" scope="row">{row.id}</TableCell>
              <TableCell align="center" component="th" scope="row">{row.clientName}</TableCell>
              <TableCell align="center" component="th" scope="row">{row.phone}</TableCell>
              <TableCell align="center">{row.revenue}</TableCell>
              <TableCell align="center">{row.ind}</TableCell>
              <TableCell align="center">{row.refund}</TableCell>
              <TableCell align="center"><Button variant='contained' color='primary' style={{fontSize:'.7rem',padding:'2px 5px' ,minWidth:"100px"}} onClick={()=>handleModalOpen(row.id)}>{t('finance.addRefund')}</Button></TableCell>
            </TableRow>
          ))} 
        </TableBody>
      </Table>
    </TableContainer>
    <AddRefundModal  handleClose={handleClose} open={modal} getData={getData} id={id}/>
      </>
        : <h2 className='mt-16' style={{textAlign:'center'}}>Sorry, content not avilable</h2>
      }
    </div>
  )
}

export default Finance