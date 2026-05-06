import { useState } from "react";
 
 
const packages = [
  {
    id: 1,
    image: "https://source.unsplash.com/featured/700x500/?gobi,mongolia",
    alt: "Говь",
    duration: "5 хоног",
    groupSize: "2–12 хүн",
    title: "Өмнөговийн аялал",
    description: "Хонгорын элс, Баянзаг, Молцог элс. Тэмээ унана, гэрт хоноглоно.",
    tags: ["Гэр буудал", "Цөлийн аялал"],
    price: "450,000₮",
  },
  {
    id: 2,
    image: "https://source.unsplash.com/featured/700x500/?khovsgol,lake,mongolia",
    alt: "Хөвсгөл",
    duration: "4 хоног",
    groupSize: "2–8 хүн",
    title: "Хөвсгөл далайн эргийн аялал",
    description: 'Монголын "Далай нуур"-ын дэргэд загас барьж, дугуй унаж, гэрт хононо.',
    tags: ["Гэр буудал", "Нуурын эргийн аялал"],
    price: "380,000₮",
  },
  {
    id: 3,
    image: "https://source.unsplash.com/featured/700x500/?terelj,mongolia",
    alt: "Тэрэлж",
    duration: "2 хоног",
    groupSize: "2–15 хүн",
    title: "Тэрэлжийн уулын аялал",
    description: "УБ-аас 80 км зайд хаданд авиран гэрт болон хээрээр хоноглох.",
    tags: ["Гэр буудал", "Хээрийн аялал", "Хаданд авиралт"],
    price: "144,000₮",
  },
  {
    id: 4,
    image: "https://source.unsplash.com/featured/700x500/?khentii,forest,mongolia",
    alt: "Хэнтий",
    duration: "7 хоног",
    groupSize: "4–10 хүн",
    title: "Хэнтийн аялал",
    description: "Чингис хааны нутаг Хэнтийн ой тайгаар морин аялал хийнэ.",
    tags: ["Хээрийн аялал", "Морин аялал"],
    price: "320,000₮",
  },
  {
    id: 5,
    image: "https://source.unsplash.com/featured/700x500/?altai,mongolia",
    alt: "Алтай",
    duration: "6 хоног",
    groupSize: "2–8 хүн",
    title: "Алтайн бүргэд агнуур",
    description: "Баян-Өлгийд Казах бүргэдчидтэй хамт бүргэд ашиглан ан агнана.",
    tags: ["Гэр буудал", "Хээрийн аялал", "Бүргэд агнуур"],
    price: "550,000₮",
  },
  {
    id: 6,
    image: "https://source.unsplash.com/featured/700x500/?mongolia,steppe",
    alt: "Тал",
    duration: "3 хоног",
    groupSize: "2–20 хүн",
    title: "Тал нутгийн аялал",
    description:
      "Гэрт хонон Монгол нүүдлийн соёл, ардын тоглоомыг тоглон танилцана.",
    tags: ["Гэр буудал", "Монгол ахуй"],
    price: "210,000₮",
  },
];
 
const navLinks = [
  { href: "index.html",        label: "Нүүр" },
  { href: "destinations.html", label: "Газрууд" },
  { href: "packages.html",     label: "Аяллууд", active: true },
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
          {navLinks.map(({ href, label, active }) => (
            <li key={href}>
              <a
                href={href}
                className={`nav__link${active ? " nav__link--active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
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
 
function ProductTag({ label }) {
  return <span className="product-tag">{label}</span>;
}
 
function ProductCard({ pkg }) {
  const { image, alt, duration, groupSize, title, description, tags, price } = pkg;
 
  return (
    <a href="package-detail.html" className="product-card">
      <div className="product-card__image">
        <img src={image} alt={alt} />
      </div>
 
      <div className="product-card__body">
        <div className="product-card__meta">
          <span>{duration}</span>
          <span>{groupSize}</span>
        </div>
 
        <h2 className="product-card__title">{title}</h2>
        <p className="product-card__description">{description}</p>
 
        <div className="product-card__tags">
          {tags.map((tag) => (
            <ProductTag key={tag} label={tag} />
          ))}
        </div>
 
        <div className="product-card__footer">
          <div>
            <p className="product-card__price-label">Нэг хүн</p>
            <p className="product-card__price">{price}</p>
          </div>
          <span className="product-card__btn">Дэлгэрэнгүй</span>
        </div>
      </div>
    </a>
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
 
 
export default function PackagesPage() {
  return (
    <>
      <Nav />
      <main>
        <h1 className="section-heading">Онцлох багцууд</h1>
        <div className="product-grid">
          {packages.map((pkg) => (
            <ProductCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
 