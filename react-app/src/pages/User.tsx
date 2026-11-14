import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { type User } from "../interfaces/user";
import { registerRoute } from "../routeRegistry";
import styles from './User.module.css';

function User() {
  const { auth } = useAuth();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    if (auth.accessToken) {
      fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${auth.accessToken}`,
        },
      })
        .then(r => r.json())
        .then(d => setUser(d));
    }
  }, [auth.accessToken]);
  if (!auth.user) return <p>Please log in.</p>;
  return <>
    <div className={styles.table}>
      <div>Name</div>
      <div>{user?.firstName} {user?.lastName}</div>
      <div>Email</div>
      <div>{user?.email}</div>
      <div>Age</div>
      <div>{user?.age} Years</div>
      <div>Gender</div>
      <div>{user?.gender}</div>
    </div>
  </>
}

export default User;

registerRoute({ path: "/user", element: <User /> });
