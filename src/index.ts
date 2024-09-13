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
}

const container = new DependencyContainer();

const provide = container.provide.bind(container);
const inject = container.inject.bind(container);
export default container;
export {
    DependencyContainer,
    provide,
    inject,
}
