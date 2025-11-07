// Since we are using the compat libraries loaded via script tags in index.html,
// the firebase object is available globally.

// =================================================================================
// Firebase Configuration
// =================================================================================
// Configuration provided by the user.
const firebaseConfig = {
  apiKey: "AIzaSyCvxyd9Q37Zu4wMv-dGhcrom-En2Ja9n0o",
  authDomain: "chat-8c7f5.firebaseapp.com",
  projectId: "chat-8c7f5",
  storageBucket: "chat-8c7f5.appspot.com",
  messagingSenderId: "566550384400",
  appId: "1:566550384400:web:6438e3fb134edfc6649f95",
  measurementId: "G-ZV55RSVRX6"
};


// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

// =================================================================================
// Constants
// =================================================================================
const DEFAULT_AVATAR_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%2372767d'/%3E%3C/svg%3E";
const EMOJIS = [
  '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚',
  '🙂', '🤗', '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '😴',
  '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '☹️', '🙁', '😖', '😞', '😟',
  '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰', '😱', '😳', '🤪', '😵', '😡', '😠', '🤬',
  '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🤠', '🤡', '🤥', '🤫', '🤭', '🧐', '🤓', '😈', '👿', '👹',
  '👺', '💀', '👻', '👽', '🤖', '💩', '👍', '👎', '❤️', '🎉', '🔥', '💯', '🙏', '👏', '🙌', '🤝', '💪', '🤘', '✌️', '🤞', '👌', '👈', '👉', '👆', '👇', '✋', '🤚', '🖐️', '🖖',
'👋', '🤙', '💅', '🤳', '💃', '🕺', '👯‍♀️', '👯‍♂️', '🧍', '🧎', '👫', '👭', '👬', '💏', '💑',
'👪', '🧑‍🤝‍🧑', '👩‍❤️‍👩', '👨‍❤️‍👨', '👩‍❤️‍👨', '💋', '💘', '💝', '💖', '💗', '💓', '💞',
'💕', '💌', '💟', '❣️', '💔', '💢', '💥', '💫', '💦', '💨', '🕳️', '💬', '💭', '🗯️', '💤',
'👀', '👁️', '👅', '👄', '🧠', '🫀', '🫁', '👣', '🖐', '✍️', '🙏🏻', '🙏🏼', '🙏🏽', '🙏🏾', '🙏🏿',
'👕', '👖', '🧥', '👔', '👗', '👙', '👚', '👘', '🥻', '🩱', '🩲', '🩳', '👠', '👡', '👢', '🥿',
'👞', '👟', '🩴', '🧦', '🧤', '🧣', '🎩', '🧢', '👒', '🎓', '⛑️', '🪖', '👑', '💍', '💎', '🔔',
'📿', '💄', '💼', '👜', '👝', '👛', '🛍️', '🎒', '🩸', '🩹', '🩺', '🩻', '🪣', '🧴', '🧷', '🧹',
'🧺', '🧻', '🚽', '🚿', '🛁', '🪥', '🪒', '🪞', '🪟', '🪑', '🛋️', '🛏️', '🛌', '🪟', '🚪', '🪜',
'🖼️', '🧸', '🪆', '🪅', '🎁', '🎈', '🎉', '🎊', '🎂', '🍰', '🧁', '🥧', '🍩', '🍪', '🍫', '🍬',
'🍭', '🍮', '🍯', '☕', '🍵', '🥛', '🧃', '🧉', '🍺', '🍻', '🍷', '🥂', '🥃', '🍸', '🍹', '🍾',
'🍽️', '🍴', '🥄', '🔪', '🏺', '🌍', '🌎', '🌏', '🌕', '🌙', '⭐', '🌟', '⚡', '🔥', '💧', '🌈',
'☁️', '🌤️', '⛈️', '🌧️', '❄️', '☃️', '🌬️', '🌪️', '🌊', '🌋', '🌻', '🌹', '🌷', '🌼', '🌸', '💐',
'🍀', '🌴', '🌲', '🌳', '🌵', '🍁', '🍂', '🍃', '🪴', '🍄', '🐚', '🪸', '🐾', '🦋', '🐝', '🐞',
'🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓',
'🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑',
'🐐', '🦌', '🐕', '🐩', '🐈', '🐓', '🦃', '🦚', '🕊️', '🐇', '🐁', '🐀', '🐿️', '🦔', '🐉', '🐲',
'🌵', '🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🥭', '🍎', '🍏', '🍐', '🍑', '🍒', '🍓', '🫐',
'🥝', '🍅', '🫒', '🥥', '🥑', '🍆', '🥔', '🥕', '🌽', '🥒', '🥬', '🥦', '🧄', '🧅', '🍄', '🥜',
'🌰', '🍞', '🥐', '🥖', '🥨', '🥯', '🥞', '🧇', '🧀', '🍖', '🍗', '🥩', '🥓', '🍔', '🍟', '🍕',
'🌭', '🥪', '🌮', '🌯', '🥙', '🧆', '🥘', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🍤', '🍢',
'🍡', '🍧', '🍨', '🍦', '🍰', '🎂', '🍮', '🍯', '🍶', '🍵', '🥤', '🧋', '🧊', '🍾', '🍷', '🍺',
'⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🥏', '🎱', '🏓', '🏸', '🥅', '🏒', '🏑', '🥍', '🏹',
'🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛼', '🛷', '⛷️', '🏂', '🏋️', '🤸', '⛹️', '🏌️', '🏇', '🏄',
'🚣', '🏊', '🤽', '🚴', '🚵', '🧗', '🪂', '🏆', '🥇', '🥈', '🥉', '🏅', '🎖️', '🎗️', '🏵️', '🎫',
'🎟️', '🎭', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🎷', '🎺', '🎸', '🎻', '🪕', '🎮', '🕹️',
'🎰', '🎲', '🧩', '♟️', '🎯', '🎳', '🪀', '🪁', '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑',
'🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🦽', '🦼', '🛴', '🚲', '🛵', '🏍️', '🛺', '🚨', '🚔', '🚍',
'🚘', '🚖', '🚡', '🚠', '🚟', '🚃', '🚋', '🚝', '🚄', '🚅', '🚈', '🚞', '🚆', '🚇', '🚊', '🚉',
'🛫', '🛬', '🛩️', '🛰️', '🚀', '🛸', '🚁', '⚓', '🛳️', '⛴️', '🚢', '🛶', '⛵', '🚤', '🪝', '🪵',
'🏠', '🏡', '🏘️', '🏢', '🏣', '🏤', '🏥', '🏦', '🏨', '🏪', '🏫', '🏬', '🏛️', '⛪', '🕌', '🛕',
'🕍', '⛩️', '🕋', '🗽', '🗼', '🏰', '🏯', '🏟️', '🎡', '🎢', '🎠', '⛲', '⛺', '🌁', '🌉', '🌆', '🌇',
'🌃', '🌌', '🌠', '🎇', '🎆', '🌅', '🌄', '🏞️', '🌲', '🌳', '🏜️', '🏝️', '🏖️', '🏕️', '🪨', '🪵'
];

const tetrisHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Tetris</title>
    <style>
        body { background: #202028; color: #fff; font-family: sans-serif; font-size: 1.5em; text-align: center; margin: 0; padding-top: 1em;}
        #game-container { display: flex; justify-content: center; align-items: flex-start; gap: 20px;}
        canvas { border: solid .2em #fff; }
        #score-container { display: flex; flex-direction: column; align-items: center; }
        #score-title { font-size: 0.8em; color: #aaa; margin-bottom: 0.5em;}
    </style>
</head>
<body>
    <div id="game-container">
        <canvas id="tetris" width="240" height="400"></canvas>
        <div id="score-container">
            <div id="score-title">SCORE</div>
            <div id="score">0</div>
        </div>
    </div>
    <script>
        const canvas = document.getElementById('tetris');
        const context = canvas.getContext('2d');
        const scoreElement = document.getElementById('score');
        context.scale(20, 20);

        function arenaSweep() {
            let rowCount = 1;
            outer: for (let y = arena.length - 1; y > 0; --y) {
                for (let x = 0; x < arena[y].length; ++x) {
                    if (arena[y][x] === 0) {
                        continue outer;
                    }
                }
                const row = arena.splice(y, 1)[0].fill(0);
                arena.unshift(row);
                ++y;
                player.score += rowCount * 10;
                rowCount *= 2;
            }
            scoreElement.innerText = player.score;
        }

        function collide(arena, player) {
            const [m, o] = [player.matrix, player.pos];
            for (let y = 0; y < m.length; ++y) {
                for (let x = 0; x < m[y].length; ++x) {
                    if (m[y][x] !== 0 &&
                       (arena[y + o.y] &&
                        arena[y + o.y][x + o.x]) !== 0) {
                        return true;
                    }
                }
            }
            return false;
        }

        function createMatrix(w, h) {
            const matrix = [];
            while (h--) {
                matrix.push(new Array(w).fill(0));
            }
            return matrix;
        }

        function createPiece(type) {
            if (type === 'T') return [[0, 1, 0], [1, 1, 1], [0, 0, 0]];
            if (type === 'O') return [[2, 2], [2, 2]];
            if (type === 'L') return [[0, 3, 0], [0, 3, 0], [0, 3, 3]];
            if (type === 'J') return [[0, 4, 0], [0, 4, 0], [4, 4, 0]];
            if (type === 'I') return [[0, 5, 0, 0], [0, 5, 0, 0], [0, 5, 0, 0], [0, 5, 0, 0]];
            if (type === 'S') return [[0, 6, 6], [6, 6, 0], [0, 0, 0]];
            if (type === 'Z') return [[7, 7, 0], [0, 7, 7], [0, 0, 0]];
        }

        function draw() {
            context.fillStyle = '#000';
            context.fillRect(0, 0, canvas.width, canvas.height);
            drawMatrix(arena, {x: 0, y: 0});
            drawMatrix(player.matrix, player.pos);
        }

        function drawMatrix(matrix, offset) {
            matrix.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        context.fillStyle = colors[value];
                        context.fillRect(x + offset.x, y + offset.y, 1, 1);
                    }
                });
            });
        }

        function merge(arena, player) {
            player.matrix.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        arena[y + player.pos.y][x + player.pos.x] = value;
                    }
                });
            });
        }

        function playerDrop() {
            player.pos.y++;
            if (collide(arena, player)) {
                player.pos.y--;
                merge(arena, player);
                playerReset();
                arenaSweep();
            }
            dropCounter = 0;
        }

        function playerMove(dir) {
            player.pos.x += dir;
            if (collide(arena, player)) {
                player.pos.x -= dir;
            }
        }

        function playerReset() {
            const pieces = 'ILJOTSZ';
            player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
            player.pos.y = 0;
            player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
            if (collide(arena, player)) {
                arena.forEach(row => row.fill(0));
                player.score = 0;
                scoreElement.innerText = player.score;
            }
        }

        function playerRotate(dir) {
            const pos = player.pos.x;
            let offset = 1;
            rotate(player.matrix, dir);
            while(collide(arena, player)) {
                player.pos.x += offset;
                offset = -(offset + (offset > 0 ? 1 : -1));
                if (offset > player.matrix[0].length) {
                    rotate(player.matrix, -dir);
                    player.pos.x = pos;
                    return;
                }
            }
        }

        function rotate(matrix, dir) {
            for (let y = 0; y < matrix.length; ++y) {
                for (let x = 0; x < y; ++x) {
                    [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
                }
            }
            if (dir > 0) {
                matrix.forEach(row => row.reverse());
            } else {
                matrix.reverse();
            }
        }

        let dropCounter = 0;
        let dropInterval = 1000;
        let lastTime = 0;
        function update(time = 0) {
            const deltaTime = time - lastTime;
            lastTime = time;
            dropCounter += deltaTime;
            if (dropCounter > dropInterval) {
                playerDrop();
            }
            draw();
            requestAnimationFrame(update);
        }

        const colors = [null, '#FF0D72', '#0DC2FF', '#0DFF72', '#F538FF', '#FF8E0D', '#FFE138', '#3877FF'];
        const arena = createMatrix(12, 20);
        const player = { pos: {x: 0, y: 0}, matrix: null, score: 0 };

        document.addEventListener('keydown', event => {
            if (event.keyCode === 37) playerMove(-1); // left
            else if (event.keyCode === 39) playerMove(1); // right
            else if (event.keyCode === 40) playerDrop(); // down
            else if (event.keyCode === 81) playerRotate(-1); // q
            else if (event.keyCode === 87 || event.keyCode === 38) playerRotate(1); // w or up
        });

        playerReset();
        update();
    <\/script>
</body>
</html>
`;

const adminPanelHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Admin Panel</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #36393f; color: #dcddde; padding: 20px; margin: 0;}
        .container { max-width: 500px; margin: auto; background-color: #2f3136; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px 0 rgba(0,0,0,0.2); }
        h1 { text-align: center; color: #fff; margin-top: 0; }
        label { display: block; margin: 15px 0 5px; font-weight: 500; font-size: 12px; text-transform: uppercase; color: #b9bbbe; }
        input { width: 100%; padding: 10px; box-sizing: border-box; background-color: #202225; border: 1px solid #000; border-radius: 3px; color: #dcddde; font-size: 16px; }
        input:focus { border-color: #00b0f4; outline: none; }
        button { width: 100%; padding: 10px 16px; margin-top: 20px; background-color: #5865f2; color: white; border: none; border-radius: 3px; font-size: 16px; font-weight: 500; cursor: pointer; transition: background-color .17s ease; }
        button:hover { background-color: #4752c4; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Admin Control Panel</h1>
        <div>
            <label for="user-id">User Friend Code</label>
            <input type="text" id="user-id" placeholder="Enter user's friend code...">
        </div>
        <div>
            <label for="link-url">Link to Open</label>
            <input type="url" id="link-url" placeholder="https://example.com">
        </div>
        <button id="run-button">Run</button>
    </div>
    <script>
        document.getElementById('run-button').addEventListener('click', () => {
            const url = document.getElementById('link-url').value;
            if (url) {
                try {
                    new URL(url); // Basic validation
                    window.open(url, '_blank', 'width=800,height=600,resizable=yes,scrollbars=yes,toolbar=yes');
                } catch (_) {
                    alert('Please enter a valid URL (e.g., https://example.com)');
                }
            } else {
                alert('Please enter a link to open.');
            }
        });
    <\/script>
</body>
</html>
`;

const MIC_ON_SVG = `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>`;
const MIC_OFF_SVG = `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.08V5c0-1.657 1.343-3 3-3s3 1.343 3 3v.08m-6 0c0 1.657-1.343 3-3 3s-3-1.343-3-3v0m-1 8.917c1.333.604 2.89.917 4.5.917 1.61 0 3.167-.313 4.5-.917m-9 0v-1c0-2.21 1.79-4 4-4s4 1.79 4 4v1m-6 .08h.08a4.992 4.992 0 01-4.16 0H6"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18"></path></svg>`;
const CAM_ON_SVG = `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>`;
const CAM_OFF_SVG = `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18"></path></svg>`;
const HANGUP_SVG = `<svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.218,2.282a1.042,1.042,0,0,0-1.474,0l-1.7,1.7-2.31-2.31a3.03,3.03,0,0,0-4.286,0L2.282,6.839a3.03,3.03,0,0,0,0,4.286l3.3,3.3-2.24,2.24a1.042,1.042,0,0,0,0,1.474l3.78,3.78a1.042,1.042,0,0,0,1.474,0l2.24-2.24,3.3,3.3a3.03,3.03,0,0,0,4.286,0l4.834-4.834a3.03,3.03,0,0,0,0-4.286L17.218,2.282Z"></path></svg>`;


// =================================================================================
// App State
// =================================================================================
let currentUser = null;
let activeView = 'servers'; // 'servers' or 'home'
let activeServerId = null;
let activeChannelId = null; // Can be a server channel ID or a DM channel ID
let activeServerRoles = {};
let activeServerRoleOrder = [];
let activeServerMembers = {}; // { userId: { roles: [...] } }
let allServerUsers = []; // { id, displayName, photoURL, status }
let activeChannelCallStatus = {}; // { channelId: boolean }
let stagedFile = null;
let draggedRoleId = null;

// Unsubscribe listeners
let messageUnsubscribe = () => {};
let channelUnsubscribe = () => {};
let usersUnsubscribe = () => {};
let serversUnsubscribe = () => {};
let friendsUnsubscribe = () => {};
let dmCallListenerUnsubscribe = () => {};
let currentDmCallUnsubscribe = () => {};
let serverCallStatusUnsubscribe = () => {};


// WebRTC State for DM Calls
let dmPeerConnection;
let dmlocalStream;
let dmRemoteStream = new MediaStream();
let activeDmCallData = null;

// WebRTC State for Server Calls
let serverPeerConnections = {}; // { [peerId]: RTCPeerConnection }
let serverLocalStream = null;
let activeServerCall = null; // { serverId, channelId }
let serverCallUnsubscribes = []; // Array of unsubscribe functions for a server call

const iceServers = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ],
};


// =================================================================================
// Authentication
// =================================================================================
auth.onAuthStateChanged(async (user) => {
  const loginView = document.getElementById('login-view');
  const appView = document.getElementById('app-view');
  const appErrorOverlay = document.getElementById('app-error-overlay');
  const appErrorMessage = document.getElementById('app-error-message');
  const appErrorTitle = document.getElementById('app-error-title');

  if (user) {
    try {
      appErrorOverlay.classList.add('hidden');
      const userDocRef = db.collection('users').doc(user.uid);
      const userDoc = await userDocRef.get();

      if (!userDoc.exists) {
        const displayName = user.displayName || user.email.split('@')[0];
        const photoURL = user.photoURL || `https://i.pravatar.cc/64?u=${user.uid}`;

        if (!user.displayName || !user.photoURL) {
          await user.updateProfile({ displayName, photoURL });
        }
        
        await userDocRef.set({ displayName, photoURL, status: 'online', friends: [] });
        currentUser = { uid: user.uid, displayName, photoURL };
      } else {
        await userDocRef.update({ status: 'online' });
        const userData = userDoc.data();
        currentUser = { uid: user.uid, displayName: userData.displayName, photoURL: userData.photoURL };
      }
      
      loginView.classList.add('hidden');
      appView.classList.remove('hidden');
      renderUserInfo();
      loadServers();
      loadFriends();
      setupPresence();
      setupDmCallListener();
      selectHome(); // Default to home view on login

    } catch (error) {
        console.error("Firestore error:", error);
        loginView.classList.add('hidden');
        appView.classList.remove('hidden');
        if (error.code === 'permission-denied' || error.code === 'failed-precondition') {
            appErrorTitle.textContent = "Database Index Required";
            appErrorMessage.innerHTML = `A database index is required for this app to function. Please open the developer console (F12), find the error message from Firebase, and click the link to create the index in your Firebase project. It may take a few minutes to build.`;
        } else {
            appErrorTitle.textContent = "Connection Error";
            appErrorMessage.textContent = 'Failed to connect to the database. Please ensure Cloud Firestore has been created and configured in your Firebase project.';
        }
        appErrorOverlay.classList.remove('hidden');
    }
  } else {
    if (currentUser) {
        db.collection('users').doc(currentUser.uid).update({ status: 'offline' }).catch((e) => console.error("Failed to update status on logout", e));
    }
    currentUser = null;
    loginView.classList.remove('hidden');
    appView.classList.add('hidden');
    appErrorOverlay.classList.add('hidden');
    // Cleanup listeners
    if(serversUnsubscribe) serversUnsubscribe();
    if(channelUnsubscribe) channelUnsubscribe();
    if(messageUnsubscribe) messageUnsubscribe();
    if(usersUnsubscribe) usersUnsubscribe();
    if(friendsUnsubscribe) friendsUnsubscribe();
    if(dmCallListenerUnsubscribe) dmCallListenerUnsubscribe();
    if(currentDmCallUnsubscribe) currentDmCallUnsubscribe();
    if(serverCallStatusUnsubscribe) serverCallStatusUnsubscribe();
    await hangUpCurrentCall();
  }
});

const setupPresence = () => {
    const userStatusRef = db.collection('users').doc(currentUser.uid);
    window.addEventListener('beforeunload', () => {
        hangUpCurrentCall(); // Disconnect from any active call before unload
        userStatusRef.update({ status: 'offline' });
    });
}

const showLoginError = (message) => {
    const loginErrorContainer = document.getElementById('login-error-container');
    loginErrorContainer.textContent = message;
    loginErrorContainer.classList.remove('hidden');
};

const clearLoginError = () => {
    const loginErrorContainer = document.getElementById('login-error-container');
    loginErrorContainer.textContent = '';
    loginErrorContainer.classList.add('hidden');
};

const signInWithGoogle = () => {
    clearLoginError();
    auth.signInWithPopup(provider).catch((error) => {
        let message = "An unknown error occurred during Google sign-in.";
        switch (error.code) {
            case 'auth/popup-closed-by-user': message = 'Sign-in cancelled.'; break;
            case 'auth/cancelled-popup-request': message = 'Sign-in cancelled.'; break;
        }
        showLoginError(message);
    });
};

const handleSignUp = async (e) => {
    e.preventDefault();
    clearLoginError();
    const signupEmailInput = document.getElementById('signup-email');
    const signupPasswordInput = document.getElementById('signup-password');
    const email = signupEmailInput.value;
    const password = signupPasswordInput.value;
    try {
        await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
        let message = "An unknown error occurred.";
        switch (error.code) {
            case 'auth/email-already-in-use': message = 'An account with this email already exists.'; break;
            case 'auth/invalid-email': message = 'Please enter a valid email.'; break;
            case 'auth/weak-password': message = 'Password must be at least 6 characters.'; break;
        }
        showLoginError(message);
    }
};

const handleSignIn = async (e) => {
    e.preventDefault();
    clearLoginError();
    const signinEmailInput = document.getElementById('signin-email');
    const signinPasswordInput = document.getElementById('signin-password');
    const email = signinEmailInput.value;
    const password = signinPasswordInput.value;
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        let message = "An unknown error occurred.";
        switch(error.code) {
            case 'auth/user-not-found': message = 'No account found with this email.'; break;
            case 'auth/wrong-password': message = 'Incorrect password.'; break;
            case 'auth/invalid-email': message = 'Please enter a valid email.'; break;
        }
        showLoginError(message);
    }
};

const signOut = () => auth.signOut().catch((error) => console.error("Sign out error", error));

// =================================================================================
// UI Rendering Functions
// =================================================================================

/**
 * Validates if a string is a valid HTTP/HTTPS URL.
 * @param {string} string The string to validate.
 * @returns {boolean} True if the string is a valid URL, false otherwise.
 */
const isValidHttpUrl = (string) => {
    if (!string) return false;
    try {
        const newUrl = new URL(string);
        return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
    } catch (_) {
        return false;
    }
};

function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function(match) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[match];
    });
}

function formatMessageText(text) {
    let escapedText = escapeHTML(text);
    const codeBlockRegex = /```txt\n([\s\S]*?)\n```/g;
    return escapedText.replace(codeBlockRegex, (match, codeContent) => {
        return `<pre class="bg-gray-900 p-2 rounded-md text-sm text-gray-300 whitespace-pre-wrap break-all mt-2"><code>${codeContent}</code></pre>`;
    });
}


