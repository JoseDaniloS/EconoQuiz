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

export async function questionFetch(id_partida, token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/questions/${id_partida}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // retorna as questões e informações da partida
  } catch (error) {
    console.error(
      "Erro ao buscar questões:",
      error.response?.data?.message || error.message
    );
    return null;
  }
}
