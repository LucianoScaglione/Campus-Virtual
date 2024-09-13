import { useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { detailCurriculumUnit, emptyState } from "../redux/actions";

const DetailSubjects = () => {
  const dispatch = useDispatch();
  const curriculumUnit = useSelector(state => state.detailCurriculumUnit);
  const { id } = useParams();
  console.log("materias: ", curriculumUnit)
  useEffect(() => {
    dispatch(detailCurriculumUnit(id));
    return () => {
      dispatch(emptyState());
    };
  }, [dispatch, id])
  return (
    <div>
      <h1>{curriculumUnit.name}</h1>
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
      )}
    </div>
  );
};

export default DetailSubjects;