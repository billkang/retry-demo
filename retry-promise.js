const retry = (promise, retryCount) => {
  let retryTotalCount = 0;

  (function _retry () {
    setTimeout (async () => {
      try {
        const ret = await promise ();
        console.log ('success!');
        return;
      } catch (e) {
        if (++retryTotalCount <= retryCount) {
          console.log ('retry', retryTotalCount);
          _retry ();
        } else {
          console.log ('failed!');
          return;
        }
      }
    }, 1000);
  }) (promise);
};

const promise = () => {
  return new Promise ((resolve, reject) => {
    const random = Math.random ();

    console.log ('random: ', random, random > 0.8);

    if (random > 0.8) {
      resolve (true);
    } else {
      reject (false);
    }
  });
};

retry (promise, 10);