const renderUserInfo = () => {
  if (!currentUser) return;
  const userInfoPanels = document.querySelectorAll('.user-info-panel');
  const avatarUrl = isValidHttpUrl(currentUser.photoURL) ? currentUser.photoURL : DEFAULT_AVATAR_SVG;

  const userInfoHTML = `
    <div class="relative mr-2">
        <img src="${avatarUrl}" alt="${currentUser.displayName}" class="w-10 h-10 rounded-full object-cover"/>
        <div class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-gray-800 rounded-full"></div>
    </div>
    <div class="truncate">
        <p class="text-sm font-semibold text-white truncate">${currentUser.displayName}</p>
        <p class="text-xs text-gray-400">Online</p>
    </div>
  `;
  userInfoPanels.forEach(panel => panel.innerHTML = userInfoHTML);
};

const renderServers = (servers) => {
    const serverListContainer = document.getElementById('server-list-container');
    if (!serverListContainer) return;

    serverListContainer.innerHTML = '';
    
    // Home Button
    const homeButton = document.createElement('div');
    homeButton.className = "relative group mb-2";
    const isHomeActive = activeView === 'home';
    homeButton.innerHTML = `
      <div class="absolute left-0 h-0 w-1 bg-white rounded-r-full transition-all duration-200 ${isHomeActive ? 'h-10' : 'group-hover:h-5'}"></div>
      <button class="flex items-center justify-center w-12 h-12 rounded-3xl transition-all duration-200 group-hover:rounded-2xl ${isHomeActive ? 'bg-blue-500 rounded-2xl' : 'bg-gray-700 hover:bg-blue-500'} focus:outline-none">
        <svg class="w-7 h-7 text-gray-200" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
      </button>
      <span class="absolute left-16 p-2 text-sm bg-gray-900 text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">Home</span>
    `;
    homeButton.querySelector('button').onclick = selectHome;
    serverListContainer.appendChild(homeButton);

    const separator = document.createElement('div');
    separator.className = "w-8 border-t border-gray-700 my-2";
    serverListContainer.appendChild(separator);
    
    const serverListElement = document.createElement('div');
    serverListElement.id = 'server-list';
    serverListContainer.appendChild(serverListElement);

    servers.forEach(server => {
        const isActive = server.id === activeServerId;
        const serverIcon = document.createElement('div');
        serverIcon.className = "relative group mb-2";
        const iconUrl = isValidHttpUrl(server.iconUrl) ? server.iconUrl : DEFAULT_AVATAR_SVG;
        serverIcon.innerHTML = `
            <div class="absolute left-0 h-0 w-1 bg-white rounded-r-full transition-all duration-200 ${isActive ? 'h-10' : 'group-hover:h-5'}"></div>
            <button class="flex items-center justify-center w-12 h-12 rounded-3xl transition-all duration-200 group-hover:rounded-2xl ${isActive ? 'bg-blue-500 rounded-2xl' : 'bg-gray-700 hover:bg-blue-500'} focus:outline-none">
                <img src="${iconUrl}" alt="${server.name}" class="w-full h-full object-cover rounded-3xl group-hover:rounded-2xl transition-all duration-200" />
            </button>
            <span class="absolute left-16 p-2 text-sm bg-gray-900 text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">${server.name}</span>
        `;
        serverIcon.querySelector('button').onclick = () => selectServer(server.id);
        serverListElement.appendChild(serverIcon);
    });
    
    // Add "Add Server" button
    const addServerButton = document.createElement('div');
    addServerButton.innerHTML = `
      <div class="w-full border-t border-gray-700 my-2"></div>
      <button class="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-3xl hover:bg-green-500 hover:rounded-2xl transition-all duration-200 group focus:outline-none">
        <svg class="w-6 h-6 text-green-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
      </button>
    `;
    addServerButton.querySelector('button').onclick = () => {
      const addServerModal = document.getElementById('add-server-modal');
      if (addServerModal) addServerModal.style.display = 'flex';
    };
    serverListContainer.appendChild(addServerButton);
};

