export declare class EventEmitter {
    private _msgListMap;
    private _msgId;
    /**
     * 注册消息
     * @param type 消息类型
     * @param cb 消息回调函数
     * @param target 回调函数绑定的目标
     * @param priority 消息执行顺序 越小越优先 默认为0
     * @returns 消息id
     */
    on(type: string, cb: IMsgCb, target?: any, priority?: number): number;
    /**
     * 注销消息
     * @param type 消息类型
     * @param cb 消息回调函数
     * @param target 回调函数绑定的目标
     */
    off(type: string, cb: IMsgCb, target?: any): void;
    /**
     * 通过消息id注销指定消息
     * @param type 消息类型
     * @param id 消息id
     */
    off(type: string, id: number): void;
    /**
     * 注销指定消息类型的所有消息
     * @param type 消息类型
     */
    off(type: string): void;
    private offByCb;
    private offById;
    private offAll;
    /**
     * 发射消息
     * @param type 消息类型
     * @param args 消息参数
     */
    emit(type: string, ...args: any[]): void;
}
/**
* 消息回调
*/
type IMsgCb = (...args: any[]) => void;
/**
* 消息对象
*/
export interface IMsg {
    /**
     * 唯一标识
     */
    id: number;
    /**
     * 回调函数
     * @param data 数据
     */
    cb: IMsgCb;
    /**
     * 回调目标
     */
    target: any;
    /**
     * 执行顺序 值越小越先执行
     */
    priority: number;
}
declare const _default: EventEmitter;
export default _default;
