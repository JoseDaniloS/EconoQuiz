import axios from "axios";

export async function PlayFetch(difficulty, token, id_user) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/play",
      { id_user, difficulty }, // ✅ corpo da requisição
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

export async function QuitMatchFetch(matchId, token) {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/play/delete/match`,
      {
        data: { id_partida: matchId },
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

export async function verifyAnswerFetch(answer, matchId, token) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/questions/verify-answer`,
      {
        id_partida: matchId,
        answer: answer,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
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
