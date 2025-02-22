import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import OrderForm from './pages/OrderForm';
import  Order from './pages/Order';
import './App.css';

function App() {
  const [orders, setOrders] = useState([]);

  const handleOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home orderCount={orders.length} />} />
          <Route path="/order" element={<OrderForm onOrder={handleOrder} />} />
          <Route path="/status" element={<Order order={orders[orders.length - 1]} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;