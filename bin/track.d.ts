declare namespace track {
    function init(pname: string, sname: string, pid: number, cid: number): void;
    /**添加一个错误信息 */
    function pushError(err: any, type?: number): void;
    /**发送错误 */
    function sendError(): void;
}
declare namespace track {
    interface ErrorDataVO {
        /**项目名称 */
        pn: string;
        /**皮肤名称 */
        sn: string;
        /**当前所在页面 */
        path: string;
        /**平台号 */
        pid: number;
        /**渠道号 */
        cid: number;
        /**设置类型，userAgent */
        ua: string;
        /**唯一标识 */
        uuid: string;
        /**错误的具体信息 */
        msg: string;
        /**错误的类型 1-JS错误|2-接口错误 */
        type: number;
        /**时间戳 */
        t?: number;
        /**IP地址 */
        ip?: string;
        /**其它附加数据 */
        ex: string;
    }
}
/**
 * 全局属性和方法
 */
declare namespace track {
    /**
     * 获取UUID
     */
    function generateUUID(): string;
    /**
     * 获取URL参数
     * @param value
     */
    function getQueryVariable(value: string): string | null;
    /**
     * 是否为移动设备
     */
    function isMobile(): RegExpMatchArray;
    /**是否android */
    function isAndroid(): RegExpMatchArray;
    /**是否IOS */
    function isIOS(): RegExpMatchArray;
}
declare namespace track {
    const version = "1.0.0";
    const host = "https://clientlogapi.testjj9.com";
    let projectName: string;
    let skinName: string;
    let uuid: string;
    let plat_id: number;
    let channel_id: number;
    /**错误数据列表 */
    let dataError: any[];
    /**打点数据列表 */
    let dataPoint: any[];
}
declare namespace track {
    function client_log_v1_error_store(data: any): Promise<void>;
}
