'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Menu, X, Phone, Instagram, Mail, MapPin, CheckCheck, 
  ArrowRight, Loader2, ImageOff, Sparkles, ShieldCheck, 
  Truck, Smile, Users, Zap, Heart, Eye, Palette
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: bold
// Depth Treatment: textured
// Divider Style: D-QUOTE
// Typography Personality: oversized

// reveal variants assignment:
// hero: V5 (Vertical Slant Reveal)
// features: V4 (Staggered Children)
// gallery: V6 (Clip Wipe)
// products: P-STAGGER (V2 Scale Reveal)
// about: V9 (Counter Rise)
// testimonials: V7 (Stagger Cascade with Blur)
// contact: V1 (Fade + Slide Up)

const brand = {
  name: "Dhawn Beauty Castle",
  tagline: "All Your Beauty Needs",
  description: "Bespoke skincare solutions engineered for melanin-rich skin, specializing in acne recovery, hyperpigmentation, and radiant evening of skin tone.",
  industry: "beauty",
  region: "nigeria",
  currency: "₦"
};

const contact = {
  whatsapp: "2348067493641",
  instagram: "dhawnbeautycastle",
  email: "",
  address: "Lagos, Nigeria"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1528874077309-9e15912d86e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  gallery: [
    "https://images.unsplash.com/photo-1642505172841-d25d158baf9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1623071278501-c65aa50c2144?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1543422018-8e0700ca5eec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  ]
};

const products = [
  { name: "Melanin Glow Serum", price: "₦15,000", description: "A potent blend of Vitamin C and Ferulic acid to brighten and protect.", url: "https://images.unsplash.com/photo-1737424065587-60043523ddea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
  { name: "Acne Erase Cleanser", price: "₦8,500", description: "Gentle exfoliating wash that targets deep-seated impurities without stripping.", url: "https://images.unsplash.com/photo-1605682779156-9351f4899cac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
  { name: "Hyperpigmentation Night Cream", price: "₦22,500", description: "Repair and resurface your skin while you sleep for a flawless morning glow.", url: "https://images.unsplash.com/photo-1623071279921-a02cab7f80fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
  { name: "Glow-Up Starter Kit", price: "₦45,000", description: "Complete 4-step routine for those beginning their skincare journey.", url: "https://images.unsplash.com/photo-1543422018-8e0700ca5eec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" }
];

const features = [
  { title: "Melanin Focused", description: "Formulations specifically designed for the unique needs of dark skin tones.", icon: Heart },
  { title: "Visible Results", description: "Clinically inspired products that target hyperpigmentation effectively.", icon: Eye },
  { title: "Lagos Fast-Track", description: "Sharp delivery across Lagos and nationwide shipping available.", icon: Truck }
];

const stats = [
  { number: "500+", label: "Concerns Corrected" },
  { number: "2k+", label: "Community Members" },
  { number: "100%", label: "Safe Formulations" }
];

const testimonials = [
  { name: "Chinwe Adewale", role: "Verified Customer", text: "The dark spots I had for years are finally fading. My confidence is through the roof!" },
  { name: "Amaka Okafor", role: "Verified Customer", text: "Finally, a brand that understands Lagos weather and how it affects my skin." },
  { name: "Tunde Bello", role: "Verified Customer", text: "Their acne kit is the only thing that worked after trying so many different products." }
];

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image 
      src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} 
    />
  );
}

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

const useTypewriter = (text: string, speed = 60) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { 
        setDisplay(prev => prev + text.charAt(i)); 
        i++; 
      } else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return display;
};

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const typedHero = useTypewriter("RADIANCE REFINED");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroRev = useScrollReveal();
  const featRev = useScrollReveal();
  const gallRev = useScrollReveal();
  const prodRev = useScrollReveal();
  const abRev = useScrollReveal();
  const testRev = useScrollReveal();
  const contRev = useScrollReveal();

  return (
    <main className="relative overflow-x-hidden">
      {/* Header */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[var(--primary)]/95 backdrop-blur-xl py-4 shadow-2xl border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex flex-col">
            <span className="font-heading text-2xl md:text-3xl font-bold tracking-tighter leading-none text-white italic">DHAWN</span>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] font-black">Beauty Castle</span>
          </a>
          
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Shop', 'Results', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-white/60 hover:text-[var(--accent)] text-sm font-medium tracking-widest uppercase transition-colors">
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-[var(--accent)] text-black px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-[var(--accent)]/20">
              Get Glowing
            </a>
          </div>

          <button onClick={() => setMenuOpen(true)} className="md:hidden text-white">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[60] bg-[var(--primary)] transition-transform duration-500 transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center">
            <span className="font-heading text-2xl italic font-bold">DHAWN</span>
            <button onClick={() => setMenuOpen(false)}><X size={30} /></button>
          </div>
          <div className="flex flex-col gap-8 mt-20">
            {['Home', 'Shop', 'Results', 'Contact'].map(link => (
              <a key={link} onClick={() => setMenuOpen(false)} href={`#${link.toLowerCase()}`} className="text-5xl font-heading font-bold italic">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section (HR-D) */}
      <section id="home" ref={heroRev.ref} className="min-h-screen flex flex-col justify-center bg-black px-6 overflow-hidden relative">
        <div className="absolute inset-0 opacity-40 grayscale mix-blend-overlay pointer-events-none">
          <SafeImage src={IMAGES.hero} alt="Radiant Melanin Skin" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 texture-overlay" />
        
        <div className="relative z-10 max-w-6xl mx-auto w-full pt-20">
          <h1 className={`font-heading text-[15vw] md:text-[10vw] font-black text-white leading-none tracking-tighter uppercase italic transition-all duration-1000 ${heroRev.isVisible ? 'opacity-100 skew-y-0' : 'opacity-0 skew-y-3'}`}>
            {typedHero}<span className="text-[var(--accent)] animate-pulse">_</span>
          </h1>
          <div className="mt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-10 border-t border-white/10 pt-10">
            <p className="text-white/40 text-lg md:text-xl max-w-lg leading-relaxed font-light">
              Bespoke skincare solutions engineered for <span className="text-white">melanin-rich skin</span>. We specialize in acne recovery, hyperpigmentation, and the radiant evening of skin tone.
            </p>
            <a href="#products" className="bg-[var(--accent)] text-black px-12 py-5 font-black text-lg
              shadow-[8px_8px_0px_rgba(255,255,255,0.1)]
              hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_rgba(255,255,255,0.1)]
              transition-all duration-300 shrink-0 rounded-sm uppercase tracking-widest">
              Shop the Collection
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="py-24 px-8 text-center bg-[var(--secondary)] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent)/10,transparent_70%)]" />
        <p className="relative font-heading text-4xl md:text-6xl font-light italic text-white max-w-4xl mx-auto leading-tight">
          &ldquo;Your skin is a masterpiece; we just provide the light.&rdquo;
        </p>
        <p className="relative text-[var(--accent)] mt-8 text-xs tracking-[0.6em] uppercase font-bold">Dhawn Beauty Castle</p>
      </div>

      {/* Features (F-BENTO) */}
      <section id="features" ref={featRev.ref} className="py-32 px-6 bg-[var(--primary)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`md:col-span-2 bg-[var(--secondary)] rounded-3xl p-12 border border-white/5 relative overflow-hidden group transition-all duration-700 ${featRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/10 blur-[100px] pointer-events-none" />
              <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/15 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Heart className="text-[var(--accent)]" size={32} />
              </div>
              <h2 className="font-heading text-5xl md:text-6xl font-bold text-white italic mb-6">Melanin Focused</h2>
              <p className="text-white/50 text-xl max-w-md leading-relaxed">
                Most skincare ignores the complexity of rich skin. We embrace it. Our formulations target the unique melanin pathways to ensure brightness without irritation.
              </p>
            </div>
            
            {features.slice(1).map((f, i) => (
              <div key={i} className={`bg-white/5 rounded-3xl p-10 border border-white/5 flex flex-col justify-end transition-all duration-700 delay-300 ${featRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="mb-auto">
                   <f.icon className="text-[var(--accent)] mb-6" size={32} />
                </div>
                <h3 className="font-heading text-3xl font-bold text-white italic">{f.title}</h3>
                <p className="text-white/40 mt-3 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery (Bonus - Editorial Mosaic) */}
      <section ref={gallRev.ref} className="py-20 px-6 bg-[var(--secondary)] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-6xl md:text-8xl font-black text-white/5 uppercase mb-[-1.5rem] tracking-tighter leading-none select-none">Editorial</h2>
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 transition-all duration-1000 ${gallRev.isVisible ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'}`}>
            <div className="md:col-span-2 h-[500px] relative rounded-3xl overflow-hidden shadow-2xl">
              <SafeImage src={IMAGES.gallery[0]} alt="Skincare Glow" fill className="object-cover" />
            </div>
            <div className="h-[500px] relative rounded-3xl overflow-hidden shadow-2xl">
              <SafeImage src={IMAGES.gallery[1]} alt="Skincare Texture" fill className="object-cover" />
            </div>
            <div className="h-[500px] relative rounded-3xl overflow-hidden shadow-2xl">
              <SafeImage src={IMAGES.gallery[2]} alt="Beauty Castle" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Products (P-STAGGER) */}
      <section id="shop" ref={prodRev.ref} className="py-32 px-6 bg-[var(--primary)] overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-32">
          <div className="text-center mb-20">
            <h2 className="font-heading text-6xl md:text-7xl font-bold text-white italic">Best Sellers</h2>
            <div className="h-1 w-20 bg-[var(--accent)] mx-auto mt-4" />
          </div>
          {products.map((p, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-24 transition-all duration-1000 ${prodRev.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <div className="w-full md:w-1/2 relative group">
                <div className="aspect-square relative rounded-[3rem] overflow-hidden shadow-3xl">
                  <SafeImage src={p.url} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/60 to-transparent" />
                </div>
                <div className={`absolute -bottom-10 ${i % 2 === 0 ? '-right-10' : '-left-10'} w-3/4 h-3/4 bg-[var(--accent)]/5 rounded-full blur-[100px] -z-10`} />
              </div>
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                <span className="font-sans text-[var(--accent)] text-sm font-bold tracking-[0.4em] uppercase mb-4 block">0{i + 1} — Collection</span>
                <h3 className="font-heading text-5xl md:text-6xl font-bold text-white leading-tight italic">{p.name}</h3>
                <p className="text-white/50 mt-6 text-xl leading-relaxed font-light">{p.description}</p>
                <div className="mt-10 flex flex-col sm:flex-row items-center gap-8">
                  <span className="text-4xl font-black text-white">{p.price}</span>
                  <a href="#contact" className="bg-white text-black px-10 py-4 rounded-full font-bold uppercase text-sm tracking-widest hover:bg-[var(--accent)] transition-all">
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section (V9 Stats) */}
      <section id="about" ref={abRev.ref} className="py-32 px-6 bg-[var(--secondary)] relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="font-heading text-6xl md:text-7xl font-bold text-white italic mb-8">Our Castle, Your Confidence</h2>
              <p className="text-white/60 text-xl leading-relaxed font-light mb-10">
                Based in the heart of Lagos, Dhawn Beauty Castle was born from a passion to empower women of color. We believe that everyone deserves skin that feels like a masterpiece. Our treatments are not just products; they are engineering marvels for the skin.
              </p>
              <div className="grid grid-cols-2 gap-8">
                {stats.map((s, i) => (
                  <div key={i} className={`transition-all duration-1000 ${abRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                    <p className="font-heading text-5xl font-black text-[var(--accent)] italic">{s.number}</p>
                    <p className="text-white/40 text-xs uppercase tracking-[0.3em] font-bold mt-2">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border border-white/5">
              <SafeImage src="https://images.unsplash.com/photo-1508771400123-e194ad75c0e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="Melanin Beauty" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (T-MASONRY) */}
      <section id="results" ref={testRev.ref} className="py-32 px-6 bg-[var(--primary)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-6xl md:text-7xl font-bold text-white text-center mb-20 italic">Real Glow Stories</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {testimonials.map((t, i) => (
              <div key={i} className={`break-inside-avoid bg-white/5 p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group transition-all duration-700 ${testRev.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <p className="text-white/80 text-xl leading-relaxed italic relative z-10">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-10 relative z-10">
                  <div>
                    <p className="font-heading font-bold text-white text-lg">{t.name}</p>
                    <p className="text-[var(--accent)] text-xs font-black uppercase tracking-widest mt-1">{t.role}</p>
                  </div>
                  <div className="flex gap-1.5">
                    {[1,2,3].map(n => <div key={n} className="w-2 h-2 rounded-full bg-[var(--accent)]/40" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section (C4) */}
      <section id="contact" ref={contRev.ref} className={`py-32 px-6 bg-[var(--accent)] transition-all duration-1000 ${contRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="font-heading text-[12vw] md:text-[8vw] font-black text-black leading-none mb-12 italic uppercase tracking-tighter">
              Start Your Skin Journey
            </h2>
            <div className="space-y-8 border-l-8 border-black/10 pl-10">
              <a href={`https://wa.me/${contact.whatsapp}`} className="flex items-center gap-4 text-black hover:scale-105 transition-transform group">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white"><Phone size={20} /></div>
                <p className="text-black font-black text-2xl">+{contact.whatsapp}</p>
              </a>
              <a href={`https://instagram.com/${contact.instagram}`} className="flex items-center gap-4 text-black hover:scale-105 transition-transform group">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white"><Instagram size={20} /></div>
                <p className="text-black font-black text-2xl">@{contact.instagram}</p>
              </a>
              <div className="flex items-center gap-4 text-black">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white"><MapPin size={20} /></div>
                <p className="text-black font-black text-2xl">{contact.address}</p>
              </div>
            </div>
          </div>
          
          <div className="w-full">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-heading text-4xl italic font-bold text-white tracking-tighter">DHAWN</span>
            <span className="font-sans text-xs uppercase tracking-[0.5em] text-[var(--accent)] font-black mt-2">Beauty Castle</span>
          </div>
          
          <div className="flex gap-12">
            {['Home', 'Shop', 'Results', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-white/40 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold">
                {link}
              </a>
            ))}
          </div>

          <div className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-black">
            © {new Date().getFullYear()} DHAWN BEAUTY CASTLE. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </main>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-black rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="w-24 h-24 rounded-full bg-[var(--accent)]/20 flex items-center justify-center mb-8 border border-[var(--accent)]/30">
          <CheckCheck size={40} className="text-[var(--accent)]" />
        </div>
        <h3 className="font-heading text-4xl font-bold text-white mb-4 italic">Message Received</h3>
        <p className="text-white/50 text-lg max-w-sm">Our skin experts are reviewing your request. We will be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-black p-10 md:p-14 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent)]/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="relative z-10">
        <h3 className="font-heading text-4xl font-bold text-white mb-10 italic">Inquiry Form</h3>
        <div className="space-y-5">
          {(['name', 'email', 'phone'] as const).map(field => (
            <input
              key={field}
              type={field === 'email' ? 'email' : 'text'}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
              required={field !== 'phone'}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 text-sm outline-none transition-all focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
            />
          ))}
          <textarea 
            rows={4} 
            placeholder="Tell us about your skin concerns..."
            value={form.message}
            onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 text-sm outline-none resize-none transition-all focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>
        <button type="submit" disabled={loading}
          className="w-full mt-10 bg-[var(--accent)] text-black py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-60 flex justify-center items-center gap-3 group">
          {loading ? <Loader2 className="animate-spin" size={20} /> : (
            <>Send Message <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" /></>
          )}
        </button>
      </div>
    </form>
  );
}