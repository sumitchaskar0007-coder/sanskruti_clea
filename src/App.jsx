import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AnnouncementAdmin from './pages/admin/AnnouncementAdmin';
import CareerAdmin from './pages/admin/CareerAdmin';
import GalleryAdmin from './pages/admin/GalleryAdmin';
import BlogAdmin from './pages/admin/BlogAdmin';
import Blog from './pages/Blog';
// Public Pages
import Home from './pages/Home'
import About from './pages/About'
import WhyJadhavar from './pages/WhyJadhavar'
import Curriculum from './pages/Curriculum'
import Academics from './pages/Academics'
import Admissions from './pages/Admissions'
import FacilitiesPage from './pages/Facilities'
// import FacultyPage from './pages/FacultyPage'
import LifeAtJadhavar from './pages/LifeAtJadhavar'
import Gallery from './pages/Gallery'
import Announcements from './pages/Announcements'
import Career from './pages/Career'
import InfoCenter from './pages/InfoCenter'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from "./components/ScrollToTop";
import BlogDetails from './pages/BlogDetails';
function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        {/* Navbar will be hidden on admin routes */}
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Main Website Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/why-jadhavar" element={<WhyJadhavar />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/facilities" element={<FacilitiesPage />} />
            {/* <Route path="/faculty" element={<FacultyPage />} /> */}
            <Route path="/life-at-jadhavar" element={<LifeAtJadhavar />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/career" element={<Career />} />
            <Route path="/info-center" element={<InfoCenter />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route
              path="/blog/:slug"
              element={<BlogDetails />}
            />

            {/* Admin Auth Route */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

            <Route path="/admin/dashboard" element={
              <ProtectedRoutes>
                <AdminDashboard />
              </ProtectedRoutes>
            } />

            <Route path="/admin/gallery" element={
              <ProtectedRoutes>
                <GalleryAdmin />
              </ProtectedRoutes>
            } />
            <Route path="/admin/blog" element={
              <ProtectedRoutes>
                <BlogAdmin />
              </ProtectedRoutes>
            } />

            <Route path="/admin/announcements" element={
              <ProtectedRoutes>
                <AnnouncementAdmin />
              </ProtectedRoutes>
            } />

            <Route path="/admin/careers" element={
              <ProtectedRoutes>
                <CareerAdmin />
              </ProtectedRoutes>
            } />

            {/* Catch all route - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {/* Footer will be hidden on admin routes */}
        <Footer />
      </div>
    </Router>
  )
}

export default App
