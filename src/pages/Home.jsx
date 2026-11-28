import { Link } from "react-router-dom";
import { cms } from "../cms.js";
import { usePageMeta } from "../lib/meta.js";

function SectionHeader({ icon, title, heading, as: Tag = "h2" }) {
  return (
    <div className="section-header">
      <h4 className="subtitle scroll-animation" data-animation="fade_from_bottom">
        <i className={icon}></i> {title}
      </h4>
      <Tag className="scroll-animation" data-animation="fade_from_bottom">
        {heading}
      </Tag>
    </div>
  );
}

function Testimonial({ quote, author, role, skill, date, verified }) {
  return (
    <figure className="testimonial-item-inner">
      <blockquote>
        <p>“{quote}”</p>
      </blockquote>
      <figcaption className="author flex items-center">
        <span className="author-initial" aria-hidden="true">
          {author.charAt(0)}
        </span>
        <div>
          <h3>{author}</h3>
          {role && <p>{role}</p>}
        </div>
      </figcaption>
      <ul className="testimonial-meta">
        {skill && <li className="testimonial-skill">{skill}</li>}
        <li>{date}</li>
        {verified && (
          <li className="testimonial-verified">
            <i className="las la-check-circle" aria-hidden="true"></i> Verified
          </li>
        )}
      </ul>
    </figure>
  );
}

