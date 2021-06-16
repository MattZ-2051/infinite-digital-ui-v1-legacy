export function cancelablePromise(prom) {
  const obj = {
    promise: new Promise((resolve, reject) => {
      prom.then(
        (res) => {
          if (!obj.canceled) {
            resolve(res);
          }
        },
        (err) => {
          if (!obj.canceled) {
            reject(err);
          }
        }
      );
    }),
    canceled: false,
    cancel: () => {
      const hasChanged = !obj.canceled;
      obj.canceled = true;
      return { canceled: obj.canceled, hasChanged };
    },
  };
  return obj;
}
