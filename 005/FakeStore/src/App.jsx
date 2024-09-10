import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    setIsLoading(true);
    getProducts();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  const getProducts = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setIsLoading(false);
        setProducts(json);
      });
  };

  const getCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => {
        setCategories(json);
      });
  };

  const handleCategory = (categItem) => {
    fetch(`https://fakestoreapi.com/products/category/${categItem}`)
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
      });
  };

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const toggleCartView = () => {
    setShowCart(!showCart);
  };


  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };


  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="app">
      <header className="header">
        <a href="../layout/index.html">
          <img src="/src/assets/images/cat.png" alt="" className="home" />
        </a>
        <div className="search">
          <input
            type="text"
            id="search-input"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search"
          />
          <i className="fa fa-search" aria-hidden="true"></i>
        </div>
        <div>
          <input type="checkbox" className="checkbox" id="checkbox" />
          <label htmlFor="checkbox" className="checkbox-label">
            <i className="fa fa-sun-o" aria-hidden="true"></i> &nbsp;
            <i className="fa fa-moon-o" aria-hidden="true"></i>
            <span className="ball"></span>
          </label>
        </div>
        <nav>
          <a href="../layout/login.html" className="register-button">
            My Account<i className="fa fa-user" aria-hidden="true"></i>
          </a>
        </nav>
        <button className="basket-icon" onClick={toggleCartView}>
          <i className="fa fa-shopping-basket" aria-hidden="true"></i>
          <span id="basket-count">{cart.length}</span>
        </button>
      </header>

      {isLoading && <h1>Loading!!!!</h1>}

      <div id="categories">
        <button onClick={getProducts}>All Products</button>
        {categories.map((item) => (
          <button key={item} onClick={() => handleCategory(item)}>
            {item}
          </button>
        ))}
      </div>

      <div className="products">
        {filteredProducts.map((item) => (
          <div key={item.id} className="product">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>Price: {item.price}$</p>
            <span>{item.description}</span>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {showCart && (
        <div className="cart-modal">
          <h2>Cart</h2>
          {cart.length === 0 ? (
            <p>No items in the cart</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="cart-item">
                <h4>{item.title}</h4>
                <p>Price: {item.price}$</p>
                <button
                  className="remove-item"
                  onClick={() => removeFromCart(index)}
                >
                  <i className="fa fa-times" aria-hidden="true"></i>
                </button>
              </div>
            ))
          )}
          <button className="close-cart" onClick={toggleCartView}>
            Close Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default App;