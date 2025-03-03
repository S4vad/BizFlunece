const USER_KEY = 'getUser';

export const getUserFromStrorage=() =>{
  const user =localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) :null;
}


export const setUserToStorag=(user)=>{
  localStorage.setItem(USER_KEY,JSON.stringify(user))
}


export const removeUserFromStorage=()=>{
  localStorage.removeItem(USER_KEY)
}