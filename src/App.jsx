import ProductCard from "./components/ProductCard";
import CartSidebar from "./components/CartSidebar";
import "./App.css";
import products from "./components/data.js";
import { useState, useEffect } from "react";

function App() {
  
    const allBrands = [...new Set(products.map(p=>p.brand))];
    //state
    //Cart- array of products in cart
    const [cartItems, setCartItems] = useState(()=>{
      const savedCart = localStorage.getItem("techstore-cart");

      if(savedCart)
      {
        try{
          return JSON.parse(savedCart);
        }catch (error){
          console.error("Problem!!!",error);
          return [];
        }
      }
      return [];
    });

      useEffect(()=>{
        localStorage.setItem("techstore-cart",JSON.stringify(cartItems));
      },[cartItems]);











    //Wishlist
    const [wishlist, setWishlist] = useState(()=>{
      const savedWishlist = localStorage.getItem("techstore-wishList");

      if(savedWishlist)
      {
        try{
          return JSON.parse(savedWishlist);
        }catch (error){
          console.error("Problem!!!",error);
          return [];
        }
      }
      return [];
    });

      useEffect(()=>{
        localStorage.setItem("techstore-wishList",JSON.stringify(wishlist));
      },[wishlist]);


    
    //searchbot
    const [searchTerm, setSearchTerm] = useState("");
    
    //Brand filter
    const [selectBrand, setSelectBrand] = useState("All");
    
    //Sort
    const [sortBy, setSortBy] = useState("");
    
    //
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
      return localStorage.getItem("techstore-theme") || "dark";
    });

    // Apply theme to document
    useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("techstore-theme", theme);
    }, [theme]);

    function toggleTheme() {
      setTheme(prev => prev === "dark" ? "light" : "dark");
    }

    function addToCart(product)
    {
      //check if cart item exists
      const existingItem = cartItems.find(item =>item.id ===product.id );
      //PRODUCT IS THERE IN THE CART
      if(existingItem)
      { 
         setCartItems(cartItems.map(item=>   //ARRAY OF OBJECTS
          item.id === product.id ? {...item,quantity : item.quantity+1}:item
         ))
      }
      else{
        //Product not there
        setCartItems([...cartItems,{...product,quantity:1}])
      }
    }

    // Update quantity of a cart item
    function updateQuantity(productId, newQty) {
      if (newQty < 1) return;
      setCartItems(cartItems.map(item =>
        item.id === productId ? { ...item, quantity: newQty } : item
      ));
    }

    // Remove item from cart
    function removeFromCart(productId) {
      setCartItems(cartItems.filter(item => item.id !== productId));
    }

    //Calculate Total number of cart Items
    const cartCount =cartItems.reduce((total, item)=> total +item.quantity,0);
    
    //Calculate  Total Price
    const cartTotal = cartItems.reduce((total,item)=> total+(item.price)*(item.quantity),0);

    //Wishlist function

    function toggleWishlist(productID)
    {
      if(wishlist.includes(productID))
      {
        //Already Existing - Remove it
        setWishlist(wishlist.filter(id=> id!== productID));
      }
      else{
        //NOT in wishlist - just add it
        setWishlist([...wishlist,productID])
      }
    }

    //step:1 FILTER BASED ON SEARCH [BASED ON NAME OR BRAND]
    let filteredProducts = products.filter(product => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        product.brand
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      
      const matchesBrand = selectBrand === "All" || product.brand === selectBrand;
      
      return matchesSearch && matchesBrand;
    });

    //Step:2 SORT BASED ON FILTERED PRODUCTS
    if (sortBy === "low-to-high") {
      filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-to-low") {
      filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
    }

  return(

    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="logo">
            <span className="logo-icon">◆</span>
            TechStore
          </a>

          <ul className="nav-links">
            <li>
              <a href="#products" className="nav-link">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Deals
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                About
              </a>
            </li>
          </ul>

          <div className="nav-actions">
            {/* Theme Toggle */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <div className="theme-toggle-track">
                <svg className="theme-icon sun-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
                <svg className="theme-icon moon-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
                <span className="theme-toggle-thumb" />
              </div>
            </button>

            {/* Cart Button */}
            <button
              className="nav-btn icon-btn cart-btn"
              title={`Cart Total: ₹${cartTotal.toLocaleString()}`}
              onClick={() => setIsCartOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>

            {/* Wishlist Button */}
            <button className="nav-btn icon-btn wishlist-nav-btn" title="Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist.length > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
              {wishlist.length > 0 && (
                <span className="wishlist-badge">{wishlist.length}</span>
              )}
            </button>

            <button className="nav-btn">Sign In</button>
            <button className="nav-btn primary">Shop Now</button>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        cartTotal={cartTotal}
        cartCount={cartCount}
      />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">New Arrivals 2025</p>
          <h1 className="hero-title">
            The Future of Tech
            <br />
            <span className="hero-highlight">Is Here.</span>
          </h1>
          <p className="hero-description">
            Discover the latest in premium technology. From powerful computers
            to cutting-edge smartphones, find everything you need in one place.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>Explore Products</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat">
            <span className="stat-number">200+</span>
            <span className="stat-label">Premium Products</span>
          </div>
          <div className="stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Customer Support</span>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section" id="products">
        <div className="section-header">
          <h2 className="section-title">Best Sellers</h2>
          <p className="section-subtitle">
            Our most popular products loved by customers
          </p>
        </div>

        {/* Filters & Search Bar */}
        <div className="filters-bar">
          <div className="search-wrapper">
            <svg className="search-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="search-clear" onClick={() => setSearchTerm("")}>✕</button>
            )}
          </div>

          <div className="filter-group">
            <label className="filter-label">Brand</label>
            <select
              className="filter-select"
              value={selectBrand}
              onChange={(e) => setSelectBrand(e.target.value)}
            >
              <option value="All">All Brands</option>
              {allBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Sort By</label>
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Default</option>
              <option value="low-to-high">Price: Low → High</option>
              <option value="high-to-low">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="results-count">
          Showing {filteredProducts.length} of {products.length} products
          {selectBrand !== "All" && <span className="active-filter"> · {selectBrand}</span>}
          {searchTerm && <span className="active-filter"> · "{searchTerm}"</span>}
        </p>

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((data) => (
              <ProductCard
                key={data.id}
                id={data.id}
                image={data.image}
                name={data.name}
                price={data.price}
                originalPrice={data.originalPrice}
                discount={data.discount}
                rating={data.rating}
                isBestSeller={data.isBestSeller}
                isWishlisted={wishlist.includes(data.id)}
                onAddToCart={() => addToCart(data)}
                onToggleWishlist={() => toggleWishlist(data.id)}
              />
            ))
          ) : (
            <div className="no-results">
              <span className="no-results-icon">🔎</span>
              <h3>No products found</h3>
              <p>Try adjusting your search or filters</p>
              <button className="btn-secondary" onClick={() => { setSearchTerm(""); setSelectBrand("All"); setSortBy(""); }}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Cart Summary (shown when items in cart) */}
      {cartItems.length > 0 && (
        <div className="cart-summary-bar" onClick={() => setIsCartOpen(true)}>
          <div className="cart-summary-content">
            <span className="cart-summary-items">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount} item{cartCount > 1 ? 's' : ''} in cart
            </span>
            <span className="cart-summary-total">Total: ₹{cartTotal.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 TechStore. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App; 
