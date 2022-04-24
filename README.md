## What is ProperJS?

ProperJS is a lightweight experimental Javascript Framework for the development of Backend services using modern features like IoC and Dependency Injection.\
It is built in Typescript and support Multi Tier Layering thanks to features like `Controller` and `Component` (known also as View and Business Logic layers).\
Most of the ideas and concepts are well known and based on famous projects like [NestJS](https://nestjs.com/) and [Spring](https://spring.io/).

## Main Goals
One of the main goals of ProperJS is to bring a more generic framework that works in a `Context` like `Java Beans`, since Javascript is a interpreted programming language this goal is achieved with an old fashion directory scan that register all the components into the `ApplicationContext`.\
Another goal is to let anyone learn how a modern MVC Framework works to help bring new idea into the community

## Quick Start
Right now there isn't a public NPM package instead for the alpha and testing phase we use local modules features from Node, one example can be seen [here](examples/hello-word-example).\
ProperJS can run in 2 different modes known as `WebApplication` or `StandaloneApplication`:

### Web Application
This mode supports most of features like IoC and Dependency Injection, it uses `Controllers` as entry point for the `ApplicationServerAdapter` which could be implemented as any popular Javascript Web Library like [Express](https://expressjs.com/it/) in fact the default adapter is an implementation called `ExpressApplicationServerAdapter` which used Express as web server.
For example given an `ExampleController` defined as:
```typescript
import {Controller, Get} from "properjs/src";

@Controller()
export default class ExampleController {

    @Get()
    public helloWorld(): String {
        return "Hello World"
    }
}
```

it will be registered in the `ApplicationContext` and binded to the `ApplicationServerAdapter` to handle inbound requests

```typescript
import {ApplicationFactory} from "properjs/src/core";

async function bootstrap() {
    const applicationServerAdapter = await ApplicationFactory.create();

    applicationServerAdapter.listen(3000);
}

bootstrap();
```
in this case the `ApplicationFactory` will create an instance of the default server adapter that contains the `ApplicationContext` logic

### Standalone Application
ProperJS can also run in standalone mode, it supports most of the framework features like a Dependency Injection Container, in this case there isn't any server but just an `ApplicationContext` that contains all the `Component` instances.\
For example given an `ExampleComponent` defined as:
```typescript
import {Component} from "properjs/src";

@Component()
export default class ExampleComponent {

    public helloWorld(): String {
        return "Hello World!"
    }
}

```

we can create a standalone application and retrieve the component instance using the `ApplicationContextFactory`

```typescript
import ApplicationContextFactory from "properjs/src/core/application-context-factory";
import ExampleComponent from "./src/example.component";

async function bootstrap() {
    const applicationContext = await ApplicationContextFactory.createApplicationContext();

    const exampleComponent = applicationContext.get<ExampleComponent>(ExampleComponent)

    console.log(exampleComponent.helloWorld())
}

bootstrap();
```

## Features
WIP
