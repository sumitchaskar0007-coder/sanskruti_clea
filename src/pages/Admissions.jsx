import { useState } from 'react'
import { motion } from 'framer-motion'

const Admissions = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grade: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to a backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', grade: '', message: '' })
    }, 3000)
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-blue-600 to-blue-800 text-white py-20">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-4"
          >
            Begin Your Journey with Jadhavar
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto opacity-90"
          >
            Join our community of learners and give your child the gift of quality education
          </motion.p>
        </div>
      </section>

      {/* Admission Process */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Admission Process</h2>
            <p className="text-xl text-gray-600">Simple steps to join our school</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {[
              { step: '1', title: 'Inquiry', description: 'Fill out the inquiry form or visit our campus' },
              { step: '2', title: 'Application', description: 'Submit required documents and application form' },
              { step: '3', title: 'Assessment', description: 'Student assessment and interaction session' },
              { step: '4', title: 'Confirmation', description: 'Receive admission confirmation and complete enrollment' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Important Documents</h2>
            <p className="text-xl text-gray-600">Download admission forms and view fee structure</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Hamipatra PDF - Opens directly in a new tab */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                📄
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Hamipatra</h3>
              <p className="text-gray-600 mb-6">
                Click the button below to view or download the admission document.
              </p>
              <motion.a
                href="https://drive.google.com/file/d/12bW9kVLJaZaOyqBX6nkHE3TtZUwpV-hb/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                Open Hamipatra (PDF)
              </motion.a>
            </motion.div>
            
            {/* Fees Slip */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                💰
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Fee Structure</h3>
              <p className="text-gray-600 mb-6">View our fee structure and payment details</p>
              <a
                href="/images/fees.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Fee Structure
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">Fill out the form, and our admissions team will get back to you shortly!</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white p-8 rounded-xl shadow-lg"
                >
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="text-6xl mb-4">✓</div>
                      <h3 className="text-2xl font-bold text-primary mb-2">Thank You!</h3>
                      <p className="text-gray-600">We've received your inquiry and will contact you soon.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Parent/Guardian Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div>
                        <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                          Child's Grade *
                        </label>
                        <select
                          id="grade"
                          name="grade"
                          required
                          value={formData.grade}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">Select Grade</option>
                          <option value="Nursery">Nursery</option>
                          <option value="KG">KG</option>
                          <option value="Class I">Class I</option>
                          <option value="Class II">Class II</option>
                          <option value="Class III">Class III</option>
                          <option value="Class IV">Class IV</option>
                          <option value="Class V">Class V</option>
                          <option value="Class VI">Class VI</option>
                          <option value="Class VII">Class VII</option>
                          <option value="Class VIII">Class VIII</option>
                          <option value="Class IX">Class IX</option>
                          <option value="Class X">Class X</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows="4"
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Any additional information or questions..."
                        ></textarea>
                      </div>

                      <button type="submit" className="btn-primary w-full text-lg">
                        Request Information
                      </button>
                    </form>
                  )}
                </motion.div>
              </div>

              {/* Info Box */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-primary text-white p-8 rounded-xl shadow-lg h-full"
                >
                  <h3 className="text-2xl font-bold mb-4">Admissions Office</h3>
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="font-semibold mb-1">Office Hours</p>
                      <p className="opacity-90">Monday - Friday: 8:00 AM - 11:00 AM</p>
                      <p className="opacity-90">Second & Fourth Saturday off</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Contact</p>
                      <p className="opacity-90">Phone: +91 9270776223</p>
                      <p className="opacity-90">Email: sanskrutitechnoschool@gmail.com</p>
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                    <p className="text-sm">
                      Fill out the form, and our admissions team will get back to you shortly!
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Admissions