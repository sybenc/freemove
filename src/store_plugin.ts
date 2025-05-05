import { PluginOptions } from "./plugins";
import { Store, plugin as pluginSymbol } from "./store";

export function store_plugin(this: Store, plugin: PluginOptions, options?: any) {
  plugin.install.call(this, options);
  this[pluginSymbol].add(plugin.name, plugin);
}
