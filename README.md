## Koa-Joi-Swagger-TS

### How to use

    npm install koa-joi-swagger-ts --save
    
### Example (*TypeScript*)

    import {parameter, get, post, del, controller, definition, KJSRouter, summary, response, tag, ENUM_PARAM_IN} from 'koa-joi-swagger-ts';
    import * as joi from 'joi';
    import * as fs from 'fs';
    import {array, string} from 'joi';
    import * as koa from 'koa';
    
    @definition('User', 'User Entity')
    class UserSchema {
        userName = joi.string().min(6).description('username').required();
        userPass = joi.string().min(6).description('password').required();
    }
    
    @controller('/v3/api')
    class BaseController {
        @get('/')
        index() {
        }
    }
    
    /**
     * This method will be called by middleware instead of controller
     */
    const baseControllerFunction = async (controller, ctx, next, summary): Promise<void> => {
        console.log(`${ctx.request.method} ${ctx.request.url}`);
        try {
            await controller(ctx);
        } catch (e) {
            console.log(e, `Error while executing '${summary}'`);
        }
    };

    @controller('/user')
    class UserController extends BaseController {
    
        @del('/{userId}')
        @parameter('userId', joi.string().min(2).description('userId'), ENUM_PARAM_IN.path)
        index() {
    
        }
    
        @get('/')
        @parameter('userId', joi.string().required(), ENUM_PARAM_IN.query)
        doGet(ctx) {
            ctx.body = Date.now();
        }
        
        @post('/upload')
        @parameter('file1', {type: "file"}, ENUM_PARAM_IN.formData)
        doUpload(ctx) {
            ctx.body = { fileObj: ctx.body.file1};
        }
    
        @get('/{userId}')
        @parameter('userId', joi.number().min(2).description('userId'), ENUM_PARAM_IN.path)
        @response(200, {$ref: UserSchema})
        getUser(ctx) {
            ctx.body = {userName: ctx.params.userId.toString(), userPass: Date.now().toString()};
        }
    
        @post('/')
        doPost() {
        }
    
        @get('s')
        @response(200, {type: 'array', items: {$ref: UserSchema}})
        getUsers() {
        }
    }
    
    @definition('Admin', 'Admin Entity')
    class AdminSchema {
        userName = joi.string().required().min(6).uppercase();
        userPass = joi.string();
    }
    
    @controller('/admin')
    class AdminController extends UserController {
    
        @post('/login')
        @parameter('name', joi.string().description('name'))
        @parameter('list', array().items(string()).required(), ENUM_PARAM_IN.query)
        @summary('AdminController.index')
        @response(200, {$ref: AdminSchema})
        @response(202, joi.string().description('aaa'))
        @tag('Admin')
        @tag('User')
        index() {
        }
    }
    
    const router = new KJSRouter();
    
    router.loadDefinition(UserSchema);
    router.loadDefinition(AdminSchema);
    router.loadController(BaseController);
    // Process controller through pattern Decorator
    router.loadController(UserController, baseControllerFunction);
    router.loadController(AdminController);
    
    router.setSwaggerFile('swagger.json');

    router.loadSwaggerUI('/');

    fs.writeFileSync('./swagger.json', JSON.stringify(router.swagger));
    
    // console.log(router.getRouter());
    
    const app = new koa();
    
    app.use(router.getRouter().routes());
    
    app.use(router.getRouter().allowedMethods());
    
    app.listen(3002);
