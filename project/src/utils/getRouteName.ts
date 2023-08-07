import { RouteItems } from '@constants/routeList'

export function getRouteName(routeList: RouteItems[], index: number): string {
    return routeList[index]?.main?.NAME || ''
}
