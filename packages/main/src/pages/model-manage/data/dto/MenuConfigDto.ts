/*
 * @Author: zouliming 
 * @Date: 2022-11-23 09:30:21 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-11-23 22:28:47
 * 定义一个请求配置部署的类型
 */
import MdmMenuTreeVo from "../vo/MdmMenuTreeVo"
export default class MenuConfigDto extends MdmMenuTreeVo {
    //菜单id
    //menuId!: string;
    //当前模型的数据库id
    modelEntityId!: string;

}