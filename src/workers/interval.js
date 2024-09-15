onmessage = () => {
  setInterval(() => {
    postMessage('checkTime');
  }, 60000);
};