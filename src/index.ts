/*
 * Copyright (c) 2024 by frostime. All Rights Reserved.
 * @Author       : frostime
 * @Date         : 2024-09-13 18:41:10
 * @FilePath     : /src/index.ts
 * @LastEditTime : 2024-09-13 19:05:19
 * @Description  : 
 */
type Dependency = any;
type Namespace = string | symbol;

const DEFAULT_NAMESPACE = Symbol('DEFAULT_NAMESPACE');

class DependencyContainer {
    private dependencies: Map<Namespace, Map<string, Dependency>> = new Map();

    provide(key: string, value: Dependency, namespace: Namespace = DEFAULT_NAMESPACE): void {
        if (!this.dependencies.has(namespace)) {
            this.dependencies.set(namespace, new Map());
        }
        this.dependencies.get(namespace)!.set(key, value);
    }

    inject<T>(key: string, namespace: Namespace = DEFAULT_NAMESPACE): T | undefined {
        const namespaceMap = this.dependencies.get(namespace);
        if (!namespaceMap) {
            return undefined;
        }
        return namespaceMap.get(key) as T | undefined;
    }

    remove(key: string, namespace: Namespace = DEFAULT_NAMESPACE): boolean {
        const namespaceMap = this.dependencies.get(namespace);
        if (namespaceMap) {
            return namespaceMap.delete(key);
        }
        return false;
    }

    purge(namespace?: Namespace): void {
        if (namespace) {
            this.dependencies.delete(namespace);
        } else {
            this.dependencies.clear();
        }
    }
}

const container = new DependencyContainer();

const provide = container.provide.bind(container);
const inject = container.inject.bind(container);
const purge = container.purge.bind(container);
const remove = container.remove.bind(container);
export default container;
export {
    DependencyContainer,
    provide,
    inject,
    purge,
    remove
}
