export function cartTotal(items, options) {
  for (const { price, qty } of items) {
    if (typeof price !== "number" || !Number.isFinite(price) || price < 0) {
      throw new RangeError(`Invalid price: ${price}`);
    }
    if (!Number.isInteger(qty) || qty <= 0) {
      throw new RangeError(`Invalid qty: ${qty}`);
    }
  }
  if (items.length === 0) return 0;

  const { vatRate, freeShipFrom, shipFee } = options;
  const subtotal = items.reduce((sum, { price, qty }) => sum + price * qty, 0);
  const vat = Math.round(subtotal * vatRate);
  const shipping = subtotal >= freeShipFrom ? 0 : shipFee;
  return subtotal + vat + shipping;
}
