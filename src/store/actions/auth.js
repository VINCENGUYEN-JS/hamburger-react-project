import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart=()=>{
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess=(token,userId)=>{  
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
}

export const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    console.log("LOG OUT GETS CALLED");
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout=(expirationTime)=>{
    return dispatch=>{
        console.log("REAL TIME",expirationTime);
        setTimeout(()=>{
            dispatch(logout());
        }
        ,expirationTime*1000)
    }
}

export const authFail=(error)=>{
    return {
        type:actionTypes.AUTH_FAILED,
        error:error
    }
}

export const auth=(email,password,isSignup)=>{
    return dispatch=>{
        console.log("IM HERE");
        dispatch(authStart());
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB5FWm06g7Cvk1kZgpTjm7laNXntEeYERM';
        if(!isSignup){
            url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB5FWm06g7Cvk1kZgpTjm7laNXntEeYERM';
            
        }
        axios.post(url,authData)
             .then(res=>{
                 console.log(res);
                 const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                 localStorage.setItem('token',res.data.idToken);
                 localStorage.setItem('expirationDate',expirationDate);
                 localStorage.setItem('userId',res.data.localId);
                 dispatch(authSuccess(res.data.idToken,res.data.localId));
                 dispatch(checkAuthTimeout(res.data.expiresIn));
             })
             .catch(err =>{
                dispatch(authFail(err.response.data.error));
                console.log(err);
             });

    }
}

export const setAuthRedirectPath=(path)=>{
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authCheckState=()=>{
    return dispatch => {
        const token = localStorage.getItem('token');
        console.log("HIHI");
        if (!token){
            console.log("FITS LOGOUT IN AUTH");
            dispatch(logout());
        }
        else
        {
            const expirationTime = new Date(localStorage.getItem('expirationDate'));
            console.log("AuthCheckState :" ,expirationTime);
            if(expirationTime <= new Date()){
                console.log("SECONDD LOGOUT IN AUTH");
                dispatch(logout());
            }   
            else {
                const userId=localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout(
                    (expirationTime.getTime()-new Date().getTime()/1000)
                    )
                    );
            }
      
        }
    };
}