const renderChannels = (server, channels) => {
    const serverNameText = document.getElementById('server-name-text');
    const channelList = document.getElementById('channel-list');
    if (!serverNameText || !channelList) return;

    serverNameText.textContent = server.name;
    channelList.innerHTML = `
        <div class="flex items-center justify-between px-2 pt-2 pb-1">
            <h2 class="text-xs font-bold tracking-wider text-gray-400 uppercase">Text Channels</h2>
            <button id="add-channel-button" class="text-gray-400 hover:text-white">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
        </div>
    `;
    
    document.getElementById('add-channel-button').onclick = () => {
        const createChannelModal = document.getElementById('create-channel-modal');
        if(createChannelModal) createChannelModal.style.display = 'flex';
    };

    channels.forEach(channel => {
        const isActive = channel.id === activeChannelId;
        const isCallActive = activeChannelCallStatus[channel.id];
        const channelLink = document.createElement('button');
        channelLink.className = `flex items-center justify-between w-full px-2 py-1.5 text-left rounded-md transition-colors duration-150 ${isActive ? 'bg-gray-600 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'}`;
        channelLink.innerHTML = `
            <div class="flex items-center truncate">
                <svg class="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 9h4V7h-4v2zm-2 4h4v-2H8v2zm10-4v2h-4V9h4zm2-2h-4V5h4v2zm-4 8h4v-2h-4v2zm-2-4h-4v2h4v-2zm-2 4h2v2h-2v-2zm-6-4H4v2h2v-2zM6 7H4v2h2V7zm10 10v-2h-4v2h4zm-6 0v-2H8v2h2z"></path></svg>
                <span class="font-medium truncate">${channel.name}</span>
            </div>
            ${isCallActive ? `<svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 5.106A1 1 0 0116 6v8a1 1 0 01-1.447.894L12 12.828V7.172l2.553-1.932z"></path></svg>` : ''}
        `;
        channelLink.onclick = () => selectChannel(channel.id);
        channelList.appendChild(channelLink);
    });
};

const renderFriends = (friends) => {
    const friendList = document.getElementById('friend-list');
    if (!friendList) return;

    friendList.innerHTML = `<h2 class="text-xs font-bold tracking-wider text-gray-400 uppercase px-2 pt-2 pb-1">Friends — ${friends.length}</h2>`;
    friends.forEach(friend => {
        const friendEl = document.createElement('button');
        const isActive = activeView === 'home' && activeChannelId === getDmChannelId(friend.id);
        const friendAvatarUrl = isValidHttpUrl(friend.photoURL) ? friend.photoURL : DEFAULT_AVATAR_SVG;
        friendEl.className = `flex items-center w-full px-2 py-1.5 text-left rounded-md transition-colors duration-150 ${isActive ? 'bg-gray-600 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'}`;
        friendEl.innerHTML = `
            <div class="relative mr-2">
                <img src="${friendAvatarUrl}" alt="${friend.displayName}" class="w-8 h-8 rounded-full object-cover" data-userid="${friend.id}" />
                <div class="absolute bottom-0 right-0 w-2.5 h-2.5 ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-500'} border-2 border-gray-800 rounded-full"></div>
            </div>
            <span class="font-medium truncate" data-userid="${friend.id}">${friend.displayName}</span>
        `;
        friendEl.onclick = () => selectDmChannel(friend);
        friendList.appendChild(friendEl);
    });
};

const renderMessages = (messages) => {
    const messageList = document.getElementById('message-list');
    if (!messageList) return;

    let lastMessageUid = null;
    let lastMessageTimestamp = null;
    const FIVE_MINUTES = 5 * 60 * 1000;

    messageList.innerHTML = ''; // Clear existing messages

    messages.forEach(msg => {
        const messageEl = document.createElement('div');
        const currentTimestamp = msg.timestamp ? msg.timestamp.toDate() : new Date();

        const highestRole = getHighestRole(msg.user.uid);
        const roleColor = highestRole ? highestRole.color : 'inherit';

        // Check if this message should be grouped with the previous one
        const shouldGroup = 
            msg.user.uid === lastMessageUid &&
            lastMessageTimestamp &&
            (currentTimestamp - lastMessageTimestamp < FIVE_MINUTES);

        if (shouldGroup) {
            // Render a compact message
            messageEl.className = 'flex items-center pl-14 pr-4 py-0.5 hover:bg-gray-800/50 group';
            messageEl.innerHTML = `
                <div class="text-gray-200 whitespace-pre-wrap break-words">${formatMessageText(msg.text)}</div>
                <span class="text-xs text-gray-500 ml-auto pl-4 opacity-0 group-hover:opacity-100 transition-opacity">${msg.timestamp ? new Date(msg.timestamp.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
            `;
        } else {
            // Render a full message with the user header
            messageEl.className = 'flex p-4 hover:bg-gray-800/50 pt-6';
            const timestamp = msg.timestamp ? new Date(msg.timestamp.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'sending...';
            const messageUserAvatar = isValidHttpUrl(msg.user.photoURL) ? msg.user.photoURL : DEFAULT_AVATAR_SVG;
            
            messageEl.innerHTML = `
                <img src="${messageUserAvatar}" alt="${msg.user.displayName}" class="w-10 h-10 rounded-full mr-4 cursor-pointer object-cover flex-shrink-0" data-userid="${msg.user.uid}" />
                <div>
                    <div class="flex items-baseline">
                        <span class="font-semibold mr-2 cursor-pointer" style="color: ${roleColor};" data-userid="${msg.user.uid}">${msg.user.displayName}</span>
                        <span class="text-xs text-gray-500">${timestamp}</span>
                    </div>
                    ${msg.text ? `<div class="text-gray-200 whitespace-pre-wrap break-words">${formatMessageText(msg.text)}</div>` : ''}
                </div>
            `;
        }
        
        messageList.appendChild(messageEl);

        // Update last message details for the next iteration
        lastMessageUid = msg.user.uid;
        lastMessageTimestamp = currentTimestamp;
    });

    setTimeout(() => {
        if (messageList) {
            messageList.scrollTop = messageList.scrollHeight;
        }
    }, 0);
};

const renderUsers = (users) => {
    const userListAside = document.getElementById('user-list-aside');
    if (!userListAside) return;

    userListAside.innerHTML = `<h3 class="text-xs font-bold uppercase text-gray-400 px-2 pt-2 pb-1">Members — ${users.length}</h3>`;
    users.forEach(user => {
        const userEl = document.createElement('div');
        userEl.className = "flex items-center p-2 rounded-md hover:bg-gray-700/50 cursor-pointer";
        userEl.dataset.userid = user.id;

        const highestRole = getHighestRole(user.id);
        const roleColor = highestRole ? highestRole.color : 'inherit';
        const userAvatarUrl = isValidHttpUrl(user.photoURL) ? user.photoURL : DEFAULT_AVATAR_SVG;

        userEl.innerHTML = `
            <div class="flex items-center pointer-events-none">
                <div class="relative mr-3">
                    <img src="${userAvatarUrl}" alt="${user.displayName}" class="w-8 h-8 rounded-full object-cover" />
                    <div class="absolute bottom-0 right-0 w-2.5 h-2.5 ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-500'} border-2 border-gray-800 rounded-full"></div>
                </div>
                <span class="text-sm font-medium" style="color: ${roleColor};">${user.displayName}</span>
            </div>
        `;
        userListAside.appendChild(userEl);
    });
}

const renderRoles = () => {
    const rolesList = document.getElementById('roles-list');
    if (!rolesList) return;

    rolesList.innerHTML = '';
    activeServerRoleOrder.forEach(roleId => {
        const role = activeServerRoles[roleId];
        if (!role) return;

        const roleEl = document.createElement('div');
        roleEl.className = 'flex items-center justify-between bg-gray-700 p-2 rounded-md';
        roleEl.dataset.roleId = roleId;
        roleEl.draggable = true;

        roleEl.innerHTML = `
            <div class="flex items-center pointer-events-none">
                 <svg class="w-5 h-5 mr-3 text-gray-400 cursor-grab" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                <div class="w-4 h-4 rounded-full mr-3" style="background-color: ${role.color};"></div>
                <span class="font-semibold text-white">${role.name}</span>
            </div>
        `;
        rolesList.appendChild(roleEl);
    });
};

const renderServerMembers = () => {
    const membersList = document.getElementById('server-members-list');
    if (!membersList) return;

    membersList.innerHTML = '';
    allServerUsers.forEach(user => {
        const memberData = activeServerMembers[user.id] || { roles: [] };
        const userAvatarUrl = isValidHttpUrl(user.photoURL) ? user.photoURL : DEFAULT_AVATAR_SVG;
        const memberEl = document.createElement('div');
        memberEl.className = 'p-2 rounded-md hover:bg-gray-700/50';

        let rolesCheckboxesHTML = activeServerRoleOrder.map(roleId => {
            const role = activeServerRoles[roleId];
            if (!role || roleId === 'owner' || roleId === 'default') return ''; // Don't allow assigning owner/default
            const isChecked = memberData.roles.includes(roleId);
            return `
                <label class="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" data-userid="${user.id}" data-roleid="${roleId}" ${isChecked ? 'checked' : ''} class="form-checkbox h-4 w-4 text-blue-500 bg-gray-900 border-gray-600 rounded focus:ring-blue-500">
                    <div class="w-3 h-3 rounded-full" style="background-color: ${role.color};"></div>
                    <span>${role.name}</span>
                </label>
            `;
        }).join('');

        memberEl.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <img src="${userAvatarUrl}" alt="${user.displayName}" class="w-8 h-8 rounded-full object-cover mr-3">
                    <span class="font-medium text-white">${user.displayName}</span>
                </div>
            </div>
            <div class="pl-11 pt-2 space-y-1">
                ${rolesCheckboxesHTML}
            </div>
        `;
        membersList.appendChild(memberEl);
    });
};


// =================================================================================
// Data Handling & State Management
// =================================================================================
const getDmChannelId = (friendId) => {
    return [currentUser.uid, friendId].sort().join('_');
};

const getHighestRole = (userId) => {
    if (activeView !== 'servers' || !activeServerMembers[userId]) {
        return null;
    }
    const userRoleIds = activeServerMembers[userId].roles || [];
    for (const roleId of activeServerRoleOrder) {
        if (userRoleIds.includes(roleId)) {
            return activeServerRoles[roleId];
        }
    }
    return activeServerRoles['default']; // Fallback to default role
};


const loadServers = () => {
    if (serversUnsubscribe) serversUnsubscribe();
    if (!currentUser) return;
    
    serversUnsubscribe = db.collection('servers')
        .where('members', 'array-contains', currentUser.uid)
        .onSnapshot((snapshot) => {
            const userServers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            renderServers(userServers);

            if (activeView !== 'home' && !activeServerId && userServers.length > 0) {
                selectServer(userServers[0].id);
            } else if (userServers.length === 0 && activeView !== 'home') {
                selectHome();
            } else if (activeServerId && !userServers.some(s => s.id === activeServerId)) {
                selectHome();
            }
        }, (error) => {
            console.error("Error loading servers:", error);
            const appErrorOverlay = document.getElementById('app-error-overlay');
            const appErrorTitle = document.getElementById('app-error-title');
            const appErrorMessage = document.getElementById('app-error-message');

            if (error.code === 'failed-precondition') {
                appErrorTitle.textContent = "Database Index Required";
                appErrorMessage.innerHTML = `A database index is required for this app to function. Please open the developer console (F12), find the error message from Firebase, and click the link to create the index in your Firebase project. It may take a few minutes to build.`;
                appErrorOverlay.classList.remove('hidden');
            }
        });
};

const loadFriends = () => {
    if (friendsUnsubscribe) friendsUnsubscribe();
    if (!currentUser) return;
    
    friendsUnsubscribe = db.collection('users').doc(currentUser.uid).onSnapshot(async (doc) => {
        if (doc.exists) {
            const userData = doc.data();
            const friendIds = userData.friends || [];
            if (friendIds.length > 0) {
                const friendDocs = await db.collection('users').where(firebase.firestore.FieldPath.documentId(), 'in', friendIds).get();
                const friends = friendDocs.docs.map(d => ({ id: d.id, ...d.data() }));
                renderFriends(friends);
            } else {
                renderFriends([]);
            }
        }
    });
};


const selectHome = async () => {
    await hangUpCurrentCall();
    activeView = 'home';
    activeServerId = null;
    activeChannelId = null;
    activeServerRoles = {};
    activeServerRoleOrder = [];
    activeServerMembers = {};
    allServerUsers = [];
    activeChannelCallStatus = {};

    if (messageUnsubscribe) messageUnsubscribe();
    if (channelUnsubscribe) channelUnsubscribe();
    if (usersUnsubscribe) usersUnsubscribe();
    if (serverCallStatusUnsubscribe) serverCallStatusUnsubscribe();
    
    const homeView = document.getElementById('home-view');
    const channelListPanel = document.getElementById('channel-list-panel');
    const chatView = document.getElementById('chat-view');
    const userListAside = document.getElementById('user-list-aside');
    const placeholderView = document.getElementById('placeholder-view');

    if(homeView) homeView.style.display = 'flex';
    if(channelListPanel) channelListPanel.style.display = 'none';
    if(chatView) chatView.style.display = 'none';
    if(userListAside) userListAside.style.display = 'none';
    if(placeholderView) {
        placeholderView.style.display = 'flex';
        placeholderView.innerHTML = `
        <div class="text-center text-gray-400">
            <h2 class="text-2xl font-bold">Direct Messages</h2>
            <p class="mt-2">Select a friend to start a conversation.</p>
        </div>
        `;
    }

    // Re-render servers to update active state
    db.collection('servers').where('members', 'array-contains', currentUser.uid).get().then(snap => {
        renderServers(snap.docs.map(d => ({id: d.id, ...d.data()})));
    });
    // Re-render friends list to clear active state
    loadFriends();
};

const selectServer = async (serverId) => {
    if (activeServerId === serverId && activeView === 'servers') return;
    await hangUpCurrentCall();
    activeView = 'servers';
    activeServerId = serverId;
    activeChannelId = null;

    if (channelUnsubscribe) channelUnsubscribe();
    if (usersUnsubscribe) usersUnsubscribe();
    if (messageUnsubscribe) messageUnsubscribe();
    if (serverCallStatusUnsubscribe) serverCallStatusUnsubscribe();
    
    const homeView = document.getElementById('home-view');
    const channelListPanel = document.getElementById('channel-list-panel');
    const userListAside = document.getElementById('user-list-aside');
    const placeholderView = document.getElementById('placeholder-view');
    const chatView = document.getElementById('chat-view');

    if(homeView) homeView.style.display = 'none';
    if(channelListPanel) channelListPanel.style.display = 'flex';
    if(userListAside) userListAside.style.display = 'block';

    // Re-render servers to update active state
    const snapshot = await db.collection('servers').where('members', 'array-contains', currentUser.uid).get();
    const allUserServers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderServers(allUserServers);

    if(placeholderView) placeholderView.style.display = 'flex';
    if(chatView) chatView.style.display = 'none';
    if(placeholderView) placeholderView.innerHTML = `
        <div class="text-center text-gray-400">
            <h2 class="text-2xl font-bold">Select a channel</h2>
            <p class="mt-2">Pick a channel to get the conversation started.</p>
        </div>
    `;

    const serverRef = db.collection('servers').doc(serverId);

    // Listener for server details (name, members, roles)
    usersUnsubscribe = serverRef.onSnapshot(async (doc) => {
        if (doc.exists) {
            const serverData = doc.data();
            activeServerRoles = serverData.roles || {};
            activeServerRoleOrder = serverData.roleOrder || Object.keys(activeServerRoles);
            document.getElementById('server-settings-name-input').value = serverData.name;
            renderRoles();
            
            const membersSnapshot = await serverRef.collection('members').get();
            activeServerMembers = {};
            membersSnapshot.forEach(mdoc => {
                activeServerMembers[mdoc.id] = mdoc.data();
            });

            const memberUIDs = serverData.members || [];
            if (memberUIDs.length > 0) {
                const userDocs = await db.collection('users').where(firebase.firestore.FieldPath.documentId(), 'in', memberUIDs).get();
                allServerUsers = userDocs.docs.map(d => ({ id: d.id, ...d.data() }));
                renderUsers(allServerUsers);
                renderServerMembers();
            } else {
                allServerUsers = [];
                renderUsers([]);
                renderServerMembers();
            }
        }
    });

    // Listener for channels in the server
    channelUnsubscribe = serverRef.collection('channels').orderBy('name').onSnapshot((snapshot) => {
        serverRef.get().then((serverDoc) => {
            if (!serverDoc.exists) return;
            const channels = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            renderChannels(serverDoc.data(), channels);
            if (!activeChannelId && channels.length > 0) {
                selectChannel(channels[0].id);
            }
        });
    });

    // Listener for active calls in the server
    serverCallStatusUnsubscribe = serverRef.collection('callStatus').onSnapshot((snapshot) => {
        activeChannelCallStatus = {};
        snapshot.forEach(doc => {
            if (doc.data().participants?.length > 0) {
                activeChannelCallStatus[doc.id] = true;
            }
        });
        // Re-render channels to show/hide call icons
        serverRef.get().then((serverDoc) => {
            serverRef.collection('channels').orderBy('name').get().then((channelDocs) => {
                renderChannels(serverDoc.data(), channelDocs.docs.map((d) => ({ id: d.id, ...d.data() })));
            });
        });
    });
};

const selectChannel = (channelId) => {
    // If we're selecting a new channel while in a server call, don't hang up.
    if (!activeServerCall || activeServerCall.channelId !== channelId) {
        hangUpCurrentCall();
    }
    
    activeChannelId = channelId;
    if (messageUnsubscribe) messageUnsubscribe();

    const placeholderView = document.getElementById('placeholder-view');
    const chatView = document.getElementById('chat-view');
    const chatHeader = document.getElementById('chat-header');
    const messageInput = document.getElementById('message-input');

    if(placeholderView) placeholderView.style.display = 'none';
    if(chatView) chatView.style.display = 'flex';

    const channelRef = db.collection('servers').doc(activeServerId).collection('channels').doc(channelId);

    channelRef.get().then((doc) => {
        if (doc.exists) {
            const channelData = doc.data();
            if(chatHeader) chatHeader.innerHTML = `
                <div class="flex items-center">
                    <svg class="w-6 h-6 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M10 9h4V7h-4v2zm-2 4h4v-2H8v2zm10-4v2h-4V9h4zm2-2h-4V5h4v2zm-4 8h4v-2h-4v2zm-2-4h-4v2h4v-2zm-2 4h2v2h-2v-2zm-6-4H4v2h2v-2zM6 7H4v2h2V7zm10 10v-2h-4v2h4zm-6 0v-2H8v2h2z"></path></svg>
                    <h2 class="font-semibold text-lg text-white">${channelData.name}</h2>
                </div>
                <button id="join-server-call-button" class="ml-auto text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-600">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 5.106A1 1 0 0116 6v8a1 1 0 01-1.447.894L12 12.828V7.172l2.553-1.932z"></path></svg>
                </button>
            `;
            document.getElementById('join-server-call-button').onclick = () => joinServerCall(activeServerId, channelId);
            if(messageInput) messageInput.placeholder = `Message #${channelData.name}`;
        }
    });

    messageUnsubscribe = channelRef.collection('messages').orderBy('timestamp', 'asc').onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        renderMessages(messages);
    });

    // Re-render channels to show active state
    db.collection('servers').doc(activeServerId).get().then((serverDoc) => {
        db.collection('servers').doc(activeServerId).collection('channels').orderBy('name').get().then((channelDocs) => {
            renderChannels(serverDoc.data(), channelDocs.docs.map((d) => ({ id: d.id, ...d.data() })));
        });
    });
    updatePersistentCallBar();
};

