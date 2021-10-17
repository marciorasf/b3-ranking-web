export type StockImport = {
  id: number
  date: Date
  importErrors: string[]
  stocks: Stock[]
}

export type Stock = {
  code: string
  indicatorsValues: StockIndicators
}

export type StockIndicators = {
  preco_atual?: number
  liquidez_media_diaria?: number
  dividend_yield?: number
  preco_da_acao_por_lucro?: number
  peg_ratio?: number
  preco_da_acao_por_valor_patrimonial?: number
  enterprise_value_por_ebitda?: number
  enterprise_value_por_ebit?: number
  preco_da_acao_por_ebitda?: number
  preco_da_acao_por_ebit?: number
  valor_patrimonial_por_acao?: number
  preco_da_acao_por_ativos?: number
  lucro_por_acao?: number
  preco_da_acao_por_receita_liquida?: number
  preco_da_acao_por_capital_de_giro?: number
  preco_da_acao_por_ativo_circulante_liquido?: number
  divida_liquida_por_patrimonio_liquido?: number
  divida_liquida_por_ebitda?: number
  divida_liquida_por_ebit?: number
  patrimonio_liquido_por_ativos?: number
  passivos_por_ativos?: number
  liquidez_corrente?: number
  margem_bruta?: number
  margem_ebitda?: number
  margem_ebit?: number
  margem_liquida?: number
  roe?: number
  roa?: number
  roic?: number
  giro_ativos?: number
  cagr_receitas_5_anos?: number
  cagr_lucros_5_anos?: number
}

export type StockWithPosition = {
  code: string
  position: number
}

export type RankingOptions = {
  strategy?: string
  filterStocks?: boolean
  numberOfStocks?: number
}

export type FindOptions = {
  strategy?: string
  stocks: string[]
}
