import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

function Layout() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    fetch('https://dummyjson.com/test')
      .then(r => r.json())
      .then(data => { if(data.status == "ok") setConnected(true); else setConnected(false)});
  }, [])
  return (
    <div className={styles.app}>
      <h1>Mirror Study <span className={styles.gradientText}>(React)</span></h1>
      <div>{connected ? "Successfully Connected!" : "Unsuccessful Connection :("}</div>
      <div className={styles.body}>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
