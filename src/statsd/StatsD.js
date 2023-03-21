import SDC from "statsd-client";

let sdc = new SDC({
  host: "localhost",
  port: 8125,
});

export { sdc };
