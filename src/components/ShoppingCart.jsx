import { useEffect } from 'react';
import Button from './Button';

function ShoppingCart({
  cart,
  setCart,
  products,
  setProducts,
  registerAddToCart
}) {
  // Add product to cart
  const addToCart = (product) => {
    // Check if product has stock
    const productInState = products.find(p => p.id === product.id);
    if (productInState.stock <= 0) return;

    // Update stock
    setProducts(products.map(p =>
      p.id === product.id ? { ...p, stock: p.stock - 1 } : p
    ));

    // Add to cart
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

 // remove product from cart
  const removeFromCart = (productId) => {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    // Update product stock
    setProducts(products.map(p =>
      p.id === productId ? { ...p, stock: p.stock + 1 } : p
    ));

    // Update cart
    if (item.quantity > 1) {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      ));
    } else {
      setCart(cart.filter(item => item.id !== productId));
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  useEffect(() => {
    if (typeof registerAddToCart === 'function') {
      registerAddToCart(() => addToCart);
    }
  }, [registerAddToCart, addToCart]);

  // UI from Product Page Unchanged
  return (
    <div style={{
      width: '300px',
      padding: '15px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      alignSelf: 'flex-start'
    }}>
      <h3>Shopping Cart</h3>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul style={{ padding: 0, listStyle: 'none' }}>
            {cart.map(item => (
              <li key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: '1px solid #ddd'
              }}>
                <div>
                  <strong>{item.title}</strong> × {item.quantity}
                  <div>${item.price * item.quantity}</div>
                </div>
                <Button
                  onClick={() => removeFromCart(item.id)}
                  variant="danger"
                >
                  −
                </Button>
              </li>
            ))}
          </ul>

          <div style={{
            marginTop: '15px',
            padding: '10px 0',
            borderTop: '2px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <strong>Total:</strong>
            <strong>${totalPrice}</strong>
          </div>

          <Button
            onClick={() => alert(`Checkout completed for $${totalPrice}!`)}
            variant="success"
            style={{ width: '100%', marginTop: '10px' }}
          >
            Checkout
          </Button>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;