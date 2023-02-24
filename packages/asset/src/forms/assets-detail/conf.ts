/**
 * @Description 资产明细
 * @author 云数网讯 zouliming@netwisd.com
 * @date 2022-12-06 13:21:11
 */

const FormSchema = {
    "assetsId": {
        "type": "string",
        "description": "资产id"
    },
    "classifyId": {
        "type": "string",
        "description": "分类id"
    },
    "classifyCode": {
        "type": "string",
        "description": "分类编码"
    },
    "classifyName": {
        "type": "string",
        "description": "分类名称"
    },
    "route": {
        "type": "string",
        "description": "物资分类全路径"
    },
    "routeName": {
        "type": "string",
        "description": "物资分类全路径名称"
    },
    "categoryId": {
        "type": "string",
        "description": "分类类别Id"
    },
    "categoryCode": {
        "type": "string",
        "description": "分类类别编码"
    },
    "categoryName": {
        "type": "string",
        "description": "分类类别名称"
    },
    "taxRate": {
        "type": "number",
        "description": "税率"
    },
    "itemId": {
        "type": "string",
        "description": "物资Id"
    },
    "itemCode": {
        "type": "string",
        "description": "物资编码"
    },
    "itemName": {
        "type": "string",
        "description": "物资名称"
    },
    "desclong": {
        "type": "string",
        "description": "物资长描述"
    },
    "descshort": {
        "type": "string",
        "description": "物资短描述"
    },
    "unitCode": {
        "type": "string",
        "description": "物资单位编码"
    },
    "unitName": {
        "type": "string",
        "description": "物资单位名称"
    },
    "materialQuality": {
        "type": "string",
        "description": "物资材质"
    },
    "standard": {
        "type": "string",
        "description": "物资标准"
    },
    "specs": {
        "type": "string",
        "description": "物资规格"
    },
    "supplierName": {
        "type": "string",
        "description": "供应商"
    },
    "contractCode": {
        "type": "string",
        "description": "合同号"
    },
    "orderCode": {
        "type": "string",
        "description": "订单编号"
    },
    "assetsClassification": {
        "type": "string",
        "description": "资产分类"
    },
    "acceptanceNumber": {
        "type": "number",
        "description": "验收数量"
    },
    "billCodes": {
        "type": "string",
        "description": "发票号"
    },
    "billCodeFilesIds": {
        "type": "string",
        "description": "发票附件"
    },
    "assetsCode": {
        "type": "string",
        "description": "资产编号"
    },
    "assetsLabel": {
        "type": "string",
        "description": "资产标签"
    },
    "qualityAssuranceLevel": {
        "type": "string",
        "description": "质保等级"
    },
    "manufacturer": {
        "type": "string",
        "description": "生产商"
    },
    "productionDate": {
        "type": "string",
        "description": "生产日期"
    },
    "serviceLife": {
        "type": "number",
        "description": "使用年限"
    },
    "validPeriod": {
        "type": "string",
        "description": "有效期"
    },
    "batchNumber": {
        "type": "string",
        "description": "批次/炉号"
    },
    "acceptanceDate": {
        "type": "string",
        "description": "验收日期"
    },
    "factoryDate": {
        "type": "string",
        "description": "出厂日期"
    },
    "factoryCode": {
        "type": "string",
        "description": "出厂编号"
    },
    "approachDate": {
        "type": "string",
        "description": "进场日期"
    },
    "warehouseId": {
        "type": "string",
        "description": "仓库地点"
    },
    "warehouseName": {
        "type": "string",
        "description": "仓库地点"
    },
    "shelfId": {
        "type": "string",
        "description": "货架号"
    },
    "shelfName": {
        "type": "string",
        "description": "货架号"
    },
    "rzDate": {
        "type": "string",
        "description": "入账日期"
    },
    "assetsNumber": {
        "type": "number",
        "description": "总数量"
    },
    "assetsAmount": {
        "type": "number",
        "description": "物资原值单价"
    },
    "assetsUntaxedAmount": {
        "type": "number",
        "description": "物资原值单价-未税"
    },
    "assetsTaxAmount": {
        "type": "number",
        "description": "物资原值税额"
    },
    "assetsSumAmount": {
        "type": "number",
        "description": "物资原值总价"
    },
    "assetsSumUntaxedAmount": {
        "type": "number",
        "description": "物资原值总价-未税"
    },
    "assetsSumTaxAmount": {
        "type": "number",
        "description": "物资原值总税额"
    },
    "deliveryNumber": {
        "type": "number",
        "description": "出库数量"
    },
    "acceptNumber": {
        "type": "number",
        "description": "领用数量"
    },
    "stockNumber": {
        "type": "number",
        "description": "库存数量"
    },
    "repairNumber": {
        "type": "number",
        "description": "维修数量"
    },
    "scrappedNumber": {
        "type": "number",
        "description": "报废数量"
    },
    "transferNumber": {
        "type": "number",
        "description": "调拨数量"
    },
    "warehouseState": {
        "type": "string",
        "description": "资产入库状态"
    },
    "netRate": {
        "type": "number",
        "description": "净值率"
    },
    "estlimateNetSalvage": {
        "type": "number",
        "description": "预计净残值"
    },
    "secretRelated": {
        "type": "number",
        "description": "是否涉密"
    },
    "assetOrgId": {
        "type": "string",
        "description": "资产所属机构id"
    },
    "assetOrgName": {
        "type": "string",
        "description": "资产所属机构名称"
    },
    "assetOrgFullId": {
        "type": "string",
        "description": "组织全路径ID"
    },
    "assetDeptId": {
        "type": "string",
        "description": "资产所属部门"
    },
    "assetDeptName": {
        "type": "string",
        "description": "资产所属部门名称"
    },
    "assetUserId": {
        "type": "string",
        "description": "资产所属人"
    },
    "assetUserName": {
        "type": "string",
        "description": "资产所属人名称"
    },
    "storageNumber": {
        "type": "number",
        "description": "入库数量"
    },
    "usableNumber": {
        "type": "number",
        "description": "可用数量"
    },
    "entryNumber": {
        "type": "number",
        "description": "入账数量"
    },
    "borrowNumber": {
        "type": "number",
        "description": "借入数量"
    },
    "lendNumber": {
        "type": "number",
        "description": "借出数量"
    },
    "useState": {
        "type": "string",
        "description": "资产使用状态"
    },
    "itemType": {
        "type": "string",
        "description": "物资类型"
    },
    "assetSource": {
        "type": "number",
        "description": "物资来源"
    },
    "seriesNumber": {
        "type": "string",
        "description": "物资序列号;出厂时的唯一序号"
    },
    "assetsSkuId": {
        "type": "string",
        "description": "资产sku的id"
    },
    "sourceId": {
        "type": "string",
        "description": "登记/验收id"
    },
    "skuCode": {
        "type": "string",
        "description": "sku属性"
    },
    "skuFullId": {
        "type": "string",
        "description": "sku全路径id"
    },
    "skuFullName": {
        "type": "string",
        "description": "sku全路径名称"
    },
    "applyTime": {
        "type": "string",
        "description": "申请时间"
    },
    "applyUserId": {
        "type": "string",
        "description": "申请人ID"
    },
    "applyUserName": {
        "type": "string",
        "description": "申请人名称"
    },
    "applyUserOrgId": {
        "type": "string",
        "description": "申请人机构ID"
    },
    "applyUserOrgName": {
        "type": "string",
        "description": "申请人机构名称"
    },
    "applyUserDeptId": {
        "type": "string",
        "description": "申请人部门ID"
    },
    "applyUserDeptName": {
        "type": "string",
        "description": "申请人部门名称"
    },
    "status": {
        "type": "string",
        "description": "物资状态"
    },
    "registerUserId": {
        "type": "string",
        "description": "采购登记人"
    },
    "registerUserName": {
        "type": "string",
        "description": "采购登记人"
    },
    "acceptUserId": {
        "type": "string",
        "description": "验收人"
    },
    "acceptUserName": {
        "type": "string",
        "description": "验收人"
    },
    "assetSelfCode": {
        "type": "string",
        "description": "资产自编码"
    },
    "barCodeFile": {
        "type": "string",
        "description": "条件码文件id"
    },
    "barCode": {
        "type": "string",
        "description": "条件码"
    },
    "useUserId": {
        "type": "string",
        "description": "使用人ID"
    },
    "useUserName": {
        "type": "string",
        "description": "使用人名称"
    },
    "useUserOrgId": {
        "type": "string",
        "description": "使用/物资所在机构ID"
    },
    "useUserOrgName": {
        "type": "string",
        "description": "使用机构名称"
    },
    "useUserDeptId": {
        "type": "string",
        "description": "使用部门ID"
    },
    "useUserDeptName": {
        "type": "string",
        "description": "使用部门名称"
    },
    "classifyTypeCode": {
        "type": "string",
        "description": "资产分类编码"
    },
    "classifyTypeName": {
        "type": "string",
        "description": "资产分类名称"
    },
}

export {
    FormSchema
}