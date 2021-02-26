export function dateComparison(a, b) {
    if (a instanceof Date) {
        return a.setHours(0, 0, 0, 0) === b.setHours(0, 0, 0, 0);
    }
    return undefined;
}

export default dateComparison;