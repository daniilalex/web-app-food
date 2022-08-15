function timer(id, deadLine) {
  const deadline = "2022-08-23";

  function getTimeRemainig(endtime) {
    //function task is to get total time difference
    const t = Date.parse(endtime) - Date.parse(new Date()); // we get a milisec difference in the endtime
    const days = Math.floor(t / (1000 * 60 * 60 * 24)); //total days before sale, count amount days which are left untill sale = t(difference msec) divede on / (msec in min * msec in 1 hour * msec in 1 day)
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24); //total hours before sale,  (total difference time / milisec in one hour) % 24(hours a day) = 48 hours and rest 2 hours which will be displayed in hours tab
    const minutes = Math.floor((t / 1000 / 60) % 60); // total minutes
    const seconds = Math.floor((t / 1000) % 60); //total sec

    return {
      //return object from function
      total: t, // total amount of miliseconds
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000); //run fn update clock every second

    function updateClock() {
      //remaining time calculation
      const t = getTimeRemainig(endtime); //return object with all data

      days.innerHTML = t.days;
      hours.innerHTML = t.hours;
      minutes.innerHTML = t.minutes;
      seconds.innerHTML = t.seconds;

      if (t.total <= 0) {
        //t.total(total amount of milliseconds <= 0 ) turn off update timer
        clearInterval(timeInterval);
      }
    }
  }
  setClock(id, deadline);
}
export default timer;
