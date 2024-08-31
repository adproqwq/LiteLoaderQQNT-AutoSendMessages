onmessage = () => {
  setInterval(() => postMessage('modifyTargets'), 1000);
  setInterval(() => postMessage('checkTime'), 60000);
}