const selectDmChannel = async (friend) => {
    await hangUpCurrentCall();
    activeChannelId = getDmChannelId(friend.id);
    if (messageUnsubscribe) messageUnsubscribe();
    
    const placeholderView = document.getElementById('placeholder-view');
    const chatView = document.getElementById('chat-view');
    const userListAside = document.getElementById('user-list-aside');
    const chatHeader = document.getElementById('chat-header');
    const messageInput = document.getElementById('message-input');

    if(placeholderView) placeholderView.style.display = 'none';
    if(chatView) chatView.style.display = 'flex';
    if(userListAside) userListAside.style.display = 'none';
    
    const dmAvatarUrl = isValidHttpUrl(friend.photoURL) ? friend.photoURL : DEFAULT_AVATAR_SVG;
    if(chatHeader) {
        chatHeader.innerHTML = `
            <div class="flex items-center">
                <div class="relative mr-2">
                    <img src="${dmAvatarUrl}" alt="${friend.displayName}" class="w-7 h-7 rounded-full object-cover" />
                    <div class="absolute bottom-0 right-0 w-2 h-2 ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-500'} border border-gray-800 rounded-full"></div>
                </div>
                <h2 class="font-semibold text-lg text-white">${friend.displayName}</h2>
            </div>
            <button id="start-dm-call-button" class="ml-auto text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-600">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 5.106A1 1 0 0116 6v8a1 1 0 01-1.447.894L12 12.828V7.172l2.553-1.932z"></path></svg>
            </button>
        `;
        document.getElementById('start-dm-call-button').onclick = () => startDmCall(friend);
    }

    if(messageInput) messageInput.placeholder = `Message @${friend.displayName}`;

    const dmRef = db.collection('dms').doc(activeChannelId);
    messageUnsubscribe = dmRef.collection('messages').orderBy('timestamp', 'asc').onSnapshot((snapshot) => {
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderMessages(messages);
    });

    // Re-render friends list to show active state
    loadFriends();
    updatePersistentCallBar();
};

const sendMessage = async (messageData) => {
    if (activeView === 'servers' && activeServerId && activeChannelId) {
        await db.collection('servers').doc(activeServerId).collection('channels').doc(activeChannelId).collection('messages').add(messageData);
    } else if (activeView === 'home' && activeChannelId) {
        await db.collection('dms').doc(activeChannelId).collection('messages').add(messageData);
    }
}

const handleSendMessage = async (e) => {
    e.preventDefault();
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const text = messageInput.value.trim();

    if ((!text && !stagedFile) || !currentUser) return;

    sendButton.disabled = true;

    // Command handling (unchanged)
    if (text.startsWith('/')) {
        if (text === '/tetris') {
            const tetrisWindow = window.open('', 'tetris', 'width=450,height=500,resizable=yes');
            if (tetrisWindow) {
                tetrisWindow.document.write(tetrisHTML);
                tetrisWindow.document.close();
            }
            messageInput.value = '';
            cancelFilePreview();
            messageInput.dispatchEvent(new Event('input', { bubbles: true }));
            return;
        }
        if (text === '/admin') {
            if (auth.currentUser && auth.currentUser.email === 'nineteenp2@gmail.com') {
                const adminWindow = window.open('', 'adminPanel', 'width=550,height=350,resizable=yes');
                if (adminWindow) {
                    adminWindow.document.write(adminPanelHTML);
                    adminWindow.document.close();
                }
            }
            messageInput.value = '';
            cancelFilePreview();
            messageInput.dispatchEvent(new Event('input', { bubbles: true }));
            return;
        }
        let commandResultText = null;
        if (text === '/coinflip') commandResultText = Math.random() < 0.5 ? 'Heads' : 'Tails';
        else if (text === '/dice') commandResultText = `${Math.floor(Math.random() * 6) + 1}`;
        else if (text === '/shrug') commandResultText = '¯\\_(ツ)_/¯';
        
        if (commandResultText) {
            await sendMessage({
                text: commandResultText,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: { uid: currentUser.uid, displayName: currentUser.displayName, photoURL: currentUser.photoURL }
            });
            messageInput.value = '';
            cancelFilePreview();
            messageInput.dispatchEvent(new Event('input'));
            return;
        }
    }
    
    // Logic for sending file or text message
    try {
        if (stagedFile) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const fileContent = event.target.result;
                const messageText = text 
                    ? `${text}\n\n\`\`\`txt\n${fileContent}\n\`\`\`` 
                    : `\`\`\`txt\n${fileContent}\n\`\`\``;
                
                await sendMessage({
                    text: messageText,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: { uid: currentUser.uid, displayName: currentUser.displayName, photoURL: currentUser.photoURL }
                });
                messageInput.value = '';
                cancelFilePreview();
            };
            reader.onerror = (error) => {
                console.error("Error reading file:", error);
                alert("Failed to read the selected file.");
                messageInput.dispatchEvent(new Event('input', { bubbles: true })); // Re-enable button
            };
            reader.readAsText(stagedFile);
        } else {
            await sendMessage({
                text: text,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: { uid: currentUser.uid, displayName: currentUser.displayName, photoURL: currentUser.photoURL }
            });
            messageInput.value = '';
        }
    } catch (error) {
        console.error("Error sending message:", error);
        alert("Failed to send message.");
    } finally {
        messageInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
};

const handleCreateServer = async (e) => {
    e.preventDefault();
    const serverNameInput = document.getElementById('server-name-input');
    const addServerModal = document.getElementById('add-server-modal');
    const serverName = serverNameInput.value.trim();
    if(serverName && currentUser) {
        const newServerRef = db.collection('servers').doc();
        await newServerRef.set({
            name: serverName,
            iconUrl: `https://picsum.photos/seed/${Date.now()}/64/64`,
            owner: currentUser.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            members: [currentUser.uid],
            roles: {
                'owner': { name: 'Owner', color: '#ffc107' },
                'default': { name: '@everyone', color: '#99aab5' }
            },
            roleOrder: ['owner', 'default']
        });
        await newServerRef.collection('channels').doc('general').set({
            name: 'general'
        });
        await newServerRef.collection('members').doc(currentUser.uid).set({
            roles: ['owner']
        });
        
        serverNameInput.value = '';
        if (addServerModal) addServerModal.style.display = 'none';
        selectServer(newServerRef.id);
    }
};

const handleCreateChannel = async (e) => {
    e.preventDefault();
    const channelNameInput = document.getElementById('channel-name-input');
    const modal = document.getElementById('create-channel-modal');
    const channelName = channelNameInput.value.trim();
    if(channelName && activeServerId) {
        const formattedName = channelName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        if (formattedName) {
            await db.collection('servers').doc(activeServerId).collection('channels').add({
                name: formattedName
            });
            channelNameInput.value = '';
            if(modal) modal.style.display = 'none';
        }
    }
}

const handleCreateRole = async (e) => {
    e.preventDefault();
    const roleNameInput = document.getElementById('role-name-input');
    const roleColorInput = document.getElementById('role-color-input');
    const roleName = roleNameInput.value.trim();
    const roleColor = roleColorInput.value;

    if (roleName && activeServerId) {
        const serverRef = db.collection('servers').doc(activeServerId);
        const roleId = `role_${Date.now()}`;
        
        await serverRef.update({
            [`roles.${roleId}`]: { name: roleName, color: roleColor },
            roleOrder: firebase.firestore.FieldValue.arrayUnion(roleId)
        });
        
        roleNameInput.value = '';
        roleColorInput.value = '#99aab5';
    }
}


const handleAddFriend = async (e) => {
    e.preventDefault();
    const addFriendInput = document.getElementById('add-friend-input');
    const addFriendStatus = document.getElementById('add-friend-status');
    const friendId = addFriendInput.value.trim();
    if (!friendId || friendId === currentUser.uid) return;

    addFriendStatus.textContent = '...';
    addFriendStatus.className = 'text-xs mt-1 h-3 text-gray-400';

    const friendRef = db.collection('users').doc(friendId);
    const friendDoc = await friendRef.get();

    if (!friendDoc.exists) {
        addFriendStatus.textContent = 'User not found.';
        addFriendStatus.className = 'text-xs mt-1 h-3 text-red-400';
        return;
    }

    const currentUserRef = db.collection('users').doc(currentUser.uid);
    await currentUserRef.update({
        friends: firebase.firestore.FieldValue.arrayUnion(friendId)
    });
    await friendRef.update({
        friends: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
    });
    
    addFriendStatus.textContent = 'Friend added!';
    addFriendStatus.className = 'text-xs mt-1 h-3 text-green-400';
    addFriendInput.value = '';
    setTimeout(() => { addFriendStatus.textContent = ''; }, 2000);
};

const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const profileUsernameInput = document.getElementById('profile-username-input');
    const profileAvatarInput = document.getElementById('profile-avatar-input');
    const myProfileModal = document.getElementById('my-profile-modal');

    const newUsername = profileUsernameInput.value.trim();
    const newAvatarUrl = profileAvatarInput.value.trim();
    if (!newUsername) return;

    if (newAvatarUrl && !isValidHttpUrl(newAvatarUrl)) {
        alert("The provided Avatar URL is not valid. Please enter a full, valid URL (e.g., https://example.com/image.png) or leave it blank.");
        return;
    }

    try {
        const user = auth.currentUser;
        await user.updateProfile({
            displayName: newUsername,
            photoURL: newAvatarUrl || currentUser.photoURL // Keep old one if new is empty
        });

        await db.collection('users').doc(user.uid).update({
            displayName: newUsername,
            photoURL: newAvatarUrl || currentUser.photoURL
        });
        
        // Update local state and UI
        currentUser.displayName = newUsername;
        currentUser.photoURL = newAvatarUrl || currentUser.photoURL;
        renderUserInfo();
        
        if (myProfileModal) myProfileModal.style.display = 'none';

    } catch(error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again.");
    }
};

async function deleteServer(serverRef) {
  const channelsSnapshot = await serverRef.collection('channels').get();
  for (const channelDoc of channelsSnapshot.docs) {
    const messagesSnapshot = await channelDoc.ref.collection('messages').get();
    const batch = db.batch();
    messagesSnapshot.forEach(msgDoc => batch.delete(msgDoc.ref));
    await batch.commit();
    await channelDoc.ref.delete();
  }
  const membersSnapshot = await serverRef.collection('members').get();
  for (const memberDoc of membersSnapshot.docs) {
      await memberDoc.ref.delete();
  }
  await serverRef.delete();
  console.log(`Server ${serverRef.id} and all its content have been deleted.`);
}

const handleLeaveServer = async () => {
    if (!activeServerId || !currentUser) return;
    const serverRef = db.collection('servers').doc(activeServerId);
    const serverDoc = await serverRef.get();
    if (!serverDoc.exists) return;

    const serverName = serverDoc.data().name;

    if (confirm(`Are you sure you want to leave ${serverName}?`)) {
        try {
            await serverRef.update({
                members: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
            });
            await serverRef.collection('members').doc(currentUser.uid).delete();

            const updatedServerDoc = await serverRef.get();
            if (updatedServerDoc.exists) {
                const members = updatedServerDoc.data().members || [];
                if (members.length === 0) {
                    console.log(`Server ${serverName} is now empty. Deleting...`);
                    await deleteServer(serverRef);
                }
            }
            
            selectHome();
        } catch (error) {
            console.error("Error leaving server:", error);
            alert("Failed to leave server.");
        }
    }
};

