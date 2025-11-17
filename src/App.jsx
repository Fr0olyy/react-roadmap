import { BrowserRouter, Routes, Route } from 'react-router';
import { HomePageFlow } from './pages/HomePageFlow';
import { DetailPage } from './pages/DetailPage';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [roadmap, setRoadmap] = useLocalStorage('roadmap', null);
  const [error, setError] = useLocalStorage('error', '');

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePageFlow
              roadmap={roadmap} 
              setRoadmap={setRoadmap}
              error={error}
              setError={setError}
            />
          } 
        />
        <Route 
          path="/item/:id" 
          element={
            <DetailPage 
              roadmap={roadmap} 
              setRoadmap={setRoadmap}
            />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;