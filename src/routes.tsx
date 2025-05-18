import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
        </Routes>
    )
}

export default AppRoutes;