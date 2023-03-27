import React ,{useEffect , useState ,useRef} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, InputLabel } from '@mui/material';
import { TextField } from '@mui/material';
import Api from './../config/Config';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function AddRefundModal({handleClose,handleOpen,open ,id,getData}) {    
 const [value,setvalue]=useState({value:''})
    console.log(id);
 const handleSubmit=React.useCallback((event)=>{
    if(!value) return
    event.preventDefault();
    if(!localStorage.getItem('office')) return;
    let token=JSON.parse(localStorage.getItem('office')).token
    Api.post('/order/finance',{
      item:'refund',
      value,
      id,
      details:"Refund",
    },{headers:{
      'authorization':`Barear ${token}`
    }})
    .then(()=>{
        handleClose()
        getData()
    })
    .catch((err)=>{
      console.log(err.message);
    })
  })

 return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
        <Box sx={style} className='model'>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom:5}}>
            Add Refund
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField variant="outlined" required type="number" label="Value" value={value} onChange={(e)=>setvalue(e.target.value)}/>
                </Grid>
                <Grid item xs={6}>
                    <Button variant='contained' type='submit' fullWidth style={{height:"50px" ,fontSize:"1rem"}}>اضافة</Button>
                </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );

 }
export default AddRefundModal;