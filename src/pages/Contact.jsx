import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= EMAILJS ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = { ...formData };

    emailjs
      .send(
        "service_uwp6d6f",
        "YOUR_TEMPLATE_ID",
        templateParams,
        "YOUR_PUBLIC_KEY"
      )
      .then(
        () => {
          setSubmitted(true);
          setTimeout(() => {
            setSubmitted(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              subject: "",
              message: "",
            });
          }, 3000);
        },
        () => alert("Failed to send message. Please try again!")
      );
  };

  const contactInfo = [
    { icon: "📞", title: "Phone", details: ["+91 9270776223"] },
    { icon: "✉️", title: "Email", details: ["sanskrutitechnoschool@gmail.com"] },
    { icon: "📍", title: "Address", details: ["Narhe, Pune – 411011"] },
    { icon: "🕒", title: "Office Hours", details: ["Mon – Fri: 8:00 AM – 11:00 AM", "Second & Fourth Saturday off"] },
  ];

  return (
    <div className="pt-24">
      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-primary via-blue-600 to-blue-800 text-white py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            Connect With Sankruti Techno School
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto opacity-90"
          >
            We are here to assist you. Feel free to contact us for admissions,
            support, or any queries.
          </motion.p>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* CONTACT INFO */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
                Contact Details
              </h2>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="text-3xl">{info.icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg text-primary">
                        {info.title}
                      </h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-600 text-sm sm:text-base">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FORM */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 p-5 sm:p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
                  Send a Message
                </h2>

                {submitted ? (
                  <div className="text-center py-10">
                    <div className="text-5xl mb-4">✓</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-600">
                      We will contact you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {["name", "email"].map((field) => (
                        <div key={field}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.charAt(0).toUpperCase() + field.slice(1)} *
                          </label>
                          <input
                            type={field === "email" ? "email" : "text"}
                            name={field}
                            required
                            value={formData[field]}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {["phone", "subject"].map((field) => (
                        <div key={field}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.charAt(0).toUpperCase() + field.slice(1)} *
                          </label>
                          <input
                            type="text"
                            name={field}
                            required
                            value={formData[field]}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        rows="5"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
