import { URI_VALIDATE_ENDPOINT } from "./Constants";

export async function validateToken(token){
  if(token == null){
    return false;
  }else{
    const response = await fetch(`${URI_VALIDATE_ENDPOINT}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "mode": 'cors',
        "Authorization": `Bearer ${token}`,
      },
    });
    if (response.ok){
      return true;
    } else{
      return false;
    }
  }
};