import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Users, Trophy, Home, HeartHandshake } from "lucide-react";

const LifeAtSanskruti = () => {
  const [activeTab, setActiveTab] = useState("cultural");

  const activities = {
    cultural: {
      title: "Cultural Activities",
      description:
        "Celebrating creativity and diversity through artistic, musical, and stage performance events that strengthen confidence and expression.",
      Icon: Sparkles,
      items: [
        { name: "Annual Cultural Festival", description: "Showcasing talents through dance, drama, and music." },
        { name: "Art & Creativity Studio", description: "Exploring imagination through painting and craft." },
        { name: "Theatre Workshops", description: "Acting, script writing and stage performance training." },
        { name: "Debate & Public Speaking", description: "Enhancing confidence and communication skills." },
      ]
    },

    sports: {
      title: "Sports & Fitness",
      description:
        "Sportsmanship, discipline and physical fitness through a wide range of indoor and outdoor sports.",
      Icon: Trophy,
      items: [
        { name: "Cricket & Football Coaching", description: "Certified coaches and competitive matches." },
        { name: "Basketball & Athletics", description: "Professional training facilities." },
        { name: "Indoor Games Zone", description: "Chess, table tennis & mind–strength games." },
      ]
    },

    residential: {
      title: "Residential & Day School",
      description:
        "Modern and safe residential campus providing balanced lifestyle, learning and care.",
      Icon: Home,
      items: [
        { name: "Comfortable Hostels", description: "Spacious rooms and secure environment." },
        { name: "Nutritious Dining", description: "Health–oriented meals and diet supervision." },
        { name: "Activity & Study Hours", description: "Guided study with evening recreation." },
      ]
    },

    community: {
      title: "Community Engagement",
      description:
        "Helping students become responsible citizens through social initiatives and leadership programs.",
      Icon: HeartHandshake,
      items: [
        { name: "Eco–Green Initiatives", description: "Tree plantation and waste–reuse projects." },
        { name: "Social Service Activities", description: "Visits to old–age homes, hospitals & rural outreach." },
        { name: "Leadership Council", description: "Student parliament and leadership development." },
      ]
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-blue-700 to-indigo-800 text-white py-24 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container-custom text-center relative z-10"
        >
          <h1 className="text-6xl font-extrabold mb-4 tracking-tight">
            Life at Sanskruti Techno School
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            A vibrant learning community that inspires curiosity, creativity, discipline, and leadership.
          </p>
        </motion.div>
      </section>

      {/* Tabs */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4 mb-14">
            {Object.keys(activities).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-full font-semibold shadow-md border transition-all ${activeTab === key
                  ? "bg-primary text-white shadow-lg scale-105"
                  : "bg-white text-primary border-primary hover:bg-primary hover:text-white"
                  }`}
              >
                {activities[key].title}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-primary mb-2">
              {activities[activeTab].title}
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              {activities[activeTab].description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activities[activeTab].items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-2xl shadow-md hover:shadow-2xl transition"
              >
                <h3 className="text-xl font-bold text-primary mb-1">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-center text-4xl font-extrabold text-primary mb-12">
            Student Experiences
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Sanskruti Techno School helped me discover my passion and build strong confidence.",
                author: "Student, Class X",
              },
              {
                quote: "An amazing environment where sports, academics and discipline blend perfectly.",
                author: "Student, Class VIII",
              },
              {
                quote: "The opportunities and inspiration I receive here shape my future every day.",
                author: "Student, Class XI",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-xl"
              >
                <div className="text-4xl text-primary mb-4">“</div>
                <p className="text-gray-700 mb-4 italic">{testimonial.quote}</p>
                <p className="font-semibold text-primary text-end">
                  {testimonial.author}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-center text-4xl font-extrabold text-primary mb-12">
            A Day at Sanskruti
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { time: "7:45 AM", label: "Morning Assembly & Yoga" },
              { time: "8:15 AM", label: "Academic Learning Sessions" },
              { time: "10:45 AM", label: "Snacks & Refreshment" },
              { time: "11:00 AM", label: "Skill–Based Learning Labs" },
              { time: "1:00 PM", label: "Lunch Break" },
              { time: "2:00 PM", label: "Afternoon Integrated Learning" },
              { time: "3:30 PM", label: "Sports / Clubs / Art Studio" },
              { time: "5:00 PM", label: "Study Hours & Daily Reflection" },
            ].map((row, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-6 bg-gray-50 p-4 rounded-xl"
              >
                <div className="text-primary font-bold w-24">{row.time}</div>
                <div className="text-gray-700">{row.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LifeAtSanskruti;
