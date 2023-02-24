export const enlargeData = (d, minLength = 5) => {
    if (d && d.length < minLength) {
        for (let index = 0; index < minLength; index++) {
            const element = d[index];
            if (!element) {
                d[index] = { type: 'enlarge' }
            }
        }
        return d
    } else {
        return d
    }

}
export const reduceData = (d = []) => {
    return d.filter(e => e.type != "enlarge")
}