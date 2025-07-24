"use client"

import { useApp } from "@/lib/store"

export function useAuth() {
  const { state, dispatch } = useApp()

  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    login: (user: any) => dispatch({ type: "LOGIN", payload: user }),
    logout: () => dispatch({ type: "LOGOUT" }),
  }
}
