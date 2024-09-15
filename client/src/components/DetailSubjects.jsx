import { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router";
import { detailCurriculumUnit, emptyState } from "../redux/actions";

import './DetailSubjects.scss'
import SubjectContentHeader from "./SubjectContent/SubjectContentHeader";
import SubjectNews from "./SubjectContent/SubjectNews";
import SubjectMembers from "./SubjectContent/SubjectMembers";
import SubjectWorklist from "./SubjectContent/SubjectWorklist";

const DetailSubjects = () => {
  const { id } = useParams();
  const [currentArea, setCurrentArea] = useState(1);

  const curriculumUnit = useSelector(state => state.detailCurriculumUnit);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailCurriculumUnit(id));
    return () => {
      dispatch(emptyState());
    };
  }, [dispatch, id])

  const currentRoute = "/curriculumUnit/"+id

  return (
    <div className="CurricularUnitPage">
      

      <SubjectContentHeader currentRoute={currentRoute}/>

      <div className='CurrUnitHeader'>
        <h1>{curriculumUnit.name}</h1>
        <h2>Profesor asignado: {curriculumUnit.assignedTeacher}</h2>
      </div>
      

      <Outlet/>


      {/* <h1>{curriculumUnit.name}</h1>
      <h3>{curriculumUnit.assignedTeacher}</h3>
      <p>{curriculumUnit.description}</p>
      <p>Personas:</p>
      <p>Compañeros de clase</p>
      {curriculumUnit.Users && curriculumUnit.Users.length > 0 ? (
        <ul>
          {curriculumUnit.Users.map(u => (
            <li key={u.id}>{u.name} {u.lastName}</li>
          ))}
        </ul>
      ) : (
        <p>There are no students taking this subject.</p>
      )} */}


    </div>
  );
};

export default DetailSubjects;