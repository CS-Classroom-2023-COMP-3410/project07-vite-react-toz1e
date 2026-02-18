import ShoppingCart from '../components/ShoppingCart';
import Button from '../components/Button';

function CartPage({ cart, setCart, products, setProducts, onNavigate }) {
  return (
    <div>
      <h1>Cart Page</h1>

      <div style={{ marginBottom: '15px' }}>
        <Button onClick={() => onNavigate('products')} variant="secondary">
          Continue Shopping
        </Button>
      </div>

      <ShoppingCart
        cart={cart}
        setCart={setCart}
        products={products}
        setProducts={setProducts}
        // CartPage does not need registerAddToCart
      />
    </div>
  );
}

export default CartPage;