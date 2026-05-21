import { useEffect } from "react";
import { T, GLOBAL_CSS } from "./constants/theme";
import Icon from "./components/Icon";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageHome from "./pages/PageHome";
import PageMap from "./pages/PageMap";
import PageTravel from "./pages/PageTravel";
import PageBooking from "./pages/PageBooking";
import PageLogin from "./pages/PageLogin";
import PageProfile from "./pages/PageProfile";
import PageAdmin from "./pages/PageAdmin";
import { useNavigation } from "./hooks/useNavigation";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { currentPage, navigateTo } = useNavigation();
  const { isAuthenticated: loggedIn, logout } = useAuth(); // Use AuthContext isAuthenticated state as loggedIn

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

  // Хамгаалалттай хуудсуудын жагсаалт
  const protectedPages = ["booking", "profile", "admin"];

  // Хэрэв нэвтрээгүй хэрэв хамгаалалттай хуудас руу орохыг оролдвол шууд Логин хуудас руу шилжүүлэх үйлдэл
  useEffect(() => {
    if (protectedPages.includes(currentPage) && !loggedIn) {
      navigateTo("login");
    }
  }, [currentPage, loggedIn]);

  const showFooter = !["map", "login"].includes(currentPage);

  // Хэрэв нэвтрээгүй байхад хамгаалалттай хуудас түрүүлж харагдахаас сэргийлсэн хамгаалалт
  const shouldRenderPage = (pageName) => {
    if (protectedPages.includes(pageName) && !loggedIn) {
      return false;
    }
    return currentPage === pageName;
  };

  return (
    <div style={{ minHeight: "100vh", background: T.surface, width: "100%" }}>
      <Header page={currentPage} setPage={navigateTo} loggedIn={loggedIn} logout={logout} />

      <div key={currentPage}>
        {/* Нээлттэй хуудсууд */}
        {currentPage === "home" && <PageHome setPage={navigateTo} />}
        {currentPage === "map" && <PageMap setPage={navigateTo} />}
        {currentPage === "travel" && <PageTravel setPage={navigateTo} />}
        {currentPage === "login" && <PageLogin setPage={navigateTo} />}

        {/* Хамгаалалттай хуудсууд (Зөвхөн нэвтэрсэн үед харагдана) */}
        {shouldRenderPage("booking") && <PageBooking setPage={navigateTo} />}
        {shouldRenderPage("profile") && <PageProfile setPage={navigateTo} />}
        {shouldRenderPage("admin") && <PageAdmin setPage={navigateTo} />}
      </div>

      {showFooter && <Footer setPage={navigateTo} />}

      {/* Админ shortcut FAB - Зөвхөн нэвтэрсэн үед харуулна (Аюулгүй байдал) */}
      {loggedIn && (
        <div
          onClick={() => navigateTo("admin")}
          title="Удирдах хэсэг"
          style={{ position: "fixed", bottom: 24, right: 24, width: 44, height: 44, borderRadius: "50%", background: T.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: `0 4px 12px ${T.primary}44`, zIndex: 99 }}
        >
          <Icon name="admin_panel_settings" size={20} />
        </div>
      )}
    </div>
  );
}