// import SDC from "statsd-client";
// import SDC from "node-statsd";
import SDC from "hot-shots";

let sdc = new SDC({
  // host: "localhost",
  port: 8125,
});

export { sdc };
