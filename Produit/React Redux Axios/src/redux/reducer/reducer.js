const initialState = {
    details: [],
};
const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_DETAILS":
            return {
                details: action.payload,
                state
            }
        case "POST_DETAILS":
            return {
                details: [...state.details, action.payload],
                state
            }
        case "DELETE_DETAILS":
            return {
                details: state.details.filter((produit) => produit.id !== action.payload),
                state
            }

        default:
            return state;
    }
}
export default Reducer;