import { create } from "zustand";
import { createProducturl, loginurl, mainUrl, productsList, registerurl } from "../utls";

export const useProductStore = create((set) => ({
  products: [],
  user: null,
  token: null,

  setUser: (user, token) => set({ user, token }),

  register: async (userData) => {
    const res = await fetch(registerurl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (data.token) {
      set({ user: data.user, token: data.token });
      localStorage.setItem("token", data.token);
    }
    return data;
  },

  login: async (credentials) => {
    const res = await fetch(loginurl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (data.token) {
      set({ user: data.user, token: data.token });
      localStorage.setItem("token", data.token);
    }
    return data;
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("token");
  },

  fetchProducts: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, message: "Please login to view products." };
    }

    try {
      const res = await fetch(productsList, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      set({ products: data || [] });
    } catch (err) {
      console.log(`Error fetching products: ${err}`);
    }
  },

  createProduct: async (newProduct) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, message: "Please login to create a product." };
    }
    const res = await fetch(createProducturl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body:newProduct,
    });

    const data = await res.json();
    if (data.success) {
      set((state) => ({ products: [...state.products, data.product] }));
    }
    return data;
  },

  deleteProduct: async (pid) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, message: "Please login to delete a product." };
    }

    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data.success) {
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));
    }
    return data;
  },

  updateProduct: async (pid, updatedProduct) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, message: "Please login to update a product." };
    }

    const res = await fetch(`${mainUrl}/${pid}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    const data = await res.json();
    if (data.success) {
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));
    }
    return data;
  },
}));
