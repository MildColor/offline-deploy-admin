function splitUrlBySlash(url: string): string[] {
    return url.split('/').filter((segment) => segment !== '')
}

export default splitUrlBySlash
