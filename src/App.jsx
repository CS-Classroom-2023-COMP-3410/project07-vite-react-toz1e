import { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const [cart, setCart] = useState([]);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const initialProducts = [
    {
      id: 1,
      title: 'Smartphone',
      description: 'Latest model with advanced features',
      price: 699,
      stock: 15,
      imageUrl: 'https://via.placeholder.com/300x150?text=Smartphone'
    },
    {
      id: 2,
      title: 'Laptop',
      description: 'Powerful laptop for work and gaming',
      price: 1299,
      stock: 8,
      imageUrl: 'https://via.placeholder.com/300x150?text=Laptop'
    },
    {
      id: 3,
      title: 'Headphones',
      description: 'Noise-cancelling wireless headphones',
      price: 249,
      stock: 23,
      imageUrl: 'https://via.placeholder.com/300x150?text=Headphones'
    },
    {
      id: 4,
      title: 'Smartwatch',
      description: 'Fitness tracking and notifications',
      price: 199,
      stock: 12,
      imageUrl: 'https://via.placeholder.com/300x150?text=Smartwatch'
    }
  ];

  const [products, setProducts] = useState(initialProducts);

  // Simple navigation state management
  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);

    // This could be expanded to handle page transition animations
    // or to update browser history for back/forward navigation
  };

  // Render the appropriate page based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'products':
        return <ProductsPage cart={cart} setCart={setCart} products={products} setProducts={setProducts} />;
      case 'cart':
        return <CartPage cart={cart} setCart={setCart} products={products} setProducts={setProducts} onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfilePage />;
      case 'home':
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {cartCount > 0 && (
        <div style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #eee',
          borderRadius: '8px'
        }}>
          Your Cart Has <strong>{cartCount} </strong> Item{cartCount !== 1 ? 's' : ''}
        </div>
      )}

      <main>
        {renderPage()}
      </main>

      <footer style={{
        marginTop: '50px',
        padding: '20px',
        borderTop: '1px solid #eee',
        textAlign: 'center',
        color: '#666'
      }}>
        <p>React Multi-Page Application</p>
      </footer>
    </div>
  );
}

export default App;