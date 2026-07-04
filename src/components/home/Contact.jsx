import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiSend,
} from "react-icons/fi";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../../services/firebase";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const contactInfo = [
    {
      icon: FiMail,
      label: "Email",
      value: "abhinavadabala.99@gmail.com",
      href: "mailto:abhinavadabala.99@gmail.com",
    },
    {
      icon: FiPhone,
      label: "Phone",
      value: "+91 9459589555",
      href: "tel:+919459589555",
    },
    {
      icon: FiMapPin,
      label: "Location",
      value: "Andhra Pradesh, India",
      href: "#",
    },
    {
      icon: FiGithub,
      label: "GitHub",
      value: "ABHINAV559966",
      href: "https://github.com/ABHINAV559966",
    },
    {
      icon: FiLinkedin,
      label: "LinkedIn",
      value: "abhinav-adabala",
      href: "https://www.linkedin.com/in/abhinav-adabala/",
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    setIsLoading(true);

    try {
      await addDoc(collection(db, "contactMessages"), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        status: "unread",
        createdAt: serverTimestamp(),
      });

      toast.success("Message sent successfully. I will get back to you soon.");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact message error:", error);
      toast.error("Unable to send the message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            Get in <span className="text-cyan-400">Touch</span>
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-gradient-to-r from-cyan-400 to-transparent" />
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-8 text-2xl font-bold text-white">
              Let's connect
            </h3>

            <div className="space-y-4">
              {contactInfo.map((info) => {
                const IconComponent = info.icon;

                return (
                  <a
                    key={info.label}
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel={info.href.startsWith("http") ? "noreferrer" : undefined}
                    className="flex items-center gap-4 rounded-lg border border-slate-700 bg-slate-900/50 p-4 transition hover:border-cyan-400/50 hover:bg-slate-900/70"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                      <IconComponent size={20} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-400">
                        {info.label}
                      </p>
                      <p className="font-semibold text-white">{info.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <FormField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              error={errors.name}
            />

            <FormField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              error={errors.email}
            />

            <FormField
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              error={errors.subject}
            />

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Message <span className="text-red-400">*</span>
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                rows={5}
                className={`w-full rounded-lg border bg-slate-900/50 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 ${
                  errors.message
                    ? "border-red-500"
                    : "border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                }`}
              />

              {errors.message && (
                <p className="mt-1 text-sm text-red-400">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiSend size={18} />
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-300">
        {label} <span className="text-red-400">*</span>
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-slate-900/50 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 ${
          error
            ? "border-red-500"
            : "border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
        }`}
      />

      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}

export default Contact;