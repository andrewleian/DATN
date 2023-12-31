import { SET_CART_TOTAL_ITEMS, SET_ISLOGIN, SET_CURRENT_PAGE_ADMIN } from "./constants";
export const initState = {
    cartTotalItems: 0,
    isLogin: false,
    currentPageAdmin: "/adminWelcome"
}

function reducer(state, action) {
    switch (action.type) {
        case SET_CART_TOTAL_ITEMS:
            return {
                ...state,
                cartTotalItems: action.payload
            }
        case SET_ISLOGIN:
            return {
                ...state,
                isLogin: action.payload
            }
        case SET_CURRENT_PAGE_ADMIN:
            return {
                ...state,
                currentPageAdmin: action.payload
            }
        default:
            throw new Error('Invalid action.')
    }
}

export default reducer;