# simple-inject

A lightweight dependency injection tool for TypeScript projects (Actually not so powerful).

[中文版本](./README_zh_CN.md)

## Installation

```bash
npm install simple-inject
```

## Features

- Simple API with `provide` and `inject` functions
- Support for namespaces to manage dependencies in different contexts
- Lightweight and flexible, suitable for small to medium-sized projects
- No external dependencies
- TypeScript support with generics for type safety

## Usage

```typescript
import { provide, inject } from 'simple-inject';

// Provide a dependency
provide('config', { apiUrl: 'https://api.example.com' });

// Inject a dependency
const config = inject<{ apiUrl: string }>('config');
console.log(config?.apiUrl); // https://api.example.com

// Using namespaces
const appNamespace = Symbol('app');
provide('logger', console.log, appNamespace);
const logger = inject<typeof console.log>('logger', appNamespace);
logger?.('Hello, world!'); // Hello, world!
```

## API

### provide(key: string, value: any, namespace?: string | symbol)

Registers a dependency with the given key and value. Optionally, you can specify a namespace.

### inject<T>(key: string, namespace?: string | symbol): T | undefined

Retrieves a dependency with the given key. Optionally, you can specify a namespace. Returns `undefined` if the dependency is not found.

### DependencyContainer

A class that manages dependencies. You can create multiple instances if needed:

```typescript
import { DependencyContainer } from 'simple-inject';

const container = new DependencyContainer();
container.provide('db', dbConnection);
const db = container.inject('db');
```

## When to use simple-inject

- For small to medium-sized projects that need a straightforward way to manage dependencies
- When you want to avoid the complexity of full-fledged DI frameworks
- In scenarios where you need a flexible, lightweight solution for dependency management
- For projects that prioritize simplicity and ease of use over advanced DI features

## Limitations

- Does not support automatic injection or decoration of classes/functions
- No built-in lifecycle management for dependencies
- Limited features compared to full-scale DI frameworks

## License

MIT
