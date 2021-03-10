// console.log(process.env.NODE_ENV);

export const apiUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000/api/v1" : "http://pivotcare.ca/api/v1";

// export const BASE_URL = "http://localhost:3001"

export const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "http://pivotcare.ca";
