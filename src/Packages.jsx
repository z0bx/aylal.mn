import { useState } from "react";
 
const packageDetail = {
  image: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1400&q=80",
  alt: "Говь",
  title: "Өмнөговийн аялал",
  duration: "5 хоног",
  groupSize: "2–12 хүн",
  location: "Өмнөговь аймаг",
  description: "Хонгорын элс, Баянзаг, Молцог элс. Тэмээ унана, гэрт хоноглоно.",
  price: 450000,
  highlights: [
    { title: "Хонгорын элс",   text: "180 м өндөр" },
    { title: "Баянзаг",        text: "Динозаврын үлдэгдэл" },
    { title: "Тэмээн аялал",   text: "2 цаг" },
    { title: "Гэрт хоноглох",  text: "3 шөнө" },
    { title: "Хоол",           text: "Бүгд багтана" },
  ],
  included: [
    "Тэмээн дэрс унах (2 цаг)",
    "Гэрт хоноглох (3 шөнө)",
    "Бүх хоол (өглөө, өдөр, орой)",
    "4WD тээвэр хамрагдсан",
    "Дотоодын нислэг (УБ↔ДЗД)",
  ],
  excluded: [
    "Олон улсын нислэг",
    "Хувийн зардал",
    "Аялалын даатгал",
    "Зочид буудлын нэмэлт",
  ],
};
 
const navLinks = [
  { href: "index.html",        label: "Нүүр" },
  { href: "destinations.html", label: "Газрууд" },
  { href: "packages.html",     label: "Аяллууд" },
  { href: "map.html",          label: "Маршрут" },
];
 
const footerLinks = [
  { href: "destinations.html", label: "Газрууд" },
  { href: "packages.html",     label: "Аяллууд" },
  { href: "map.html",          label: "Маршрут" },
  { href: "login.html",        label: "Нэвтрэх" },
];
 
 
function Nav() {
  return (
    <header className="nav">
      <nav>
        <a href="index.html" className="nav__logo">
          NOMADIC HORIZON
        </a>
 
        <ul className="nav__menu">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className="nav__link">
                {label}
              </a>
            </li>
          ))}
        </ul>
 
        <div className="nav__actions">
          <a href="login.html" className="nav__action--ghost">
            Нэвтрэх
          </a>
          <a href="login.html#register" className="nav__action--primary">
            Бүртгүүлэх
          </a>
        </div>
      </nav>
    </header>
  );
}
 
function Hero({ image, alt, title, duration, groupSize, location }) {
  return (
    <section className="hero">
      <img src={image} alt={alt} className="hero__img" />
      <div className="hero__overlay" />
      <div className="hero__text">
        <h1 className="hero__title">{title}</h1>
        <div className="hero__meta">
          <span>{duration}</span>
          <span>{groupSize}</span>
          <span>{location}</span>
        </div>
      </div>
    </section>
  );
}
 
function HighlightCard({ title, text }) {
  return (
    <div className="highlight-card">
      <p className="highlight-card__title">{title}</p>
      <p className="highlight-card__text">{text}</p>
    </div>
  );
}
 
function IncludesSection({ included, excluded }) {
  return (
    <div className="includes">
      <h3 className="includes__heading includes__heading--included">
        Багцад багтсан
      </h3>
      <ul className="includes__list">
        {included.map((item) => (
          <li key={item} className="includes__item includes__item--included">
            {item}
          </li>
        ))}
      </ul>
 
      <h3 className="includes__heading includes__heading--excluded">
        Багтаагүй зүйлс
      </h3>
      <ul className="includes__list">
        {excluded.map((item) => (
          <li key={item} className="includes__item includes__item--excluded">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
 
function OrderBox({ price }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate]     = useState("");
 
  const formatted = price.toLocaleString("mn-MN") + "₮";
 
  return (
    <aside className="order-box">
      <div className="order-box__price-row">
        <span className="order-box__price">₮{price.toLocaleString("mn-MN")}</span>
        <span className="order-box__price-label">/ нэг хүнд</span>
      </div>
 
      <div className="order-box__date-row">
        <div className="input-group">
          <label htmlFor="start-date">Эхлэх огноо</label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="end-date">Дуусах огноо</label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
 
      <div className="order-box__total-row">
        <span>Нийт дүн</span>
        <span>{formatted}</span>
      </div>
 
      <button className="order-box__btn--primary" type="button">
        Одоо захиалах
      </button>
 
      <p className="order-box__note">
        Захиалгын эхний 24 цагт цуцлах боломжтой · Харилцаа баталгаажсаны дараа төлбөр
      </p>
 
      <button className="order-box__btn--secondary" type="button">
        Хадгалах жагсаалтад нэмэх
      </button>
    </aside>
  );
}
 
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <a href="index.html" className="footer__logo">
          Нүүдэл
        </a>
        <nav>
          <ul className="footer__nav">
            {footerLinks.map(({ href, label }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="footer__copy">
        2025 Нүүдэл. Бүх эрх хуулиар хамгаалагдсан.
      </p>
    </footer>
  );
}
 
 
export default function PackageDetailPage() {
  const {
    image, alt, title, duration, groupSize, location,
    description, price, highlights, included, excluded,
  } = packageDetail;
 
  return (
    <>
      <Nav />
 
      <Hero
        image={image}
        alt={alt}
        title={title}
        duration={duration}
        groupSize={groupSize}
        location={location}
      />
 
      <div className="page-layout">
        <main className="page-layout__main">
          <p className="about-text">{description}</p>
 
          <div className="highlight-grid">
            {highlights.map((h) => (
              <HighlightCard key={h.title} title={h.title} text={h.text} />
            ))}
          </div>
 
          <IncludesSection included={included} excluded={excluded} />
        </main>
 
        <OrderBox price={price} />
      </div>
 
      <Footer />
    </>
  );
}