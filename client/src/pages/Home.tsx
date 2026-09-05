/*
 * Warm Editorial Clarity — page-specific style reminder:
 * Keep the composition editorial, useful, and human-scale. Use the warm ivory / ink navy /
 * editorial copper palette, purposeful whitespace, restrained motion, and clear actions.
 */
import { FormEvent, useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Code2,
  Compass,
  ExternalLink,
  Github,
  Globe2,
  HeartHandshake,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MonitorSmartphone,
  Palette,
  Search,
  Send,
  Settings2,
  Sparkles,
  X,
} from "lucide-react";

const heroImage = "/manus-storage/sohail-hero-editorial_baae03a2.jpg";
const studyImage = "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=82";
const portfolioImage = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=82";
const monogramImage = "/manus-storage/sa-monogram_52adf45a.png";
const emailAddress = "Sohail271198@gmail.com";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const skills = [
  { icon: Code2, title: "HTML", text: "Building structured and accessible websites." },
  { icon: Palette, title: "CSS", text: "Creating modern and responsive designs." },
  { icon: Settings2, title: "JavaScript", text: "Adding functionality and interactive features." },
  { icon: MonitorSmartphone, title: "Responsive Design", text: "Websites that work across phones, tablets and computers." },
  { icon: Github, title: "Git & GitHub", text: "Managing and publishing web projects." },
  { icon: Search, title: "Digital Marketing", text: "Helping businesses improve their online presence." },
];

const services = [
  { number: "01", title: "Website Development", text: "Professional websites for businesses and individuals, built around what visitors need to do.", fit: "For a new online presence" },
  { number: "02", title: "Website Redesign", text: "Modernizing outdated websites and improving their design, structure, and clarity.", fit: "For a site that feels stuck" },
  { number: "03", title: "Responsive Design", text: "Websites optimized for mobile, tablet, and desktop so the experience stays consistent.", fit: "For every screen size" },
  { number: "04", title: "Basic SEO", text: "Improving website structure and visibility in search engines through practical foundations.", fit: "For a stronger foundation" },
];

const principles = [
  { icon: HeartHandshake, title: "Reliable", text: "Built to work when people need it." },
  { icon: Compass, title: "Useful", text: "Every section has a clear purpose." },
  { icon: Sparkles, title: "Easy to Use", text: "Simple navigation and clear actions." },
  { icon: MonitorSmartphone, title: "Responsive", text: "Designed to work smoothly across devices." },
];

const projects = [
  {
    id: "study",
    image: studyImage,
    category: "Educational Website",
    title: "Study in Türkiye Guide",
    description: "An educational website providing guidance for students interested in studying in Türkiye.",
    accent: "copper",
    tags: ["Guidance", "Structure", "Content"],
    scope: "A clear path for prospective students.",
  },
  {
    id: "portfolio",
    image: portfolioImage,
    category: "Portfolio Website",
    title: "Personal Portfolio Website",
    description: "A fully responsive, modern web portfolio designed to highlight front-end development skills and digital services.",
    accent: "navy",
    tags: ["Responsive", "Visual hierarchy", "Digital presence"],
    scope: "A focused home for skills and services.",
  },
];

