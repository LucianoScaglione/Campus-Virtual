import { Route, Routes, Outlet } from 'react-router';
import Home from './components/Home';
import DetailSubjects from './components/DetailSubjects';
import './App.scss';
import Header from './components/Header/Header';
import Login from './Login';
import PrivatesRoutes from './components/PrivatesRoutes';
import SubjectNews from './components/SubjectContent/SubjectNews';
import SubjectMembers from './components/SubjectContent/SubjectMembers';
import SubjectWorklist from './components/SubjectContent/SubjectWorklist';
import AdminPanel from './components/AdminPanel/AdminPanel';
import PrivatesRoutesAdmin from './components/PrivatesRoutesAdmin';
import Subjects from './components/AdminPanel/Subjects/Subjects';
import Users from './components/AdminPanel/Users/Users';

const App = () => {

  const HeaderWrapper = () => {
    return (
      <div>
        <Header />
        <div style={{ marginTop: "12vh" }}>
          <Outlet />
        </div>
      </div>
    );
  };

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivatesRoutes />}>
          <Route element={<HeaderWrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/curriculumUnit/:id" element={<DetailSubjects />} />
            <Route path="/" element={<Home />} />
            <Route element={<DetailSubjects />} >
              <Route path={"/curriculumUnit/:id/news"} element={<SubjectNews />} />
              <Route path={"/curriculumUnit/:id/work"} element={<SubjectWorklist />} />
              <Route path={"/curriculumUnit/:id/members"} element={<SubjectMembers />} />
            </Route>
          </Route>
          <Route element={<PrivatesRoutesAdmin />}>
            <Route element={<AdminPanel />} >
              <Route path={"/admin/panel/users"} element={<Users />} />
              <Route path={"/admin/panel/subjects"} element={<Subjects />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;