const timestampToDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();
    const str = `${year}-${month}-${day}`;
    return str;
}

export {
    timestampToDate
}