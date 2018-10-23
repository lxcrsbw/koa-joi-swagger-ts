import {BaseController, UserController} from './init';
import 'jest';
import {TAG_DESCRIPTION} from '../lib';

describe('Description', () => {
    it(` BaseController's index description should be equal 'BaseController[index]'`, () => {

        expect(BaseController[TAG_DESCRIPTION].get('index')).toBe('home');

    });

    it(` BaseController's doGet description should be equal undefined`, () => {

        expect(BaseController[TAG_DESCRIPTION].get('doGet')).toBe(undefined);

    });

    it(` UserController's doDelete description should be equal 'Delete User'`, () => {

        expect(UserController[TAG_DESCRIPTION].get('doDelete')).toBe('Delete User');

    });

    it(` UserController's doPut description should be equal undefined`, () => {

        expect(UserController[TAG_DESCRIPTION].get('doPut')).toBe(undefined);

    });

});
