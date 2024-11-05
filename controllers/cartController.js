import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.userId });

  try {
    if (!cart) {
      cart = new Cart({ userId: req.userId, items: [{ productId, quantity }] });
    } else {
      const item = cart.items.find(
        (item) => item.productId.toString() === productId
      );
      item
        ? (item.quantity += quantity)
        : cart.items.push({ productId, quantity });
    }
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

export const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await Cart.findOne({ userId: req.userId });

  try {
    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (item) {
      item.quantity = quantity;
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ error: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update cart" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.userId },
      { $pull: { items: { productId: req.params.productId } } },
      { new: true }
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
};
