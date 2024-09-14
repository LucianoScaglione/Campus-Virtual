import { Route, Routes } from 'react-router';
import Home from './components/Home';
import DetailSubjects from './components/DetailSubjects';
import './App.scss'
import Header from './components/Header/Header';

const App = () => {

  return (
    <div>

      <Header/>

      <div style={{marginTop: "12vh"}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/curriculumUnit/:id" element={<DetailSubjects />} />
        </Routes>
      </div>

    </div>
  );
};

export default App;
