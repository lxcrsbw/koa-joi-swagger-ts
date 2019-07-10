import { TAG_CONTROLLER } from "./controller";
import { TAG_METHOD } from "./method";
import { TAG_MIDDLE_METHOD, TAG_GLOBAL_METHOD, TAG_MIDDLE_WARE } from "./utils";
import { TAG_DEFINITION_NAME } from "./definition";
import * as _ from "lodash";
import * as Router from "koa-router";

import koaSwagger from "koa2-swagger-ui";

export * from "./controller";

export * from "./definition";

export * from "./description";

export * from "./ischema";

export * from "./method";

export * from "./parameter";

export * from "./resolvers";

export * from "./response";

export * from "./summary";

export * from "./tag";

export interface ISwagger {
  swagger: string;
  info: {
    description?: string;
    version: string;
    title: string;
    termsOfService?: string;
    concat?: {
      email: string;
    };
    license?: {
      name: string;
      url: string;
    }
  };
  host?: string;
  basePath?: string;
  tags?: {
    name: string;
    description?: string;
    externalDocs?: {
      description: string;
      url: string;
    }
  }[];
  schemes: string[];
  paths: {};
  definitions: {};
}

export interface IPath {
  tags: string[];
  summary: string;
  description: string;
  operationId: string;
  consumes: string[];
  produces: string[];
  parameters?: {}[];
  responses: {};
  security: {}[];
}

export const DEFAULT_SWAGGER: ISwagger = {
  basePath: "/v1/api",
  definitions: {},
  host: "localhost:3002",
  info: {
    version: "1.0.0",
    title: "Koa-Joi-Swagger-TS server"
  },
  paths: {},
  schemes: ["http"],
  swagger: "2.0"
};

export const DEFAULT_PATH: IPath = {
  consumes: ["application/json", "multipart/form-data", "application/x-www-form-urlencoded"],
  description: "",
  operationId: undefined,
  produces: ["application/json", "multipart/form-data", "application/x-www-form-urlencoded"],
  responses: {"200": {description: "Success"}},
  security: [],
  summary: "",
  tags: []
};

export enum HTTPStatusCodes {
  success = 200,
  internalServerError = 500,
  created = 201,
  other = 303,
  badRequest = 400
}

const FIRST_SCHEMA = 0;

export class KJSRouter {

  private readonly swagger: ISwagger;

  private router: Router = new Router();

  private swaggerFileName: string;

  constructor(swagger: ISwagger = DEFAULT_SWAGGER) {
    this.swagger = swagger;
  }

  public loadController(Controller, decorator: Function = null): void {
    if (Controller[TAG_CONTROLLER]) {
      const allMethods = Controller[TAG_METHOD] || new Map();
      const paths = [...allMethods.keys()];
      const middleMethods = Controller[TAG_MIDDLE_METHOD] || new Map();
      const middleWares = Controller[TAG_MIDDLE_WARE] || new Map();
      paths.forEach((path) => {
        const temp = {};
        const fullPath = (Controller[TAG_CONTROLLER] + path).replace(this.swagger.basePath, "");
        const methods = allMethods.get(path);
        for (const [k, v] of methods) {
          const router = _.cloneDeep(DEFAULT_PATH);
          const methods = middleMethods.get(v.key);
          const wares = middleWares.has(v.key) ? [...middleWares.get(v.key)] : [];
          if (methods) {
            for (let i = 0, len = methods.length; i < len; i++) {

              methods[i](router, this.swagger);
            }
          }
          temp[k] = router;
          if (this.router[k]) {
            this.router[k]((Controller[TAG_CONTROLLER] + path).replace(/{(\w+)}/g, ":$1"), ...(wares.concat(decorator ? async (ctx, next) => {
              await decorator(v.handle, ctx, next, router.summary);
            } : v.handle)));
          }
        }
        this.swagger.paths[fullPath] = temp;
      });
    }
  }

  public loadDefinition(Definition): void {
    if (Definition[TAG_DEFINITION_NAME]) {
      const globalMethods = Definition[TAG_GLOBAL_METHOD] || [];
      globalMethods.forEach((deal) => {
        deal(this.swagger);
      })
    }
  }

  public setSwaggerFile(fileName: string): void {
    this.swaggerFileName = this.swagger.basePath + "/" + fileName;
    this.router.get(this.swaggerFileName, (ctx, next) => {
      ctx.body = JSON.stringify(this.swagger)
    });
  }

  public loadSwaggerUI(url: string): void {
    this.router.get(url, koaSwagger({
      routePrefix: false,
      swaggerOptions: {
        url: this.swagger.schemes[FIRST_SCHEMA] + "://" + this.swagger.host + this.swaggerFileName
      }
    }));
  }

  public getRouter(): Router {
    return this.router;
  }

}
