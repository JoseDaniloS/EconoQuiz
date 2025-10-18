import axios from "axios";

export async function verifyTokenFetch(token) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/api/verify-token",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return true;
  } catch (error) {
    console.error("Erro ao verificar token:", error.response.data.message);
    return false;
  }
}
