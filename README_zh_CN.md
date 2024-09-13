# simple-inject 中文说明

一个非常轻量级的 TypeScript 项目依赖注入工具（其实还不够依赖注入管理的格）。

## 安装

```bash
npm install simple-inject
```

## 特性

- 简单的 API，包含 `provide` 和 `inject` 函数
- 支持命名空间，可以在不同上下文中管理依赖
- 轻量灵活，适用于中小型项目
- 无外部依赖
- 支持 TypeScript，使用泛型提供类型安全

## 使用方法

```typescript
import { provide, inject } from 'simple-inject';

// 提供一个依赖
provide('config', { apiUrl: 'https://api.example.com' });

// 注入一个依赖
const config = inject<{ apiUrl: string }>('config');
console.log(config?.apiUrl); // https://api.example.com

// 使用命名空间
const appNamespace = Symbol('app');
provide('logger', console.log, appNamespace);
const logger = inject<typeof console.log>('logger', appNamespace);
logger?.('你好，世界！'); // 你好，世界！
```

## API

### provide(key: string, value: any, namespace?: string | symbol)

注册一个具有给定键和值的依赖。可以选择指定一个命名空间。

### inject<T>(key: string, namespace?: string | symbol): T | undefined

检索具有给定键的依赖。可以选择指定一个命名空间。如果未找到依赖，则返回 `undefined`。

### DependencyContainer

管理依赖的类。如果需要，您可以创建多个实例：

```typescript
import { DependencyContainer } from 'simple-inject';

const container = new DependencyContainer();
container.provide('db', dbConnection);
const db = container.inject('db');
```

## 何时使用 simple-inject

- 适用于需要简单依赖管理方式的中小型项目
- 当您想避免使用复杂的完整 DI 框架时
- 在需要灵活、轻量级依赖管理解决方案的场景中
- 对于优先考虑简单性和易用性而非高级 DI 特性的项目

## 局限性

- 不支持自动注入或装饰类/函数
- 没有内置的依赖生命周期管理
- 与全功能 DI 框架相比，功能较为有限

## 许可证

MIT