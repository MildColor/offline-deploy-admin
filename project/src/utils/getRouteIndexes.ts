import { RouteItems } from '@constants/routeList'
import splitUrlBySlash from './splitUrlBySlash'

export function getRouteIndexes(
    pathname: string,
    routeList: RouteItems[]
): [number, number] {
    const segments = splitUrlBySlash(pathname)
    let index = 0
    let subIndex = 0

    if (pathname !== '/') {
        index = routeList.findIndex(
            (item) => item.main.PATH === '/' + segments[0]
        )
        subIndex = routeList[index].sub.findIndex(
            (item) => item.PATH === '/' + segments[1]
        )
    }

    return [index, subIndex]
}
