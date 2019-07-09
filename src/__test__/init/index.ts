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

@definition("User", "User Entity")
export class UserSchema {
  userName = joi.string().min(6).description("username").required();
//    userPass = joi.string().min(6).description("password").required();
}

@controller("/v3/api")
export class BaseController {

  @get("/")
  @parameter("version", joi.string().description("version"))
  @summary("BaseController[index]")
  @response(HTTPStatusCodes.success)
  @description("home")
  index() {

  }

}

@controller("/user")
export class UserController extends BaseController {
  @get("/")
  @parameter("userName", joi.string().description("username"))
  @response(HTTPStatusCodes.success, {$ref: UserSchema})
  @response(HTTPStatusCodes.created)
  @tag("User")
  doGet() {

  }

  @post("/")
  @parameter("user", joi.string().description("user"), ENUM_PARAM_IN.body)
  @summary("UserController[doPost]")
  @response(HTTPStatusCodes.other)
  doPost() {

  }

  @del("/{uid}")
  @parameter("uid", joi.string().required().description("userID"), ENUM_PARAM_IN.path)
  @description("Delete User")
  doDelete() {

  }

  @put("/")
  @parameter("token", joi.string().description("token"), ENUM_PARAM_IN.header)
  doPut() {

  }
}

@controller("/admin")
export class AdminController extends UserController {

  @del("/{adminId}")
  @parameter("adminId", joi.string().required().description("admin id"), ENUM_PARAM_IN.path)
  doDelete() {

  }

}
