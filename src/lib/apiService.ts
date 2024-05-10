import axiosInstance from "./axiosInstance";
import { FetchMattersParams } from '../types/matterTypes';

export const fetchSummaryData = async () => {
  try {
    const response = await axiosInstance.get("/matters/summary");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMatters = async (params?: FetchMattersParams) => {
  try {
    const response = await axiosInstance.get("/matters", { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch matters:", error);
    throw error;
  }
};

export const postMatter = async (matterData: any) => {
  try {
    const response = await axiosInstance.post("/matters", matterData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchLawyer = async () => {
  try {
    const response = await axiosInstance.get("/lawyers");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchClient = async () => {
  try {
    const response = await axiosInstance.get("/clients");
    return response.data;
  } catch (error) {
    throw error;
  }
};
