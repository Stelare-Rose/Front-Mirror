import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { AuthProvider } from "./context/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/product", label: "Products" },
  { to: "/auth", label: "Auth" },
  { to: "/user", label: "User" }
];

function Layout() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/test")
      .then(r => r.json())
      .then(data => setConnected(data.status === "ok"))
      .catch(() => setConnected(false));
  }, []);

  return (
    <AuthProvider>
      <div className={styles.app}>
        <header className={styles.header}>
          <h1>
            Mirror Study <span className={styles.gradientText}>(React)</span>
          </h1>
          <div style={{ textAlign: "center" }}>{connected ? "Successfully Connected!" : "Unsuccessful Connection :("}</div>
        </header>

        <div className={styles.body}>
          <aside className={styles.sidebar}>
            <nav className={styles.nav}>
              {links.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </aside>

          <main className={styles.content}>
            <Outlet />
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}

export default Layout;
