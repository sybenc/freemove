import {plugins, Store} from "@/store";

export function store_plugin_data<T>(this: Store, name: string){
  return this[plugins].get<T>(name).data
}