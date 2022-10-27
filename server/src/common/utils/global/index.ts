// Global utils file

/**
 * Function counts the array values, measured by a given type.
 * @param arr an array of type T.
 * @param extractField function returning a (string) key to count.
 * @param incValueBy (optional) function returning the amount a value will increment by in every iteration. (default is 1)
 * @example 
 * countValues([1, 3, 2, 3], value => value.toString())    // => { 1: 1, 2: 1, 3: 2 }
 */
export const countValues = <T>(arr: T[], extractField: (value: T) => string, incValueBy?: (value: T) => number): {
    [key: string]: number
} => arr.reduce((prev, curr) => {
    const field = extractField(curr)
    const incValue = incValueBy?.(curr) ?? 1
    return { ...prev, [field]: incValue + (prev[field] ?? 0) }
}, {})