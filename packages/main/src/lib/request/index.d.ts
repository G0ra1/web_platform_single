
// 请求分页
type RequestPagingData = {
    [k: string]: any,
    page?: {
        current: number,
        size: number
    }
}

// 响应分页
type ResponsePagingData = {
    // total: number, // 数据总条数
    // size: number,   // 每页显示数量
    // pages: number,  // 总页数
    // current: number, // 当前页码
    // records: Array<unknown> // 返回结果
    total: number, // 数据总条数
    result: Array<unknown> // 返回结果
}

type AxiosRequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'
/**
 * 
 */
interface AxiosRequest<S, T> {
    url: string, // 请求路径
    method: AxiosRequestMethod,
    data: S,    // 请求参数
    send: (a?: S) => Promise<T> // 响应参数
    cancel?: () => void // 取消请求
}

// 分页专属
interface AxiosRequestPaging extends AxiosRequest<RequestPagingData, ResponsePagingData> {

}

export {
    AxiosRequestPaging,
    AxiosRequest,
    AxiosRequestMethod,
    RequestPagingData,
    ResponsePagingData
}