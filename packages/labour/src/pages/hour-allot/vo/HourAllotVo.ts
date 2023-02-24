export default interface HourAllotVo {
    //主键
    id: string;
    //数据来源
    source: string;
    //同步时间
    synctime: string;
    //回填ID
    breakId: string;
    //人员类型
    userType: string;
    //姓名
    username: string;
    //工时类别
    hourType: string;
    // 分配工时
    allotHour: number;
    //分配日期
    allotDate: string;
    //工作类型
    workType: string;
    //备注
    remark: string;
    //工作票ID
    numberId:string;
    //员工ID
    userid: string;
    //是否删除
    isDelete: string;
    //工时发放单位
    orgname: string;
    //实际分配工时
    factHour: string;
    //人员身份证
    idcard: string;
    //员工所属单位
    company: string;
    //工时发放部门
    deptName: string;
    //工时发放部门ID
    deptId:number;
    //工时发放班组名称
    classGroupName: string;
    //工时发放班组ID
    classGroupId: number;
    //合单ID
    mId: number;
    //用户形式
    empType: string;
    //推荐工时
    prepareAllotHour: string;
    //prepare_hour
    prepareHour: string;
    //人事单位
    orgnameHr: string;
    //结算状态(0:否,1:是)
    isSettle: number;   
}