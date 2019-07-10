import { registerMethod } from "./utils";
import { IPath } from "./index";

export const TAG_DESCRIPTION = Symbol("Description");

const DESCRIPTIONS: Map<() => void, Map<string, string>> = new Map();

export const description = (description: string): MethodDecorator => (target: {}, key: string): void => {
  if (!DESCRIPTIONS.has(target.constructor as () => void)) {
    DESCRIPTIONS.set(target.constructor as () => void, new Map());
  }
  registerMethod(target, key, (router: IPath): void => {
    router.description = description;
  });
  DESCRIPTIONS.get(target.constructor as () => void).set(key, description);
  target[TAG_DESCRIPTION] = target.constructor[TAG_DESCRIPTION] = DESCRIPTIONS.get(target.constructor as () => void);
};
