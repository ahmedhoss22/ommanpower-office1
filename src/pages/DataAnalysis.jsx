import React from 'react';
import Area from './Charts/Area';
import Bar from './Charts/Bar';
import ColorMapping from './Charts/ColorMapping';
import Financial from './Charts/Financial';
import Line from './Charts/Line';
import Pie from './Charts/Pie';
import Pyramid from './Charts/Pyramid';
import Stacked from './Charts/Stacked';
import { useTranslation  } from 'react-i18next';


const DataAnalysis = () => {
  const { t, i18n } = useTranslation();
  
  return (
    <div className='mt-16 mx-5' style={{direction:i18n.language=='en'?'ltr':'rtl'}}>
      {i18n.language=='en'&& <h2 className='text-2xl font-bold'>Data Analysis</h2>}
      {i18n.language=='ar'&& <h2 className='text-2xl font-bold'>تحليل البيانات</h2>}
   {/*    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
        <Line /> 
      </div>
      <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
        {/* <Bar />
      </div> */}
      <div className='m-2 md:m-0 mt-0 p-2 md:p-0 bg-white rounded-3xl'>
        <Pie />
      </div>
      {/* <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
        // <Area />
      </div> */}
      {/* <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
        <Financial />
      </div> */}
      {/* <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
        <ColorMapping />
      </div> */}
    </div>
  )
}

export default DataAnalysis