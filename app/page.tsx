'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Menu, X, Phone, Mail, MapPin, CheckCheck, Loader2, ArrowRight, 
  ShieldCheck, MessageSquare, Timer, Palette, ImageOff, Instagram,
  ChevronDown, Heart, Users, Award
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: refined

const brief = {
  brand: {
    name: "Dhawn Beauty Castle",
    tagline: "All Your Beauty Needs",
    description: "Expertly formulated skincare for melanin-rich skin, specializing in correcting acne, hyperpigmentation, and uneven skin tones for a radiant, healthy glow.",
    industry: "beauty",
    region: "nigeria",
    currency: "₦"
  },
  colors: {
    primary: "#F4C2C2",
    secondary: "#2D1B1B",
    accent: "#D4AF37"
  },
  heroImage: {
    url: "https://images.unsplash.com/photo-1743871698163-a2e470d8eac7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  }
};

const IMAGES = {
  products: [
    "https://images.unsplash.com/photo-1695972235483-bafa50d3bcca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1642505172841-d25d158baf9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1581016327131-6cf17ab1f2c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1594325624708-75a0a6cf806f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  ]
};

// --- Custom Hooks ---

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-[var(--secondary)] to-[var(--accent)]/10 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

const Divider = () => (
  <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />
    <span className="text-[var(--accent)] font-mono text-[10px] tracking-[0.4em] uppercase whitespace-nowrap opacity-70">
      {brief.brand.tagline}
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />
  </div>
);

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[var(--secondary)]/95 backdrop-blur-xl py-4 shadow-xl border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-heading text-2xl font-black text-white tracking-tighter uppercase leading-none">Dhawn</span>
            <span className="text-[var(--accent)] text-[10px] tracking-[0.3em] font-bold uppercase -mt-0.5">Beauty Castle</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Shop', 'Results', 'Consultation'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-white/70 text-xs font-bold uppercase tracking-widest hover:text-[var(--accent)] transition-colors">
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-[var(--accent)] text-[var(--secondary)] px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-tighter hover:brightness-110 transition-all">
              Book Now
            </a>
          </div>

          <button onClick={() => setMobileMenu(true)} className="md:hidden text-white">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-500 ${mobileMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-[var(--secondary)] p-10 transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
          <button onClick={() => setMobileMenu(false)} className="absolute top-8 right-8 text-white">
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8 mt-20">
            {['Home', 'Shop', 'Results', 'Consultation'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="text-3xl font-heading font-black text-white">
                {link}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileMenu(false)} className="mt-8 bg-[var(--accent)] text-[var(--secondary)] p-4 text-center rounded-xl font-black text-lg">
              Book a Consultation
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section - Pattern HR-A */}
      <section id="home" className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[var(--secondary)] via-[var(--secondary)]/90 to-[var(--primary)]/20 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-[var(--accent)]/8 rounded-full blur-[120px] pointer-events-none animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 max-w-4xl max-h-[60vh] rounded-[4rem] overflow-hidden rotate-3 pointer-events-none">
          <SafeImage src={brief.heroImage.url} alt="Dhawn Beauty" fill className="object-cover" priority />
        </div>

        <div className="relative z-10 text-center max-w-5xl animate-fadeIn">
          <h1 className="font-heading text-6xl md:text-[7.5rem] font-black text-white leading-[0.9] tracking-tighter">
            Radiant Skin <br />
            <span className="text-[var(--primary)] italic">for Melanin</span>
          </h1>
          <p className="text-white/50 mt-8 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Luxury skincare tailored for melanin-rich skin. Expertly corrected hyperpigmentation, acne, and uneven tones for your healthiest glow yet.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
            <a href="#products" className="bg-[var(--accent)] text-[var(--secondary)] px-12 py-5 font-black text-base hover:brightness-110 hover:scale-105 transition-all duration-300 rounded-full shadow-2xl">
              Shop Best Sellers
            </a>
            <a href="#gallery" className="border border-white/20 text-white px-12 py-5 font-bold text-base hover:bg-white/5 transition-all duration-300 rounded-full backdrop-blur-sm">
              See Real Results
            </a>
          </div>
        </div>
      </section>

      <Divider />

      {/* Features - Pattern F-STICKY */}
      <section id="features" className="py-28 bg-[var(--secondary)] px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white">Why Dhawn Beauty?</h2>
            <div className="w-20 h-1 bg-[var(--accent)] mx-auto mt-6" />
          </div>
          <div className="space-y-6">
            {[
              { title: "Melanin Expert", desc: "Formulas optimized for dark skin concerns like hyperpigmentation and uneven tones.", icon: <Palette size={24}/> },
              { title: "Fast Results", desc: "Clinically proven ingredients that show visible changes in 21 days of consistent use.", icon: <Timer size={24}/> },
              { title: "Safe Formulations", desc: "Hydroquinone-free products that respect and strengthen your skin's natural barrier.", icon: <ShieldCheck size={24}/> },
              { title: "Direct Consultation", desc: "Get expert skincare advice via WhatsApp for personalized routines that actually work.", icon: <MessageSquare size={24}/> }
            ].map((f, idx) => {
              const { ref, isVisible } = useScrollReveal();
              return (
                <div key={idx} ref={ref} className={`sticky transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ top: `${100 + idx * 30}px` }}>
                  <div className="bg-[#3D2828] rounded-3xl p-10 border border-white/10 shadow-2xl flex flex-col md:flex-row items-start md:items-center gap-8 group hover:border-[var(--accent)]/40 transition-colors">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/15 flex items-center justify-center shrink-0 group-hover:bg-[var(--accent)] transition-colors duration-500">
                      <div className="text-[var(--accent)] group-hover:text-[var(--secondary)] transition-colors">
                        {f.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-heading text-3xl font-bold text-white">{f.title}</h3>
                        <span className="text-[var(--accent)]/20 font-mono text-xl font-black">0{idx + 1}</span>
                      </div>
                      <p className="text-white/50 text-lg leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products - Pattern P-ASYMMETRIC */}
      <section id="products" className="py-28 px-6 bg-[var(--primary)]/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-6">
            <div className="max-w-xl">
              <h2 className="font-heading text-6xl md:text-7xl font-black text-white leading-none">Featured Collections</h2>
              <p className="text-white/40 mt-6 text-xl">Shop our top-rated solutions for acne and hyperpigmentation.</p>
            </div>
            <a href="#contact" className="text-[var(--accent)] font-mono text-xs tracking-widest uppercase border-b border-[var(--accent)]/30 pb-2 hover:border-[var(--accent)] transition-all">View All Products →</a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main Featured Product */}
            <div className="md:col-span-7 group relative rounded-[3rem] overflow-hidden bg-[var(--secondary)] shadow-2xl">
              <div className="relative h-[550px] w-full">
                <SafeImage src={IMAGES.products[0]} alt="Melanin Glow Serum" fill className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--secondary)] via-[var(--secondary)]/20 to-transparent" />
                <div className="absolute bottom-0 p-12 w-full">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-5xl font-black text-white">Melanin Glow <br/>Serum</h3>
                    <div className="text-right">
                      <p className="text-[var(--accent)] text-3xl font-black">₦15,000</p>
                    </div>
                  </div>
                  <p className="text-white/60 mt-4 text-lg max-w-sm line-clamp-2">Powerful hyperpigmentation fader designed specifically for melanin-rich skin profiles.</p>
                  <a href="#contact" className="inline-block mt-8 bg-white text-[var(--secondary)] px-10 py-4 rounded-full font-black text-sm uppercase tracking-tighter hover:bg-[var(--accent)] transition-colors">Order Now</a>
                </div>
              </div>
            </div>

            {/* Grid of Others */}
            <div className="md:col-span-5 flex flex-col gap-6">
              {[
                { name: "Radiance Cleansing Foam", price: "₦8,500", img: IMAGES.products[1] },
                { name: "Tone Correcting Cream", price: "₦22,000", img: IMAGES.products[2] }
              ].map((p, i) => (
                <div key={i} className="group relative h-[263px] rounded-[2.5rem] overflow-hidden bg-[var(--secondary)]">
                  <SafeImage src={p.img} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--secondary)] via-transparent to-transparent" />
                  <div className="absolute bottom-0 p-8 w-full flex justify-between items-end">
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-white">{p.name}</h3>
                      <p className="text-[var(--accent)] font-black mt-1 text-xl">{p.price}</p>
                    </div>
                    <a href="#contact" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-[var(--secondary)] transition-all">
                      <ArrowRight size={20} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery - Bespoke Editorial Transformation */}
      <section id="results" className="py-28 px-6 bg-[var(--secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <h2 className="font-heading text-6xl md:text-7xl font-black text-white leading-none">Real Glow <br/><span className="text-[var(--accent)] underline decoration-white/10 underline-offset-8">Transformations</span></h2>
            <p className="text-white/40 text-xl leading-relaxed">
              Before and after transformations from our community of 500+ success stories. Integrated bespoke editorial results highlighting hyperpigmentation progress on melanin-rich skin.
            </p>
          </div>

          <div className="columns-1 md:columns-2 gap-8 space-y-8">
            {[
              { src: IMAGES.products[3], title: "Evening Skin Tone", label: "Weeks 1-4 Progress" },
              { src: brief.heroImage.url, title: "Radiance Restore", label: "Full Routine Results" },
              { src: IMAGES.products[0], title: "Acne Clear-up", label: "Melanin Glow Focus" },
              { src: IMAGES.products[2], title: "Spot Correction", label: "Tone Cream Impact" }
            ].map((res, i) => (
              <div key={i} className="break-inside-avoid relative group overflow-hidden rounded-[2rem] border border-white/5">
                <SafeImage src={res.src} alt={res.title} width={600} height={800} className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000 scale-[1.02] group-hover:scale-100" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                  <span className="text-[var(--accent)] font-mono text-xs tracking-widest uppercase mb-2">{res.label}</span>
                  <h3 className="font-heading text-3xl font-bold text-white">{res.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About - Pattern C-ASYMMETRIC Style */}
      <section id="consultation" className="py-28 px-6 bg-[var(--primary)] text-[var(--secondary)] overflow-hidden relative">
        <div className="absolute -right-20 -bottom-20 w-[40rem] h-[40rem] bg-white/30 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden shadow-[30px_30px_0px_var(--secondary)]">
              <SafeImage src="https://images.unsplash.com/photo-1708850877946-e756a333d78f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="Dhawn Castle" fill className="object-cover" />
            </div>
            <div className="absolute -top-10 -right-10 bg-[var(--secondary)] text-white p-10 rounded-full w-40 h-40 flex flex-col items-center justify-center text-center rotate-12">
              <span className="text-3xl font-black font-heading leading-none">100%</span>
              <span className="text-[8px] uppercase tracking-widest mt-1">Natural Focus</span>
            </div>
          </div>
          <div>
            <h2 className="font-heading text-6xl font-black leading-[0.95] mb-8">The Castle of Beauty</h2>
            <p className="text-[var(--secondary)]/70 text-xl leading-relaxed font-light mb-12">
              Dhawn Beauty Castle was founded on the belief that melanin-rich skin deserves specific, high-performance care. We don't just sell products; we produce results that restore confidence for the modern African woman.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-12">
              {[
                { num: "500+", label: "Success Stories", icon: <Users className="text-[var(--secondary)]/40" size={20}/> },
                { num: "21", label: "Day Results", icon: <Timer className="text-[var(--secondary)]/40" size={20}/> },
                { num: "100%", label: "Melanin Focus", icon: <Heart className="text-[var(--secondary)]/40" size={20}/> },
                { num: "Luxury", label: "Formulations", icon: <Award className="text-[var(--secondary)]/40" size={20}/> }
              ].map((s, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">{s.icon}</div>
                  <div>
                    <p className="text-3xl font-heading font-black">{s.num}</p>
                    <p className="text-xs uppercase tracking-widest font-bold opacity-50">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="#contact" className="inline-flex items-center gap-4 bg-[var(--secondary)] text-white px-10 py-5 rounded-full font-black uppercase text-sm tracking-tighter hover:brightness-125 transition-all">
              Consult with Experts <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ - pattern F-STICKY logic applied to accordion */}
      <section className="py-28 px-6 bg-[var(--secondary)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[var(--accent)] font-mono text-xs tracking-[0.4em] uppercase opacity-60">Education</span>
            <h2 className="font-heading text-5xl font-black text-white mt-4">Skin Queries</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "How long until I see results?", a: "Most clients see a visible difference in skin texture and tone within 3-4 weeks of consistent use, with peak results at the 12-week mark." },
              { q: "Are your products safe for sensitive skin?", a: "Yes, our producers focus on gentle but effective actives safe for sensitive melanin-rich skin. We are 100% hydroquinone-free." },
              { q: "Do you offer consultations?", a: "Yes, we believe in curated routines. Click any WhatsApp button to chat directly with our skincare experts for a personalized skin analysis." }
            ].map((item, i) => (
              <details key={i} className="group border border-white/10 rounded-2xl overflow-hidden hover:border-[var(--accent)]/30 transition-colors bg-[#3D2828]/30">
                <summary className="flex items-center justify-between p-7 cursor-pointer text-white font-bold text-lg list-none">
                  {item.q}
                  <ChevronDown size={24} className="text-[var(--accent)] group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <div className="px-7 pb-7 text-white/50 leading-relaxed text-lg font-light border-t border-white/5 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Pattern T-SPOTLIGHT */}
      <section className="py-28 px-6 bg-[var(--primary)]/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-6xl font-black text-white mb-20">Skin Stories</h2>
          <div className="space-y-12">
            {[
              { name: "Adebayo Funke", text: "The tone correcting cream changed my life. My dark spots from acne are finally fading! Sharp delivery nationwide, I was sorted in days.", role: "Lagos Customer" },
              { name: "Chidinma Okafor", text: "Finally a sunscreen that doesn't make me look purple! Best skincare investment in Nigeria, hands down.", role: "Verified Buyer" },
              { name: "Zainab Bello", text: "I've tried everything for my hyperpigmentation. Dhawn Beauty is the only brand that actually respected my skin's natural barrier.", role: "Glow Member" }
            ].map((t, i) => (
              <div key={i} className="relative py-14 px-10 rounded-[3rem] border border-white/10 bg-gradient-to-b from-white/5 to-transparent hover:border-[var(--accent)]/30 transition-all duration-500 group">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-[var(--secondary)] border border-[var(--accent)]/30 flex items-center justify-center shadow-2xl">
                  <span className="text-[var(--accent)] text-4xl font-heading font-black leading-none pt-2">&ldquo;</span>
                </div>
                <p className="text-white/70 text-2xl font-light italic leading-relaxed group-hover:text-white transition-colors">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-12 flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] font-heading font-black text-xl border border-[var(--accent)]/20">
                    {t.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white text-lg">{t.name}</p>
                    <p className="text-[var(--accent)]/50 text-xs font-mono uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Pattern C2 (Asymmetric Glass Overlap) */}
      <section id="contact" className="py-28 px-6 bg-[var(--secondary)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--accent)]/5 -skew-x-12 translate-x-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <ContactForm />
          </div>
          <div className="order-1 md:order-2 md:pl-12 text-left">
            <span className="text-[var(--accent)] font-mono text-xs tracking-[0.5em] uppercase mb-6 block">Ready for your glow?</span>
            <h2 className="font-heading text-7xl md:text-8xl font-black text-white mb-8 leading-[0.85]">Book Your Consultation</h2>
            <div className="space-y-6 border-l-2 border-[var(--accent)]/20 pl-8">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:text-[var(--secondary)] transition-all">
                  <Instagram size={20} />
                </div>
                <span className="text-white/60 font-medium group-hover:text-white transition-colors">@dhawnbeautycastle</span>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:text-[var(--secondary)] transition-all">
                  <Phone size={20} />
                </div>
                <span className="text-white/60 font-medium group-hover:text-white transition-colors">wa.me/c/2348067493641</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Pattern F1 */}
      <footer className="bg-[#1A0F0F] py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <div className="flex flex-col mb-8">
                <span className="font-heading text-4xl font-black text-white tracking-tighter uppercase leading-none">Dhawn</span>
                <span className="text-[var(--accent)] text-xs tracking-[0.4em] font-bold uppercase -mt-1">Beauty Castle</span>
              </div>
              <p className="text-white/40 max-w-sm text-lg font-light leading-relaxed">
                Expertly formulated skincare for melanin-rich skin. corrected acne, hyperpigmentation, and uneven tones for your healthiest glow yet.
              </p>
            </div>
            <div>
              <h4 className="font-heading text-xl font-bold text-white mb-8">Navigation</h4>
              <ul className="space-y-4">
                {['Home', 'Shop', 'Results', 'Consultation'].map(item => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-white/40 hover:text-[var(--accent)] transition-colors font-medium">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-xl font-bold text-white mb-8">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all">
                  <Phone size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
            <p className="text-white/20 text-sm font-mono tracking-widest uppercase">
              © {new Date().getFullYear()} Dhawn Beauty Castle. Melanin Excellence.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-white/20 text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/20 text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors">Terms of Service</a>
            </div>
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
      <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-[#3D2828]/50 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent opacity-50" />
        <div className="w-24 h-24 rounded-full bg-[var(--accent)]/20 flex items-center justify-center mb-8 border border-[var(--accent)]/40 relative z-10 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          <CheckCheck size={40} className="text-[var(--accent)]" />
        </div>
        <h3 className="font-heading text-4xl font-black text-white mb-4 relative z-10">Message Received</h3>
        <p className="text-white/60 max-w-sm text-lg relative z-10 leading-relaxed">Thank you. Our skincare experts will review your details and reach out within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-[#3D2828]/40 backdrop-blur-3xl p-10 md:p-14 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent)]/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="relative z-10">
        <h3 className="font-heading text-3xl font-bold text-white mb-10">Start Your Glow Journey</h3>
        <div className="space-y-5">
          {(['name', 'email', 'phone'] as const).map(field => (
            <div key={field} className="relative group">
              <input
                type={field === 'email' ? 'email' : 'text'}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                required={field !== 'phone'}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-base outline-none transition-all duration-300 focus:bg-white/10 focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/30 group-hover:border-white/20 font-light"
              />
            </div>
          ))}
          <div className="relative group">
            <textarea rows={4} placeholder="Tell us about your skin concerns (Acne, Hyperpigmentation, etc.)"
              value={form.message}
              onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-base outline-none resize-none transition-all duration-300 focus:bg-white/10 focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/30 group-hover:border-white/20 font-light"
            />
          </div>
        </div>
        <button type="submit" disabled={loading}
          className="w-full mt-10 bg-[var(--accent)] text-[var(--secondary)] py-5 rounded-2xl font-black text-lg hover:brightness-110 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-3 group uppercase tracking-tighter">
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={24} /> Processing...
            </span>
          ) : (
            <>
              Send Inquiry <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}