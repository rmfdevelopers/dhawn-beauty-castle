'use client';
import { useState, useEffect, useRef } from 'react';
import * as Lucide from 'lucide-react';
import Image from 'next/image';

const useScrollReveal = (threshold = 0.15) => {
  const [v, setV] = useState(false); 
  const ref = useRef(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setV(true), { threshold });
    if (ref.current) o.observe(ref.current); 
    return () => o.disconnect();
  }, []); 
  return { ref, v };
};

function SafeImage({ src, alt, fill, className, priority }: any) {
  const [e, setE] = useState(false);
  if (e || !src) return <div className={`bg-neutral-900 flex items-center justify-center ${className}`}><Lucide.ImageOff className="opacity-20"/></div>;
  return <Image src={src} alt={alt} fill={fill} className={className} priority={priority} onError={() => setE(true)} unoptimized />;
}

export default function Page() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section id="hero" className="h-screen bg-black relative">
        <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
        <div className="container mx-auto p-12 pt-24 md:p-24 text-center relative z-10">
          <h1 className="text-6xl font-heading tracking-tighter leading-[0.9]">All Your Beauty Needs, Tailored for Melanin.</h1>
          <p className="text-2xl font-sans mt-4">Say goodbye to acne and hyperpigmentation. Experience premium skincare formulated for your unique glow.</p>
          <button className="bg-primary text-black px-8 py-4 mt-8 rounded-lg">Shop the Collection</button>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-primary" />
      </section>
      <section id="features" className="py-20 bg-secondary text-black">
        <div className="container mx-auto p-12 md:p-24 text-center">
          <h2 className="text-5xl font-heading tracking-tighter leading-[0.9]">The Science of Glow</h2>
          <p className="text-2xl font-sans mt-4">Why Lagos trust Dhawn Beauty Castle for their skincare journey.</p>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-8">
            <div className="glass-card p-8">
              <Lucide.UserCheck className="text-3xl" />
              <h3 className="text-2xl font-heading mt-4">Expert Consultation</h3>
              <p className="text-lg font-sans mt-2">Personalized skincare routines designed by experts for your specific skin concerns.</p>
            </div>
            <div className="glass-card p-8">
              <Lucide.Sparkles className="text-3xl" />
              <h3 className="text-2xl font-heading mt-4">Melanin Focused</h3>
              <p className="text-lg font-sans mt-2">Formulations engineered specifically to treat the unique needs of dark skin tones.</p>
            </div>
            <div className="glass-card p-8">
              <Lucide.Zap className="text-3xl" />
              <h3 className="text-2xl font-heading mt-4">Visible Results</h3>
              <p className="text-lg font-sans mt-2">Clinical-grade ingredients that deliver clear improvements in texture and clarity.</p>
            </div>
            <div className="glass-card p-8">
              <Lucide.Leaf className="text-3xl" />
              <h3 className="text-2xl font-heading mt-4">Pure Ingredients</h3>
              <p className="text-lg font-sans mt-2">Non-toxic, safe, and effective components that prioritize your long-term skin health.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="gallery" className="py-20 bg-black text-white">
        <div className="container mx-auto p-12 md:p-24 text-center">
          <h2 className="text-5xl font-heading tracking-tighter leading-[0.9]">The Transformation Gallery</h2>
          <p className="text-2xl font-sans mt-4">See the real results from our community. Real skin, real progress.</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
            <div className="glass-card p-8">
              <Image src="/image1.jpg" alt="Before" className="w-full h-full object-cover" />
              <Image src="/image2.jpg" alt="After" className="w-full h-full object-cover mt-4" />
            </div>
            <div className="glass-card p-8">
              <Image src="/image3.jpg" alt="Before" className="w-full h-full object-cover" />
              <Image src="/image4.jpg" alt="After" className="w-full h-full object-cover mt-4" />
            </div>
            <div className="glass-card p-8">
              <Image src="/image5.jpg" alt="Before" className="w-full h-full object-cover" />
              <Image src="/image6.jpg" alt="After" className="w-full h-full object-cover mt-4" />
            </div>
          </div>
        </div>
      </section>
      <section id="products" className="py-20 bg-secondary text-black">
        <div className="container mx-auto p-12 md:p-24 text-center">
          <h2 className="text-5xl font-heading tracking-tighter leading-[0.9]">Best Sellers</h2>
          <p className="text-2xl font-sans mt-4">Shop our community favorites for acne and tone correction.</p>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-heading">Melanin Glow Serum</h3>
              <p className="text-lg font-sans mt-2">Potent treatment for hyperpigmentation and dark spots, specifically for dark skin tones.</p>
              <p className="text-lg font-sans mt-2">₦15,000</p>
            </div>
            <div className="glass-card p-8">
              <h3 className="text-2xl font-heading">Acne Control Cleanser</h3>
              <p className="text-lg font-sans mt-2">Gentle but effective deep cleansing to clear pores without stripping essential moisture.</p>
              <p className="text-lg font-sans mt-2">₦8,500</p>
            </div>
            <div className="glass-card p-8">
              <h3 className="text-2xl font-heading">Ultimate Hydration Cream</h3>
              <p className="text-lg font-sans mt-2">A rich, nourishing moisturizer that locks in hydration for a supple, even skin tone.</p>
              <p className="text-lg font-sans mt-2">₦12,000</p>
            </div>
            <div className="glass-card p-8">
              <h3 className="text-2xl font-heading">Sunscreen Protection Mist</h3>
              <p className="text-lg font-sans mt-2">Zero white-cast sun protection designed to keep melanin-rich skin safe and glowing.</p>
              <p className="text-lg font-sans mt-2">₦10,000</p>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="py-20 bg-black text-white">
        <div className="container mx-auto p-12 md:p-24 text-center">
          <h2 className="text-5xl font-heading tracking-tighter leading-[0.9]">Our Castle, Your Skin</h2>
          <p className="text-2xl font-sans mt-4">Based in the heart of Lagos, Dhawn Beauty Castle was born from a need for effective, premium skincare that understands melanin. We don't just sell products; we produce solutions that empower your confidence.</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-heading">500+</h3>
              <p className="text-lg font-sans mt-2">Skin Concerns Resolved</p>
            </div>
            <div className="glass-card p-8">
              <h3 className="text-2xl font-heading">2k+</h3>
              <p className="text-lg font-sans mt-2">Community Followers</p>
            </div>
            <div className="glass-card p-8">
              <h3 className="text-2xl font-heading">100%</h3>
              <p className="text-lg font-sans mt-2">Melanin Focused</p>
            </div>
          </div>
        </div>
      </section>
      <section id="testimonials" className="py-20 bg-secondary text-black">
        <div className="container mx-auto p-12 md:p-24 text-center">
          <h2 className="text-5xl font-heading tracking-tighter leading-[0.9]">Customer Stories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
            <div className="glass-card p-8">
              <p className="text-lg font-sans">Finally found a serum that doesn't leave a white cast and actually clears my dark spots!</p>
              <p className="text-lg font-sans mt-2">- Chioma Adeleke, Verified Buyer</p>
            </div>
            <div className="glass-card p-8">
              <p className="text-lg font-sans">The acne cleanser is a game changer for my morning routine. My skin feels fresh and calm.</p>
              <p className="text-lg font-sans mt-2">- Tunde Bakare, Lagos Professional</p>
            </div>
            <div className="glass-card p-8">
              <p className="text-lg font-sans">I've struggled with uneven tone for years. Dhawn Beauty Castle fixed it in 3 weeks.</p>
              <p className="text-lg font-sans mt-2">- Oluwatoyin Bello, Influencer</p>
            </div>
          </div>
        </div>
      </section>
      <section id="faq" className="py-20 bg-black text-white">
        <div className="container mx-auto p-12 md:p-24 text-center">
          <h2 className="text-5xl font-heading tracking-tighter leading-[0.9]">Skincare Education</h2>
          <p className="text-2xl font-sans mt-4">Common questions about melanin-rich skin care.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-heading">How long until I see results?</h3>
              <p className="text-lg font-sans mt-2">Most clients see significant changes in skin texture within 14 days and tone correction within 28-60 days.</p>
            </div>
            <div className="glass-card p-8">
              <h3 className="text-2xl font-heading">Are these products safe for sensitive skin?</h3>
              <p className="text-lg font-sans mt-2">Yes, our producers focus on gentle but effective ingredients suitable for all skin sensitivities.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="py-20 bg-secondary text-black">
        <div className="container mx-auto p-12 md:p-24 text-center">
          <h2 className="text-5xl font-heading tracking-tighter leading-[0.9]">Book Your Consultation</h2>
          <p className="text-2xl font-sans mt-4">Get in touch with us to learn more about our products and services.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-heading">Contact Us</h3>
              <p className="text-lg font-sans mt-2">+2348067493641</p>
              <p className="text-lg font-sans mt-2">dhawnbeautycastle</p>
            </div>
            <div className="glass-card p-8">
              <h3 className="text-2xl font-heading">Visit Us</h3>
              <p className="text-lg font-sans mt-2">Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
Note that the above code is a basic implementation and may need to be modified to fit your specific requirements. Additionally, you will need to replace the placeholder images and text with your own content.