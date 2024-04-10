import React from 'react';
import Loading from 'react-loading-components';
import '../CSS/Loader.css';
 
const Loader = () => (
    <div className='load'>
  <Loading type='tail_spin' width={100} height={100} fill='#ffc107' />
  </div>
);
 
export default Loader;