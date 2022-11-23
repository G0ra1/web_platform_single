import { parse as HimalayaParse, stringify as HimalayaStringify } from 'himalaya';

// himalaya
const option = {
    voidTags: [],
    closingTags: [],
    childlessTags: [],
    closingTagAncestorBreakers: {},
    includePositions: false
}

// 层级化
export const xmlParse = (xmlstr) => {
    return HimalayaParse(xmlstr, option)
}

// 代码化
export const xmlStringify = (xmlstr) => {
    return HimalayaStringify(xmlstr, option)
}
