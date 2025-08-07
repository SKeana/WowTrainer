let targetKeys = [];
let score = 0;
let notes = [];
const gameArea = document.getElementById('gameArea');
const speed = 3; // Pixels per frame
const noteSpawnInterval = 1000; // Milliseconds
let lastSpawnTime = 0;

function startGame() {
  const input = document.getElementById('sequenceInput').value;
  targetKeys = input.split(',').map(key => key.trim());
  score = 0;
  notes = [];
  document.getElementById('score').textContent = `Score: ${score}`;
  gameArea.innerHTML = ''; // Clear game area

  // Create highway lanes (one per key)
  targetKeys.forEach((key, index) => {
    const highway = document.createElement('div');
    highway.className = 'highway';
    highway.style.left = `${index * 100}px`;
    highway.dataset.key = key;
    gameArea.appendChild(highway);
  });

  // Add hit zone
  const hitZone = document.createElement('div');
  hitZone.className = 'hitZone';
  gameArea.appendChild(hitZone);

  lastSpawnTime = performance.now();
  requestAnimationFrame(updateGame);
}

function spawnNote() {
  if (targetKeys.length === 0) return;
  const key = targetKeys[Math.floor(Math.random() * targetKeys.length)];
  const laneIndex = targetKeys.indexOf(key);
  const note = document.createElement('div');
  note.className = 'note';
  note.textContent = key;
  note.style.left = `${laneIndex * 100 + 10}px`; // Center in lane
  note.style.top = '0px';
  gameArea.appendChild(note);
  notes.push({ element: note, key: key, y: 0, lane: laneIndex });
}

function updateGame(timestamp) {
  // Spawn notes at intervals
  if (timestamp - lastSpawnTime > noteSpawnInterval) {
    spawnNote();
    lastSpawnTime = timestamp;
  }

  // Move notes
  notes.forEach((note, index) => {
    note.y += speed;
    note.element.style.top = `${note.y}px`;
    if (note.y > gameArea.offsetHeight) {
      gameArea.removeChild(note.element);
      notes.splice(index, 1);
    }
  });

  requestAnimationFrame(updateGame);
}

document.addEventListener('keydown', (event) => {
  if (targetKeys.length === 0) return;
  event.preventDefault();

  let key = event.key;
  if (event.ctrlKey) key = 'Control';
  else if (event.altKey) key = 'Alt';

  // Check for hits
  notes.forEach((note, index) => {
    const inHitZone = note.y >= gameArea.offsetHeight - 60 && note.y <= gameArea.offsetHeight - 20;
    if (inHitZone && note.key === key) {
      score += 10;
      document.getElementById('score').textContent = `Score: ${score}`;
      gameArea.removeChild(note.element);
      notes.splice(index, 1);
    }
  });
});