export const T = {
  primary: "#855312",
  primaryContainer: "#c68b46",
  primaryFixed: "#ffddbb",
  primaryFixedDim: "#fbba70",
  onPrimary: "#ffffff",
  onPrimaryFixed: "#2b1700",
  onPrimaryContainer: "#472800",
  secondary: "#904c31",
  secondaryContainer: "#fea685",
  tertiary: "#685e38",
  tertiaryContainer: "#b8ab7f",
  onTertiary: "#ffffff",
  onTertiaryContainer: "#483f1d",
  surface: "#fff8f1",
  surfaceContainer: "#f8edd8",
  surfaceContainerLow: "#fef2dd",
  surfaceContainerHigh: "#f3e7d2",
  surfaceContainerHighest: "#ede1cd",
  surfaceContainerLowest: "#ffffff",
  onSurface: "#201b0e",
  onSurfaceVariant: "#514539",
  outline: "#837467",
  outlineVariant: "#d5c3b4",
  background: "#fff8f1",
};

export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;0,900;1,400&family=Work+Sans:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{font-family:'Work Sans',sans-serif;background:#fff8f1;color:#201b0e;-webkit-font-smoothing:antialiased;line-height:1.6;overflow-x:hidden}
  h1,h2,h3,h4{font-family:'Noto Serif',serif}
  ::selection{background:#ffddbb;color:#2b1700}
  .material-symbols-outlined{font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;user-select:none}
  @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
  .fu{animation:fadeUp .5s ease both}
  .fu1{animation:fadeUp .5s .05s ease both}
  .fu2{animation:fadeUp .5s .15s ease both}
  .fu3{animation:fadeUp .5s .25s ease both}
  .fu4{animation:fadeUp .5s .35s ease both}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
  .pulse{animation:pulse 2s infinite}
  .card-lift{transition:transform .25s ease,box-shadow .25s ease;cursor:pointer}
  .card-lift:hover{transform:translateY(-4px);box-shadow:0 16px 32px rgba(32,27,14,.10)}
  input:focus{outline:none}
  button{cursor:pointer}
  a{text-decoration:none;color:inherit}
  ::-webkit-scrollbar{width:6px}
  ::-webkit-scrollbar-thumb{background:#d5c3b4;border-radius:3px}
  .nh-nav-desktop{display:flex;gap:28px;align-items:center}
  .nh-mobile-toggle{display:none}
  @media(max-width:768px){
    .nh-nav-desktop{display:none!important}
    .nh-mobile-toggle{display:flex!important}
    .nh-header-actions .nh-ghost{display:none}
  }
`;