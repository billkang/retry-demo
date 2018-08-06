const retry = (func, retryCount) => {
  let retryTotalCount = 0;

  (function _retry () {
    setTimeout (() => {
      const ret = func ();
      if (ret) {
        console.log ('success!');
        return;
      } else if (++retryTotalCount <= retryCount) {
        console.log ('retry', retryTotalCount);
        _retry ();
      } else {
        console.log ('failed!');
        return;
      }
    }, 1000);
  }) (func);
};

const func = () => {
  const random = Math.random ();

  console.log ('random: ', random, random > 0.8);

  return random > 0.8;
};

retry (func, 10);