const handleInviteFriend = async (e) => {
    e.preventDefault();
    const friendCodeInput = document.getElementById('friend-code-input');
    const inviteStatusMessage = document.getElementById('invite-status-message');
    const inviteModal = document.getElementById('invite-modal');

    const friendId = friendCodeInput.value.trim();
    if (!friendId || !activeServerId) return;

    inviteStatusMessage.textContent = 'Sending...';
    inviteStatusMessage.className = 'text-sm mt-2 h-4 text-gray-400';

    try {
        const userDoc = await db.collection('users').doc(friendId).get();
        if (!userDoc.exists) {
            inviteStatusMessage.textContent = 'User not found.';
            inviteStatusMessage.className = 'text-sm mt-2 h-4 text-red-400';
            return;
        }
        
        const serverRef = db.collection('servers').doc(activeServerId);
        await serverRef.update({
            members: firebase.firestore.FieldValue.arrayUnion(friendId)
        });
        await serverRef.collection('members').doc(friendId).set({ roles: ['default'] });

        inviteStatusMessage.textContent = `Invite sent to ${userDoc.data().displayName}!`;
        inviteStatusMessage.className = 'text-sm mt-2 h-4 text-green-400';
        friendCodeInput.value = '';
        setTimeout(() => { if (inviteModal) inviteModal.style.display = 'none'; }, 2000);

    } catch (error) {
        console.error("Error sending invite:", error);
        inviteStatusMessage.textContent = 'Failed to send invite.';
        inviteStatusMessage.className = 'text-sm mt-2 h-4 text-red-400';
    }
};

const showUserProfile = async (userId) => {
    if (!userId || userId === currentUser.uid) return;
    const modal = document.getElementById('user-profile-modal');
    const avatarEl = document.getElementById('user-profile-avatar');
    const nameEl = document.getElementById('user-profile-name');
    const friendCodeEl = document.getElementById('user-profile-friend-code');

    if (!modal || !avatarEl || !nameEl || !friendCodeEl) return;

    try {
        const userDoc = await db.collection('users').doc(userId).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            avatarEl.src = isValidHttpUrl(userData.photoURL) ? userData.photoURL : DEFAULT_AVATAR_SVG;
            nameEl.textContent = `${userData.displayName}'s Profile`;
            friendCodeEl.textContent = userId;
            modal.style.display = 'flex';
        } else {
            console.warn("User not found:", userId);
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
};

// =================================================================================
// File Handling
// =================================================================================

const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) {
        return;
    }

    // Check by file extension, as MIME type can be unreliable.
    if (!file.name.toLowerCase().endsWith('.txt')) {
        alert('Only .txt files are allowed.');
        e.target.value = ''; // Clear the file input
        return;
    }
    
    stagedFile = file;
    const filePreviewContainer = document.getElementById('file-preview-container');
    const filePreviewName = document.getElementById('file-preview-name');
    const sendButton = document.getElementById('send-button');

    filePreviewName.textContent = file.name;
    filePreviewContainer.classList.remove('hidden');
    filePreviewContainer.style.display = 'flex';
    if (sendButton) sendButton.disabled = false;
};

const cancelFilePreview = () => {
    const fileUploadInput = document.getElementById('file-upload-input');
    const filePreviewContainer = document.getElementById('file-preview-container');
    const filePreviewName = document.getElementById('file-preview-name');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    stagedFile = null;
    if (fileUploadInput) fileUploadInput.value = '';
    if (filePreviewName) filePreviewName.textContent = '';
    if (filePreviewContainer) filePreviewContainer.classList.add('hidden');

    if (sendButton && messageInput && !messageInput.value.trim()) {
        sendButton.disabled = true;
    }
};

// =================================================================================
// WebRTC Call - Generic Controls & Cleanup
// =================================================================================

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function createVideoContainer(userId, isLocal = false) {
    const videoGrid = document.getElementById('video-grid');
    if (!videoGrid) return null;

    let container = document.getElementById(`video-container-${userId}`);
    // If container exists, remove it before creating a new one to avoid duplicates.
    if (container) {
        container.remove();
    }

    container = document.createElement('div');
    container.id = `video-container-${userId}`;
    container.className = 'relative bg-gray-800 rounded-lg overflow-hidden aspect-video';

    const videoEl = document.createElement('video');
    videoEl.id = isLocal ? 'local-video' : `remote-video-${userId}`;
    videoEl.autoplay = true;
    videoEl.playsInline = true;
    videoEl.className = 'w-full h-full object-cover';
    if (isLocal) {
        videoEl.muted = true; // Mute local video to prevent feedback
    }

    container.appendChild(videoEl);

    const nameTag = document.createElement('div');
    nameTag.className = 'absolute bottom-2 left-2 bg-black/50 text-white text-sm px-2 py-1 rounded-md';
    nameTag.textContent = '...';
    
    db.collection('users').doc(userId).get().then(doc => {
        if (doc.exists) {
            nameTag.textContent = doc.data().displayName;
        }
    });

    container.appendChild(nameTag);

    if (isLocal) {
        // Make local video draggable
        container.classList.add('w-48', 'h-auto', 'absolute', 'bottom-24', 'right-4', 'z-40', 'cursor-move', 'shadow-lg');
        makeDraggable(container);
    }
    
    videoGrid.appendChild(container);
    return videoEl;
}

const hangUpCurrentCall = async () => {
    if (activeDmCallData) {
        await hangUpDmCall();
    }
    if (activeServerCall) {
        await hangUpServerCall();
    }
};


const toggleMute = () => {
    const stream = activeServerCall ? serverLocalStream : dmlocalStream;
    if (!stream) return;
    const audioTrack = stream.getAudioTracks()[0];
    const micButton = document.getElementById('toggle-mic-button');
    if (audioTrack && micButton) {
        audioTrack.enabled = !audioTrack.enabled;
        const isMuted = !audioTrack.enabled;
        micButton.dataset.muted = isMuted;
        micButton.setAttribute('aria-label', isMuted ? 'Unmute microphone' : 'Mute microphone');
        micButton.classList.toggle('bg-red-500', isMuted);
        micButton.classList.toggle('hover:bg-red-600', isMuted);
        micButton.classList.toggle('bg-gray-600/80', !isMuted);
        micButton.innerHTML = isMuted ? MIC_OFF_SVG : MIC_ON_SVG;
    }
};

const toggleCamera = () => {
    const stream = activeServerCall ? serverLocalStream : dmlocalStream;
    if (!stream) return;
    const videoTrack = stream.getVideoTracks()[0];
    const camButton = document.getElementById('toggle-camera-button');
    if (videoTrack && camButton) {
        videoTrack.enabled = !videoTrack.enabled;
        const isEnabled = videoTrack.enabled;
        camButton.dataset.enabled = isEnabled;
        camButton.setAttribute('aria-label', isEnabled ? 'Turn off camera' : 'Turn on camera');
        camButton.classList.toggle('bg-red-500', !isEnabled);
        camButton.classList.toggle('hover:bg-red-600', !isEnabled);
        camButton.classList.toggle('bg-gray-600/80', isEnabled);
        camButton.innerHTML = isEnabled ? CAM_ON_SVG : CAM_OFF_SVG;
    }
};

// =================================================================================
// WebRTC DM (1-on-1) Call Functions
// =================================================================================

const setupDmCallListener = () => {
    if (dmCallListenerUnsubscribe) dmCallListenerUnsubscribe();
    if (!currentUser) return;
    dmCallListenerUnsubscribe = db.collection('calls')
        .where('calleeId', '==', currentUser.uid)
        .where('status', '==', 'ringing')
        .onSnapshot(snapshot => {
            if (!snapshot.empty) {
                const callDoc = snapshot.docs[0];
                const callData = { id: callDoc.id, ...callDoc.data() };

                // Don't show incoming call if already in a call or if it's from self
                if (activeDmCallData || activeServerCall || callData.callerId === currentUser.uid) {
                    return;
                }

                if (confirm(`${callData.callerName} is calling you. Answer?`)) {
                    answerDmCall(callData);
                } else {
                    rejectDmCall(callData);
                }
            }
        });
};


const startDmCall = async (friend) => {
    if (activeServerCall || activeDmCallData) {
        alert("You are already in another call.");
        return;
    }
    const videoCallView = document.getElementById('video-call-view');
    const videoGrid = document.getElementById('video-grid');
    const videoCallControls = document.getElementById('video-call-controls');
    const videoCallStatus = document.getElementById('video-call-status');

    videoGrid.innerHTML = '';
    videoCallView.style.display = 'flex';
    videoCallStatus.style.display = 'flex';
    videoCallStatus.innerHTML = `
        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        <p class="mt-4 text-lg">Calling ${friend.displayName}...</p>
    `;
    
    try {
        dmlocalStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const localVideo = createVideoContainer(currentUser.uid, true);
        localVideo.srcObject = dmlocalStream;
    } catch (error) {
        console.error("Could not get media devices:", error);
        alert("Camera and microphone access are required for video calls.");
        videoCallView.style.display = 'none';
        return;
    }
    
    dmPeerConnection = new RTCPeerConnection(iceServers);
    dmlocalStream.getTracks().forEach(track => dmPeerConnection.addTrack(track, dmlocalStream));

    dmPeerConnection.ontrack = event => {
        const remoteVideo = createVideoContainer(friend.id, false);
        event.streams[0].getTracks().forEach(track => dmRemoteStream.addTrack(track));
        remoteVideo.srcObject = dmRemoteStream;
    };

    const callDocRef = db.collection('calls').doc();
    activeDmCallData = { id: callDocRef.id, calleeId: friend.id };

    const offerCandidates = callDocRef.collection('offerCandidates');
    const answerCandidates = callDocRef.collection('answerCandidates');

    dmPeerConnection.onicecandidate = event => {
        if (event.candidate) {
            offerCandidates.add(event.candidate.toJSON());
        }
    };
    
    const offerDescription = await dmPeerConnection.createOffer();
    await dmPeerConnection.setLocalDescription(offerDescription);

    const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
    };
    
    await callDocRef.set({
        callerId: currentUser.uid,
        callerName: currentUser.displayName,
        calleeId: friend.id,
        offer,
        status: 'ringing'
    });
    
    // Listen for call updates
    currentDmCallUnsubscribe = callDocRef.onSnapshot(async (snapshot) => {
        const data = snapshot.data();
        if (data.status === 'answered' && !dmPeerConnection.currentRemoteDescription) {
            videoCallStatus.style.display = 'none';
            videoCallControls.style.display = 'flex';
            const answerDescription = new RTCSessionDescription(data.answer);
            await dmPeerConnection.setRemoteDescription(answerDescription);

            // Listen for answer candidates
            answerCandidates.onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        const candidate = new RTCIceCandidate(change.doc.data());
                        dmPeerConnection.addIceCandidate(candidate);
                    }
                });
            });
        }
        if (data.status === 'declined' || data.status === 'ended') {
            await hangUpDmCall();
        }
    });

    videoCallControls.innerHTML = `
        <button id="toggle-mic-button" class="p-3 bg-gray-600/80 rounded-full hover:bg-gray-500/80" aria-label="Mute microphone">${MIC_ON_SVG}</button>
        <button id="toggle-camera-button" class="p-3 bg-gray-600/80 rounded-full hover:bg-gray-500/80" aria-label="Turn off camera">${CAM_ON_SVG}</button>
        <button id="hangup-dm-call-button" class="p-3 bg-red-500 rounded-full hover:bg-red-600">${HANGUP_SVG}</button>
    `;
    document.getElementById('toggle-mic-button').onclick = toggleMute;
    document.getElementById('toggle-camera-button').onclick = toggleCamera;
    document.getElementById('hangup-dm-call-button').onclick = hangUpDmCall;
};


