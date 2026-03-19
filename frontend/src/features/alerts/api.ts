import { dataSource } from '../../services/dataSource'

export const alertsApi = {
  list: dataSource.getAlerts,
  update: dataSource.patchAlert,
}
