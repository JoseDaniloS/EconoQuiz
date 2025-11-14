import axios from "axios";

export async function getRankingFetch() {
  try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/ranking`);
      console.log(response)
      return response.data;
      
  } catch (error) {
    console.log(error);
  }
}
