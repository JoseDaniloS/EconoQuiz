import axios from "axios";

export async function RegisterUser(user) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/auth/registro",
      user
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    }
  }
}

export async function LoginUser(user) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/auth/login",
      user
    );
    return response.data.token;
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
}
