const anyRouter = require('../src');
// const anyRouter = require('any-router');
// import anyRouter from 'any-router';

const waiting = (delay = 5000) =>
  new Promise(resolve => setTimeout(resolve, delay));

const router = new anyRouter();

router.use(async (state, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ms}ms`);
});

router.use(async (state, next) => {
  await next();

  await waiting(500);
  console.log(state.body, state.globalState);
});

router.add('ping', (state, next) => {
  state.body = Math.random();
  next();
});

const run = async i => {
  const url = 'ping';

  router.route(url, {
    globalState: `something${i}`
  });

  await waiting(100);
  if (i < 10) {
    run(i + 1);
  }
};

run(1);
