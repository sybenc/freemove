import { PluginOptions } from "@/plugins";
import { Store, plugins as pluginSymbol } from "@/store";

export function store_plugin(this: Store, plugin: PluginOptions<any>, options?: any) {
  plugin.install(this, options);
  this[pluginSymbol].add(plugin.name, plugin);

  return this
}