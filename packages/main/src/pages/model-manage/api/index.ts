/*
 * @Author: zouliming 
 * @Date: 2022-10-14 17:52:28 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-10-21 12:44:38
 * @Description 请求后台的接口
 */

import { Request } from '@platform/main'
import DbVo from '../data/vo/DbVo'
import ModelingEntityVo from '../data/vo/ModelingEntityVo'
import ModelingFieldVo from '../data/vo/ModelingFieldVo'
import TableEntity from '../data/model/TableEntity'
import ModelingEntityDto from '../data/dto/ModelingEntityDto'
// 获取模型树
export function getTableTree(id: string): Promise<Array<ModelingEntityVo>> {
    return new Request<string, Array<ModelingEntityVo>>(
        `/main/modelingEntity/tree?parentId=${id}`,
        'get'
    ).send()
}

// 获取数据源
export function getDs(dsId: String): Promise<DbVo> {
    return new Request<Object, Array<DbVo>>(
        `/main/dbds/${dsId}`,
        'get',
        {}
    ).send()
}

// 实体保存
export function saveEntity(tableEntity: TableEntity): Promise<ModelingEntityVo> {
    return new Request<TableEntity, ModelingEntityVo>(
        `/main/modelingEntity`,
        'post',
        tableEntity
    ).send()
}

// 实体修改
export function updateEntity(tableEntity: TableEntity): Promise<ModelingEntityVo> {
    return new Request<TableEntity, ModelingEntityVo>(
        `/main/modelingEntity`,
        'put',
        tableEntity
    ).send()
}

// 实体删除
export function delEntity(id: string): Promise<boolean> {
    return new Request<string, boolean>(
        `/main/modelingEntity/${id}`,
        'delete',
        id
    ).send()
}

// 获取entity下面的列
export function getFieldByEntityId(id: string): Promise<Array<ModelingFieldVo>> {
    return new Request<Object, Array<ModelingFieldVo>>(
        `/main/modelingField/list`,
        'post',
        { entityId: id }
    ).send()
}

// 保存字段信息
export function saveField(modelingEntityDto: ModelingEntityDto): Promise<boolean> {
    return new Request<ModelingEntityDto, boolean>(
        `/main/modelingField`,
        'post',
        modelingEntityDto
    ).send()
}

// 接口发布
export function publishApi(id: string,): Promise<boolean> {
    return new Request<null, boolean>(
        `/main/modelingEntity/dynamic?id=${id}`,
        'get'
    ).send()
}

// 在线接口删除
export function deleteApi(id: string): Promise<boolean> {
    return new Request<null, boolean>(
        `/main/modelingEntity/del/dynamic?id=${id}`,
        'delete'
    ).send()
}

// 获取同步列
export function sync(id: string): Promise<Array<ModelingFieldVo>> {
    return new Request<null, string>(
        `/main/modelingEntity/syncColumn/${id}`,
        'get'
    ).send()
}

// 获取ddl语句
export function ddl(modelingEntityDto: ModelingEntityDto): Promise<string> {
    return new Request<ModelingEntityDto, string>(
        `/main/modelingField/getDDL`,
        'post',
        modelingEntityDto
    ).send()
}

// 部署前端配置
export function publicConfig(id: string): Promise<boolean> {
    return new Request<string, boolean>(
        `/main/modelPublishConfig/${id}`,
        'post'
    ).send()
}

// 删除前端配置
export function deleteConfig(id: string): Promise<boolean> {
    return new Request<string, boolean>(
        `/main/modelPublishConfig/${id}`,
        'delete'
    ).send()
}