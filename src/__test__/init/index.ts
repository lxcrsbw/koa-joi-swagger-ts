import {controller} from '../../lib';

import {get, post, del, put} from '../../lib';
import {parameter, ENUM_PARAM_IN} from '../../lib';
import * as joi from 'joi';
import {definition} from '../../lib';
import {summary} from '../../lib';
import {response} from '../../lib';
import {description} from '../../lib';
import {tag} from '../../lib';

@definition('User', 'User Entity')
export class UserSchema {
    userName = joi.string().min(6).description('username').required();
//    userPass = joi.string().min(6).description('password').required();
}

@controller('/v3/api')
export class BaseController {

    @get('/')
    @parameter('version', joi.string().description('version'))
    @summary('BaseController[index]')
    @response(200)
    @description('home')
    index() {

    }

}

@controller('/user')
export class UserController extends BaseController {
    @get('/')
    @parameter('userName', joi.string().description('username'))
    @response(200, {$ref: UserSchema})
    @response(201)
    @tag('User')
    doGet() {

    }

    @post('/')
    @parameter('user', joi.string().description('user'), ENUM_PARAM_IN.body)
    @summary('UserController[doPost]')
    @response(303)
    doPost() {

    }

    @del('/{uid}')
    @parameter('uid', joi.string().required().description('userID'), ENUM_PARAM_IN.path)
    @description('Delete User')
    doDelete() {

    }

    @put('/')
    @parameter('token', joi.string().description('token'), ENUM_PARAM_IN.header)
    doPut() {

    }
}

@controller('/admin')
export class AdminController extends UserController {

    @del('/{adminId}')
    @parameter('adminId', joi.string().required().description('admin id'), ENUM_PARAM_IN.path)
    doDelete() {

    }

}
