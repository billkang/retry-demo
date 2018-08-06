const retry = retryCount => {
  return (target, name, descriptor) => {
    let retryTotalCount = 0;
    const promise = descriptor.value;

    descriptor.value = function _retry () {
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

      return descriptor;
    };
  };
};

class Request {
  @retry (10)
  ajax () {
    return new Promise ((resolve, reject) => {
      const random = Math.random ();

      console.log ('random: ', random, random > 0.8);

      if (random > 0.8) {
        resolve (true);
      } else {
        reject (false);
      }
    });
  }
}

const request = new Request ();
request.ajax();
README.md