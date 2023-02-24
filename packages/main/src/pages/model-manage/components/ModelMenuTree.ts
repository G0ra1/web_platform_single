import { ref, h } from "vue";
import { getMenuTree } from "../api/index";
import MdmMenuTreeVo from "../data/vo/MdmMenuTreeVo"
import { DataTableColumns, NButton, NTag } from 'naive-ui'
import MenuConfigDto from "../data/dto/MenuConfigDto";
import { publicConfig } from "../api/index";
import { configShow } from "../App"

let messageLocal: any;
function initDialog(message: any) {
    messageLocal = message;
}

let data = ref<Array<MdmMenuTreeVo>>();
let _modelEntityId = "";

let isLoading = ref(true);
const initMenuTree = async (modelEntityId: string) => {
    const data_ = await getMenuTree();
    data.value = data_;
    _modelEntityId = modelEntityId;
    isLoading.value = false;
}

/**
 * 构建一些显示的东西
 */
const menuTypeMap = new Map<number, string>();
const menuTypeStyleMap = new Map<number, string>();
menuTypeMap.set(-1, "业务菜单");
menuTypeMap.set(0, "一级页面");
menuTypeMap.set(3, "菜单分类");
menuTypeStyleMap.set(-1, "primary");
menuTypeStyleMap.set(0, "info");
menuTypeStyleMap.set(3, "success");



//选择按钮的处理结果
const handleEvent = async (mdmMenuTreeVo: MdmMenuTreeVo) => {
    const menuConfigDto = new MenuConfigDto();
    Object.assign(menuConfigDto, mdmMenuTreeVo);
    menuConfigDto.modelEntityId = _modelEntityId;
    //console.log("menuConfigDto:", menuConfigDto);
    if (await publicConfig(menuConfigDto)) {
        messageLocal.success("配置成功!");
        configShow.value = false;
    } else {
        messageLocal.error("配置失败!");
    }
}

/**
 * 要展示的列
 */
const columns: DataTableColumns<MdmMenuTreeVo> = [
    {
        title: '菜单编码',
        key: 'menuCode',
        tree: true
    },
    {
        title: '菜单名称',
        key: 'menuName',
        tree: true
    },
    {
        title: '菜单类型',
        key: 'menuType',
        tree: true,
        render(row) {
            return h(
                NTag,
                { size: "small", type: menuTypeStyleMap.get(row.menuType) } as {},
                { default: () => menuTypeMap.get(row.menuType) }
            )
        }
    },
    {
        title: '选择',
        key: '',
        tree: true,
        render(row) {
            return h(
                NButton,
                { size: "tiny", type: 'primary', onClick: () => handleEvent(row) },
                { default: () => '选择' }
            )
        }
    }
];

const rowKey = (row: MdmMenuTreeVo) => row.id;
export {
    data,
    columns,
    rowKey,
    initDialog,
    initMenuTree,
    isLoading
}