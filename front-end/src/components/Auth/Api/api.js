const API_URL = `http://localhost:3000/api/v1`

export const getCategories = async () => {
    const categories = await fetch(
        `${API_URL}/categories`
    ).then((response) => response.json())
        .catch((error) => console.error(error));
    return categories;
}; 