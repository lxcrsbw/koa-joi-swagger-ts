export const TAG_CONTROLLER = Symbol("Controller");

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
  if (parent[Symbol.for("Controller")]) {
    path = parent[Symbol.for("Controller")] + path;
  }
  Controller[Symbol.for("Controller")] = path;
};
