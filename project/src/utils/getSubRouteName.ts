import { RouteItems } from '@constants/routeList'

export function getSubRouteName(
    routeList: RouteItems[],
    index: number,
    subIndex: number
): string {
    return routeList[index]?.sub[subIndex]?.NAME || ''
}
