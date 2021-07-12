const authInitialState = {loggedIn: false, register: false}

const authReducer = (state=authInitialState, action) => {
    switch(action.type){

        case 'REGISTER':{
            return {...state, register: true}
        }

        case 'LOGIN':{
            return {...state, loggedIn: true}
        }

        case 'LOGGED_IN':{
            return {...state, loggedIn: true}            
        }
        
        default:{
            return {...state}
        }
    }
}

export default authReducer