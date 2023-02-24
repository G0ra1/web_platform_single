import { ref, nextTick, computed, h,  } from 'vue'
import { NCheckbox, } from 'naive-ui'
import { NwIcon } from '@platform/main'

import { getMdmPostByOrgId, sourceList, mdmRoleResource,   } from '../../api/index'

import {
    hierarchy as d3Hierarchy,
    max as d3Max
} from 'd3'
import { remove } from 'lodash'

// 是否加载
export const spinIsLoading = ref(false)

// 是否旋转
export const spinIsRotate = ref(true)

export const spinIsComplete = ref(false)

export const tIsLoading = ref(false)
export const fields = ref([])
export const spinState = ref('loading')
// 是否展示
export const visible = ref(false)

// 菜单元数据
export const TreeMenuBasic = ref([])

// 菜单构造数据Root
export const TreeMenuRoot = ref()

// 当前选择需要设定权限的角色
export const RoleData = ref(null)
// 左侧数表
export const treeData = ref([])

// 一级菜单
export const MenuLevel1 = ref([])

// 当前选定的子系统选项
export const CurrentSys = ref(null)
// 应用id
export const bizMenuCode = ref('')

// CurrentSys
export const setAllRoleToCurrentSys = (f) => {
    CurrentSys.value.descendants().forEach(d => {
        if (CurrentSys.value === d) return 
        d.isEmpower = f
    })
}



export const reset = () => {
    RoleData.value = null
    TreeMenuBasic.value = []
    RoleResource.value = []
    TreeMenuRoot.value = []
    spinState.value = 'loading' 
    CurrentSys.value = null
    spinIsLoading.value = false
    TreeTableData.value = []
}
// 当前已经设定的权限
export const RoleResource = ref([])

// 触发功能弹窗
export const show = async (rd) => {
    reset()
    RoleData.value = rd
    visible.value = true
    tIsLoading.value = true
    // 查询权限
    await getMdmPostByOrgId({id: RoleData.value.id}).then(res => RoleResource.value = res)
//     await queryApp({}).then((r)=>{
//         treeData.value = [r].map((d)=>{
//             d.checked = true
//             return d
//         })
//         tIsLoading.value = false
//    })
}

