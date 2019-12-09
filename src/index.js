module.exports = class anyRouter {
  constructor() {
    this.routers = {};
    this.event = {};
  }

  add(url, ...controllers) {
    this.routers[url] = [...(this.routers[url] || []), ...controllers];
  }

  addEvent(type, ...controllers) {
    this.event[type] = [...(this.event[type] || []), ...controllers];
  }

  use(...controllers) {
    this.addEvent('middleware', ...controllers);
  }

  route(url, state = {}) {
    const runner = (controllers, key = 0) => {
      const controller = controllers[key];
      if (!controller) {
        return Promise.resolve();
      }

      return Promise.resolve(
        controller(state, () => runner(controllers, key + 1))
      );
    };

    return runner(this._controllerSelector(url));
  }

  _controllerSelector(url) {
    const {
      event: { middleware, notFound },
      routers
    } = this;

    const notFoundControllers = [...(middleware || []), ...(notFound || [])];

    if (typeof url === 'string') {
      if (!routers[url]) {
        return notFoundControllers;
      }
      return [...(middleware || []), ...routers[url]];
    }

    return notFoundControllers;
  }
};
