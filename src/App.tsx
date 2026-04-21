/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  ChefHat as Palette, 
  Layout, 
  MessageSquare, 
  Send, 
  Facebook, 
  Instagram, 
  Phone as WhatsApp, 
  ArrowUp, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  PenTool,
  Globe,
  Image as ImageIcon,
  CheckCircle2,
  Mail,
  User,
  Quote
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

// --- Types ---
type Category = "All" | "Logo Design" | "Flyers" | "Branding";

interface Project {
  id: number;
  title: string;
  category: Category;
  description: string;
  image: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "EcoBrand Identity",
    category: "Branding",
    description: "Sustainable brand visual system with earth-tone palettes.",
    image: "https://picsum.photos/seed/branding1/800/600"
  },
  {
    id: 2,
    title: "TechFlow Logo",
    category: "Logo Design",
    description: "Minimalist geometric logo for a software startup.",
    image: "https://picsum.photos/seed/logo1/800/600"
  },
  {
    id: 3,
    title: "Summer Party Flyer",
    category: "Flyers",
    description: "Vibrant and energetic flyer for a beach event.",
    image: "https://picsum.photos/seed/flyer1/800/600"
  },
  {
    id: 4,
    title: "Modern Real Estate",
    category: "Branding",
    description: "Professional corporate identity for premium property firm.",
    image: "https://picsum.photos/seed/branding2/800/600"
  },
  {
    id: 5,
    title: "Coffee Shop Branding",
    category: "Branding",
    description: "Cozy and rustic brand materials for a local cafe.",
    image: "https://picsum.photos/seed/branding3/800/600"
  },
  {
    id: 6,
    title: "Business Conference",
    category: "Flyers",
    description: "Clean, informative layout for a corporate seminar.",
    image: "https://picsum.photos/seed/flyer2/800/600"
  }
];

const SERVICES: Service[] = [
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Logo Design",
    description: "Unique and memorable brand marks that define your corporate identity and values."
  },
  {
    icon: <PenTool className="w-8 h-8" />,
    title: "Flyer Design",
    description: "Eye-catching promotional materials designed to grab attention and convert leads."
  },
  {
    icon: <Layout className="w-8 h-8" />,
    title: "UI/UX Design",
    description: "Intuitive digital interfaces focused on user experience and seamless navigation."
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Social Media Design",
    description: "Cohesive visual content tailored for Instagram, Facebook, and Twitter engagement."
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO, TechLaunch",
    text: "Nwodo Kamsi Victus transformed our brand vision into a stunning reality. The attention to detail is unparalleled.",
    avatar: "https://picsum.photos/seed/user1/100/100"
  },
  {
    id: 2,
    name: "Sarah Smith",
    role: "Marketing Manager, Viva",
    text: "The E-kLASS team delivered exceptional flyers that significantly boosted our event attendance. Great work!",
    avatar: "https://picsum.photos/seed/user2/100/100"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Founder, GreenSpace",
    text: "Professional, creative, and timely. Kamsi is our go-to designer for everything branding.",
    avatar: "https://picsum.photos/seed/user3/100/100"
  }
];

