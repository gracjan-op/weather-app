import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Homepage from './pages/Homepage';
import NotFound from './pages/NotFound';
import WeatherPage from './pages/WeatherPage';

const App = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <MainLayout>
            <Homepage />
          </MainLayout>
        }
      />
      <Route
        path='/:city/'
        element={
          <MainLayout>
            <WeatherPage />
          </MainLayout>
        }
      />
      <Route
        path='*'
        element={
          <MainLayout hideHero={true}>
            <NotFound />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default App;
