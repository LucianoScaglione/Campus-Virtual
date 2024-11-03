import { useEffect } from 'react';
import '../DetailSubjects.scss'
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getCurriculumUnitById, informationUser, removeUsersFromCurriculumUnit } from '../../redux/actions';
import Avatar from '@mui/material/Avatar'

const SubjectMembers = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const curriculumUnitById = useSelector(state => state.curriculumUnitById);
  useEffect(() => {
    dispatch(getCurriculumUnitById(id))
  }, [id, dispatch]);
  const userData = informationUser().user;
  return (
    <div className="CurrUnitContent">
      <div className='CurrUnitViewerHeader HeaderEdits'><h2><b>INTEGRANTES</b></h2></div>
      <div className='CurrUnitInfoContent'>
        {
          curriculumUnitById.Users?.length ? curriculumUnitById.Users.map(user => {
            return (
              user.ranks == "Teacher" ? (
                <div class="card">
                  <div class="avatar"></div>
                  <div class="vertical-line"></div>
                  <div class="card-content">
                    <div class="name" style={user.dni == curriculumUnitById.assignedTeacher ? {textDecorationLine: "underline"} : null}>{user.name} {user.lastName}</div>
                  </div>
                  <div class="student-label">{user.ranks} </div>
                </div>  
              ) : null
            )
          }) : null
        }
        {
          curriculumUnitById.Users?.length ? curriculumUnitById.Users.map(user => {
            return (
              user.ranks == "Student" ? (
                <div class="card">
                  <div class="avatar"></div>
                  <div class="vertical-line"></div>
                  <div class="card-content">
                    <div class="name">{user.name} {user.lastName}</div>
                  </div>
                  <div class="student-label">{user.ranks} </div> {/* <b style={userData.dni == curriculumUnitById.assignedTeacher ? null : {display: "none"}}>X</b> */}
                </div>  
              ) : null
            )
          }): null
        }
        
      </div>
    </div>
  );
};

export default SubjectMembers;