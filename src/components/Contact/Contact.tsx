import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";

import {
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Github,
  Linkedin,
  Clock,
  Instagram,
} from "lucide-react";

import SectionHeading from "@/components/UI/SectionHeading";

import profile from "@/data/profile.json";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};

    if (!form.name.trim()) {
      e.name = "Name is required";
    }

    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      e.email = "Please enter a valid email";
    }

    if (!form.subject.trim()) {
      e.subject = "Subject is required";
    }

    if (!form.message.trim()) {
      e.message = "Message is required";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      await emailjs.send(
        "service_kwlob04",
        "template_ncrsthw",
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        "qKxCJ4JcaxU68SGdY"
      );

      setSent(true);

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setSent(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative z-10 section-pad px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Contact"
          subtitle="Get In Touch"
          icon={<Mail size={14} className="text-primary" />}
        />

        <div className="grid lg:grid-cols-5 gap-6">
                    <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="glass-card p-6">
              <h3 className="text-xl font-display font-semibold text-white mb-2">
                Let's Build Together
              </h3>

              <p className="text-muted text-sm mb-6">
                Have an AI project in mind? Looking for an AI Engineer,
                Machine Learning Engineer or Agentic AI Developer?
                I'm currently open to internships, full-time opportunities,
                freelance work and exciting collaborations.
              </p>

              <div className="space-y-4">

                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 text-muted hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                    <Mail size={18} className="text-primary" />
                  </div>

                  <span className="text-sm">
                    {profile.email}
                  </span>
                </a>

                <div className="flex items-center gap-3 text-muted">
                  <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center">
                    <MapPin
                      size={18}
                      className="text-secondary"
                    />
                  </div>

                  <span className="text-sm">
                    {profile.location} • Remote Friendly
                  </span>
                </div>

                <div className="flex items-center gap-3 text-muted">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                    <Clock
                      size={18}
                      className="text-accent"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>

                    <span className="text-sm">
                      Available Now
                    </span>
                  </div>
                </div>

              </div>

              <div className="flex gap-3 mt-6">

                {[
                  {
                    Icon: Github,
                    url: profile.social[0].url,
                    label: "GitHub",
                  },

                  {
                    Icon: Linkedin,
                    url: profile.social[1].url,
                    label: "LinkedIn",
                  },

                  {
                    Icon: Instagram,
                    url: profile.social[2].url,
                    label: "Instagram",
                  },
                ].map(({ Icon, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-11 h-11 rounded-xl glass flex items-center justify-center text-muted hover:text-white hover:scale-110 transition-all"
                  >
                    <Icon size={20} />
                  </a>
                ))}

              </div>

            </div>

          </motion.div>
                    <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card p-6 md:p-8 space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">

                <div>
                  <label
                    htmlFor="name"
                    className="text-sm text-muted mb-1.5 block"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl glass text-sm text-white placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />

                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-sm text-muted mb-1.5 block"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl glass text-sm text-white placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />

                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="text-sm text-muted mb-1.5 block"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      subject: e.target.value,
                    })
                  }
                  placeholder=""
                  className="w-full px-4 py-3 rounded-xl glass text-sm text-white placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-primary/50"
                />

                {errors.subject && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-sm text-muted mb-1.5 block"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows={6}
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                  placeholder="message..."
                  className="w-full px-4 py-3 rounded-xl glass text-sm text-white placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
                />

                {errors.message && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.message}
                  </p>
                )}
              </div>
                           <motion.button
  type="submit"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
  className="group w-full rounded-2xl bg-gradient-to-r from-primary to-secondary px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.35)] disabled:cursor-not-allowed disabled:opacity-70"
>
  {loading ? (
    <div className="flex items-center justify-center gap-3">
      <svg
        className="h-5 w-5 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-90"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
        />
      </svg>

      <span>Sending...</span>
    </div>
  ) : sent ? (
    <div className="flex items-center justify-center gap-2">
      <CheckCircle size={18} />
      <span>Connected!</span>
    </div>
  ) : (
    <div className="flex items-center justify-center gap-2">
      <Send
        size={18}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
      <span>Let's Connect</span>
    </div>
  )}
</motion.button>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-green-500/20 bg-green-500/10 p-4"
                >
                  {sent && (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3"
  >
    <CheckCircle size={18} className="text-emerald-400" />
    <p className="text-sm font-medium text-white">
      Message sent successfully!
    </p>
  </motion.div>
)}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
        