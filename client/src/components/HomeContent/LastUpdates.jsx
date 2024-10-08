import React from 'react'
import '../Home.scss'
import { Link } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurriculumUnit } from '../../redux/actions';

import { informationUser } from '../../redux/actions';



function LastUpdates() {

  const dispatch = useDispatch();
  const curriculumUnit = useSelector(state => state.curriculumUnit);
  useEffect(() => {
    !curriculumUnit.length &&
      dispatch(getCurriculumUnit());
  }, [dispatch, curriculumUnit.length])


  const userData = informationUser().user

  function inArray(target, array){
    return array.some(user => user.id === target)
  }


  return (
    <div className="CurrUnitViewerContent">

      <div className='CurrUnitViewerHeader'>
        <h2><b>Unidades Curriculares</b></h2>
      </div>

      {curriculumUnit.map((value, index) => {
        return (
          <div key={index}>

            {
            inArray(userData.id,value.Users) || userData.ranks == "Admin"
            ? 
            (<Link to={`/curriculumUnit/${value.id}/news`}>
              <div className='CurrUnitCard' key={value.id}>
                <h2 className='CurrUnitTitle'>{value.name}</h2>
                <div className='CurrUnitInfo'>
                  <span><b>Profesor asignado: </b>{value.assignedTeacher}</span>
                </div>
              </div>
            </Link>)
            : null}

          </div>
        );
      })}

    </div >

  );
}

export default LastUpdates;