const answerDmCall = async (callData) => {
    if (activeServerCall || activeDmCallData) {
        // If already in a call, reject the new one
        await db.collection('calls').doc(callData.id).update({ status: 'declined' });
        return;
    }
    
    activeDmCallData = callData;
    const callDocRef = db.collection('calls').doc(callData.id);
    
    const videoCallView = document.getElementById('video-call-view');
    const videoGrid = document.getElementById('video-grid');
    const videoCallControls = document.getElementById('video-call-controls');
    
    videoGrid.innerHTML = '';
    videoCallView.style.display = 'flex';
    videoCallControls.style.display = 'flex';
    
    try {
        dmlocalStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const localVideo = createVideoContainer(currentUser.uid, true);
        localVideo.srcObject = dmlocalStream;
    } catch (error) {
        console.error("Could not get media devices:", error);
        alert("Camera and microphone access are required for video calls.");
        await rejectDmCall(callData);
        return;
    }

    dmPeerConnection = new RTCPeerConnection(iceServers);
    dmlocalStream.getTracks().forEach(track => dmPeerConnection.addTrack(track, dmlocalStream));

    dmPeerConnection.ontrack = event => {
        const remoteVideo = createVideoContainer(callData.callerId, false);
        event.streams[0].getTracks().forEach(track => dmRemoteStream.addTrack(track));
        remoteVideo.srcObject = dmRemoteStream;
    };
    
    const offerCandidates = callDocRef.collection('offerCandidates');
    const answerCandidates = callDocRef.collection('answerCandidates');
    
    dmPeerConnection.onicecandidate = event => {
        if (event.candidate) {
            answerCandidates.add(event.candidate.toJSON());
        }
    };
    
    await dmPeerConnection.setRemoteDescription(new RTCSessionDescription(callData.offer));
    const answerDescription = await dmPeerConnection.createAnswer();
    await dmPeerConnection.setLocalDescription(answerDescription);

    const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
    };

    await callDocRef.update({ answer, status: 'answered' });

    offerCandidates.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
                dmPeerConnection.addIceCandidate(new RTCIceCandidate(change.doc.data()));
            }
        });
    });

    currentDmCallUnsubscribe = callDocRef.onSnapshot(async (snapshot) => {
        const data = snapshot.data();
        if (!data || data.status === 'ended') {
            await hangUpDmCall();
        }
    });

    videoCallControls.innerHTML = `
        <button id="toggle-mic-button" class="p-3 bg-gray-600/80 rounded-full hover:bg-gray-500/80" aria-label="Mute microphone">${MIC_ON_SVG}</button>
        <button id="toggle-camera-button" class="p-3 bg-gray-600/80 rounded-full hover:bg-gray-500/80" aria-label="Turn off camera">${CAM_ON_SVG}</button>
        <button id="hangup-dm-call-button" class="p-3 bg-red-500 rounded-full hover:bg-red-600">${HANGUP_SVG}</button>
    `;
    document.getElementById('toggle-mic-button').onclick = toggleMute;
    document.getElementById('toggle-camera-button').onclick = toggleCamera;
    document.getElementById('hangup-dm-call-button').onclick = hangUpDmCall;
};

const rejectDmCall = async (callData) => {
    const callDocRef = db.collection('calls').doc(callData.id);
    await callDocRef.update({ status: 'declined' });
};

const hangUpDmCall = async () => {
    const videoCallView = document.getElementById('video-call-view');
    videoCallView.style.display = 'none';
    
    if (dmlocalStream) {
        dmlocalStream.getTracks().forEach(track => track.stop());
        dmlocalStream = null;
    }
    if (dmPeerConnection) {
        dmPeerConnection.close();
        dmPeerConnection = null;
    }
    if (dmRemoteStream) {
        dmRemoteStream = new MediaStream();
    }
    if (currentDmCallUnsubscribe) {
        currentDmCallUnsubscribe();
        currentDmCallUnsubscribe = null;
    }
    
    if (activeDmCallData) {
        const callDocRef = db.collection('calls').doc(activeDmCallData.id);
        const callDoc = await callDocRef.get();
        if (callDoc.exists && callDoc.data().status !== 'ended') {
            await callDocRef.update({ status: 'ended' });
        }
        // Clean up candidates
        const offerCandidates = await callDocRef.collection('offerCandidates').get();
        offerCandidates.forEach(async (doc) => await doc.ref.delete());
        const answerCandidates = await callDocRef.collection('answerCandidates').get();
        answerCandidates.forEach(async (doc) => await doc.ref.delete());

        activeDmCallData = null;
    }
    updatePersistentCallBar();
};

// =================================================================================
// WebRTC Server Call Functions
// =================================================================================

const joinServerCall = async (serverId, channelId) => {
    if (activeDmCallData) {
        alert("You are already in a DM call.");
        return;
    }
    // If already in this server call, do nothing.
    if (activeServerCall && activeServerCall.serverId === serverId && activeServerCall.channelId === channelId) {
        // Just show the view again if it's hidden
        document.getElementById('video-call-view').style.display = 'flex';
        return;
    }
    // If in another server call, hang up first.
    if (activeServerCall) {
        await hangUpServerCall();
    }

    const videoCallView = document.getElementById('video-call-view');
    const videoGrid = document.getElementById('video-grid');
    const videoCallControls = document.getElementById('video-call-controls');

    videoGrid.innerHTML = '';
    videoCallView.style.display = 'flex';
    videoCallControls.style.display = 'flex';

    activeServerCall = { serverId, channelId };

    try {
        serverLocalStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const localVideo = createVideoContainer(currentUser.uid, true);
        if (localVideo) localVideo.srcObject = serverLocalStream;
    } catch (error) {
        console.error("Could not get media devices:", error);
        alert("Camera and microphone access are required for video calls.");
        activeServerCall = null;
        videoCallView.style.display = 'none';
        return;
    }

    const callStatusRef = db.collection('servers').doc(serverId).collection('callStatus').doc(channelId);
    await callStatusRef.set({
        participants: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
    }, { merge: true });

    const signalingRef = callStatusRef.collection('signaling');

    // Listen for other participants
    const participantsUnsubscribe = callStatusRef.onSnapshot(async (snapshot) => {
        const data = snapshot.data();
        if (!data || !data.participants.includes(currentUser.uid)) {
            // We were removed or left, so hang up
            hangUpServerCall();
            return;
        }
        
        const participants = data.participants || [];
        const otherParticipants = participants.filter(p => p !== currentUser.uid);

        // Connect to new participants
        otherParticipants.forEach(peerId => {
            if (!serverPeerConnections[peerId]) {
                // We initiate the connection if our ID is "smaller"
                if (currentUser.uid < peerId) {
                    const pc = createPeerConnection(peerId, signalingRef);
                    serverPeerConnections[peerId] = pc;
                    
                    serverLocalStream.getTracks().forEach(track => pc.addTrack(track, serverLocalStream));

                    pc.createOffer().then(offer => {
                        pc.setLocalDescription(offer);
                        signalingRef.doc(`${currentUser.uid}_to_${peerId}`).set({ offer });
                    });
                }
            }
        });

        // Clean up disconnected peers
        Object.keys(serverPeerConnections).forEach(peerId => {
            if (!otherParticipants.includes(peerId)) {
                serverPeerConnections[peerId].close();
                delete serverPeerConnections[peerId];
                const videoContainer = document.getElementById(`video-container-${peerId}`);
                if (videoContainer) videoContainer.remove();
            }
        });
    });
    serverCallUnsubscribes.push(participantsUnsubscribe);

    // Listen for signaling messages
    const offersUnsubscribe = signalingRef.where('offer.type', '==', 'offer').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            const docId = change.doc.id;
            const [callerId, calleeId] = docId.split('_to_');
            if (calleeId === currentUser.uid && !serverPeerConnections[callerId]) {
                const pc = createPeerConnection(callerId, signalingRef);
                serverPeerConnections[callerId] = pc;
                serverLocalStream.getTracks().forEach(track => pc.addTrack(track, serverLocalStream));
                
                pc.setRemoteDescription(new RTCSessionDescription(change.doc.data().offer));
                pc.createAnswer().then(answer => {
                    pc.setLocalDescription(answer);
                    signalingRef.doc(`${currentUser.uid}_to_${callerId}`).set({ answer });
                });
            }
        });
    });
    serverCallUnsubscribes.push(offersUnsubscribe);

    const answersUnsubscribe = signalingRef.where('answer.type', '==', 'answer').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            const docId = change.doc.id;
            const [answererId, originalCallerId] = docId.split('_to_');
            if (originalCallerId === currentUser.uid && serverPeerConnections[answererId]) {
                serverPeerConnections[answererId].setRemoteDescription(new RTCSessionDescription(change.doc.data().answer));
            }
        });
    });
    serverCallUnsubscribes.push(answersUnsubscribe);

    const candidatesUnsubscribe = signalingRef.where('candidate', '!=', null).onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
             const docId = change.doc.id;
             const [senderId, receiverId] = docId.split('_to_');
             if (receiverId === currentUser.uid && serverPeerConnections[senderId]) {
                serverPeerConnections[senderId].addIceCandidate(new RTCIceCandidate(change.doc.data().candidate));
             }
        });
    });
    serverCallUnsubscribes.push(candidatesUnsubscribe);
    
    updatePersistentCallBar();
    videoCallControls.innerHTML = `
        <button id="toggle-mic-button" class="p-3 bg-gray-600/80 rounded-full hover:bg-gray-500/80" aria-label="Mute microphone">${MIC_ON_SVG}</button>
        <button id="toggle-camera-button" class="p-3 bg-gray-600/80 rounded-full hover:bg-gray-500/80" aria-label="Turn off camera">${CAM_ON_SVG}</button>
        <button id="hangup-server-call-button" class="p-3 bg-red-500 rounded-full hover:bg-red-600">${HANGUP_SVG}</button>
    `;
    document.getElementById('toggle-mic-button').onclick = toggleMute;
    document.getElementById('toggle-camera-button').onclick = toggleCamera;
    document.getElementById('hangup-server-call-button').onclick = hangUpServerCall;
};

const createPeerConnection = (peerId, signalingRef) => {
    const pc = new RTCPeerConnection(iceServers);
    pc.onicecandidate = (event) => {
        if (event.candidate) {
            signalingRef.doc(`${currentUser.uid}_to_${peerId}`).set({ candidate: event.candidate.toJSON() }, { merge: true });
        }
    };
    pc.ontrack = (event) => {
        let remoteStream = new MediaStream();
        const remoteVideo = createVideoContainer(peerId, false);
        if (remoteVideo) {
            event.streams[0].getTracks().forEach(track => remoteStream.addTrack(track));
            remoteVideo.srcObject = remoteStream;
        }
    };
    return pc;
}

const hangUpServerCall = async () => {
    const videoCallView = document.getElementById('video-call-view');
    videoCallView.style.display = 'none';

    if (activeServerCall) {
        const { serverId, channelId } = activeServerCall;
        const callStatusRef = db.collection('servers').doc(serverId).collection('callStatus').doc(channelId);
        await callStatusRef.update({
            participants: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
        });

        const signalingRef = callStatusRef.collection('signaling');
        const docsToDelete = await signalingRef.get();
        docsToDelete.forEach(doc => {
            if (doc.id.startsWith(currentUser.uid) || doc.id.endsWith(currentUser.uid)) {
                doc.ref.delete();
            }
        });
    }

    if (serverLocalStream) {
        serverLocalStream.getTracks().forEach(track => track.stop());
        serverLocalStream = null;
    }

    Object.values(serverPeerConnections).forEach(pc => pc.close());
    serverPeerConnections = {};
    
    serverCallUnsubscribes.forEach(unsub => unsub());
    serverCallUnsubscribes = [];
    
    activeServerCall = null;
    updatePersistentCallBar();
};

