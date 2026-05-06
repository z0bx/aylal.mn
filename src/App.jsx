import { useEffect } from "react";
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
import { useNavigation } from "./hooks/useNavigation";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { currentPage, navigateTo } = useNavigation();
  const { loggedIn } = useAuth();

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
  }, [currentPage]);

  const showFooter  = !["map", "login"].includes(currentPage);

  return (
    <div style={{ minHeight: "100vh", background: T.surface, width: "100%" }}>
      <Header page={currentPage} setPage={navigateTo} loggedIn={loggedIn} />

      <div key={currentPage}>
        {currentPage === "home"    && <PageHome    setPage={navigateTo} />}
        {currentPage === "map"     && <PageMap     setPage={navigateTo} />}
        {currentPage === "travel"  && <PageTravel  setPage={navigateTo} />}
        {currentPage === "booking" && <PageBooking setPage={navigateTo} />}
        {currentPage === "login"   && <PageLogin   setPage={navigateTo} />}
        {currentPage === "profile" && <PageProfile setPage={navigateTo} />}
        {currentPage === "admin"   && <PageAdmin   setPage={navigateTo} />}
      </div>

      {showFooter && <Footer setPage={navigateTo} />}

      {/* Admin shortcut FAB */}
      <div
        onClick={() => navigateTo("admin")}
        title="Удирдах хэсэг"
        style={{ position: "fixed", bottom: 24, right: 24, width: 44, height: 44, borderRadius: "50%", background: T.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: `0 4px 12px ${T.primary}44`, zIndex: 99 }}
      >
        <Icon name="admin_panel_settings" size={20} />
      </div>
    </div>
  );
}