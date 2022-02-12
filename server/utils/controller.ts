import express, { Request, Response, Router } from "express";

export enum RouteMethod {
  get = 'get',
  post = 'post',
  patch = 'patch'
}

type RouteService = (req: Request, res: Response) => void;

interface RouteConfig {
  route: string
  method: RouteMethod
  service: RouteService
}

type RouterGenerator = Array<RouteConfig>

export const routerGenerator = (...args: RouterGenerator): Router  => {
  const router = express.Router();

  const getRouterMethod = (method: RouteMethod) => ({
    [RouteMethod.get]: (route: string, service: RouteService) => router.get(route, service),
    [RouteMethod.post]: (route: string, service: RouteService) => router.post(route, service),
    [RouteMethod.patch]: (route: string, service: RouteService) => router.patch(route, service)
  }[method]);

  args.forEach((arg) => {
    getRouterMethod(arg.method)(arg.route, arg.service)
  })

  return router;
}