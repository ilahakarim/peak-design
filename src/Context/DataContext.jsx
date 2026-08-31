import { useEffect, useState } from 'react'
import getProduct from '../components/data/api'
import { DATA } from './Context'

// Two cart lines are "the same" only if product id, size and color all match.
// This lets the same product be in the cart multiple times with different sizes/colors.
function getCartKey(item) {
    return [item.id, item.size || '', item.color || ''].join('__')
}

function loadFromStorage(key, fallback) {
    try {
        const saved = localStorage.getItem(key)
        return saved ? JSON.parse(saved) : fallback
    } catch {
        return fallback
    }
}

function DataContext({ children }) {
    const [mehsul, setMehsul] = useState([])
    const [cart, setCart] = useState(() => loadFromStorage('cart', []))
    const [wishlist, setWishlist] = useState(() => loadFromStorage('wishlist', []))

    // Load the product list on first render
    useEffect(() => {
        async function loadProducts() {
            const items = await getProduct()
            setMehsul(items)
        }
        loadProducts()
    }, [])

    // Keep cart and wishlist saved, so they survive a page refresh
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }, [wishlist])

    // Add a product to the cart. If the same product + size + color is
    // already there, just increase its quantity instead of duplicating it.
    function addToCart(product) {
        const key = getCartKey(product)
        setCart((prev) => {
            const existing = prev.find((item) => getCartKey(item) === key)
            if (existing) {
                return prev.map((item) =>
                    getCartKey(item) === key ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prev, { ...product, cartKey: key, quantity: 1 }]
        })
    }

    // Change quantity (+1 / -1). Removed automatically once it hits 0.
    function updateQuantity(cartKey, delta) {
        setCart((prev) =>
            prev
                .map((item) => (item.cartKey === cartKey ? { ...item, quantity: item.quantity + delta } : item))
                .filter((item) => item.quantity > 0)
        )
    }

    function removeFromCart(cartKey) {
        setCart((prev) => prev.filter((item) => item.cartKey !== cartKey))
    }

    // Empty the cart after an order is placed
    function clearCart() {
        setCart([])
    }

    // Add / remove from wishlist (toggle)
    function toggleWishlist(id) {
        setWishlist((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        )
    }

    const value = { mehsul, cart, addToCart, updateQuantity, removeFromCart, clearCart, wishlist, toggleWishlist }

    return <DATA.Provider value={value}>{children}</DATA.Provider>
}

export default DataContext