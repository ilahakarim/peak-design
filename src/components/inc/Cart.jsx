import { useContext } from "react";
import { DATA } from "../../Context/Context";

function Cart({ isOpen, onClose }) {
  const { cart: items, updateQuantity, removeFromCart, clearCart } = useContext(DATA);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Called when the checkout button is clicked
  function handleCheckout() {
    alert("Your order has been placed! Thank you.");
    clearCart();
    onClose();
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-50 shadow-xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
          <h2 className="text-lg font-bold tracking-wide">
            CART {items.length > 0 && <span className="font-normal text-slate-400 text-sm">{itemCount} Item{itemCount > 1 ? "s" : ""}</span>}
          </h2>
          <button onClick={onClose} aria-label="Close cart" className="border border-slate-300 rounded-md p-2 hover:bg-slate-50 cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M18 6L6 18" stroke="black" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8 text-center">
            <h3 className="text-3xl font-bold">YOUR CART IS EMPTY.</h3>
            <p className="text-slate-500">Let's fix that, shall we?</p>
            <button onClick={onClose} className="bg-black text-white font-semibold text-sm tracking-wide px-8 py-4 rounded-md hover:bg-slate-800 cursor-pointer">
              SHOP BEST SELLERS
            </button>
          </div>
        ) : (
          /* Item list */
          <div className="flex-1 overflow-y-auto px-8 py-6">
            {items.map((item) => (
              <div key={item.cartKey || item.id} className="flex gap-4 pb-6 mb-6 border-b border-slate-100 last:border-0">
                <div className="w-20 h-20 bg-slate-100 rounded-md shrink-0 overflow-hidden">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      {item.size && <p className="text-sm text-slate-500">Size: {item.size}</p>}
                      {item.color && <p className="text-sm text-slate-500">Color: {item.color}</p>}
                    </div>
                    <button onClick={() => removeFromCart(item.cartKey || item.id)} aria-label="Remove item" className="text-slate-400 hover:text-black shrink-0 cursor-pointer">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-4">
                      <button onClick={() => updateQuantity(item.cartKey || item.id, -1)} aria-label="Decrease quantity" className="w-6 h-6 flex items-center justify-center text-lg cursor-pointer">−</button>
                      <span className="text-sm w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cartKey || item.id, 1)} aria-label="Increase quantity" className="w-6 h-6 flex items-center justify-center text-lg cursor-pointer">+</button>
                    </div>
                    <p className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          /* Footer */
          <div className="border-t border-slate-100 px-8 py-6">
            <div className="flex justify-between font-bold mb-2">
              <span>SUBTOTAL</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-500 mb-6">
              <span>Shipping & Taxes</span>
              <span>Calculated at checkout</span>
            </div>
            <button onClick={handleCheckout} className="w-full bg-black hover:bg-slate-800 text-white font-semibold tracking-wide py-4 rounded-md cursor-pointer">
              CHECKOUT
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;