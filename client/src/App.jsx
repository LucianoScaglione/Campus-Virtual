import { Route, Routes } from 'react-router';
import Home from './components/Home';
import DetailSubjects from './components/DetailSubjects';
import './App.scss'
import Header from './components/Header/Header';

import SubjectNews from './components/SubjectContent/SubjectNews';
import SubjectMembers from './components/SubjectContent/SubjectMembers';
import SubjectWorklist from './components/SubjectContent/SubjectWorklist';

const App = () => {

  return (
    <div>

      <Header/>

      <div style={{marginTop: "12vh"}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<DetailSubjects />} >
          
            <Route path={"/curriculumUnit/:id/news"} element={<SubjectNews/>}/>
            <Route path={"/curriculumUnit/:id/work"} element={<SubjectWorklist/>}/>
            <Route path={"/curriculumUnit/:id/members"} element={<SubjectMembers/>}/>
          
          </Route>
        </Routes>
      </div>

    </div>
  );
};

export default App;
