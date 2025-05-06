import { Store } from "@/store";
export type PluginOptions<T> = {
    name: string;
    data: T;
    install: (store: Store, options: any) => void;
    uninstall: (store: Store) => void;
};
export declare class Plugins {
    private storage;
    add(name: string, plugin: PluginOptions<any>): void;
    getAll(): Map<string, PluginOptions<any>>;
    get<T>(name: string): PluginOptions<T>;
}
