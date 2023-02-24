import IPage from "../page/IPage";
export default class IDto {
    id!: string;
    searchCondition!: string;
    createTime!: string;
    updateTime!: string;
    createUserId!: string;
    createUserName!: string;
    page: IPage<undefined> = new IPage<undefined>();
}