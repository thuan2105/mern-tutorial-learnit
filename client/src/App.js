import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthContextProvider } from './contexts/authContext';
import Landing from '~/components/layouts/landing';
import About from './components/layouts/about';
import Auth from './views/auth/Auth';
import Dashboard from './views/dashboard';
import { default as ProtectedRoute } from './components/routing';
import { PostContextProvider } from './contexts/postContext';
function App() {
    return (
        <AuthContextProvider>
            <PostContextProvider>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Landing />} />
                        <Route exact path="/login" element={<Auth authRoute={'login'} />} />
                        <Route exact path="/register" element={<Auth authRoute={'register'} />} />
                        <Route exact path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
                        <Route exact path="/about" element={<ProtectedRoute component={About} />} />
                    </Routes>
                </Router>
            </PostContextProvider>
        </AuthContextProvider>
    );
}

export default App;