export default function Home() {
  usePageMeta({
    title: "abeltattah",
    description:
      "I like to solve problems with code. Software developer based in Accra, Ghana.",
    url: "http://localhost:8080/wordpress/",
  });

  return (
    <>
      {/* Introduce */}
      <section id="home" className="page-section scroll-to-page">
        <div className="hero-section">
          <div className="custom-container">
            <div className="hero-content content-width">
              <SectionHeader
                as="h1"
                icon="las la-home"
                title="INTRODUCE"
                heading={
                  <>
                    Hello from<span> Abel</span>, Software Developer
                  </>
                }
              />
              <p className="scroll-animation" data-animation="fade_from_bottom">
                <span>I like to solve problems with code</span>
              </p>
              <a
                href="#portfolio"
                className="go-to-project-btn scroll-to scroll-animation"
                data-animation="rotate_up"
              >
                <img src="/images/drake-menu.jpg" alt="" />
                <i className="las la-arrow-down"></i>
              </a>
              <div className="facts flex">
                <div
                  className="left scroll-animation"
                  data-animation="fade_from_left"
                >
                  <h2>2</h2>
                  <p>
                    Years of <br />
                    Experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="page-section scroll-to-page">
        <div className="about-area">
          <div className="custom-container">
            <div className="about-content content-width">
              <SectionHeader
                icon="lar la-user"
                title="About"
                heading={
                  <>
                    Every great software began with a<br /> <span> problem</span>
                  </>
                }
              />
              <p className="scroll-animation" data-animation="fade_from_bottom">
                <span>
                  I have had the opportunity to work as a full stack developer
                  on ride hailing, fintech and project management software and
                  these experiences have shaped the way I think.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resume */}
      <section id="resume" className="page-section scroll-to-page">
        <div className="resume-area">
          <div className="custom-container">
            <div className="resume-content content-width">
              <SectionHeader
                icon="las la-briefcase"
                title="resume"
                heading={
                  <>
                    Education & <span>Experience</span>
                  </>
                }
              />
              <div className="resume-timeline">
                <div
                  className="item scroll-animation"
                  data-animation="fade_from_right"
                >
                  <span className="date">2023 - 2026</span>
                  <h3>Full Stack Engineer</h3>
                  <p>DuabaLabs</p>
                  <h3>Full Stack Engineer</h3>
                  <p>FORTUNE PORTFOLIO</p>
                  <h3>Computer Science with Statistics</h3>
                  <p>University of Ghana</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="page-section scroll-to-page">
        <div className="services-area">
          <div className="custom-container">
            <div className="services-content content-width">
              <SectionHeader
                icon="las la-stream"
                title="Services"
                heading={
                  <>
                    My <span>Services</span>
                  </>
                }
              />
              <div className="services-items">
                <div
                  className="service-item scroll-animation"
                  data-animation="fade_from_bottom"
                >
                  <i className="las la-bezier-curve"></i>
                  <h3>Full Stack Mobile App Development</h3>
                  <p>
                    <span>I create seamless mobile experiences</span>
                  </p>
                  <span className="projects"></span>
                </div>
                <div
                  className="service-item scroll-animation"
                  data-animation="fade_from_bottom"
                >
                  <i className="las la-code"></i>
                  <h3>Web Development</h3>
                  <p>
                    <span>I build websites with Nextjs or WordPress</span>
                  </p>
                  <span className="projects"></span>
                </div>
                <div
                  className="service-item scroll-animation"
                  data-animation="fade_from_bottom"
                >
                  <i className="las la-rocket"></i>
                  <h3>Mobile App Design</h3>
                  <p>
                    <span>I design intuitive mobile app experiences</span>
                  </p>
                  <span className="projects"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="page-section scroll-to-page">
        <div className="portfolio-area">
          <div className="custom-container">
            <div className="portfolio-content content-width">
              <SectionHeader
                icon="las la-grip-vertical"
                title="Portolio"
                heading=""
              />
              <div className="portfolio-items">
                {cms.projects.map((project) => (
                  <div
                    key={project.slug}
                    className="scroll-animation"
                    data-animation=""
                  >
                    <div className="portfolio-item portfolio-full">
                      <div className="portfolio-item-inner">
                        <Link to={`/products/${project.slug}`}>
                          <img src={project.image} alt="" />
                        </Link>
                        <ul className="portfolio-categories"></ul>
                      </div>
                      <h3>
                        <Link to={`/products/${project.slug}`}>
                          {project.name}
                        </Link>
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials. Always rendered so the nav anchor keeps a target. */}
      <section id="testimonial" className="page-section scroll-to-page">
        {cms.testimonials?.length > 0 && (
          <div className="testimonial-area">
            <div className="custom-container">
              <div className="testimonial-content content-width">
                <SectionHeader
                  icon="lar la-comment"
                  title="testimonial"
                  heading={
                    <>
                      What people <span>say</span>
                    </>
                  }
                />
                <div className="testimonial-list">
                  {cms.testimonials.map((item) => (
                    <div
                      key={item.author}
                      className="testimonial-item scroll-animation"
                      data-animation="fade_from_bottom"
                    >
                      <Testimonial {...item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Skills */}
      <section id="skills" className="page-section scroll-to-page">
        <div className="skills-area">
          <div className="custom-container">
            <div className="skills-content content-width">
              <SectionHeader
                icon="las la-shapes"
                title="my skills"
                heading={
                  <>
                    My <span>Advantages</span>
                  </>
                }
              />
              <div className="skills grid grid-cols-2 gap-6 text-center md:grid-cols-4">
                <div
                  className="scroll-animation"
                  data-animation="fade_from_right"
                >
                  <div className="skill">
                    <div className="skill-inner">
                      <img src="/images/skill-react.png" alt="" />
                      <h2 className="percent">90%</h2>
                    </div>
                    <p className="name">React</p>
                  </div>
                </div>
                <div
                  className="scroll-animation"
                  data-animation="fade_from_left"
                >
                  <div className="skill">
                    <div className="skill-inner">
                      <img src="/images/skill-figma.png" alt="" />
                      <h2 className="percent">92%</h2>
                    </div>
                    <p className="name">Figma</p>
                  </div>
                </div>
                <div
                  className="scroll-animation"
                  data-animation="fade_from_left"
                >
                  <div className="skill">
                    <div className="skill-inner">
                      <img src="/images/skill-react.png" alt="" />
                      <h2 className="percent">90%</h2>
                    </div>
                    <p className="name">React Native</p>
                  </div>
                </div>
                <div className="scroll-animation" data-animation="">
                  <div className="skill">
                    <div className="skill-inner">
                      <img src="/images/skill-node.png" alt="" />
                      <h2 className="percent">80%</h2>
                    </div>
                    <p className="name">Node js</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="page-section scroll-to-page">
        <div className="contact-area">
          <div className="custom-container">
            <div className="contact-content content-width">
              <SectionHeader
                icon="lar la-envelope"
                title="contact"
                heading={
                  <>
                    Let's Work <span>Together!</span>
                  </>
                }
              />
              <h3 className="scroll-animation" data-animation="fade_from_bottom">
                {cms.site.email}
              </h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
