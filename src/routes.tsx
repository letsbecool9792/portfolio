import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Artifacts from './pages/Artifacts'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/artifacts" element={<Artifacts />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes;