import { useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import DrakeLayout from "./components/DrakeLayout.jsx";
import Home from "./pages/Home.jsx";
import Experience from "./pages/Experience.jsx";
import Me from "./pages/Me.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import NotFound from "./pages/NotFound.jsx";
import { ThemeProvider } from "./theme/ThemeContext.jsx";

const SUB_PAGES = [
  { match: /^\/experience/, icon: "las la-briefcase", label: "resume" },
  { match: /^\/me/, icon: "lar la-user", label: "About" },
  { match: /^\/products\//, icon: "las la-grip-vertical", label: "Portfolio" },
  { match: /.*/, icon: "las la-home", label: "Page" },
];

function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function RouteView() {
  const { pathname } = useLocation();
  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/me" element={<Me />} />
      <Route path="/products/:slug" element={<ProjectDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  if (pathname === "/") return routes;

  const info = SUB_PAGES.find((page) => page.match.test(pathname)) || SUB_PAGES[3];
  return (
    <div className="drake-route">
      <div className="subpage-header">
        <h4 className="subtitle scroll-animation" data-animation="fade_from_bottom">
          <i className={info.icon}></i> {info.label}
        </h4>
      </div>
      {routes}
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <ScrollManager />
        <DrakeLayout>
          <RouteView />
        </DrakeLayout>
      </ThemeProvider>
    </HashRouter>
  );
}
