export const TAG_CONTROLLER: symbol = Symbol("Controller");

/**
 * Controller
 * @param path relative path
 * @returns ClassDecorator {(Controller:Function)=>undefined}
 */
export const controller = (path?: string): ClassDecorator => (Controller: Function): void => {
  if (!path) {
    path = Controller.name;
  }
  const parent = Object.getPrototypeOf(Controller);
  if (parent[TAG_CONTROLLER]) {
    path = parent[TAG_CONTROLLER] + path;
  }
  Controller[TAG_CONTROLLER] = path;
};
