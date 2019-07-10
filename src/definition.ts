import { registerGlobal } from "./utils";
import { toSchema } from "./ischema";

export const TAG_DEFINITION_NAME = Symbol("DefinitionName");
export const TAG_DEFINITION_DESCRIPTION = Symbol("DefinitionDescription");

export const definition = (name?: string, description?: string): ClassDecorator => (Definition: Function): void => {
  if (!name) {
    name = Definition.name;
  }
  registerGlobal(Definition, (swagger): void => {
    swagger.definitions[name] = toSchema(Definition);
  });
  Definition[TAG_DEFINITION_NAME] = name;
  Definition[TAG_DEFINITION_DESCRIPTION] = description || name;
};
