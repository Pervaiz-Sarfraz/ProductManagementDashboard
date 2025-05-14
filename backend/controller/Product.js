import Product from "../models/Product.js";
import jwt from 'jsonwebtoken';

const getTokenFromHeader = (req) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  return authHeader.split(' ')[1];
};

export const creatProduct = async (req, res) => {
  const { name, price } = req.body;
  const token = getTokenFromHeader(req);

  if (!name || !price || !req.file) {
    return res.status(400).json({ success: false, message: "Please provide name, price, and image" });
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Authentication token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const product = new Product({
      name,
      price,
      image: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
      user: decoded.userId,
    });

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export const getProducts = async (req, res) => {
  const token = getTokenFromHeader(req);
  if (!token) {
    return res.status(401).json({ success: false, message: "Authentication token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_products = await Product.find({ user: decoded.userId });
    const productsWithImageUrls = user_products.map(product => ({
      ...product.toObject(),
      image: `${req.protocol}://${req.get('host')}/uploads/${product.image}`,
    }));
    res.json({ user_products: productsWithImageUrls, status: true });
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export const deteleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log('Error deleting product:', error.message);
    res.status(404).json({ success: false, message: "Product not found" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const token = getTokenFromHeader(req);

  if (!token) {
    return res.status(401).json({ success: false, message: "Authentication token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const updateData = {
      name,
      price,
      user: decoded.userId,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log('Error updating product:', error.message);
    res.status(404).json({ success: false, message: "Product not found" });
  }
};
export const getallproducts = async (req, res) => {
  const allproduct = await Product.find();
  res.json(allproduct);
};
