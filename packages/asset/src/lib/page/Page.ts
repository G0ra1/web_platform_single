export default class Page<T> {
    current: number = 1;
    pageSize: number = 10;
    defaultCurrent: number = 1;
    defaultPageSize: number = 10;
    total: number = 0;
    showJumper: boolean = true;
    records: Array<T> = new Array();
    /*  onChange = (pageInfo: P) => {
         console.log('pagination.onChange', pageInfo);
     }; */

}