const userInitialState = {}

const accountReducer = (state=userInitialState, action) => {
    switch(action.type){

        case 'USER_DETAILS':{
            return {...action.payload}
        }

        default:{
            return {...state}
        }
    }
}

export default accountReducer