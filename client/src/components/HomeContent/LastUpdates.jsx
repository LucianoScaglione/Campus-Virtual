import React from 'react'
import '../Home.scss'
import { Link } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurriculumUnit } from '../../redux/actions';



function LastUpdates() {

  const dispatch = useDispatch();
  const curriculumUnit = useSelector(state => state.curriculumUnit);
  useEffect(() => {
    !curriculumUnit.length &&
      dispatch(getCurriculumUnit());
  }, [dispatch, curriculumUnit.length])
  

  return (
    <div className="CurrUnitContent">
      
      <div className='CurrUnitHeader'>
        <h2><b>Unidades Curriculares</b></h2>
      </div>

      {curriculumUnit.map((value,index) => {
        return (
          <Link to={`/curriculumUnit/${value.id}`}>
            <div className='CurrUnitCard' key={value.id}>
              <div className='CurrUnitTitle'><h2>{value.name}</h2></div>
              <div className='CurrUnitInfo'>

                    <span><b>Profesor asignado: </b>{value.assignedTeacher}</span>

              </div>
            </div>
          </Link>
        );
      })}

    </div>
    
  );
}

export default LastUpdates;
