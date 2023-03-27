import React, { useState,useEffect , useRef} from 'react';
import { Button, Checkbox, FormControlLabel, InputLabel, MenuItem, Select, TextareaAutosize,Alert, TextField } from '@mui/material';
import Api from './../config/Config';
import FormData from "form-data"
import { useTranslation  } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountryData } from './../redux/reducers/register';
import LinearProgress from '@mui/material/LinearProgress';
const RegisterNewWorker = () => {
  const dispatch=useDispatch()
  const country = useSelector((state) => state.register.value.country)
  console.log(country);
  const { t, i18n } = useTranslation();
  const navigate =useNavigate()
  const form =useRef([])
  const [loading,setLoading]=useState(false)
  const [submited,setSubmited]=useState(false)
  useEffect(()=>{
    dispatch(fetchCountryData())
  },[])
  const [workerData, setWorkerData] = useState({
    img:'',
    name: '',
    nationality: '',
    passportID: '',
    bod: '',
    age: '',
    cost:'',
    weight: '',
    years: '',
    job: '',
    language: '',
    status: '',
    workLocation: '',
    children: '',
    skills: '',
    vacation: '',
    salary: '',
    position:''
  });
  const handleSubmit = async(event) => {
    event.preventDefault();
    setLoading(true)
    if(!localStorage.getItem('office')) return navigate('/signin');
    let token=JSON.parse(localStorage.getItem('office')).token
    const formData=new FormData(event.currentTarget);
    let data={
      image:formData.get('image'),
      name:formData.get('name'),
      nationality:formData.get('nationality'),
      passportID:formData.get('passportID').toLowerCase(),
      date:formData.get('bod'),
      age:formData.get('age'),
      weight:formData.get('weight'),
      years:formData.get('years'),
      job:formData.get('job').toLowerCase(),
      language:formData.get('language'),
      salary:formData.get('salary'),
      vacation:formData.get('vacation'),
      status:formData.get('status'),
      children:formData.get('children') || 0,
      skills:formData.get('skills'),
      workLocation:formData.get('workLocation'),
      cost:formData.get('cost'),
      position:formData.get('position'),
    }
      await Api.post('/workerData/registration',data,{
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorization':`Barear ${token}`
      }
  })
    .then( (res)=>{
      setSubmited(true)
      setTimeout(()=> setSubmited(false),2000)
      setWorkerData({ img:'',position:'',name: '',workLocation:"",cost:'', nationality: '', passportID: '', bod: '', age: '', weight: '', years: '', job: '', language: '', status: '', children: '', skills: '', vacation: '', salary: ''})
      setLoading(false)
    })
    .catch(err=> {
      console.log(err.message);
      setLoading(false)
    })  
  }
  return (
    <div className='mt-16 mx-5' style={{direction:i18n.language=='en'?'ltr':'rtl'}}>
      <h2 className='text-2xl font-bold'>{t("worker.title")}</h2>
      <form className='md:w-1/2 sm:w-full' ref={form} onSubmit={handleSubmit}>
          <InputLabel  id="image">{t("worker.image")}</InputLabel>
          <TextField  required labelId='image' type='file' name='image' value={workerData.img} onChange={(e)=>{setWorkerData({...workerData,img:e.target.value})}} fullWidth variant="outlined" margin='dense'/>
          <TextField value={workerData.name} required label={t("worker.name")} labelId='name' name='name' fullWidth variant="outlined" margin='dense' onChange={(e) => {setWorkerData({ ...workerData, name: e.target.value})}}/>
          <InputLabel id="demo-simple-select-label">{t('worker.nationality')}</InputLabel >
                <Select fullWidth name='nationality'  id="demo-simple-select" variant='outlined' value={workerData.nationality} onChange={(e)=>{setWorkerData({...workerData,nationality:e.target.value})}}>
                  {  country.map((ele)=>{
                      return(
                        i18n.language=="en"  &&  <MenuItem selected value={ele.country}>{ele.country}</MenuItem>
                         || i18n.language=="ar"&&  <MenuItem selected value={ele.country}>{ele.country_ar}</MenuItem>
                        )
                    })}
               </Select>
               <InputLabel id="demo-simple-select-label">{t('worker.position')}</InputLabel >
               <Select fullWidth name='position'  id="demo-simple-select" variant='outlined' value={workerData.position} onChange={(e)=>{setWorkerData({...workerData,position:e.target.value})}}>
                         <MenuItem selected value="remote">{t('worker.remote')}</MenuItem>
                         <MenuItem selected value="office">{t('worker.inoffice')}</MenuItem>
               </Select>
          <TextField value={workerData.passportID} type="text" required label={t("worker.passport")} labelId='passportNumber' name='passportID' fullWidth variant="outlined" margin='dense' onChange={(e) => {setWorkerData({ ...workerData, passportID: e.target.value})}}/>
          <InputLabel id="bod">{t("worker.birth")}</InputLabel>
          <TextField value={workerData.bod} required fullWidth labelId='bod' variant="outlined" name='bod' margin='dense' type='date' onChange={(e) => {setWorkerData({ ...workerData, bod: e.target.value})}}/>
          <TextField value={workerData.age} required label={t("worker.age")} type="number" labelId='age' name='age' fullWidth variant="outlined" margin='dense' onChange={(e) => {setWorkerData({ ...workerData, age: e.target.value})}}/>
          <TextField value={workerData.weight} required label={t("worker.weight")} type="number" labelId="Weight" name='weight' fullWidth variant="outlined" margin='dense' onChange={(e) => {setWorkerData({ ...workerData, weight: e.target.value})}}/>
          <TextField value={workerData.years} required type="number" label={t("worker.years")} labelId='years' name='years' fullWidth variant="outlined" margin='dense' onChange={(e) => {setWorkerData({ ...workerData, years: e.target.value})}}/>
          <TextField value={workerData.workLocation} required type="text" label={t("worker.workLocation")} labelId='years' name='workLocation' fullWidth variant="outlined" margin='dense' onChange={(e) => {setWorkerData({ ...workerData, workLocation: e.target.value})}}/>
          <TextField value={workerData.job} required label={t("worker.job")} name='job' labelId='job' fullWidth variant="outlined" margin='dense' onChange={(e) => {setWorkerData({ ...workerData, job: e.target.value})}}/>
          <TextField value={workerData.language} required label={t("worker.language")} labelId='language' name='language' fullWidth variant="outlined" margin='dense' onChange={(e) => {setWorkerData({ ...workerData, language: e.target.value})}}/>
          <TextField value={workerData.skills} required label={t("worker.skills")} labelId='skills' name='skills' fullWidth variant="outlined" margin='dense' onChange={(e) => {setWorkerData({ ...workerData, skills: e.target.value.split(',')})}}/>
          <InputLabel id="vacation">{t("worker.vacation")}</InputLabel>
          <Select value={workerData.vacation} required labelId="vacation" id="demo-simple-select" name='vacation' label={t("worker.vacation")} onChange={(e) => {setWorkerData({ ...workerData, vacation: e.target.value})}} fullWidth margin='dense' placeholder='Vacation'>
            <MenuItem value={"No"}>{t("worker.no")}</MenuItem>
            <MenuItem value={"Yes"}>{t("worker.yes")}</MenuItem>
          </Select>
          <TextField value={workerData.salary} required label={t("worker.salary")} type="number" labelId='salary' name='salary' fullWidth variant="outlined" margin='dense' onChange={(e) => {setWorkerData({ ...workerData, salary: e.target.value})}}/>          
          <TextField value={workerData.cost} required label={t("worker.cost")} type="number" labelId='salary' name='cost' fullWidth variant="outlined" margin='dense' onChange={(e) => {setWorkerData({ ...workerData, cost: e.target.value})}}/>          
          <InputLabel id="status">{t("worker.status")}</InputLabel>
          <Select value={workerData.status} required labelId="status" id="demo-simple-select" name='status' label="Status" onChange={(e) => {setWorkerData({ ...workerData, status: e.target.value})}} fullWidth margin='dense' placeholder='Status'>
            <MenuItem value={"Single"}>{t("worker.single")}</MenuItem>
            <MenuItem value={"Married"}>{t("worker.married")}</MenuItem>
          </Select>
          {
            workerData.status === "Married" ? <TextField value={workerData.children} required type="number" label="Number Of Children" name='children' fullWidth variant="outlined" margin='dense'  onChange={(e) => {setWorkerData({ ...workerData, children: e.target.value})}} /> : ''
          }
          {!loading&& <Button type='submit' variant="contained" size='large' style={{ background: '#28a745', marginTop: '20px'}}>{t("worker.register")}</Button>}
          {loading&& <LinearProgress style={{margin:"40px 0"}}/>}
          {submited?<Alert className='my-5' severity="success">{t("worker.dataSent")}</Alert>
          :<Alert className='my-5' severity="info">{t("worker.fillData")}</Alert>  
        }
      </form>
    </div>
  )
}

export default RegisterNewWorker