import axios, { CreateAxiosDefaults } from 'axios'
import { getContentType, getContentTypeData } from './api.helper'

const API_URL = 'http://localhost:5000/api'
const axiosOptions: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: getContentType(),
	withCredentials: true,
}
const axiosOptionsData: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: getContentTypeData(),
	withCredentials: true,
}
export const axiosClassic = axios.create(axiosOptions)
export const axiosData = axios.create(axiosOptionsData)
