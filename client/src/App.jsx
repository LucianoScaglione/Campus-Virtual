import { Route, Routes } from 'react-router';
import Home from './components/Home';
import DetailSubjects from './components/DetailSubjects';

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<DetailSubjects />} />
      </Routes>
    </div>
  );
};

export default App;
