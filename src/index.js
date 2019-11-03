module.exports = class anyRouter {
  constructor() {
    this.routers = {};
    this.event = {};
    this.resolver = [];
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
    const runner = (controllers, key = 0) =>
      new Promise(resolve => {
        this.resolver.push(resolve);
        const controller = controllers[key];

        if (!controller) {
          return this.resolver.reverse().forEach(fn => fn());
        }

        try {
          controller(state, (isEmit = false) =>
            runner(controllers, isEmit ? 9999 : key + 1)
          );
        } catch (error) {
          console.error(error);
        }
      });

    runner(this._controllerSelector(url));
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
