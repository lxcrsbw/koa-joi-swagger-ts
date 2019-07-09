import { BaseController, UserController } from "./init";
import { HTTPStatusCodes, TAG_RESPONSE } from "..";

describe("Response", () => {

  it(` BaseController's index have [ 200 ] response`, () => {

    expect(BaseController[TAG_RESPONSE].get("index").get(HTTPStatusCodes.success)).not.toBe(undefined);

  });

  it(` BaseController's index haven't [ 500 ] response`, () => {

    expect(BaseController[TAG_RESPONSE].get("index").get(HTTPStatusCodes.internalServerError)).toBe(undefined);

  });

  it(` UserController's doGet have [ 200 ] response`, () => {

    expect(UserController[TAG_RESPONSE].get("doGet").get(HTTPStatusCodes.success)).not.toBe(undefined);

  });

  it(` UserController's doGet have [ 201 ] response`, () => {

    expect(UserController[TAG_RESPONSE].get("doGet").get(HTTPStatusCodes.created)).not.toBe(undefined);

  });

  it(` UserController's doGet haven't [ 303 ] response`, () => {

    expect(UserController[TAG_RESPONSE].get("doGet").get(HTTPStatusCodes.other)).toBe(undefined);

  });

  it(` UserController's doPost have [ 303 ] response`, () => {

    expect(UserController[TAG_RESPONSE].get("doPost").get(HTTPStatusCodes.other)).not.toBe(undefined);

  });

});
