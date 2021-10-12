import axios from "axios"
import {
  FindOptions,
  RankingOptions,
  StockImport,
  StockWithPosition,
} from "./protocols"

export const __api_url__ =
  process.env.REACT_APP_API_URL || "http://localhost:3000"

const apiService = axios.create({
  baseURL: __api_url__,
  withCredentials: true,
})

const serverApi = {
  async forceImport(): Promise<void> {
    await apiService.post("import")
  },
  async lastImport(): Promise<StockImport> {
    const response = await apiService.get("last-import")
    return response.data as StockImport
  },
  async ranking(options: RankingOptions): Promise<StockWithPosition[]> {
    const response = await apiService.post("ranking", options)
    return response.data as StockWithPosition[]
  },
  async find(options: FindOptions): Promise<StockWithPosition[]> {
    const response = await apiService.post("find", options)
    return response.data as StockWithPosition[]
  },
  async strategies(): Promise<string[]> {
    const response = await apiService.post("strategies")
    return response.data as string[]
  },
}

export default serverApi
