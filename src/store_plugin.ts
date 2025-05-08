import {PluginCreator, PluginOptions} from "@/plugins";
import { Store, plugins as pluginSymbol } from "@/store";

export function store_plugin(this: Store, plugin: PluginCreator<any>, options?: any) {
  const pluginOptions = plugin(this)
  pluginOptions.install(options)
  this[pluginSymbol].add(plugin.name, pluginOptions);

  return this
}