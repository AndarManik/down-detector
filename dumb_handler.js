class History {
  constructor(load) {
    if (load) {
      this.current = new Sample(load.current.day, load.current.month);
      this.current.count = load.current.count;
      this.current.ips = load.current.ips;


      this.history = load.history.map((sample) => {
        const newSample = new Sample(sample.day, sample.month);
        newSample.count = sample.count;
        newSample.ips = sample.ips;
        return newSample;
      });
      return;
    }

    this.current = new Sample(
      new Date().getUTCDate(),
      new Date().getUTCMonth()
    );
    this.history = [];
    this.fill();
  }
  fill() {
    const today = new Date();
    for (let index = 1; index < 31; index++) {
      const date = new Date(today.getTime() - index * 24 * 60 * 60 * 1000);
      this.history.push(new Sample(date.getUTCDate(), date.getUTCMonth()));
    }
    this.history = this.history.reverse();
  }
  increment(ip) {
    this.current.increment(ip);
  }
  checkDate() {
    const day = new Date().getUTCDate();
    const month = new Date().getUTCMonth();

    if (day !== this.current.day || month !== this.current.month) {
      this.history.push(this.current);
      this.current = new Sample(day, month);
    }
  }
  getGraphData(days) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const labels = [months[this.current.month] + " " + this.current.day];
    const values = [this.current.count];

    labels.push(
      ...this.history
        .slice(-days + 1)
        .map((sample) => months[sample.month] + " " + sample.day)
        .reverse()
    );
    values.push(
      ...this.history
        .slice(-days + 1)
        .map((sample) => sample.count)
        .reverse()
    );

    return [labels.reverse(), values.reverse()];
  }
}

class Sample {
  constructor(day, month) {
    this.day = day;
    this.month = month;
    this.count = 0;
    this.ips = [];
  }
  increment(ip) {
    if (this.ips.includes(ip)) return;
    console.log("increment");
    this.ips.push(ip);
    this.count++;
  }
}

module.exports = History;
