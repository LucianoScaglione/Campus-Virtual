import { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router";
import { detailCurriculumUnit, emptyState } from "../redux/actions";
import { getCurriculumUnitById } from '../redux/actions';

import './DetailSubjects.scss'
import SubjectContentHeader from "./SubjectContent/SubjectContentHeader";


const DetailSubjects = () => {
  const { id } = useParams();

  const curriculumUnit = useSelector(state => state.detailCurriculumUnit);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailCurriculumUnit(id));
    return () => {
      dispatch(emptyState());
    };
  }, [dispatch, id])


  const getTeacherName = (dni, users) => {
    if (!users || !Array.isArray(users)) return 'Lista de profesores no disponible';
    const teacher = users.find(user => user.dni === dni);
    return teacher ? teacher.name+" "+teacher.lastName : dni;
  };

  const currentRoute = "/curriculumUnit/"+id

  return (
    <div className="CurricularUnitPage">
      

      <SubjectContentHeader currentRoute={currentRoute}/>

      <div className='CurrUnitHeader'>
        <h1>{curriculumUnit.name}</h1>
        <h2>Profesor asignado: {getTeacherName(curriculumUnit.assignedTeacher, curriculumUnit.Users)}</h2>
      </div>
      

      <Outlet/>


    </div>
  );
};

export default DetailSubjects;