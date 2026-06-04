export function createEcommerceApp() {
  const products = [];
  const carts = new Map();
  const coupons = new Map();
  const orders = [];

  function addProduct({ title, sku, priceCents, stock }) {
    const product = { id: `prd_${products.length + 1}`, title, sku, priceCents, stock };
    products.push(product);
    return product;
  }

  function createCoupon({ code, discountCents }) {
    coupons.set(code, { code, discountCents });
    return coupons.get(code);
  }

  function addToCart({ userId, productId, quantity }) {
    const product = requireProduct(productId);
    if (product.stock < quantity) throw new Error("Insufficient stock.");
    const items = carts.get(userId) || [];
    items.push({ productId, quantity, unitPriceCents: product.priceCents });
    carts.set(userId, items);
    return items;
  }

  function checkout({ userId, couponCode }) {
    const items = carts.get(userId) || [];
    if (items.length === 0) throw new Error("Cart is empty.");

    for (const item of items) {
      const product = requireProduct(item.productId);
      if (product.stock < item.quantity) throw new Error("Insufficient stock.");
      product.stock -= item.quantity;
    }

    const subtotalCents = items.reduce((total, item) => total + item.unitPriceCents * item.quantity, 0);
    const discountCents = coupons.get(couponCode)?.discountCents || 0;
    const order = {
      id: `ord_${orders.length + 1}`,
      userId,
      items,
      subtotalCents,
      discountCents,
      totalCents: Math.max(0, subtotalCents - discountCents),
      paymentStatus: "pending",
    };
    orders.push(order);
    carts.delete(userId);
    return order;
  }

  function markPaid(orderId) {
    const order = orders.find((item) => item.id === orderId);
    if (!order) throw new Error("Order not found.");
    order.paymentStatus = "paid";
    return order;
  }

  function requireProduct(productId) {
    const product = products.find((item) => item.id === productId);
    if (!product) throw new Error("Product not found.");
    return product;
  }

  return { addProduct, createCoupon, addToCart, checkout, markPaid };
}

