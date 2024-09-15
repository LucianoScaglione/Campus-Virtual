import { Route, Routes } from 'react-router';
import Home from './components/Home';
import DetailSubjects from './components/DetailSubjects';
import './App.scss'
import Header from './components/Header/Header';
import Login from './Login';
import PrivatesRoutes from './components/PrivatesRoutes';

const App = () => {

  return (
    <div>

      <Header />

      <div style={{ marginTop: "12vh" }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivatesRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/curriculumUnit/:id" element={<DetailSubjects />} />
          </Route>
        </Routes>
      </div>

    </div>
  );
};

export default App;
