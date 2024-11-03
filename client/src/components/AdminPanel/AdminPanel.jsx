import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './AdminPanel.module.scss';
import Users from './Users/Users';
import Subjects from './Subjects/Subjects';
import SchoolIcon from '@mui/icons-material/School'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import { informationUser } from '../../redux/actions';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const AdminPanel = () => {
  const [value, setValue] = useState('users');
  const adminName = informationUser();
  return (
    <div className={style.globalContainer}>
      <div className={style.container}>
        <header className={style.header}>
          <div className={style.leftSection}>
            <SchoolIcon className={style.campusIcon} />
            <p>Campus-Virtual</p>
          </div>
          <div className={style.centerSection}>
            <h1>Admin Panel</h1>
          </div>
          <div className={style.rightSection}>
            <AccountCircleIcon className={style.userIcon} />
            <p>{adminName.user.name} {adminName.user.lastName}</p>
            <Link to='/' className='test' style={{display: "flex", marginLeft: "5px"}}>
              <ExitToAppIcon className={style.back}/>
            </Link>
          </div>
        </header>
        <aside className={style.aside}>
          <p className={value === 'users' ? style.selected : style.noSelected} onClick={() => setValue('users')}>Users</p>
          <p className={value === 'curriculumUnits' ? style.selected : style.noSelected} onClick={() => setValue('curriculumUnits')}>Subjects</p>
        </aside>
        <article className={style.article}>
          {value === 'users' && <Users />}
          {value === 'curriculumUnits' && <Subjects />}
        </article>
      </div>
    </div>
  );
};

export default AdminPanel;
