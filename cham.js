const RADIUS_METERS = 150;

const stops = [
  {
    title: "Stop 1: The Green Giant",
    clue: "Find the beautiful park near the lake where old trees guard the view.",
    task: "Go to Villettepark and take a funny tree-selfie.",
    hint: "Look south of Cham station, toward the lake.",
    lat: 47.1776,
    lon: 8.4587
  },
  {
    title: "Stop 2: Lake Breeze Base",
    clue: "Find the lakeside place where Cham relaxes by the water.",
    task: "Go to Hirsgarten and spot something floating, swimming, or sailing.",
    hint: "Stay near the lake path east of Villettepark.",
    lat: 47.1789,
    lon: 8.4622
  },
  {
    title: "Stop 3: Castle Watch",
    clue: "A castle watches the lake from a little peninsula.",
    task: "Reach the public path near Schloss St. Andreas. Do not enter private areas.",
    hint: "Continue east along the lakeside toward the castle area.",
    lat: 47.17875,
    lon: 8.46625
  }
];

let current = Number(localStorage.getItem("chamHuntStop") || 0);

const app = document.getElementById("app");
const title = document.getElementById("title");
const clue = document.getElementById("clue");
const task = document.getElementById("task");
const status = document.getElementById("status");
const radiusText = document.getElementById("radiusText");
const verifyBtn = document.getElementById("verifyBtn");
const hintBtn = document.getElementById("hintBtn");

radiusText.textContent = `${RADIUS_METERS}m`;

function render() {
  if (current >= stops.length) {
    app.innerHTML = `
      <h2>🎉 Treasure found!</h2>
      <p>You completed the Cham scavenger hunt.</p>
      <p class="ok">Final challenge: celebrate with ice cream or a lake photo.</p>
      <button onclick="resetHunt()">Play again</button>
    `;
    return;
  }

  const stop = stops[current];

  title.textContent = stop.title;
  clue.textContent = stop.clue;
  task.textContent = stop.task;
  status.textContent = `Progress: ${current + 1} / ${stops.length}`;
}

async function checkLocation() {
  const stop = stops[current];

  verifyBtn.disabled = true;
  status.textContent = "Checking your location…";

  try {
    const result = await Verify.check(stop, RADIUS_METERS);
    const distance = Math.round(result.distance);
    const accuracy = Math.round(result.accuracy);

    if (result.verified) {
      current++;
      localStorage.setItem("chamHuntStop", current);

      status.innerHTML = `
        <span class="ok">✅ Verified!</span><br>
        You were about <b>${distance}m</b> away.<br>
        GPS accuracy: about ${accuracy}m.
      `;

      setTimeout(render, 1200);
    } else {
      status.innerHTML = `
        <span class="bad">❌ Not verified yet.</span><br>
        You are about <b>${distance}m</b> away from the target.<br>
        GPS accuracy: about ${accuracy}m.<br>
        Try moving closer, then press the button again.
      `;
    }
  } catch (error) {
    status.innerHTML = `
      <span class="bad">Location check failed.</span><br>
      ${getLocationErrorMessage(error)}
    `;
  }

  verifyBtn.disabled = false;
}

function getLocationErrorMessage(error) {
  if (error.code === 1) {
    return "Location permission was blocked. Allow location access in your browser settings and try again.";
  }

  if (error.code === 2) {
    return "Your position is currently unavailable. Try moving outside or closer to a window.";
  }

  if (error.code === 3) {
    return "The GPS request timed out. Try again in a few seconds.";
  }

  return error.message || "Unknown location error.";
}

function showHint() {
  alert(stops[current].hint);
}

function resetHunt() {
  localStorage.removeItem("chamHuntStop");
  current = 0;
  location.reload();
}

verifyBtn.addEventListener("click", checkLocation);
hintBtn.addEventListener("click", showHint);

render();
