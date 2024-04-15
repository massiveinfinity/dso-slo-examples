const {
  autometrics,
  ObjectivePercentile,
  ObjectiveLatency,
} = require('@massiveinfinity/slo-autometrics');
const { init } = require('@massiveinfinity/slo-exporter-prometheus-push-gateway');

const MASSIVE_DSO_TENANT_ID = '<tenant-id-from-dso>';
// const MASSIVE_DSO_TENANT_ID = process.env.MASSIVE_DSO_TENANT_ID;

const MASSIVE_DSO_PUSH_GATEWAY_URL = 'http://127.0.0.1:8081/api/v1/monitor/metrics';
// const MASSIVE_DSO_PUSH_GATEWAY_URL = process.env.MASSIVE_DSO_PUSH_GATEWAY_URL;

function initPushGateway() {
  init({
    tenantId: MASSIVE_DSO_TENANT_ID,
    url: MASSIVE_DSO_PUSH_GATEWAY_URL,
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

  if (Math.round(Math.random()) === 0) {
    console.log('All good, no error to report.');
  } else {
    throw new Error('Something went wrong');
  }
})

module.exports.handler = async (event) => {
  try {
    doFunctionWithAutometrics();
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Go Serverless v3.0! Your function executed successfully!",
          input: event,
        },
        null,
        2
      ),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: "Error occurred",
        },
        null,
        2
      ),
    };
  }

};
