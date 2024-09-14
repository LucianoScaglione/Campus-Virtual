import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurriculumUnit } from '../redux/actions';
import { Link } from 'react-router-dom';

import React from 'react'
import './Home.scss'

import LastUpdates from './HomeContent/LastUpdates'

const Home = () => {
  const dispatch = useDispatch();
  const curriculumUnit = useSelector(state => state.curriculumUnit);
  useEffect(() => {
    !curriculumUnit.length &&
      dispatch(getCurriculumUnit());
  }, [dispatch, curriculumUnit.length])
  return (
    <div>
      {/*
        curriculumUnit.length ? curriculumUnit.map(c => {
          return (
            <div key={c.id}>
              <Link to={`${c.id}`}>
                <h1>{c.name}</h1>
              </Link>
              <h3>{c.assignedTeacher}</h3>
            </div>
          );
        }) : <h4>There are no registered curriculum unit</h4>
      */}

    <LastUpdates/>

    </div>
  )
};

export default Home;