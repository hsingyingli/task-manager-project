import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Home from './pages/Home';
import RequireAuth from './components/require_auth';
import PersistLogin from './components/presist_login';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<SignIn />} />
        <Route exact path="/register" element={<Register />} />

        {/*   Protect Routes   */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route exact path="/" element={<Home />} />
          </Route>
        </Route>
        {/*   Protect Routes   */}
      </Routes>
    </Router>
  );
}

export default App;
