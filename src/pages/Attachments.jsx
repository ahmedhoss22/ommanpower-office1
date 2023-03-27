import React, { useState } from 'react';
import { Button, InputLabel, TextField } from '@mui/material'

const Attachments = () => {
  const [attachmentsData, setAttachmentsData] = useState(
    {
      clientID: '',
      workerID: '',
      contract: '',
      undertaking: '',
      waiver: '',
    }
  );
  const handleClick = () => {
    console.log(attachmentsData);
  }
  return (
    <div className='mt-16 ml-5'>
      <h2 className='text-2xl font-bold'>Attachments</h2>
      <div className='md:w-1/2 sm:w-full'>
        <TextField label="Client ID" name='clientID' fullWidth variant="outlined" margin='dense' onChange={(e) => {setAttachmentsData({ ...attachmentsData, clientID: e.target.value})}}/>
        <TextField label="Worker ID" name='workerID' fullWidth variant="outlined" margin='dense' onChange={(e) => {setAttachmentsData({ ...attachmentsData, workerID: e.target.value})}}/>
        <InputLabel id="contract">Conract</InputLabel>
        <TextField labelId='contract' type='file' name='contract' fullWidth variant="outlined" margin='dense' onChange={(e) => {setAttachmentsData({ ...attachmentsData, contract: e.target.value})}}/>
        <InputLabel id="undertaking">Undertaking</InputLabel>
        <TextField labelId='undertaking' type='file' name='undertaking' fullWidth variant="outlined" margin='dense' onChange={(e) => {setAttachmentsData({ ...attachmentsData, undertaking: e.target.value})}}/>
        <InputLabel id="waiver">Waiver</InputLabel>
        <TextField labelId='waiver' type='file' name='waiver' fullWidth variant="outlined" margin='dense' onChange={(e) => {setAttachmentsData({ ...attachmentsData, waiver: e.target.value})}}/>
        <Button variant="contained" size='large' onClick={handleClick} style={{ background: '#28a745', marginTop: '20px'}}>Upload</Button>
      </div>
    </div>
  )
}

export default Attachments