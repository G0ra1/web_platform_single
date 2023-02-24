import { ref } from "vue";
import MdmOrgVo from "./vo/MdmOrgVo";

const currentOrgId = ref();
const handleClick = (value: string | MdmOrgVo) => {
    currentOrgId.value = value;
}

export {
    currentOrgId,
    handleClick
}