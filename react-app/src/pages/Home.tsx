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
          <li>Product list in a grid with pagination (limit and skip)</li>
          <li>Sort by field and order (sortBy, order)</li>
          <li>Search by keyword with debounced input (/products/search)</li>
          <li>Category filter, with the category list loaded from /products/categories</li>
          <li>Product detail page with image gallery, price, discount, rating, stock and reviews</li>
          <li>Loading skeletons, empty state and error state with retry</li>
        </ul>
        <h3>Auth</h3>
        <ul>
          <li>Login form with validation (/auth/login)</li>
          <li>Token storage and attaching it to requests</li>
          <li>Current user profile page (/auth/me)</li>
          <li>Token refresh handling (/auth/refresh)</li>
          <li>Protected routes that redirect to login</li>
          <li>Logout</li>
        </ul>
        <h3>Cross-cutting behavior</h3>
        <ul>
          <li>Client-side routing with deep links (e.g. /products/12, /category/laptops)</li>
          <li>URL-synced state for search, filter, sort and page</li>
          <li>Responsive layout</li>
          <li>Form handling and validation</li>
          <li>Error boundaries and a 404 page</li>
        </ul>      
        <span>Note that this project is a study, and will not be maintained. It is also styled minimally, since the point of the study isn't to learn styling.</span>
      </div>
      <div className={styles.spacer} />
      <a className={styles.link} href="/product">Products</a>
    </section>
  </>
}

export default Home;

registerRoute({ path: "/", element: <Home /> });
