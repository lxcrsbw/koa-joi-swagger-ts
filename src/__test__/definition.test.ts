import {UserSchema} from './init';
import 'jest';
import {TAG_DEFINITION_NAME, TAG_DEFINITION_DESCRIPTION} from '../lib';

describe('Definition', () => {

    it(` UserSchema's name should be equal 'User'`, () => {
        expect(UserSchema[TAG_DEFINITION_NAME]).toBe('User')
    });

    it(` UserSchema's description should be equal 'User Entity'`, () => {
        expect(UserSchema[TAG_DEFINITION_DESCRIPTION]).toBe('User Entity')
    });

});
