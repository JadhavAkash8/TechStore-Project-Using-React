import "./CartSidebar.css";

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  cartTotal,
  cartCount,
}) {
  return (
    <>
      {/* Overlay Backdrop */}
      <div
        className={`cart-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <aside className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="cart-sidebar-header">
          <div className="cart-sidebar-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <h2>Your Cart</h2>
            {cartCount > 0 && (
              <span className="cart-sidebar-count">{cartCount}</span>
            )}
          </div>
          <button className="cart-sidebar-close" onClick={onClose} title="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="cart-sidebar-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="cart-empty-icon">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <p className="cart-empty-title">Your cart is empty</p>
              <p className="cart-empty-subtitle">Add some products to get started</p>
              <button className="cart-empty-btn" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <p className="cart-item-price">₹{item.price.toLocaleString()}</p>
                  <div className="cart-item-controls">
                    <div className="qty-controls">
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="12" y1="5" x2="12" y2="19"/>
                          <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                      </button>
                    </div>
                    <button
                      className="cart-item-remove"
                      onClick={() => onRemoveItem(item.id)}
                      title="Remove item"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                      </svg>
                    </button>
                  </div>
                  <p className="cart-item-subtotal">
                    Subtotal: ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Total */}
        {cartItems.length > 0 && (
          <div className="cart-sidebar-footer">
            <div className="cart-total-row">
              <span>Subtotal ({cartCount} items)</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            <div className="cart-total-row shipping">
              <span>Shipping</span>
              <span className="free-shipping">FREE</span>
            </div>
            <div className="cart-total-row grand-total">
              <span>Total</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            <button className="checkout-btn">
              Proceed to Checkout
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
