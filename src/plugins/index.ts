import {Store} from "@/store";

export type PluginOptions<T> = {
  name: string;
  data: T;
  install: (store: Store, options: any) => void;
  uninstall: (store: Store) => void;
};

export class Plugins {
  private storage: Map<string, PluginOptions<any>> = new Map();

  add(name: string, plugin: PluginOptions<any>) {
    if (this.storage.has(name)) throw Error(`Freemove: 插件${name}已经存在`);
    else this.storage.set(name, plugin);
  }


  getAll() {
    return this.storage;
  }

  get<T>(name: string) {
    if (this.storage.has(name)) throw Error(`Freemove: 插件${name}不存在`);
    else return this.storage.get(name) as PluginOptions<T>;
  }
}
