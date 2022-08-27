export const getRandomColor = (): string => {
    let hex = (((1 << 24) * Math.random()) | 0).toString(16);
    if (hex.length < 6) hex = hex + 'f';

    return `#${hex}`;
}