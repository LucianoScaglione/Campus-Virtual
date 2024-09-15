import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurriculumUnit } from '../redux/actions';
import { Link } from 'react-router-dom';

import React from 'react'
import './Home.scss'

import LastUpdates from './HomeContent/LastUpdates'
import CalendarUpdates from './HomeContent/Calendar';

const Home = () => {

  const dispatch = useDispatch();
  const curriculumUnit = useSelector(state => state.curriculumUnit);
  useEffect(() => {
    !curriculumUnit.length &&
      dispatch(getCurriculumUnit());
  }, [dispatch, curriculumUnit.length])

  return (
    <div className='Home'>

      <LastUpdates/>
      <CalendarUpdates/>

    </div>
  )
};

export default Home;