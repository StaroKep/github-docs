export function base64decode(data: string) {
    return decodeURIComponent(escape(window.atob(data)));
}
export function base64encode(data: string) {
    return decodeURIComponent(escape(window.btoa(unescape(encodeURIComponent(data)))));
}
