import axios from "axios"

import {
  FindOptions,
  RankingOptions,
  StockImport,
  StockWithPosition,
} from "./protocols"

const apiService = axios.create({
  baseURL: process.env.API_URL,
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
  async ranking(options?: RankingOptions): Promise<StockWithPosition[]> {
    const response = await apiService.post("ranking", {
      strategy: options?.strategy,
      filter_same_enterprise_stocks: options?.filterSameEnterpriseStocks
    })
    return response.data as StockWithPosition[]
  },
  async find(options: FindOptions): Promise<StockWithPosition[]> {
    const response = await apiService.post("find", {
      strategy: options?.strategy,
      stocks: options.stocks
    })
    return response.data as StockWithPosition[]
  },
  async strategies(): Promise<string[]> {
    const response = await apiService.get("strategies")
    return response.data as string[]
  },
}

export default serverApi
