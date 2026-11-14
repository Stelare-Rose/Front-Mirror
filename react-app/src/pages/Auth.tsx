import type { SubmitEvent } from "react";
import { registerRoute } from "../routeRegistry";
import styles from './Auth.module.css';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Auth() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    fetch("https://dummyjson.com/auth/login", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password
      }),
    })
      .then(r => r.json())
      .then(({ accessToken, refreshToken, ...user }) => {
        setAuth({ user, accessToken, refreshToken });
        navigate("/user");
      })
      .catch(e => console.log(e));
  }
  return <>
    <section className={styles.main}>
      <form id="Login" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label><br />
        <input type="text" id="username" name="username" required /><br />
        <label htmlFor="password">Password</label><br />
        <input type="password" id="password" name="password" required /><br />
        <button type="submit" >Login</button>
      </form>
    </section>
  </>
}

export default Auth;

registerRoute({ path: "/auth", element: <Auth /> });
