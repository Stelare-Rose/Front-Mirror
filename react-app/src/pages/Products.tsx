import { useSearchParams } from "react-router-dom";
import { registerRoute } from "../routeRegistry";
import { useEffect, useState } from "react";
import type { Product } from "../interfaces/products";
import styles from "./Products.module.css";

function Product() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const limit = Number(params.get("limit") ?? 10);
  const skip = Number(params.get("skip") ?? 0);

  function goTo(newSkip: number) {
    setParams({ limit: String(limit), skip: String(newSkip) });
  }

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`, { signal: controller.signal })
      .then(r => r.json())
      .then(d => {
        setProducts(d.products) 
        setTotalProducts(d.total)
      })
      .catch(e => {
        if (e.name !== "AbortError") console.error(e);
      });
    
    return () => controller.abort();
  }, [limit, skip])
  return <>
    <section className={styles.body}>
      {products.map(p => (<div key={p.id}>{p.title} {p.price}$</div>))}
      <section className={styles.buttons}>
        <button onClick={() => goTo(Math.max(0, skip - limit))} disabled={skip === 0}>Prev</button>
        <div>Page {Math.floor(skip/limit) + 1} of {Math.ceil(totalProducts/limit)}</div>
        <button onClick={() => goTo(skip + limit)} disabled={skip + limit > totalProducts}>Next</button>
      </section>
    </section>
  </>
}
export default Product;

registerRoute({ path: "/product", element: <Product /> })
