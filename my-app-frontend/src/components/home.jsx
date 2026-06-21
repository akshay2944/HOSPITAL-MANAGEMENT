import React, { useState, useEffect, useRef } from "react";
import products from "../constant.jsx";

// ── Toast notification ──────────────────────────────────────────────────────
function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce-in">
      <div className="flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-sm font-medium">
        <span className="text-green-400">✓</span>
        {message}
      </div>
    </div>
  );
}

// ── Cart drawer ─────────────────────────────────────────────────────────────
function CartDrawer({ cartItems, onClose, onRemove }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">
            Your Cart
            <span className="ml-2 bg-indigo-100 text-indigo-600 text-xs font-semibold px-2 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3">
            <span className="text-6xl">🛒</span>
            <p className="text-sm">Your cart is empty</p>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-gray-50 px-4 py-2">
              {cartItems.map((item, i) => (
                <li key={i} className="flex items-center gap-3 py-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover bg-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-indigo-600 font-bold text-sm">
                      ₹{item.price}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove(i)}
                    className="text-gray-300 hover:text-red-400 transition text-lg"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            <div className="px-6 py-5 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-semibold text-gray-800">₹{total}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>Delivery</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-2xl transition active:scale-95">
                Checkout · ₹{total}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

// ── Star rating display ─────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <span className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-3.5 h-3.5 ${
            s <= Math.round(rating)
              ? "text-yellow-400"
              : "text-gray-200"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-400 ml-1">{rating}</span>
    </span>
  );
}

// ── Product card ────────────────────────────────────────────────────────────
function ProductCard({ product, onAddToCart, isWished, onWishToggle }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
        />
        {/* Wishlist */}
        <button
          onClick={() => onWishToggle(product.id)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow hover:scale-110 transition"
        >
          <span className={isWished ? "text-red-500" : "text-gray-300"}>
            ♥
          </span>
        </button>
        {/* Category pill */}
        <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full font-medium">
          {product.category}
        </span>
        {/* Sale badge example */}
        {product.price < 500 && (
          <span className="absolute bottom-3 left-3 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
            Great deal
          </span>
        )}
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-sm font-semibold text-gray-800 line-clamp-1 mb-1">
          {product.name}
        </h2>
        <p className="text-xs text-gray-400 line-clamp-2 flex-1">
          {product.description}
        </p>

        <Stars rating={product.rating} />

        <div className="flex items-center justify-between mt-3 mb-4">
          <span className="text-xl font-bold text-indigo-600">
            ₹{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 ${
            added
              ? "bg-green-500 text-white"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {added ? "✓ Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

// ── Main Home component ─────────────────────────────────────────────────────
export default function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [wished, setWished] = useState(new Set());
  const [sortBy, setSortBy] = useState("default");
  const searchRef = useRef(null);

  // Derive categories from products
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter + sort
  const visible = products
    .filter((p) => {
      const matchCat =
        activeCategory === "All" || p.category === activeCategory;
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
    setToast(`${product.name} added to cart`);
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleWish = (id) => {
    setWished((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Keyboard shortcut: "/" focuses search
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "/" && document.activeElement !== searchRef.current) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const aiSuggestions = [
    { label: "🤖 AI Picks", text: "Smartphones with AI features" },
    { label: "🏠 Smart Home", text: "AI-powered home assistants" },
    { label: "⚡ Productivity", text: "AI-driven productivity tools" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          {/* Logo */}
          <a href="/my-store" className="text-xl font-extrabold text-gray-900 tracking-tight shrink-0">
            My<span className="text-indigo-600">Store</span>
          </a>

          {/* Search */}
          <div className="flex-1 relative max-w-md mx-auto">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              ref={searchRef}
              type="text"
              placeholder='Search products… (press "/")'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-10 py-2 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>

          {/* Cart button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative shrink-0 flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition active:scale-95"
          >
            <span>🛒</span>
            <span className="hidden sm:inline">Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ── Hero banner ── */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-indigo-200 text-sm font-medium mb-1 tracking-wide uppercase">
              Summer Sale — Up to 40% off
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Welcome to Our Store
            </h1>
            <p className="text-indigo-100 text-sm max-w-sm">
              Discover amazing products. New arrivals every week, curated just for you.
            </p>
            <button className="mt-5 bg-white text-indigo-700 font-bold text-sm px-6 py-2.5 rounded-2xl hover:bg-indigo-50 transition active:scale-95">
              Shop Now →
            </button>
          </div>
          <div className="flex gap-6 text-center shrink-0">
            {[["10k+", "Products"], ["4.8★", "Avg Rating"], ["Free", "Delivery"]].map(([val, label]) => (
              <div key={label}>
                <p className="text-2xl font-extrabold">{val}</p>
                <p className="text-indigo-200 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── AI Suggestions ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          AI Suggestions
        </p>
        <div className="flex flex-wrap gap-2">
          {aiSuggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => setSearch(s.text)}
              className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-100 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full transition"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Category tabs + Sort ── */}
      <div className="sticky top-16 z-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex gap-2 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm font-medium px-4 py-1.5 rounded-full whitespace-nowrap transition ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-200 rounded-xl px-3 py-1.5 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 shrink-0"
          >
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* ── Product grid ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Result count */}
        <p className="text-sm text-gray-400 mb-5">
          Showing <span className="font-semibold text-gray-700">{visible.length}</span> product{visible.length !== 1 ? "s" : ""}
          {activeCategory !== "All" && (
            <> in <span className="font-semibold text-indigo-600">{activeCategory}</span></>
          )}
          {search && (
            <> for <span className="font-semibold text-indigo-600">"{search}"</span></>
          )}
        </p>

        {visible.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-lg font-semibold text-gray-600">No products found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="mt-4 text-sm text-indigo-600 underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {visible.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                isWished={wished.has(product.id)}
                onWishToggle={toggleWish}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── Cart drawer ── */}
      {cartOpen && (
        <CartDrawer
          cartItems={cartItems}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
        />
      )}

      {/* ── Toast ── */}
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}