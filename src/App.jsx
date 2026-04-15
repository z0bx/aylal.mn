import { useState, useEffect } from "react";
import { T, GLOBAL_CSS } from "./constants/theme";
import Icon from "./components/Icon";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageHome    from "./pages/PageHome";
import PageMap     from "./pages/PageMap";
import PageTravel  from "./pages/PageTravel";
import PageBooking from "./pages/PageBooking";
import PageLogin   from "./pages/PageLogin";
import PageProfile from "./pages/PageProfile";
import PageAdmin   from "./pages/PageAdmin";

export default function App() {
  const [page,     setPage]     = useState("home");
  const [loggedIn, setLoggedIn] = useState(false);

  // Inject global CSS once per page change
  useEffect(() => {
    const id = "nh-global-css";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = GLOBAL_CSS;
      document.head.appendChild(style);
    }
    window.scrollTo(0, 0);
  }, [page]);

  const navigateTo  = (key) => setPage(key);
  const showFooter  = !["map", "login"].includes(page);

  return (
    <div style={{ minHeight: "100vh", background: T.surface, width: "100%" }}>
      <Header page={page} setPage={navigateTo} loggedIn={loggedIn} />

      <div key={page}>
        {page === "home"    && <PageHome    setPage={navigateTo} />}
        {page === "map"     && <PageMap     setPage={navigateTo} />}
        {page === "travel"  && <PageTravel  setPage={navigateTo} />}
        {page === "booking" && <PageBooking setPage={navigateTo} />}
        {page === "login"   && <PageLogin   setPage={navigateTo} setLoggedIn={setLoggedIn} />}
        {page === "profile" && <PageProfile setPage={navigateTo} />}
        {page === "admin"   && <PageAdmin   setPage={navigateTo} />}
      </div>

      {showFooter && <Footer setPage={navigateTo} />}

      {/* Admin shortcut FAB */}
      <div
        onClick={() => setPage("admin")}
        title="Удирдах хэсэг"
        style={{ position: "fixed", bottom: 24, right: 24, width: 44, height: 44, borderRadius: "50%", background: T.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: `0 4px 12px ${T.primary}44`, zIndex: 99 }}
      >
        <Icon name="admin_panel_settings" size={20} />
      </div>
    </div>
  );
}