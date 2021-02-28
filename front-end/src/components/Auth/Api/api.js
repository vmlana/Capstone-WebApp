const API_URL = `http://localhost:3000/api/v1`;

export const getCategories = async () => {
  const categories = await fetch(`${API_URL}/categories`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return categories;
};

export const getLessonsByInstructorId = async (instructorId) => {
  const lessons = await fetch(`${API_URL}/lessons?instructorId=${instructorId}`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return lessons;
};
export const getLessonsByCategoryId = async (categoryId) => {
  const lessons = await fetch(`${API_URL}/lessons?categoryId=${categoryId}`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return lessons;
};

export const getPlaylistsByInstructorId = async (instructorId) => {
  const playlists = await fetch(
    `${API_URL}/playlists?instructorId=${instructorId}`
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return playlists;
};

export const getPlaylistsByCategoryId = async (categoryId) => {
  const playlists = await fetch(`${API_URL}/playlists?CategoryId=${categoryId}`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return playlists;
};

export const getProgramsByCompanyId = async (companyId) => {
  const programs = await fetch(`${API_URL}/programs?companyId=${companyId}`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return programs;
};

export const createLesson = async (lessonData) => {
  return JSON.stringify(lessonData);
  const newLesson = await fetch(`${API_URL}/updlesson`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lessonData),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return newLesson;
};
