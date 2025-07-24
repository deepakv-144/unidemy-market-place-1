"use client"

import type React from "react"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

// Types
export interface Product {
  id: number
  title: string
  price: number
  originalPrice?: number
  image: string
  category: string
  condition: string
  location: string
  timeAgo: string
  seller: {
    name: string
    rating: number
    verified: boolean
  }
  description?: string
  specifications?: Record<string, string>
}

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  phone?: string
  location?: string
  memberSince?: string
}

export type CartItem = Product & { quantity: number }

interface AppState {
  user: User | null
  wishlist: Product[]
  cart: CartItem[]
  isAuthenticated: boolean
}

type AppAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "ADD_TO_WISHLIST"; payload: Product }
  | { type: "REMOVE_FROM_WISHLIST"; payload: number }
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "UPDATE_CART_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "MOVE_TO_CART"; payload: CartItem }

const initialState: AppState = {
  user: null,
  wishlist: [],
  cart: [],
  isAuthenticated: false,
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        wishlist: [],
        cart: [],
      }
    case "ADD_TO_WISHLIST":
      if (state.wishlist.find((item) => item.id === action.payload.id)) {
        return state
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      }
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload),
      }
    case "ADD_TO_CART": {
      const item = action.payload
      const existing = state.cart.find((p) => p.id === item.id)
      return {
        ...state,
        cart: existing
          ? state.cart.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p))
          : [...state.cart, item],
      }
    }

    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((p) => p.id !== action.payload) }

    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((p) => (p.id === action.payload.id ? { ...p, quantity: action.payload.quantity } : p)),
      }

    case "CLEAR_CART":
      return { ...state, cart: [] }

    case "MOVE_TO_CART": {
      // remove from wishlist (if present) and add to cart
      const newWishlist = state.wishlist.filter((w) => w.id !== action.payload.id)
      const existing = state.cart.find((p) => p.id === action.payload.id)
      return {
        ...state,
        wishlist: newWishlist,
        cart: existing
          ? state.cart.map((p) =>
              p.id === action.payload.id ? { ...p, quantity: p.quantity + action.payload.quantity } : p,
            )
          : [...state.cart, action.payload],
      }
    }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("unidemy-state")
    if (savedState) {
      const parsedState = JSON.parse(savedState)
      if (parsedState.user) {
        dispatch({ type: "LOGIN", payload: parsedState.user })
      }
      parsedState.wishlist?.forEach((item: Product) => {
        dispatch({ type: "ADD_TO_WISHLIST", payload: item })
      })
      if (parsedState.cart) {
        parsedState.cart.forEach((item: CartItem) => dispatch({ type: "ADD_TO_CART", payload: item }))
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("unidemy-state", JSON.stringify(state))
  }, [state])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }
  return context
}
