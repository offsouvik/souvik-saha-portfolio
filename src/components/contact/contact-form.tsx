"use client";

import { type FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const fields = [
  { name: "name", label: "Your Name", type: "text", required: true, placeholder: "Jane Doe" },
  { name: "email", label: "Email Address", type: "email", required: true, placeholder: "jane@company.com" },
  { name: "company", label: "Company / Business", type: "text", required: false, placeholder: "Acme Inc." },
  { name: "website", label: "Current Website", type: "url", required: false, placeholder: "https://yourbrand.com" },
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setSubmitted(true);
  }

  return (
    <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/15">
      {submitted ? (
        <div className="py-12 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-400 border border-emerald-400/30">
            <CheckCircle2 size={28} />
          </div>
          <h3 className="mt-6 text-2xl font-bold text-white">Message Delivered</h3>
          <p className="mt-3 text-sm text-white/60 max-w-sm mx-auto">
            Thank you for reaching out. I review all inquiries thoroughly and will be in touch within 24 hours.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-8 rounded-full border border-white/20 px-6 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {fields.map((field) => (
              <label key={field.name} className="grid gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
                <span>
                  {field.label}
                  {field.required && <span className="text-cyan-400"> *</span>}
                </span>
                <input
                  required={field.required}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="h-12 rounded-xl border border-white/15 bg-white/5 px-4 text-sm font-normal text-white placeholder:text-white/30 outline-none transition-all focus:border-cyan-400 focus:bg-white/[0.08] focus:ring-1 focus:ring-cyan-400"
                />
              </label>
            ))}
          </div>

          <label className="grid gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
            <span>What do you need help with?<span className="text-cyan-400"> *</span></span>
            <select
              name="service"
              required
              defaultValue=""
              className="h-12 rounded-xl border border-white/15 bg-[#121212] px-4 text-sm font-normal text-white outline-none transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            >
              <option value="" disabled>Select primary service</option>
              <option value="web-dev">Website Development</option>
              <option value="web-app">Web Applications & Products</option>
              <option value="creative-3d">3D WebGL / Creative Experience</option>
              <option value="social-media">Social Media Strategy & Management</option>
              <option value="digital-marketing">Digital Marketing & Growth Campaigns</option>
              <option value="full-partnership">Full Build & Growth Partnership</option>
            </select>
          </label>

          <label className="grid gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
            <span>Project Details <span className="text-cyan-400">*</span></span>
            <textarea
              required
              name="message"
              rows={4}
              placeholder="Tell me about your business, timeline, and what you aim to achieve..."
              className="rounded-xl border border-white/15 bg-white/5 p-4 text-sm font-normal text-white placeholder:text-white/30 outline-none transition-all focus:border-cyan-400 focus:bg-white/[0.08] focus:ring-1 focus:ring-cyan-400 resize-y"
            />
          </label>

          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]"
          >
            <span>Send Inquiry</span>
            <ArrowUpRight size={16} />
          </button>
        </form>
      )}
    </div>
  );
}
