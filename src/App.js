import React, { lazy, Suspense } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import("./pages/home/home"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const Dictionary = lazy(() => import("./pages/dictionary/dictionary"));
const Achievements = lazy(() => import("./pages/achievements/achievements"));
const Profile = lazy(() => import("./pages/profile/profile"));
const Register = lazy(() => import("./pages/auth/register"));
const Login = lazy(() => import("./pages/auth/login"));
const Onboarding = lazy(() => import("./pages/onboarding/onboarding"));
const Loading = lazy(() => import("./components/loading/loading"));

// Games
const GameType = lazy(() => import("./pages/games"));


const App = React.memo(() => {

  return (
    <div className="KIDS" translate="no">
      <Suspense fallback={<div className="loading-item">
        <Loading />
      </div>}>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/onboarding' element={<Onboarding />} />
          {/* Games */}
          <Route path='/games/:id' element={<GameType />} />
          <Route path='/dictionary' element={<Dictionary />} />
          <Route path='/achievements' element={<Achievements />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path='*' element={<Navigate to='/register' />} />
        </Routes>
      </Suspense>
    </div>
  );
});

export default App;