function useReveal() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.14 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function SectionIntro({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="section-intro reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: (typeof projects)[number]; onOpen: (project: (typeof projects)[number]) => void }) {
  return (
        <article className={`project-card project-card--${project.accent} reveal`}>
      <div className="project-image-wrap">
        <img src={project.image} alt={`${project.title} project preview`} className="project-image" data-parallax="project" data-parallax-intensity="12" onError={(event) => { event.currentTarget.style.display = "none"; }} />
        <span className="project-index">0{projects.indexOf(project) + 1}</span>
      </div>
      <div className="project-card-body">
        <span className="project-category">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-scope"><span>Focus</span><strong>{project.scope}</strong></div>
        <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <button className="text-link" onClick={() => onOpen(project)} aria-label={`View details for ${project.title}`}>
          View Project <ArrowUpRight size={16} strokeWidth={1.8} />
        </button>
      </div>
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    revealItems.forEach((item, index) => {
      item.style.setProperty("--delay", `${Math.min(index * 28, 320)}ms`);
      item.classList.add("is-visible");
    });
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (!layers.length) return;

    let frame = 0;
    const updateParallax = () => {
      const viewportHeight = window.innerHeight;
      layers.forEach((layer) => {
        const rect = layer.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > viewportHeight + 80) return;
        const intensity = Number(layer.dataset.parallaxIntensity || 18);
        const progress = (viewportHeight / 2 - (rect.top + rect.height / 2)) / viewportHeight;
        const shift = Math.max(-intensity, Math.min(intensity, progress * intensity));
        layer.style.setProperty("--parallax-shift", `${shift.toFixed(2)}px`);
      });
      frame = 0;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "Portfolio enquiry").trim();
    const message = String(data.get("message") || "").trim();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormSent(true);
    form.reset();
  };

  return (
    <div className="site-shell">
      <header className={`site-header ${menuOpen ? "menu-open" : ""}`}>
        <div className="container header-inner">
          <a className="brand-lockup" href="#top" onClick={closeMenu} aria-label="Sohail Ahmad, home">
            <span className="brand-mark"><span className="brand-mark-fallback">SA</span><img src={monogramImage} alt="" onError={(event) => { event.currentTarget.style.display = "none"; }} /></span>
            <span className="brand-name">Sohail Ahmad</span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>

          <a className="header-cta" href="#contact">Contact Me <ArrowUpRight size={15} /></a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <div className="mobile-nav" aria-hidden={!menuOpen}>
          <div className="container mobile-nav-inner">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}<ArrowUpRight size={16} /></a>
            ))}
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy reveal is-visible">
              <span className="eyebrow">Hello, I&apos;m</span>
              <h1>Sohail<br /><em>Ahmad</em></h1>
              <div className="hero-role">Web Developer <span aria-hidden="true">/</span> <span>Simple. On purpose.</span></div>
              <p className="hero-description">I create modern, responsive and professional websites that help businesses and individuals build a strong presence online.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">View My Work <ArrowDownRight size={17} /></a>
                <a className="button button-secondary" href="#contact">Contact Me <ArrowUpRight size={17} /></a>
              </div>
              <a className="scroll-cue" href="#about"><span className="scroll-line" /> Scroll to explore</a>
            </div>
            <div className="hero-visual reveal is-visible">
              <div className="hero-art-frame">
                <img src={heroImage} alt="Warm editorial workspace with a notebook, laptop and copper ruler" className="hero-art" data-parallax="hero" data-parallax-intensity="15" />
                <div className="hero-stamp"><span>SA</span><small>WEB<br />DEVELOPER</small></div>
              </div>
              <div className="hero-note"><span>01</span><p>Useful websites, built<br />with care.</p></div>
            </div>
          </div>
          <div className="hero-footer-rule" aria-hidden="true"><span>Reliable</span><span>Useful</span><span>Responsive</span><span>Easy to use</span></div>
        </section>

        <section id="about" className="about-section section-pad">
          <div className="container about-grid">
            <SectionIntro eyebrow="A little about me" title="I&apos;m a Web Developer." />
            <div className="about-content reveal">
              <p className="lead-copy">I build clean, responsive and user-friendly websites for businesses, organizations and individuals.</p>
              <p>My goal is to combine attractive design with practical functionality to create websites that actually help people and businesses.</p>
              <div className="about-callout"><span>01</span><p>Start with the message, then make every click feel obvious.</p></div>
              <a className="text-link text-link--dark" href="#contact">Let&apos;s talk about your project <ArrowUpRight size={16} /></a>
              <div className="about-facts"><div><span>Approach</span><strong>Clear structure</strong></div><div><span>Priority</span><strong>Useful details</strong></div><div><span>Standard</span><strong>Easy to use</strong></div></div>
            </div>
          </div>
          <div className="container about-summary-grid">
            {[
              ["01", "Web Development"],
              ["02", "Responsive Design"],
              ["03", "User-Friendly Interfaces"],
              ["04", "Digital Presence"],
            ].map(([number, label]) => (
              <div className="summary-item reveal" key={number}><span>{number}</span><strong>{label}</strong></div>
            ))}
          </div>
        </section>

        <section id="skills" className="skills-section section-pad section-tint">
          <div className="container">
            <SectionIntro eyebrow="What I work with" title="My Skills" body="The tools and practices I use to turn a clear idea into a dependable web experience." />
            <div className="skills-layout">
              <aside className="skills-feature reveal">
                <span className="feature-number">01 / 06</span>
                <div className="feature-icon"><Code2 size={27} strokeWidth={1.5} /></div>
                <h3>The basics,<br /><em>done well.</em></h3>
                <p>Good web work starts with structure, then earns trust through the small details.</p>
                <div className="feature-list"><span><b>01</b> Structure</span><span><b>02</b> Style</span><span><b>03</b> Behavior</span></div>
              </aside>
              <div className="skills-grid">
              {skills.map(({ icon: Icon, title, text }, index) => (
                <article className="skill-card reveal" key={title} style={{ "--delay": `${index * 45}ms` } as CSSProperties}>
                  <div className="card-icon"><Icon size={21} strokeWidth={1.7} /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="projects-section section-pad">
          <div className="container">
            <div className="section-heading-row reveal">
              <SectionIntro eyebrow="My recent work" title="Projects" />
              <div className="section-aside-block"><p className="section-aside">A small selection of work shaped around clarity, usefulness, and a better experience on every screen.</p><span className="section-counter">02 selected pieces / 2026</span></div>
            </div>
            <div className="projects-grid">
              {projects.map((project) => <ProjectCard key={project.id} project={project} onOpen={setActiveProject} />)}
            </div>
          </div>
        </section>

        <section id="services" className="services-section section-pad section-dark">
          <div className="container services-layout">
            <div className="services-sidebar reveal">
              <span className="eyebrow eyebrow-light">What I offer</span>
              <h2>Useful work,<br /><em>without the noise.</em></h2>
              <p>I focus on the parts of a website that make a real difference: a clear message, an easy path, and a solid foundation.</p>
              <a className="button button-light" href="#contact">Start a conversation <ArrowUpRight size={17} /></a>
              <div className="service-signature"><span>Working principle</span><strong>Make the next step clear.</strong></div>
            </div>
            <div className="services-list">
              {services.map((service) => (
                <article className="service-row reveal" key={service.number}>
                  <span className="service-number">{service.number}</span>
                  <div><h3>{service.title}</h3><p>{service.text}</p><span className="service-fit">{service.fit}</span></div>
                  <ChevronRight className="service-arrow" size={20} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="principles-section section-pad">
          <div className="container">
            <div className="principles-heading reveal"><span className="eyebrow">The approach</span><h2>Why Simple Works</h2><p>Good websites do less, better. These are the principles behind every decision.</p></div>
            <div className="principles-grid">
              {principles.map(({ icon: Icon, title, text }) => (
                <article className="principle-card reveal" key={title}><Icon size={23} strokeWidth={1.5} /><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="process-section section-pad section-tint">
          <div className="container process-grid">
            <SectionIntro eyebrow="How it comes together" title="A simple process." body="Clear steps keep the work focused, collaborative, and moving forward." />
            <div className="process-list">
              {[
                ["01", "Understand", "Understand the client's goals and requirements."],
                ["02", "Plan", "Plan the structure, content and user experience."],
                ["03", "Build", "Develop a clean, responsive and functional website."],
                ["04", "Deliver", "Test the website across devices and deliver a polished final product."],
              ].map(([number, title, text]) => (
                <div className="process-step reveal" key={number}><span className="process-number">{number}</span><div><h3>{title}</h3><p>{text}</p></div></div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section section-pad">
          <div className="container contact-grid">
            <div className="contact-copy reveal">
              <span className="eyebrow">Let&apos;s work together</span>
              <h2>Have a project in mind? <em>Let&apos;s build something professional.</em></h2>
              <p>Tell me what needs to work. I&apos;ll help make it clear.</p>
              <div className="contact-details">
                <a href={`mailto:${emailAddress}`}><span className="detail-icon"><Mail size={17} /></span><span><small>Email Me</small>{emailAddress}</span></a>
                <a href={`mailto:${emailAddress}?subject=Callback request`}><span className="detail-icon"><Send size={17} /></span><span><small>Call Me</small>Email for a callback</span></a>
              </div>
              <div className="contact-brief"><span className="contact-brief-title">A useful first message includes</span><div><b>01</b><span>What you want the website to help with.</span></div><div><b>02</b><span>What exists already, if anything.</span></div><div><b>03</b><span>What should feel easier for your visitors.</span></div></div>
            </div>
            <form className="contact-form reveal" onSubmit={handleSubmit}>
              <div className="form-row"><label>Name<input name="name" type="text" placeholder="Your name" required /></label><label>Email<input name="email" type="email" placeholder="you@example.com" required /></label></div>
              <label>Subject<input name="subject" type="text" placeholder="What can I help with?" required /></label>
              <label>Message<textarea name="message" rows={5} placeholder="Tell me a little about your project..." required /></label>
              <button className="button button-primary" type="submit">Send Message <ArrowUpRight size={17} /></button>
              <p className="form-note" role="status">{formSent ? <><Check size={15} /> Your email app should open with the message ready to send.</> : <>This form opens your email app — no message is sent without your confirmation.</>}</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-top">
          <div><a className="brand-lockup brand-lockup--footer" href="#top"><span className="brand-mark"><span className="brand-mark-fallback">SA</span><img src={monogramImage} alt="" onError={(event) => { event.currentTarget.style.display = "none"; }} /></span><span className="brand-name">Sohail Ahmad</span></a><p>Simple. On purpose.</p></div>
          <div className="footer-nav"><span>Navigate</span>{navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</div>
          <div className="footer-note"><span>Available for thoughtful web projects.</span><a href={`mailto:${emailAddress}`}>{emailAddress} <ArrowUpRight size={15} /></a></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 Sohail Ahmad. All rights reserved.</span><span>Built with clarity.</span></div>
      </footer>

      {activeProject && (
        <div className="project-modal-backdrop" role="presentation" onMouseDown={() => setActiveProject(null)}>
          <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" aria-label="Close project details" onClick={() => setActiveProject(null)}><X size={19} /></button>
            <img src={activeProject.image} alt={`${activeProject.title} preview`} className="modal-project-image" onError={(event) => { event.currentTarget.style.display = "none"; }} />
            <div className="modal-content"><span className="project-category">{activeProject.category}</span><h2 id="project-dialog-title">{activeProject.title}</h2><p>{activeProject.description}</p><p className="modal-note">A public project link is not configured yet. Detailed previews can be shared directly on request.</p><a className="button button-primary" href={`mailto:${emailAddress}?subject=${encodeURIComponent(`${activeProject.title} project enquiry`)}`}>Ask about this project <Mail size={16} /></a></div>
          </div>
        </div>
      )}
    </div>
  );
}
