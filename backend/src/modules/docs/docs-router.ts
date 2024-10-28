import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { readFileSync } from "fs";
import { AppRouter } from "../../interfaces/module-interface";

export default class DocsRouter implements AppRouter {
   public readonly router: Router = Router();

   constructor() {}

   public index() {
      let filePath;
      if (process.cwd().includes("dist")) {
         filePath = path.join(process.cwd());
      } else {
         filePath = path.join(process.cwd(), "dist");
      }
      const swagger = readFileSync(`${filePath}/swagger.json`);
      this.router.use("/", swaggerUi.serve);
      this.router.get(
         "/",
         swaggerUi.setup(JSON.parse(swagger.toString()), {
            swaggerOptions: {
               tagsSorter: "alpha",
               operationsSorter: (previousMethod: any, currentMethod: any) => {
                  var methodsOrder = ["get", "post", "put", "patch", "delete", "options", "trace"];
                  var result =
                     methodsOrder.indexOf(previousMethod.get("method")) -
                     methodsOrder.indexOf(currentMethod.get("method"));

                  if (result === 0) {
                     result = previousMethod.get("path").localeCompare(currentMethod.get("path"));
                  }

                  return result;
               },
            },
         })
      );
      return this;
   }
}
