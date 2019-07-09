import { registerMethod } from "./utils";
import { IPath } from "./index";

export const TAG_SUMMARY = Symbol("Summary");

const SUMMARIES: Map<Function, Map<string, string>> = new Map();

export const summary = (summary: string): MethodDecorator => (target: any, key: string): void => {
  if (!SUMMARIES.has(target.constructor)) {
    SUMMARIES.set(target.constructor, new Map());
  }
  SUMMARIES.get(target.constructor).set(key, summary);
  registerMethod(target, key, (router: IPath): void => {
    router.summary = summary;
  });
  target[TAG_SUMMARY] = target.constructor[TAG_SUMMARY] = SUMMARIES.get(target.constructor);
};
