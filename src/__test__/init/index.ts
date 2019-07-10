import {
  get,
  post,
  del,
  put,
  controller,
  definition,
  summary,
  response,
  description,
  tag,
  parameter,
  ENUM_PARAM_IN,
  HTTPStatusCodes
} from "../..";
import * as joi from "joi";

const STRING_TRIM = 6;

@definition("User", "User Entity")
export class UserSchema {
  public userName = joi.string().min(STRING_TRIM).description("username").required();
//    userPass = joi.string().min(6).description("password").required();
}

@controller("/v3/api")
export class BaseController {

  @get("/")
  @parameter("version", joi.string().description("version"))
  @summary("BaseController[index]")
  @response(HTTPStatusCodes.success)
  @description("home")
  public index(): void {

  }

}

@controller("/user")
export class UserController extends BaseController {
  @get("/")
  @parameter("userName", joi.string().description("username"))
  @response(HTTPStatusCodes.success, {$ref: UserSchema})
  @response(HTTPStatusCodes.created)
  @tag("User")
  public doGet(): void {

  }

  @post("/")
  @parameter("user", joi.string().description("user"), ENUM_PARAM_IN.body)
  @summary("UserController[doPost]")
  @response(HTTPStatusCodes.other)
  public doPost(): void {

  }

  @del("/{uid}")
  @parameter("uid", joi.string().required().description("userID"), ENUM_PARAM_IN.path)
  @description("Delete User")
  public doDelete(): void {

  }

  @put("/")
  @parameter("token", joi.string().description("token"), ENUM_PARAM_IN.header)
  public doPut(): void {

  }
}

@controller("/admin")
export class AdminController extends UserController {

  @del("/{adminId}")
  @parameter("adminId", joi.string().required().description("admin id"), ENUM_PARAM_IN.path)
  public doDelete(): void {

  }

}
