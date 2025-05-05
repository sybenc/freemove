import { Store } from "../store";

export type PluginOptions = {
  name: string;
  install: (this: Store, options: any) => void;
  uninstall: (this: Store) => void;
};

export class Plugins {
  private storage: Map<string, PluginOptions> = new Map();

  add(name: string, plugin: PluginOptions) {
    if (this.storage.has(name)) throw Error(`Freemove: 插件${name}已经存在`);
    else this.storage.set(name, plugin);
  }

  get() {
    return this.storage;
  }
}
