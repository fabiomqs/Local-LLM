import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <header className="navbar-shell">
      <nav className="navbar" aria-label="Primary navigation">
        <NavLink to="/" end className={({ isActive }) => getLinkClass(isActive)}>
          <HomeIcon />
          <span>Hábitos</span>
        </NavLink>
        <NavLink to="/stats" className={({ isActive }) => getLinkClass(isActive)}>
          <ChartIcon />
          <span>Estatísticas</span>
        </NavLink>
      </nav>
    </header>
  );
}

function getLinkClass(isActive: boolean): string {
  return isActive ? "navbar-link navbar-link-active" : "navbar-link";
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-9.5Z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 4a1 1 0 0 1 1 1v13h13a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm4 10.5a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 1V17h-3.5v-2.5Zm5-4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 1V17H14v-6.5Z" />
    </svg>
  );
}
