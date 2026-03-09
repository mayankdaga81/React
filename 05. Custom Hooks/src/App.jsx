import "./App.css";
import { useCart } from "./hooks/useCard";
import { products } from "./data/product";
import ProductCard from "./componets/ProductCard";
import Cart from "./componets/Cart";

function App() {
  const { cart, addToCart, removeFromCart, updateQuantity, total } = useCart();

  return (
    <>
      <div className="app">
        <header>
          <h1>Shopping card</h1>
        </header>
        <main className="products">
          <section>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </section>
          <section>
            <Cart
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
              total={total}
            />
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