// 表格Ref
export const TreeTableRef = ref(null)
// 表格数据
export const TreeTableData = ref([])
// 表格列配置
export const TreeTableColumns = ref([])
// 功能权限
export const setSysTabelData = (sysData) => {
    // 重置表格
    TreeTableData.value = []
  
    CurrentSys.value = sysData
    // ---------生成横向树表数据
    const tableData = []

    // 便利子系统下所有叶节点每个叶节点为一行
    CurrentSys.value.leaves().forEach((l,i) => {
        // 获取所有父级
        const list = l.ancestors().splice(0, l.ancestors().indexOf(CurrentSys.value)) // 到子系统节点的角标
        // 创建行
        const row = list.map(c => {
            let span = 0 // 记录一个默认合并值为0，代表单元格隐藏
            if (!c.data._span  ) {  // 查看该对象是否计算过合并值
                span = c.data._span = c.leaves().length
            }
            // 这里生成
            return {
            id: c.data.id,
            icon: c.data.icon,
            menuType: c.data.menuType,
            bizMenuCode: c.data.bizMenuCode,
            menuName: c.data.menuName,
            children:c.data.kids,
            // hasChildren: 
            // 这里需要加入合并列 
            spanCell: {},
            Node: c,
            span
        }}).reverse()
        tableData.push(row)
    })
    TreeTableData.value = tableData
        // 这里同时生成合并行的数据

    console.log(TreeTableData.value ,'-=-=-=-=')

    // ---------生成横向树表数据完成
    // ---------生成列配置
    // const maxDepth = d3Max(CurrentSys.value.leaves(), d => d.depth)
    const columnNum = d3Max(tableData, d => d.length)
    TreeTableColumns.value = []
    for (let i = 0;i < columnNum; i++) {
        fields.value.push(`name${i}`)
        TreeTableColumns.value.push({
            // title: '',
            // field: 'name1',
            // width: 80,
            slots: {
                default: ({row}) => {
                    if (row[i]) {
                        //return `${row[i].menuName}-${row[i].id}`
                        // 这里需要区分目录、页面、按钮、流程入口
                        let icon = ''
                        switch (row[i].menuType) {
                            case 3: 
                                icon = 'icon-y-caidan'
                                break;
                            case 1:
                                icon = 'icon-y-xinyemian'
                                break;
                            case 2:
                                icon = 'icon-y-anniu'
                                break;
                            // case '3':
                            //     icon = 'icon-y-liucheng'
                            //     break;
                            default:
                                icon = 'icon-bangzhu'
                                break;
                        }
                        const Node = row[i].Node
                        const descendantsNode = Node.descendants().filter(d => d !== Node)
                        return <div style="display: flex;align-items: center;">
                            <NwIcon
                                size={18}
                                name={icon}
                                style="margin-right: 5px;"
                            />
                            <NCheckbox
                                indeterminate={descendantsNode.some(d => d.isEmpower) && descendantsNode.some(d => !d.isEmpower)}
                                checked={!!Node.isEmpower}
                                onUpdateChecked={d => {
                                    Node.isEmpower = d
                                    if(!RoleResource.value.filter(d=>d.bizMenuCode ==Node.data.bizMenuCode)[0]){
                                        RoleResource.value.push({
                                            bizMenuCode:Node.data.bizMenuCode,
                                            resourceId:[]
                                        })
                                    }
                                    let data =  RoleResource.value.filter(d=>d.bizMenuCode ==Node.data.bizMenuCode)[0]
                                    if(data && d){
                                        data.resourceId.push(Node.data.id)
                                    } 
                                    // 获取所有父级
                                    if (d) {
                                        // 自动勾选所有父级
                                        Node.ancestors().forEach(d => {
                                            d.isEmpower = true
                                            if((d.data.id !=  '0')  ){    
                                                    data.resourceId.push(d.data.id)
                                                    data.resourceId = Array.from(new Set(data.resourceId))
                                            }   
                                        })
                                        // 勾选所有子集
                                        Node.descendants().forEach(d => {
                                            d.isEmpower = true
                                            if(d.data.id !==0){
                                                data.resourceId.push(d.data.id)
                                                data.resourceId = Array.from(new Set(data.resourceId))
                                            }
                                        })
                                    } else {
                                        // 取消勾选时自动取消所有子
                                        Node.descendants().forEach(d => {
                                            d.isEmpower = false
                                            
                                            data.resourceId.forEach((item,index,arr)=>{
                                                if(item == d.data.id) {

                                                    arr.splice(index,1)
                                                }
                                            })
                                        })
                                    }
                                }}
                                style="margin-right: 5px;"
                            />
                            {row[i].menuName}
                        </div>
                    }
                    return ''
                }
            }
        })
    }
    nextTick().then(() => {
        const roleResList = RoleResource.value.filter(f => f.bizMenuCode == bizMenuCode.value)[0].resourceId
      
        TreeTableRef.value.reloadColumn(TreeTableColumns.value)
        TreeTableRef.value.loadData(TreeTableData.value)
    })
    // TreeTableRef.value.loadData(TreeTableData.value)
}

// 提交权限更改
export const submitRole = () => {
    // 过滤每个子
    TreeMenuRoot.value.map((d)=>{
        d.resourceId.descendants().forEach(d => {
            if (d.data.id === '0') {
                return;
            }
            if (!d.isEmpower) {
                // 所有子设定为否
                d.descendants().forEach(d => {
                    d.isEmpower = false
                })
            }
        })
        return d
    })
    // const sendList = TreeMenuRoot.value.map((d)=>{
    //     d.resourceId = d.resourceId.descendants().filter(d => d.isEmpower).map(d => d.data.id).filter(d => d !== '0')
    //     return d
    // })
    // console.log(RoleResource.value,'-=-=-=-=')
    spinIsLoading.value = true
    spinState.value = 'loading' 
    mdmRoleResource({
        roleCode: RoleData.value.roleCode,
        roleId: RoleData.value.id,
        resourceIds: RoleResource.value
    }).then((res)=>{
        spinState.value = 'complete' 
        visible.value = false
    }).catch(err => {
        spinState.value = 'fail' 
        console.error(err)
    })
}


// 获取右侧资源
export const getSourceList = (e) => {
   
    spinIsLoading.value = true
    // TreeMenuRoot.value = { id: '0', children: []}
        bizMenuCode.value = e.code
      
        // 查询树形菜单
        sourceList({bizMenuCode:e.code,includeSth: "0"}).then(res => { 
            if(res.length){
                const roleResList = RoleResource.value.filter(f => f.bizMenuCode == e.code)[0]? ( RoleResource.value.filter(f => f.bizMenuCode == e.code)[0].resourceId) : []

                TreeMenuBasic.value = d3Hierarchy({
                    kids: res,
                    id: '0'
                }, d => d.kids)
                TreeMenuBasic.value.each((e, i) => {
                    if (roleResList.includes(e.data.id)) {
                        e.isEmpower = true
                    }
                })
                // 赋值构造根菜单
                // TreeMenuRoot.value.push({bizMenuCode:e.bizMenuCode,resourceId:})
            
                setSysTabelData(TreeMenuBasic.value)
            }

          
        })
        
 
     
   
    
    spinIsLoading.value = false
 }