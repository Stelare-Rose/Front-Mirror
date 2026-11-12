import { useEffect, useState } from "react";
import type { Product } from "../interfaces/products";
import { registerRoute } from "../routeRegistry";
import styles from './Home.module.css';

function Home(){
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(r => { if(!r.ok) throw new Error(`${r.status}`); 
        return r.json()})
      .then(data => { setProducts(data.products); console.log(data)})
      .catch(err => console.log(err));
  }, [])
  console.log(products);
  return <>
    <section className={styles.main}>
      <div className={styles.explanation}>
        <span>This project is a study written in React. This project uses the <a href="https://dummyjson.com/">DummyJSON Project</a> The following features are meant to be implemented:</span>
        <h3>Products</h3>
        <ul>
          <li>Product list with pagination (limit and skip)</li>
          <li>Search by keyword with debounced input (/products/search)</li>
        </ul>
        <h3>Auth</h3>
        <ul>
          <li>Login form with validation (/auth/login)</li>
          <li>Current user profile page (/auth/me)</li>
          <li>Logout</li>
        </ul>
        <span>Note that this project is a study, and will not be maintained. It is also styled minimally, since the point of the study isn't to learn styling.</span>
      </div>
    </section>
  </>
}

export default Home;

registerRoute({ path: "/", element: <Home /> });
