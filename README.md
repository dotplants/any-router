![img](https://i.imgur.com/gWwIGeQ.png)

# Example

also see: [example/index.js](https://github.com/dotplants/any-router/blob/master/example/index.js)

```javascript
import anyRouter from 'any-router';

const router = new anyRouter();

router.use(async (state, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ms}ms`);
});

router.use(async (state, next) => {
  await next();
  // final processing here... (ex: send)
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

# License

- code: MIT
- icon: Icon made by Smashicons from www.flaticon.com
