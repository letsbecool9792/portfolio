import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Artifacts from './pages/Artifacts'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/artifacts" element={<Artifacts />} />
        </Routes>
    )
}

export default AppRoutes;