import express, { Router } from 'express';

export const router: Router = express.Router();

/**
 * 路由注解
 * { name: string, path: string, method: string}
 */
export function MRoute(path : string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const path_ = path;
        router.get(path_, descriptor.value);
    }
}