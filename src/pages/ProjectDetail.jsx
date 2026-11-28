import { Link, useNavigate, useParams } from "react-router-dom";
import { cms } from "../cms.js";
import { usePageMeta } from "../lib/meta.js";
import { StatusBadge } from "../components/StatusBadge.jsx";
import VideoPlayer from "../components/VideoPlayer.jsx";
import PreviewPlayer from "../components/PreviewPlayer.jsx";
import NotFound from "./NotFound.jsx";
import "./ProjectDetail.css";

function Block({ icon, title, children }) {
  return (
    <section className="pp-block scroll-animation" data-animation="fade_from_bottom">
      <h2 className="pp-block-title">
        <i className={icon} aria-hidden="true"></i> {title}
      </h2>
      {children}
    </section>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = cms.projects.find((p) => p.slug === slug);

  usePageMeta(
    project
      ? {
          title: `${project.name} — Abel Tattah`,
          description: project.tagline,
          image: project.image,
          url: `https://abeltattah.vercel.app/#/products/${project.slug}`,
        }
      : { title: "Page not found — Abel Tattah" }
  );

  if (!project) return <NotFound />;

  // Keyed by slug so players and disclosures reset between projects.
  return <ProjectView key={project.slug} project={project} />;
}

function ProjectView({ project }) {
  const navigate = useNavigate();

  const backToPortfolio = (event) => {
    event.preventDefault();
    navigate("/");
    setTimeout(
      () => document.getElementById("portfolio")?.scrollIntoView({ behavior: "instant" }),
      150
    );
  };

  // Related projects first, then the rest, so this is never needlessly empty.
  const isRelated = (p) =>
    p.category === project.category || p.status === project.status;
  const upNext = cms.projects
    .filter((p) => p.slug !== project.slug)
    .sort((a, b) => isRelated(b) - isRelated(a))
    .slice(0, 4);

  const stackGroups = Object.entries(project.stack || {}).filter(
    ([, v]) => v && v.length
  );
  if (project.tech?.length) stackGroups.push(["Highlights", project.tech]);

  const extraGallery = (project.gallery || []).filter(
    (src) => src !== project.image
  );

  const facts = [
    ["Status", project.statusLabel],
    ["Type", project.type],
    ["Category", project.category],
  ].filter(([, value]) => value);

  const emailHref = `mailto:${cms.site.email}?subject=${encodeURIComponent(
    `Discuss ${project.name}`
  )}`;

  return (
    <div className="project-page">
      <a href="#/" className="pp-back" onClick={backToPortfolio}>
        <i className="las la-arrow-left" aria-hidden="true"></i> Back to portfolio
      </a>

      <header className="pp-header">
        <StatusBadge project={project} />
        <h1 className="pp-title">{project.name}</h1>
        <p className="pp-tagline">{project.tagline}</p>

        <div className="pp-actions">
          <a href={emailHref} className="theme-btn pp-btn">
            <i className="las la-envelope" aria-hidden="true"></i>
            Discuss project
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="pp-btn-outline">
              <i className="las la-external-link-alt" aria-hidden="true"></i>
              Live product
            </a>
          )}
          {project.repo && project.repo !== project.demo && (
            <a href={project.repo} target="_blank" rel="noreferrer" className="pp-btn-outline">
              <i className="lab la-github" aria-hidden="true"></i>
              Source
            </a>
          )}
        </div>
      </header>

      <VideoPlayer project={project} />

      <dl className="pp-facts">
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <Block icon="las la-cube" title="Overview">
        <p className="pp-text">{project.overview}</p>
      </Block>

      {project.problem && (
        <Block icon="las la-bullseye" title="The problem it solves">
          <p className="pp-text">{project.problem}</p>
        </Block>
      )}

      {project.features?.length > 0 && (
        <Block icon="las la-star" title="Key features">
          <ul className="pp-features">
            {project.features.map((feature, i) => (
              <li key={feature}>
                <span className="pp-feature-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </Block>
      )}

      {stackGroups.length > 0 && (
        <Block icon="las la-layer-group" title="Technology stack">
          <dl className="pp-stack">
            {stackGroups.map(([group, items]) => (
              <div key={group}>
                <dt>{group}</dt>
                <dd>
                  {items.map((item) => (
                    <span key={item} className="pp-tag">
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Block>
      )}

      {extraGallery.length > 0 && (
        <Block icon="las la-image" title="Gallery">
          <div className="pp-gallery">
            {extraGallery.map((src) => (
              <img
                key={src}
                src={src}
                alt={`${project.name} screenshot`}
                loading="lazy"
              />
            ))}
          </div>
        </Block>
      )}


      {upNext.length > 0 && (
        <Block icon="las la-grip-vertical" title="Up next">
          <ul className="pp-next">
            {upNext.map((p) => (
              <li key={p.slug}>
                <UpNextItem project={p} />
              </li>
            ))}
          </ul>
        </Block>
      )}
    </div>
  );
}

function UpNextItem({ project }) {
  return (
    <Link to={`/products/${project.slug}`} className="pp-next-item group">
      <div className="pp-next-thumb">
        <PreviewPlayer project={project} />
      </div>
      <h3>{project.name}</h3>
      <p>{project.type}</p>
    </Link>
  );
}
