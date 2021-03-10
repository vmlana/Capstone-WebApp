// const API_URL = `http://localhost:3000/api/v1`;
import { apiUrl } from '../../../services/apiUrl';

export const getCategories = async () => {
  const categories = await fetch(`${apiUrl}/categories`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return categories;
};

export const getLessonsByInstructorId = async (instructorId) => {
  const lessons = await fetch(`${apiUrl}/lessons?instructorId=${instructorId}`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return lessons;
};
export const getLessonsByCategoryId = async (categoryId) => {
  const lessons = await fetch(`${apiUrl}/lessons?categoryId=${categoryId}`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return lessons;
};

export const getPlaylistsByInstructorId = async (instructorId) => {
  const playlists = await fetch(
    `${apiUrl}/playlists?instructorId=${instructorId}`
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return playlists;
};

export const getPlaylistsByCategoryId = async (categoryId) => {
  const playlists = await fetch(`${apiUrl}/playlists?categoryId=${categoryId}`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return playlists;
};

export const getProgramsByCompanyId = async (companyId) => {
  const programs = await fetch(`${apiUrl}/programs?companyId=${companyId}`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return programs;
};

export const createLesson = async (lessonData) => {
  // console.log(lessonData);
  const newLesson = await fetch(`${apiUrl}/updlesson`, {
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

export const createPlaylist = async (playlistData) => {
  return JSON.stringify(playlistData);

  const newPlaylist = await fetch(`${apiUrl}/updplaylist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playlistData),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));

  return newPlaylist;
};