// --- Components ---

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = ["Home", "About", "Portfolio", "Services", "Testimonials", "Contact"];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">E</div>
          <span className={`font-bold text-xl ${scrolled ? "text-blue-900" : "text-white"}`}>E-kLASS</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {menuItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={`font-medium transition-colors hover:text-blue-500 ${scrolled ? "text-gray-700" : "text-white"}`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className={scrolled ? "text-gray-900" : "text-white"} /> : <Menu className={scrolled ? "text-gray-900" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {menuItems.map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 font-medium hover:text-blue-600"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 150]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-blue-950">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" 
        />
        <motion.div 
          style={{ y: y2, animationDelay: "2s" }}
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/20 blur-[120px] rounded-full animate-pulse" 
        />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-blue-400 font-semibold tracking-widest uppercase mb-4"
        >
          E-kLASS Computer Academy
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-8xl font-bold text-white mb-6 leading-tight"
        >
          Nwodo Kamsi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Victus</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-blue-100/80 mb-10 max-w-2xl mx-auto"
        >
          Professional Graphic Designer crafting premium visual identities that breathe life into your brand.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a 
            href="#portfolio"
            className="inline-flex items-center gap-2 px-10 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-all shadow-xl hover:shadow-blue-500/25 active:scale-95"
          >
            View Portfolio
            <ArrowUp className="w-5 h-5 rotate-45" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  const skills = [
    { name: "Graphic Design", level: 95 },
    { name: "Branding", level: 90 },
    { name: "Flyer Design", level: 98 },
    { name: "UI/UX Design", level: 85 }
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
            <img 
              src="/nwodo-kamsi.jpg" 
              alt="Nwodo Kamsi" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 rounded-3xl -z-10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6 font-sans">Empowering Vision through <span className="text-blue-600">Design Excellence</span></h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            I am Nwodo Kamsi Victus, a dedicated graphic designer at E-kLASS Computer Academy. My mission is to bridge the gap between ideas and visual reality. With a keen eye for detail and a passion for modern aesthetics, I specialize in creating identities that resonate with audiences.
          </p>
          
          <div className="space-y-6">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-800">{skill.name}</span>
                  <span className="text-blue-600 font-bold">{skill.level}%</span>
                </div>
                <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-blue-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [filter, setFilter] = useState<Category>("All");
  const categories: Category[] = ["All", "Logo Design", "Flyers", "Branding"];

  const filteredProjects = filter === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">My Creative <span className="text-blue-600">Masterpieces</span></h2>
          <p className="text-gray-600 max-w-xl mx-auto">Explore a curated selection of my finest work, from bold logos to captivating marketing materials.</p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${filter === cat ? "bg-blue-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-blue-50"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-blue-600/90 flex flex-col items-center justify-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-blue-200 text-sm font-semibold uppercase tracking-wider mb-2">{project.category}</span>
                    <h3 className="text-white text-2xl font-bold text-center mb-4">{project.title}</h3>
                    <p className="text-blue-50 text-center text-sm">{project.description}</p>
                    <button className="mt-6 p-3 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Elevating Brands with <span className="text-blue-600">Expert Services</span></h2>
          <p className="text-gray-600 max-w-xl mx-auto">Comprehensive design solutions tailored to meet your business objectives and captivate your audience.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-blue-50 rounded-3xl hover:bg-blue-600 group transition-all duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 bg-white text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-blue-500 group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-white">{service.title}</h3>
              <p className="text-gray-600 group-hover:text-blue-50 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section id="testimonials" className="py-24 bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Client <span className="text-blue-400">Success Stories</span></h2>
          <p className="text-blue-200/80">Hear from those who have experienced the E-kLASS difference.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div 
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-blue-800/50 backdrop-blur-sm p-10 md:p-16 rounded-[40px] border border-blue-700/50 relative"
            >
              <Quote className="absolute top-8 left-8 w-12 h-12 text-blue-400/20" />
              <p className="text-xl md:text-2xl text-blue-100 font-medium leading-relaxed mb-10 italic">
                "{TESTIMONIALS[current].text}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={TESTIMONIALS[current].avatar} 
                  alt={TESTIMONIALS[current].name} 
                  className="w-16 h-16 rounded-full border-2 border-blue-400"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-lg">{TESTIMONIALS[current].name}</h4>
                  <p className="text-blue-400 text-sm">{TESTIMONIALS[current].role}</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center gap-4 mt-10">
            <button onClick={prev} className="p-3 bg-blue-700 rounded-full hover:bg-blue-600 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={next} className="p-3 bg-blue-700 rounded-full hover:bg-blue-600 transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Valid email required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setErrors({});
      // Simulate API call
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Let's Create Something <span className="text-blue-600">Great Together</span></h2>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              Ready to start your next design project? Get in touch today and let's bring your brand to life.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Email Me</h4>
                  <p className="text-gray-600 text-sm">nwolisalane048@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <WhatsApp className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">WhatsApp</h4>
                  <p className="text-gray-600 text-sm">Connect instantly</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              {[Facebook, Instagram, WhatsApp].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-8 md:p-12 rounded-[40px]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full pl-12 pr-4 py-4 bg-white border rounded-2xl outline-none transition-all ${errors.name ? "border-red-400 focus:ring-2 ring-red-100" : "border-gray-200 focus:border-blue-600 focus:ring-2 ring-blue-100"}`}
                    placeholder="Enter your name"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1 ml-2">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-12 pr-4 py-4 bg-white border rounded-2xl outline-none transition-all ${errors.email ? "border-red-400 focus:ring-2 ring-red-100" : "border-gray-200 focus:border-blue-600 focus:ring-2 ring-blue-100"}`}
                    placeholder="name@example.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1 ml-2">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Project Details</label>
                <textarea 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full p-4 bg-white border rounded-2xl outline-none transition-all ${errors.message ? "border-red-400 focus:ring-2 ring-red-100" : "border-gray-200 focus:border-blue-600 focus:ring-2 ring-blue-100"}`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && <p className="text-red-500 text-xs mt-1 ml-2">{errors.message}</p>}
              </div>

              <button 
                type="submit"
                disabled={submitted}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${submitted ? "bg-green-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/20 active:scale-95"}`}
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Sent Successfully!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
          <span className="font-bold text-gray-900">E-kLASS Computer Academy</span>
        </div>
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Nwodo Kamsi Victus. All rights reserved.</p>
        <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest font-medium">Crafting Digital Excellence</p>
      </div>
    </footer>
  );
};

const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-2xl z-40 hover:bg-blue-500 transition-colors"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-blue-950 flex flex-col items-center justify-center gap-4">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full"
        />
        <p className="text-blue-100 font-medium tracking-widest animate-pulse">E-kLASS</p>
      </div>
    );
  }

  return (
    <div className="bg-white selection:bg-blue-100 selection:text-blue-600 font-sans">
      <Nav />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
