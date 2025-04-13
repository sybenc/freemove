export class EventEmitter {
  // 消息列表Map
  private _msgListMap: Map<any, IMsg[]> = new Map();
  // 消息id计数
  private _msgId: number = 0;

  /**
   * 注册消息
   * @param type 消息类型
   * @param cb 消息回调函数
   * @param target 回调函数绑定的目标
   * @param priority 消息执行顺序 越小越优先 默认为0 
   * @returns 消息id
   */
  public on(type: string, cb: IMsgCb, target: any = null, priority: number = 0): number {
      const id = ++this._msgId;

      const msg: IMsg = {
          id: id,
          cb: cb,
          target: target,
          priority: priority,
      };

      let msgList = this._msgListMap.get(type);
      if (msgList) {
          msgList.push(msg);
      } else {
          msgList = [msg];
          this._msgListMap.set(type, msgList);
      }

      msgList.sort((a, b) => a.priority - b.priority);

      return msg.id;
  }

  /**
   * 注销消息
   * @param type 消息类型
   * @param cb 消息回调函数
   * @param target 回调函数绑定的目标
   */
  public off(type: string, cb: IMsgCb, target?: any): void;
  /**
   * 通过消息id注销指定消息
   * @param type 消息类型
   * @param id 消息id
   */
  public off(type: string, id: number): void;
  /**
   * 注销指定消息类型的所有消息
   * @param type 消息类型
   */
  public off(type: string): void;
  public off(...args: any[]): void {
      const type = args[0];
      if (args.length === 1) {
          this.offAll(type);
          return;
      }
      if (args.length === 2) {
          if (typeof args[1] === 'number') {
              this.offById(type, args[1]);
          } else {
              this.offByCb(type, args[1]);
          }
          return;
      }
      if (args.length === 3) {
          const cb = args[1];
          const target = args[2];
          this.offByCb(type, cb, target);
          return;
      }
  }
  private offByCb(type: string, cb: IMsgCb, target: any = null): void {
      const msgList = this._msgListMap.get(type);
      if (!msgList) return;

      if (target) {
          const index = msgList.findIndex((msg) => msg.cb === cb && msg.target === target);
          if (index !== -1) msgList.splice(index, 1);
      } else {
          const index = msgList.findIndex((msg) => msg.cb === cb);
          if (index !== -1) msgList.splice(index, 1);
      }
  }
  private offById(type: string, id: number): void {
      const msgList = this._msgListMap.get(type);
      if (!msgList) return;

      const index = msgList.findIndex((msg) => msg.id === id);
      if (index !== -1) msgList.splice(index, 1);
  }
  private offAll(type: string): void {
      if (this._msgListMap.has(type)) {
          this._msgListMap.delete(type);
      }
  }

  /**
   * 发射消息
   * @param type 消息类型
   * @param args 消息参数
   */
  public emit(type: string, ...args: any[]): void {
      const msgList = this._msgListMap.get(type);
      if (!msgList) return;

      msgList.forEach((msg) => {
          if (msg.target) {
              msg.cb.call(msg.target, ...args);
          } else {
              msg.cb(...args);
          }
      });
  }

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

export default new EventEmitter()