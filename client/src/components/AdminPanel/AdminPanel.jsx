import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './AdminPanel.module.css';
import Users from './Users';

const AdminPanel = () => {
  const [value, setValue] = useState('users');
  return (
    <div className={style.contenedorGlobal}>
      <Link className={style.linkUrl} to='/'>
        <p className={style.volver}>{'< Back'}</p>
      </Link>
      <div className={style.contenedor}>
        <header className={style.header}>Admin panel</header>
        <aside className={style.aside}>
          <p className={value === 'users' ? style.pMarcado : undefined} onClick={() => setValue('users')}>Users</p>
          <p className={value === 'curriculumUnits' ? style.pMarcado : undefined} onClick={() => setValue('curriculumUnits')}>Curriculum units</p>
        </aside>
        <article className={style.article}>
          {value === 'users' && <Users />}
          {/* {value === 'curriculumUnits' && <CurriculumUnits />} */}
        </article>
      </div>
    </div>
  );
};

export default AdminPanel;