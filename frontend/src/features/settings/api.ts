import { dataSource } from '../../services/dataSource'

export const settingsApi = {
  get: dataSource.getSettings,
  save: dataSource.putSettings,
}
