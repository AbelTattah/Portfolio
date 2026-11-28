import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cms } from "../cms.js";
import { initScrollAnimations } from "../lib/scrollAnimations.js";
import { ACCENTS, MODES } from "../theme/theme.js";
import { useTheme } from "../theme/ThemeContext.jsx";

const SECTIONS = [
  { id: "home", label: "Home", icon: "las la-home" },
  { id: "about", label: "About", icon: "lar la-user" },
  { id: "resume", label: "Resume", icon: "las la-briefcase" },
  { id: "services", label: "Services", icon: "las la-stream" },
  { id: "portfolio", label: "Portfolio", icon: "las la-grip-vertical" },
  { id: "testimonial", label: "Testimonial", icon: "lar la-comment" },
  { id: "skills", label: "Skills", icon: "las la-shapes" },
  { id: "contact", label: "Contact", icon: "lar la-envelope" },
];

const THEMES = [
  ["Earth Lines Sphere", "https://wpriverthemes.com/drake/earth-lines-sphere/"],
  ["3D Abstract Ball", "https://wpriverthemes.com/drake/3d-abstract-ball/"],
  ["Water Waves", "https://wpriverthemes.com/drake/water-waves/"],
  ["Liquids Wavy", "https://wpriverthemes.com/drake/liquids-wavy/"],
  ["Solid Color", "https://wpriverthemes.com/drake/"],
  ["Simple Strings", "https://wpriverthemes.com/drake/simple-strings/"],
];

const SOCIALS = [
  "lab la-instagram",
  "lab la-twitter",
  "lab la-dribbble",
  "lab la-github",
];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY,
    behavior: "instant",
  });
}

function Sidebar({ onHire }) {
  return (
    <div className="left-sidebar">
      <div className="sidebar-header flex items-center justify-between">
        <img src="/images/drake-logo.png" alt="Logo" />
        <span className="designation">Software Developer</span>
      </div>
      <img className="me" src="/images/drake-me.png" alt="ME" />
      <h3 className="email">{cms.site.email}</h3>
      <h3 className="address">Based in Accra, Ghana.</h3>
      <p className="copyright">&copy; 2022 Abel Tattah. All Rights Reserved</p>
      <ul className="social-profile flex flex-wrap items-center justify-center">
        {SOCIALS.map((icon) => (
          <li key={icon}>
            <a href="#" onClick={(e) => e.preventDefault()}>
              <i className={icon}></i>
            </a>
          </li>
        ))}
      </ul>
      <a href="#contact" className="theme-btn" onClick={onHire}>
        <i className="las la-envelope"></i> Hire Me!
      </a>
    </div>
  );
}

function NavList({ responsive, activeId, onGo }) {
  return (
    <ul className={`dmenu scroll-nav${responsive ? "-responsive" : ""} flex flex-col`}>
      {SECTIONS.map((s) => (
        <li key={s.id}>
          <a
            className={`scroll-to${activeId === s.id ? " active" : ""}`}
            href={`#${s.id}`}
            onClick={(e) => onGo(e, s.id)}
          >
            {responsive ? (
              <>
                <i className={s.icon}></i> <span>{s.label}</span>
              </>
            ) : (
              <>
                <span>{s.label}</span> <i className={s.icon}></i>
              </>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function DrakeLayout({ children }) {
  const [loader, setLoader] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const {
    mode,
    accentId,
    custom,
    setMode,
    toggleMode,
    setAccent,
    setCustomColor,
    reset,
  } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoader(false), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => initScrollAnimations(), [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      let current = "home";
      document.querySelectorAll(".scroll-to-page").forEach((section) => {
        if (section.getBoundingClientRect().top <= 1) current = section.id;
      });
      setActiveId(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const go = (event, id) => {
    event.preventDefault();
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToId(id), 150);
    } else {
      scrollToId(id);
    }
  };

  const chooseAccent = (index) => {
    setAccent(index);
    setColorOpen(false);
  };

  return (
    <>
      <div className="page-loader" style={{ display: loader ? "flex" : "none" }}>
        <div className="bounceball"></div>
      </div>

      <span
        className="icon-menu"
        role="button"
        tabIndex={0}
        aria-label="Open menu"
        onClick={() => setMenuOpen(true)}
        onKeyDown={(e) => e.key === "Enter" && setMenuOpen(true)}
      >
        <span className="bar"></span>
        <span className="bar"></span>
      </span>

      <div className={`global-color${colorOpen ? " active" : ""}`}>
        <span
          className="setting-toggle"
          role="button"
          tabIndex={0}
          onClick={() => setColorOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && setColorOpen(true)}
        >
          <i className="las la-cog"></i>
        </span>
        <span
          className="setting-toggle theme-toggle"
          role="button"
          tabIndex={0}
          aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={mode === "dark" ? "Light mode" : "Dark mode"}
          onClick={toggleMode}
          onKeyDown={(e) => e.key === "Enter" && toggleMode()}
        >
          <i className={mode === "dark" ? "las la-sun" : "las la-moon"}></i>
        </span>
        <div className="inner">
          <div className="overlay" onClick={() => setColorOpen(false)}></div>
          <div className="global-color-option">
            <span
              className="close-settings"
              role="button"
              tabIndex={0}
              onClick={() => setColorOpen(false)}
            >
              <i className="las la-times"></i>
            </span>
            <h3>Configuration</h3>
            <div className="global-color-option-inner">
              <p>Appearance</p>
              <div className="mode-boxed">
                {MODES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={mode === item.id ? "mode-active" : undefined}
                    onClick={() => setMode(item.id)}
                  >
                    <i className={item.icon}></i> {item.label}
                  </button>
                ))}
                <button type="button" className="mode-reset" onClick={reset}>
                  <i className="las la-undo"></i> Reset
                </button>
              </div>
              <p>Accent color</p>
              <div className="color-boxed">
                {ACCENTS.map((accent, i) => (
                  <a
                    key={accent.name}
                    href="#"
                    title={accent.name}
                    aria-label={accent.name}
                    className={
                      !custom && accentId === i ? "clr-active" : undefined
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      chooseAccent(i);
                    }}
                  ></a>
                ))}
              </div>
              <div className="custom-color">
                <label htmlFor="custom-accent">Custom accent</label>
                <input
                  id="custom-accent"
                  type="color"
                  value={custom || ACCENTS[accentId][mode]}
                  onChange={(e) => setCustomColor(e.target.value)}
                />
              </div>
              <p>THREE DIMENSIONAL SHAPES</p>
              <ul className="themes">
                {THEMES.map(([label, href]) => (
                  <li key={label}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`responsive-sidebar-menu${menuOpen ? " active" : ""}`}
      >
        <span
          className="close-settings"
          role="button"
          tabIndex={0}
          onClick={() => setMenuOpen(false)}
        >
          <i className="las la-times"></i>
        </span>
        <div className="overlay" onClick={() => setMenuOpen(false)}></div>
        <div className="sidebar-menu-inner">
          <div className="menu-wrap">
            <p>Menu</p>
            <NavList responsive activeId={activeId} onGo={go} />
          </div>
          <div className="sidebar-social">
            <p>Social</p>
            <ul className="social-links flex items-center">
              {SOCIALS.slice(0, 3).map((icon) => (
                <li key={icon}>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <i className={icon}></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <NavList activeId={activeId} onGo={go} />

      <Sidebar onHire={(e) => go(e, "contact")} />

      <main className="drake-main">
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <Sidebar onHire={(e) => go(e, "contact")} />
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
