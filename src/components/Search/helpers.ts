export function onSearchCodeSuccess(
    data: any,
    onResults: (data: string[]) => any
) {
    const { items } = data;

    onResults(items.map((item: any) => item.path));
}
