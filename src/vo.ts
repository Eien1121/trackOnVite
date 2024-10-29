namespace track{
    export interface ErrorDataVO{
        /**项目名称 */
        pn:string;
        /**皮肤名称 */
        sn:string;
        /**当前所在页面 */
        path:string;
        /**平台号 */
        pid:number;
        /**渠道号 */
        cid:number;
        /**设置类型，userAgent */
        ua:string;
        /**唯一标识 */
        uuid:string;
        /**错误的具体信息 */
        msg:string;
        /**错误的类型 1-JS错误|2-接口错误 */
        type:number;
        /**时间戳 */
        t?:number;
        /**IP地址 */
        ip?:string;
        /**其它附加数据 */
        ex:string;
    }
}