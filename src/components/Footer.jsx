import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', href: 'https://www.facebook.com/profile.php?id=61584564186910' },
    { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z', href: 'https://www.instagram.com/sanskrutitechnoschool/?hl=en' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-30 h-20 overflow-hidden bg-white">
                <img
                  src="/images/logo1.png"
                  alt="Sankruti Techno School Logo"
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div>
                <h6 className="text-sxl text-white">Sankruti Techno School</h6>
                <p className="text-sm text-gray-400">Innovative Learning for Future Leaders</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm">
              Combining technology, innovation, and holistic education to empower students for a brighter tomorrow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link to="/curriculum" className="text-gray-400 hover:text-white transition">Curriculum</Link></li>
              <li><Link to="/admissions" className="text-gray-400 hover:text-white transition">Admissions</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-white transition">Gallery</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Programs</h4>
            <ul className="space-y-2">
              <li><Link to="/early-years" className="text-gray-400 hover:text-white transition">Early Years</Link></li>
              <li><Link to="/primary-years" className="text-gray-400 hover:text-white transition">Primary Years</Link></li>
              <li><Link to="/middle-years" className="text-gray-400 hover:text-white transition">Middle Years</Link></li>
              <li><Link to="/class-xi" className="text-gray-400 hover:text-white transition">Class XI</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Phone: +91 9270776223</li>
              <li>Email: sanskrutitechnoschool@gmail.com</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition"
                  aria-label={social.name}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p className="text-center text-gray-300 text-sm">
            © {currentYear} Sankruti Techno School. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
