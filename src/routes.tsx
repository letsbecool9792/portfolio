import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Artifacts from './pages/Artifacts'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Journey from './pages/Journey'
import SideQuests from './pages/SideQuests'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/artifacts" element={<Artifacts />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/sidequests" element={<SideQuests />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes;