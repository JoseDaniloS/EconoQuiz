import axios from "axios";
import { toast } from "react-toastify";

export async function RegisterUser(user) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/auth/registro",
      user
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data);
    }
  }
}

export async function LoginUser(user) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/auth/login",
      user
    );
    return response.data;
  } catch (error) {
    if (error) {
      toast.error(error.response.data.message);
    }
  }
}
