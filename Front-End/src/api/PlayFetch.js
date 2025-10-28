import axios from "axios";

export async function PlayFetch(difficulty, token, id) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/play",
      { id, difficulty }, // ✅ corpo da requisição
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function FetchMatch(matchId, token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/play/${matchId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
