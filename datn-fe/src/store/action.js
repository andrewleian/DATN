import { SET_CART_TOTAL_ITEMS, SET_ISLOGIN, SET_CURRENT_PAGE_ADMIN } from "./constants";

export const setCartTotalItems = payload => (
    {
        type: SET_CART_TOTAL_ITEMS,
        payload
    }
)

export const setIsLogin = payload => (
    {
        type: SET_ISLOGIN,
        payload
    }
)

export const setCurrentPageAdmin = payload => (
    {
        type: SET_CURRENT_PAGE_ADMIN,
        payload
    }
)