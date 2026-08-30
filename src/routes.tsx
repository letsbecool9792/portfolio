import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'

// Landing stays eager — it's the entry point and shouldn't wait on a chunk.
// The rest split out so a first visit doesn't download every page's code.
const Artifacts = lazy(() => import('./pages/Artifacts'))
const Contact = lazy(() => import('./pages/Contact'))
const Journey = lazy(() => import('./pages/Journey'))
const JourneyStory = lazy(() => import('./pages/JourneyStory'))
const SideQuests = lazy(() => import('./pages/SideQuests'))
const Projects = lazy(() => import('./pages/Projects'))
const NotFound = lazy(() => import('./pages/NotFound'))

const AppRoutes = () => {
    return (
        // Each page paints its own background, so a blank fallback avoids a
        // flash of some other colour between routes.
        <Suspense fallback={<div className="min-h-screen bg-blue-200" />}>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/artifacts" element={<Artifacts />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/journey" element={<Journey />} />
                <Route path="/journey/:slug" element={<JourneyStory />} />
                <Route path="/sidequests" element={<SideQuests />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    )
}

export default AppRoutes;
