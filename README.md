# @yuzulabo/any-router

(C.S Spaces の副産物)

> Routing Anything

```javascript
import anyRouter from '@yuzulabo/any-router';

const router = new anyRouter();

router.use(async (state, next) => {
  await next();
  // final processing here... (ex: send)
});

router.use(async (state, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ms}ms`);
});

router.add('ping', (state, next) => {
  state.ping = 'pong';
  next();
});

const url = 'ping';
router.route(url, {
  globalState: 'something'
});
```
