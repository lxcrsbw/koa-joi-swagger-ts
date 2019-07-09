import { BaseController, UserController } from "./init";
import { TAG_CONTROLLER } from "..";

describe("Controller", () => {

  it(` BaseController's path should be equal "/v3/api"`, () => {

    expect(BaseController[TAG_CONTROLLER]).toBe("/v3/api");

  });

  it(` UserController's path should be equal "/v3/api/user"`, () => {

    expect(UserController[TAG_CONTROLLER]).toBe("/v3/api/user");

  });

});
