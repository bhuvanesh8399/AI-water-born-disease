import { dataSource } from '../../services/dataSource'

export const heatmapApi = {
  get: dataSource.getHeatmap,
}
