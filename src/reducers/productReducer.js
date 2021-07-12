const productInitialState = []

const productReducer = (state=productInitialState, action) => {
    switch(action.type){

        case 'ADD_PRODUCT':{
            return [...state, {...action.payload}]
        }

        case 'ALL_PRODUCTS':{
            return [...action.payload]
        }

        case 'DELETE PRODUCT':{
            return state.filter(ele=>{
                return ele._id !== action.payload
            })
        }

        case 'UPDATE_PRODUCT':{
            const res = state.map(ele=>{
                if(ele._id === action.payload._id){
                    return {...ele, ...action.payload}
                } else {
                    return ele
                }
            })
            return res
        }

        default:{
            return [...state]
        }
    }
}

export default productReducer