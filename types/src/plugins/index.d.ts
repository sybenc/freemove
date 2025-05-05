import { Store } from "../store";
export type PluginOptions = {
    name: string;
    install: (this: Store, options: any) => void;
    uninstall: (this: Store) => void;
};
export declare class Plugins {
    private storage;
    add(name: string, plugin: PluginOptions): void;
    get(): Map<string, PluginOptions>;
}
