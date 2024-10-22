import { useEffect } from 'react';
import '../DetailSubjects.scss'
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getCurriculumUnitById } from '../../redux/actions';

const SubjectMembers = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const curriculumUnitById = useSelector(state => state.curriculumUnitById);
  useEffect(() => {
    dispatch(getCurriculumUnitById(id))
  }, [id, dispatch]);
  console.log("curriculumUnitById: ", curriculumUnitById);

  return (
    <div className="CurrUnitContent">
      <div className='CurrUnitViewerHeader'><h2><b>INTEGRANTES</b></h2></div>
      <div>
        {
          curriculumUnitById.Users?.length ? curriculumUnitById.Users.map(user => {
            return (
              <div key={user.id}>
                <p>{user.name} {user.lastName}</p>
                <button>X</button>
              </div>
            )
          }) : <p>No hay alumnos</p>
        }
      </div>
    </div>
  );
};

export default SubjectMembers;