// const API_URL = `http://localhost:3000/api/v1`;
import { apiUrl } from "../../../services/apiUrl";
import { customFetch } from '../../../services/tokenApi';

export const getCategories = async () => {
  const categories = await customFetch(`${apiUrl}/categories`)
    .then((response) => response.body)
    .catch((error) => console.error(error));
  return categories;
};

export const getLessonsByInstructorId = async (instructorId) => {
  const lessons = await customFetch(`${apiUrl}/lessons?instructorId=${instructorId}`)
    .then((response) => response.body)
    .catch((error) => console.error(error));
  return lessons;
};

export const getLessonsByCategoryId = async (categoryId) => {
  const lessons = await customFetch(`${apiUrl}/lessons?categoryId=${categoryId}`)
    .then((response) => response.body)
    .catch((error) => console.error(error));
  return lessons;
};

export const getLessonsByCategoryIdandInstructorId = async (
  categoryId,
  instructorId
) => {
  const sortedlessons = await customFetch(
    `${apiUrl}/lessons?categoryId=${categoryId}&instructorId=${instructorId}`
  )
    .then((response) => response.body)
    .catch((error) => console.error(error));
  return sortedlessons;
};

export const getPlaylistsByInstructorId = async (instructorId) => {
  const playlists = await customFetch(
    `${apiUrl}/playlists?instructorId=${instructorId}`
  )
    .then((response) => response.body)
    .catch((error) => console.error(error));
  return playlists;
};

export const getPlaylistsByCategoryId = async (categoryId) => {
  const playlists = await customFetch(`${apiUrl}/playlists?categoryId=${categoryId}`)
    .then((response) => response.body)
    .catch((error) => console.error(error));
  return playlists;
};

export const getProgramsByCompanyId = async (companyId) => {
  const programs = await customFetch(`${apiUrl}/programs?companyId=${companyId}`)
    .then((response) => response.body)
    .catch((error) => console.error(error));
  return programs;
};

export const createLesson = async (lessonData) => {
  // console.log(lessonData);
  const newLesson = await customFetch(`${apiUrl}/updlesson`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lessonData),
  })
    .then((response) => response.body)
    .catch((error) => console.error(error));
  return newLesson;
};

export const createPlaylist = async (playlistData) => {
  return JSON.stringify(playlistData);

  const newPlaylist = await customFetch(`${apiUrl}/updplaylist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playlistData),
  })
    .then((response) => response.body)
    .catch((error) => console.error(error));

  return newPlaylist;
};

export const getBlogsByInstructorId = async (instructorId) => {
  const blogs = await customFetch(`${apiUrl}/blogs?instructorId=${instructorId}`)
    .then((response) => response.body)
    .catch((error) => console.error(error));
  return blogs;
};
