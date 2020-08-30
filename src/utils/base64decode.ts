export function base64decode(data: string) {
    return decodeURIComponent(escape(window.atob(data)));
}