const updatePersistentCallBar = async () => {
    const bar = document.getElementById('persistent-call-bar');
    if (!bar) return;

    if (activeServerCall) {
        const { serverId, channelId } = activeServerCall;
        const serverDoc = await db.collection('servers').doc(serverId).get();
        const channelDoc = await db.collection('servers').doc(serverId).collection('channels').doc(channelId).get();
        
        if (serverDoc.exists && channelDoc.exists) {
            bar.innerHTML = `
                <div class="flex items-center">
                    <svg class="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 5.106A1 1 0 0116 6v8a1 1 0 01-1.447.894L12 12.828V7.172l2.553-1.932z"></path></svg>
                    <div class="truncate">
                         <p class="text-sm font-semibold text-white truncate">Voice Connected</p>
                         <p class="text-xs text-gray-400 truncate">${channelDoc.data().name} / ${serverDoc.data().name}</p>
                    </div>
                </div>
                <button id="disconnect-persistent-call" class="text-gray-400 hover:text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                </button>
            `;
            bar.style.display = 'block';
            document.getElementById('disconnect-persistent-call').onclick = hangUpServerCall;
            bar.onclick = (e) => {
                if(e.target.id !== 'disconnect-persistent-call' && !e.target.closest('#disconnect-persistent-call')) {
                     document.getElementById('video-call-view').style.display = 'flex';
                }
            };
        }
    } else {
        bar.style.display = 'none';
        bar.innerHTML = '';
    }
}

// =================================================================================
// Event Listeners Setup
// =================================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Login/Auth
  document.getElementById('login-button').addEventListener('click', signInWithGoogle);
  document.getElementById('signup-form').addEventListener('submit', handleSignUp);
  document.getElementById('signin-form').addEventListener('submit', handleSignIn);
  document.getElementById('show-signin-link').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('signin-form').classList.remove('hidden');
    clearLoginError();
  });
  document.getElementById('show-signup-link').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signin-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
    clearLoginError();
  });
  
  // Signout (using event delegation for multiple buttons)
  document.body.addEventListener('click', (e) => {
      if (e.target.closest('.signout-button')) {
          signOut();
      }
  });

  // Modals
  document.getElementById('add-server-form').addEventListener('submit', handleCreateServer);
  document.getElementById('cancel-add-server').addEventListener('click', () => {
    document.getElementById('add-server-modal').style.display = 'none';
  });
  
  // My Profile Modal
  document.body.addEventListener('click', (e) => {
      if (e.target.closest('.user-info-panel')) {
            const modal = document.getElementById('my-profile-modal');
            const usernameInput = document.getElementById('profile-username-input');
            const avatarInput = document.getElementById('profile-avatar-input');
            const friendCodeDisplay = document.getElementById('friend-code-display');

            if (modal && currentUser) {
                usernameInput.value = currentUser.displayName;
                avatarInput.value = currentUser.photoURL;
                friendCodeDisplay.textContent = currentUser.uid;
                modal.style.display = 'flex';
            }
      }
  });
  document.getElementById('close-my-profile-modal').addEventListener('click', () => {
      document.getElementById('my-profile-modal').style.display = 'none';
  });
  document.getElementById('profile-form').addEventListener('submit', handleUpdateProfile);

  // User Profile Modal (for others)
   document.getElementById('chat-panel').addEventListener('click', (e) => {
        const userId = e.target.dataset.userid;
        if (userId) {
            showUserProfile(userId);
        }
    });
   document.getElementById('close-user-profile-modal').addEventListener('click', () => {
        document.getElementById('user-profile-modal').style.display = 'none';
    });

  // Settings Modal
  document.body.addEventListener('click', (e) => {
      if (e.target.closest('.settings-button')) {
            document.getElementById('settings-modal').style.display = 'flex';
      }
  });
  document.getElementById('close-settings-modal').addEventListener('click', () => {
        document.getElementById('settings-modal').style.display = 'none';
  });
  
  // Settings Navigation
  const settingsNavButtons = document.querySelectorAll('.settings-nav-button');
  const settingsSections = document.querySelectorAll('.settings-section');
  settingsNavButtons.forEach(button => {
      button.addEventListener('click', () => {
          const sectionId = button.dataset.section;
          settingsSections.forEach(section => {
              section.style.display = section.id === sectionId ? 'block' : 'none';
          });
          settingsNavButtons.forEach(btn => {
              btn.classList.toggle('bg-gray-700', btn === button);
              btn.classList.toggle('text-white', btn === button);
          });
      });
  });

  // Server Settings Navigation
  const serverSettingsNavButtons = document.querySelectorAll('.server-settings-nav-button');
  const serverSettingsSections = document.querySelectorAll('.server-settings-section');
  serverSettingsNavButtons.forEach(button => {
      button.addEventListener('click', () => {
          const sectionId = button.dataset.section;
          serverSettingsSections.forEach(section => {
              section.classList.toggle('hidden', section.id !== sectionId);
          });
          serverSettingsNavButtons.forEach(btn => {
              btn.classList.toggle('bg-gray-700', btn === button);
              btn.classList.toggle('text-white', btn === button);
          });
      });
  });

  // Theme Settings
  const themeOptions = document.querySelectorAll('.theme-option');
  themeOptions.forEach(option => {
      option.addEventListener('click', () => {
          const theme = option.dataset.theme;
          document.body.className = theme === 'light' ? 'theme-light bg-gray-100 text-gray-900 font-sans' : 'bg-gray-900 text-gray-100 font-sans';
          localStorage.setItem('theme', theme);
      });
  });
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
       document.body.className = savedTheme === 'light' ? 'theme-light bg-gray-100 text-gray-900 font-sans' : 'bg-gray-900 text-gray-100 font-sans';
  }
  
  // Custom Color Theme
    const customBgColorInput = document.getElementById('custom-bg-color');
    const customTextColorInput = document.getElementById('custom-text-color');
    const customAccentColorInput = document.getElementById('custom-accent-color');
    function applyCustomColors() {
        document.documentElement.style.setProperty('--color-gray-800', customBgColorInput.value);
        document.documentElement.style.setProperty('--color-text-primary', customTextColorInput.value);
        document.documentElement.style.setProperty('--color-bg-button', customAccentColorInput.value);
    }
    customBgColorInput.addEventListener('input', applyCustomColors);
    customTextColorInput.addEventListener('input', applyCustomColors);
    customAccentColorInput.addEventListener('input', applyCustomColors);


  // Create Channel Modal
  document.getElementById('create-channel-form').addEventListener('submit', handleCreateChannel);
  document.getElementById('cancel-create-channel').addEventListener('click', () => {
      document.getElementById('create-channel-modal').style.display = 'none';
  });

  // Server Options Dropdown
  const serverOptionsButton = document.getElementById('server-options-button');
  const serverOptionsDropdown = document.getElementById('server-options-dropdown');
  serverOptionsButton.addEventListener('click', (e) => {
      e.stopPropagation();
      serverOptionsDropdown.classList.toggle('hidden');
  });
  document.addEventListener('click', (e) => {
      if (!serverOptionsButton.contains(e.target)) {
          serverOptionsDropdown.classList.add('hidden');
      }
  });
  document.getElementById('leave-server-button').addEventListener('click', handleLeaveServer);
  document.getElementById('invite-button').addEventListener('click', () => {
      const modal = document.getElementById('invite-modal');
      const serverNameEl = document.getElementById('invite-server-name');
      const serverNameText = document.getElementById('server-name-text').textContent;
      serverNameEl.textContent = serverNameText;
      modal.style.display = 'flex';
  });
  document.getElementById('open-server-settings-button').addEventListener('click', () => {
    document.getElementById('server-settings-modal').style.display = 'flex';
  });


  // Invite Modal
  document.getElementById('invite-form').addEventListener('submit', handleInviteFriend);
  document.getElementById('cancel-invite-button').addEventListener('click', () => {
      document.getElementById('invite-modal').style.display = 'none';
  });

  // Server Settings Modal
  document.getElementById('close-server-settings-modal').addEventListener('click', () => {
      document.getElementById('server-settings-modal').style.display = 'none';
  });
  document.getElementById('server-overview-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const newName = document.getElementById('server-settings-name-input').value.trim();
      const statusEl = document.getElementById('server-settings-status');
      if (newName && activeServerId) {
          await db.collection('servers').doc(activeServerId).update({ name: newName });
          document.getElementById('server-name-text').textContent = newName;
          statusEl.textContent = 'Saved!';
          setTimeout(() => statusEl.textContent = '', 2000);
      }
  });

  // Roles Management
  document.getElementById('create-role-form').addEventListener('submit', handleCreateRole);
  
  const rolesList = document.getElementById('roles-list');
  if (rolesList) {
    rolesList.addEventListener('dragstart', (e) => {
        draggedRoleId = e.target.dataset.roleId;
        e.target.classList.add('role-dragging');
    });
    rolesList.addEventListener('dragend', (e) => {
        e.target.classList.remove('role-dragging');
        draggedRoleId = null;
    });
    rolesList.addEventListener('dragover', (e) => {
        e.preventDefault();
        const targetRoleEl = e.target.closest('[data-role-id]');
        if (targetRoleEl && targetRoleEl.dataset.roleId !== draggedRoleId) {
            const rect = targetRoleEl.getBoundingClientRect();
            const isAfter = e.clientY > rect.top + rect.height / 2;
            if (isAfter) {
                targetRoleEl.parentNode.insertBefore(document.querySelector(`[data-role-id="${draggedRoleId}"]`), targetRoleEl.nextSibling);
            } else {
                targetRoleEl.parentNode.insertBefore(document.querySelector(`[data-role-id="${draggedRoleId}"]`), targetRoleEl);
            }
        }
    });
    rolesList.addEventListener('drop', async (e) => {
        e.preventDefault();
        const newRoleOrder = Array.from(rolesList.children).map(el => el.dataset.roleId);
        await db.collection('servers').doc(activeServerId).update({ roleOrder: newRoleOrder });
    });
  }

  // Members Management (Role Assignment)
  document.getElementById('server-members-list').addEventListener('change', async (e) => {
      if (e.target.type === 'checkbox') {
          const userId = e.target.dataset.userid;
          const roleId = e.target.dataset.roleid;
          const memberRef = db.collection('servers').doc(activeServerId).collection('members').doc(userId);
          if (e.target.checked) {
              await memberRef.update({ roles: firebase.firestore.FieldValue.arrayUnion(roleId) });
          } else {
              await memberRef.update({ roles: firebase.firestore.FieldValue.arrayRemove(roleId) });
          }
      }
  });


  // Friend Management
  document.getElementById('add-friend-form').addEventListener('submit', handleAddFriend);

  // Messaging
  document.getElementById('message-form').addEventListener('submit', handleSendMessage);
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  sendButton.disabled = true;
  messageInput.addEventListener('input', () => {
    sendButton.disabled = !messageInput.value.trim() && !stagedFile;
  });

  // File Attachments
  document.getElementById('attach-file-button').addEventListener('click', () => {
      document.getElementById('file-upload-input').click();
  });
  document.getElementById('file-upload-input').addEventListener('change', handleFileSelect);
  document.getElementById('cancel-file-preview').addEventListener('click', cancelFilePreview);

  // Emoji Picker
  const emojiPicker = document.getElementById('emoji-picker');
  const emojiButton = document.getElementById('emoji-button');
  emojiPicker.innerHTML = EMOJIS.map(emoji => `<button class="text-2xl p-1 rounded-md hover:bg-gray-700">${emoji}</button>`).join('');
  
  emojiPicker.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
          messageInput.value += e.target.textContent;
          messageInput.focus();
          messageInput.dispatchEvent(new Event('input'));
      }
  });

  emojiButton.addEventListener('click', (e) => {
      e.stopPropagation();
      emojiPicker.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
      if (!emojiButton.contains(e.target)) {
          emojiPicker.classList.add('hidden');
      }
  });

   // Hide video call view when navigating away via ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const videoCallView = document.getElementById('video-call-view');
            // Don't hang up server calls, just hide the view
            if (activeServerCall) {
                videoCallView.style.display = 'none';
            }
        }
    });

});
