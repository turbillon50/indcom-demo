'use client'
import { create } from 'zustand'

interface CartItem { id: string; nombre: string; precio: number; qty: number }

interface Store {
  carrito: CartItem[]
  addCarrito: (item: { id: string; nombre: string; precio: number }) => void
  removeCarrito: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCarrito: () => void
}

export const useStore = create<Store>((set) => ({
  carrito: [],
  addCarrito: (item) => set((s) => {
    const ex = s.carrito.find(c => c.id === item.id)
    if (ex) return { carrito: s.carrito.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c) }
    return { carrito: [...s.carrito, { ...item, qty: 1 }] }
  }),
  removeCarrito: (id) => set((s) => ({ carrito: s.carrito.filter(c => c.id !== id) })),
  updateQty: (id, qty) => set((s) => ({ carrito: s.carrito.map(c => c.id === id ? { ...c, qty } : c) })),
  clearCarrito: () => set({ carrito: [] }),
}))
