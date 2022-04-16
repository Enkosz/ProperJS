import InstanceWrapper from "./instance-wrapper";
import { Component } from "../loader/component";

export default class AnnotationApplicationContext {
    private readonly components: Map<Object, InstanceWrapper<Component>>
    private readonly controllers: Map<Object, InstanceWrapper<Component>>

    constructor() {
        this.components = new Map<Object, InstanceWrapper<Component>>()
        this.controllers = new Map<Object, InstanceWrapper<Component>>();
    }

    public getComponents() {
        return this.components;
    }

    public getControllers() {
        return this.controllers;
    }

    public addComponent(component: any) {
        if(!this.components.has(component))
            this.components.set(component, {instance: null!})
    }

    public addController(component: any) {
        if(!this.controllers.has(component))
            this.controllers.set(component, { instance: null! })
    }
}

