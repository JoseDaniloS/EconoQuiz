import axios from "axios";

export async function getRankingFetch() {
  try {
      const response = await axios.get(`https://api.econoquiz.ufersa.dev.br/ranking`);
      console.log(response)
      return response.data;
      
  } catch (error) {
    console.log(error);
  }
}
