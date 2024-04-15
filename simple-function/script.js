const {
  autometrics,
  ObjectivePercentile,
  ObjectiveLatency,
} = require('@massiveinfinity/slo-autometrics');
const { init } = require('@massiveinfinity/slo-exporter-prometheus-push-gateway');

function initPushGateway() {
  init({
    tenantId: process.env.MASSIVE_DSO_TENANT_ID,
    url: process.env.MASSIVE_DSO_PUSH_GATEWAY_URL,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

const doFunctionWithAutometrics = autometrics({
  monitorId: '<monitor-id>',
  functionName: 'doFunction',
  objective: {
    name: 'api',
    successRate: ObjectivePercentile.P99,
    latency: [ObjectiveLatency.Ms250, ObjectivePercentile.P99],
  }
}, function doFunction() {
  initPushGateway();

  setTimeout(() => {
    if (Math.round(Math.random()) === 0) {
      console.log('All good, no error to report.');
    }else {
      throw new Error('Something went wrong');
    }
  }, 2000);
})

const main = () => {
  try {
    doFunctionWithAutometrics();
  } catch (err) {
    console.error(err);
  }
}

main();