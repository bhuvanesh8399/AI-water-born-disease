import { dataSource } from '../../services/dataSource'

export const trendsApi = {
  get: dataSource.getTrends,
}
