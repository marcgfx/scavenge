function startHunt(config) {
  const app = document.getElementById("app");
  const storageKey = `hunt_${config.id}`;

  let state = loadState();

  render();

  function loadState() {
    return JSON.parse(localStorage.getItem(storageKey) || JSON.stringify({
      current: 0,
      hintUsed: false,
      accomplished: []
    }));
  }

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function render() {
    if (state.current >= config.stops.length) {
      app.innerHTML = `
        <p><a href="index.html">← Back to hunts</a></p>
        <h1>${config.title}</h1>
        <div class="card">
          <p class="ok">${config.extro}</p>
          ${renderAccomplishedHtml()}
          <button id="resetBtn">Play again</button>
        </div>
      `;
      document.getElementById("resetBtn").addEventListener("click", reset);
      return;
    }

    const stop = config.stops[state.current];

    app.innerHTML = `
      <p><a href="index.html">← Back to hunts</a></p>
      <h1>${config.title}</h1>

      <div class="card">
        <p>${config.intro}</p>
        <hr>

        <h2>${stop.title}</h2>
        <p>${stop.clue}</p>
        <p><b>Mission:</b> ${stop.task}</p>

        <p id="status" class="small">
          Progress: ${state.current + 1} / ${config.stops.length}
        </p>

        <button class="primary" id="verifyBtn">I’m here — verify GPS</button>
        <button class="ghost" id="hintBtn">Need a hint?</button>
        <button class="ghost" id="skipBtn">Skip this stop</button>

        <p class="small">
          GPS works best outdoors. You must be within about
          <b>${config.radiusMeters}m</b>.
        </p>

        ${renderAccomplishedHtml()}
      </div>
    `;

    document.getElementById("verifyBtn").addEventListener("click", verifyStop);
    document.getElementById("hintBtn").addEventListener("click", showHint);
    document.getElementById("skipBtn").addEventListener("click", skipStop);
  }

  async function verifyStop() {
    const stop = config.stops[state.current];
    const status = document.getElementById("status");
    const verifyBtn = document.getElementById("verifyBtn");

    verifyBtn.disabled = true;
    status.textContent = "Checking your location…";

    try {
      const result = await Verify.check(stop, config.radiusMeters);
      const distance = Math.round(result.distance);
      const accuracy = Math.round(result.accuracy);

      if (result.verified) {
        completeStop(state.hintUsed ? "hint" : "clean");

        status.innerHTML = `
          <span class="ok">✅ Verified!</span><br>
          You were about <b>${distance}m</b> away.<br>
          GPS accuracy: about ${accuracy}m.
        `;

        setTimeout(render, 800);
      } else {
        status.innerHTML = `
          <span class="bad">❌ Not verified yet.</span><br>
          You are about <b>${distance}m</b> away from the target.<br>
          GPS accuracy: about ${accuracy}m.<br>
          Try moving closer, request a hint, or skip if you really cannot find it.
        `;
      }
    } catch (error) {
      status.innerHTML = `
        <span class="bad">Location check failed.</span><br>
        ${getLocationErrorMessage(error)}<br>
        You can try again, request a hint, or skip this stop.
      `;
    }

    verifyBtn.disabled = false;
  }

  function completeStop(result) {
    const stop = config.stops[state.current];

    state.accomplished.unshift({
      title: stop.title,
      task: stop.task,
      result,
      time: new Date().toLocaleTimeString()
    });

    state.current++;
    state.hintUsed = false;

    saveState();
  }

  function showHint() {
    const stop = config.stops[state.current];

    state.hintUsed = true;
    saveState();

    alert(stop.hint);
  }

  function skipStop() {
    if (!confirm("Skip this stop? It will be marked red.")) return;

    completeStop("skipped");
    render();
  }

  function renderAccomplishedHtml() {
    if (state.accomplished.length === 0) {
      return `
        <hr>
        <h3>Accomplished locations</h3>
        <p class="small">None yet.</p>
      `;
    }

    return `
      <hr>
      <h3>Accomplished locations</h3>
      <ul class="accomplished-list">
        ${state.accomplished.map(item => `
          <li>
            <b>${getResultIcon(item.result)} ${item.title}</b><br>
            <span class="small">${item.task}</span><br>
            <span class="small">Completed: ${item.time}</span>
          </li>
        `).join("")}
      </ul>
    `;
  }

  function getResultIcon(result) {
    if (result === "clean") return "✅";
    if (result === "hint") return "🟡";
    if (result === "skipped") return "🔴";
    return "✓";
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

  function reset() {
    localStorage.removeItem(storageKey);
    state = loadState();
    render();
  }
}
