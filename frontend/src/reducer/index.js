/* eslint-disable default-param-last */
const initialState = {
    user: []
};


 function rootReducer (state = initialState, action) {
    switch(action.type){
        case "REGISTER_LOCAL":
            return {
                user: action.payload,
            }
        default:
        return state;

    }
}


export default rootReducer;