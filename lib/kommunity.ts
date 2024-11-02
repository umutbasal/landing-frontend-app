import { cache } from "react";

const API_URL =
  "https://api.kommunity.com/api/v1/diyarbakir-happy-hacking-space/events";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export const getEvents = cache(async (status = "upcoming", page = 1) => {
  try {
    const response = await fetch(
      `${API_URL}?status=${status}&page=${page}`,
      options
    );
    return await response.json();
  } catch (error) {
    console.info(error);
    return null;
  }
});