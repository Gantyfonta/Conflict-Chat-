
// Conflict App Logic
const firebaseConfig = {
  apiKey: "AIzaSyCvxyd9Q37Zu4wMv-dGhcrom-En2Ja9n0o",
  authDomain: "chat-8c7f5.firebaseapp.com",
  projectId: "chat-8c7f5",
  storageBucket: "chat-8c7f5.appspot.com",
  messagingSenderId: "566550384400",
  appId: "1:566550384400:web:6438e3fb134edfc6649f95",
  measurementId: "G-ZV55RSVRX6"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

// =================================================================================
// Icons (Lucide-style / Consistency-focused)
// =================================================================================
const ICON_HOME = `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>`;
const ICON_PLUS = `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>`;
const ICON_HASH = `<svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/></svg>`;
const ICON_SPEAKER = `<svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 5 6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;
const ICON_VIDEO = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m22 8-6 4 6 4V8z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>`;
const ICON_TRASH = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>`;
const ICON_X = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>`;
const MIC_ON_SVG = `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8"/></svg>`;
const MIC_OFF_SVG = `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18.89 12a7 7 0 0 1-1.39 3.66M15 15a7 7 0 0 1-8.14-3.66M12 19v3M8 22h8M1 1l22 22M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V5a3 3 0 0 0-5.94-.6"/></svg>`;
const CAM_ON_SVG = `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m22 8-6 4 6 4V8z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>`;
const CAM_OFF_SVG = `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m16 16 6 4V4l-6 4M7 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v12M1 1l22 22"/></svg>`;
const HANGUP_SVG = `<svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-6.13-6.13A19.79 19.79 0 0 1 2.06 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 2.64 3.4z"/></svg>`;
const SCREEN_SHARE_ON_SVG = `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M12 17v4M8 21h8M12 13l-4-4M12 13l4-4M12 13V7"/></svg>`;
const COLLAPSE_SVG = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m11 17-5-5 5-5M18 17l-5-5 5-5"/></svg>`;
const EXPAND_SVG = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m13 17 5-5-5-5M6 17l5-5-5-5"/></svg>`;
const DEFAULT_AVATAR_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%2330363d'/%3E%3C/svg%3E";

// =================================================================================
// App State
// =================================================================================
let currentUser = null;
let activeView = 'servers';
let activeServerId = null;
let activeServerData = null;
let activeChannelId = null;
let activeServerRoles = {};
let activeServerRoleOrder = [];
let activeServerMembers = {};
let activeServerUserProfiles = {};
let stagedFile = null;
let draggedRoleId = null;
let unreadChannels = new Set();
let unreadDms = new Set();
let lastSeenTimestamps = {};

// Listeners
let messageUnsubscribe = () => {};
let channelUnsubscribe = () => {};
let usersUnsubscribe = () => {};
let serversUnsubscribe = () => {};
let friendsUnsubscribe = () => {};
let callListenerUnsubscribe = () => {};
let currentCallUnsubscribe = () => {};
let invitationsUnsubscribe = () => {};
let callerCandidatesUnsubscribe = () => {};
let calleeCandidatesUnsubscribe = () => {};

// WebRTC State
let peerConnection;
let localStream;
let remoteStream = new MediaStream();
let activeCallData = null;
let isScreenSharing = false;
let screenStream = null;
const iceServers = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:stun1.l.google.com:19302' }] };

// =================================================================================
// UI Helpers
// =================================================================================
const getEl = (id) => document.getElementById(id);
const setDisplay = (id, style) => { const el = getEl(id); if (el) el.style.display = style; };
const isValidHttpUrl = (s) => { try { const u = new URL(s); return u.protocol === 'http:' || u.protocol === 'https:'; } catch (_) { return false; } };
const escapeHTML = (s) => s ? s.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m] || m)) : '';

const formatMessageText = (text) => {
    if (!text) return '';
    let esc = escapeHTML(text);
    return esc.replace(/```txt\n([\s\S]*?)\n```/g, (m, code) => `<pre class="bg-gray-900 p-2 rounded-md text-xs font-mono text-gray-300 mt-2"><code>${code}</code></pre>`);
};

// =================================================================================
// Rendering Functions
// =================================================================================

const renderUserInfo = () => {
    if (!currentUser) return;
    const avatarUrl = isValidHttpUrl(currentUser.photoURL) ? currentUser.photoURL : DEFAULT_AVATAR_SVG;
    const html = `
        <div class="relative mr-2 flex-shrink-0">
            <img src="${avatarUrl}" class="w-10 h-10 rounded-xl object-cover border border-gray-700"/>
            <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></div>
        </div>
        <div class="truncate min-w-0">
            <p class="text-xs font-black text-white truncate uppercase tracking-tighter">${currentUser.displayName}</p>
            <p class="text-[9px] text-gray-500 font-bold uppercase">Online</p>
        </div>
    `;
    document.querySelectorAll('.user-info-panel').forEach(p => p.innerHTML = html);
};

const renderServers = (servers) => {
    const container = getEl('server-list-container');
    if (!container) return;
    container.innerHTML = '';
    
    // Home Button
    const homeBtn = document.createElement('button');
    const isHomeActive = activeView === 'home';
    homeBtn.className = `w-12 h-12 flex items-center justify-center rounded-3xl transition-all ${isHomeActive ? 'bg-blue-500 rounded-2xl text-gray-900 shadow-xl' : 'bg-gray-800 text-gray-400 hover:bg-blue-500 hover:rounded-2xl hover:text-white'}`;
    homeBtn.innerHTML = ICON_HOME;
    homeBtn.onclick = selectHome;
    container.appendChild(homeBtn);

    const divider = document.createElement('div');
    divider.className = "w-8 h-[2px] bg-gray-800 rounded-full";
    container.appendChild(divider);

    servers.forEach(s => {
        const isActive = s.id === activeServerId;
        const iconUrl = isValidHttpUrl(s.iconUrl) ? s.iconUrl : DEFAULT_AVATAR_SVG;
        const btn = document.createElement('button');
        btn.className = `w-12 h-12 flex items-center justify-center rounded-3xl transition-all overflow-hidden relative ${isActive ? 'ring-2 ring-white rounded-2xl' : 'hover:rounded-2xl'}`;
        btn.innerHTML = `<img src="${iconUrl}" class="w-full h-full object-cover" title="${escapeHTML(s.name)}"/>`;
        if (s.hasUnread && !isActive) {
            btn.innerHTML += `<div class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-4 bg-white rounded-r-full"></div>`;
        }
        btn.onclick = () => selectServer(s.id);
        container.appendChild(btn);
    });

    const addBtn = document.createElement('button');
    addBtn.className = "w-12 h-12 flex items-center justify-center bg-gray-800 text-green-500 rounded-3xl hover:bg-green-500 hover:text-white transition-all";
    addBtn.innerHTML = ICON_PLUS;
    addBtn.onclick = () => setDisplay('add-server-modal', 'flex');
    container.appendChild(addBtn);
};

const renderChannels = (server, channels) => {
    const list = getEl('channel-list');
    if (!list) return;
    const hasMod = currentUserHasModPermissions();
    list.innerHTML = `<div class="flex items-center justify-between px-2 pt-2 pb-1"><h2 class="text-[10px] font-black tracking-widest text-gray-500 uppercase">Text Channels</h2>${hasMod ? `<button id="add-channel-button" class="text-gray-500 hover:text-white">${ICON_PLUS}</button>` : ''}</div>`;
    
    if (hasMod) {
        getEl('add-channel-button').onclick = () => setDisplay('create-channel-modal', 'flex');
    }
    
    channels.forEach(ch => {
        const isActive = ch.id === activeChannelId;
        const btn = document.createElement('button');
        btn.className = `group flex items-center w-full px-2 py-1.5 rounded transition-all ${isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-300'}`;
        btn.innerHTML = `${ICON_HASH}<span class="truncate text-xs font-bold font-mono">${ch.name}</span>`;
        btn.onclick = () => selectChannel(ch.id);
        list.appendChild(btn);
    });
};

const renderMessages = (messages) => {
    const list = getEl('message-list');
    if (!list) return;
    list.innerHTML = '';
    
    let lastUid = null;
    messages.forEach(m => {
        if (currentUser.blockedUsers?.includes(m.user.uid)) return;
        
        const isGrouped = m.user.uid === lastUid;
        const div = document.createElement('div');
        div.className = `group px-4 ${isGrouped ? 'py-0.5' : 'py-2 mt-2'} flex items-start hover:bg-gray-800/40 transition`;
        const time = m.timestamp ? new Date(m.timestamp.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...';
        
        if (isGrouped) {
            div.innerHTML = `
                <div class="w-10 text-[9px] text-gray-500 font-bold opacity-0 group-hover:opacity-100 flex-shrink-0 mt-1">${time}</div>
                <div class="flex-1 min-w-0 text-sm text-gray-300">${formatMessageText(m.text)}</div>
            `;
        } else {
            const avatar = isValidHttpUrl(m.user.photoURL) ? m.user.photoURL : DEFAULT_AVATAR_SVG;
            div.innerHTML = `
                <img src="${avatar}" class="w-10 h-10 rounded-lg object-cover mr-4 flex-shrink-0 border border-gray-800" />
                <div class="flex-1 min-w-0">
                    <div class="flex items-baseline space-x-2">
                        <span class="text-xs font-black text-white uppercase tracking-tighter">${m.user.displayName}</span>
                        <span class="text-[9px] text-gray-500 font-bold">${time}</span>
                    </div>
                    <div class="text-sm text-gray-300 mt-0.5">${formatMessageText(m.text)}</div>
                </div>
            `;
        }
        
        if (m.user.uid === currentUser.uid) {
            const del = document.createElement('button');
            del.className = "text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 ml-2 transition";
            del.innerHTML = ICON_TRASH;
            del.onclick = () => deleteMessage(m.id);
            div.appendChild(del);
        }
        
        list.appendChild(div);
        lastUid = m.user.uid;
    });
    list.scrollTop = list.scrollHeight;
};

// =================================================================================
// Core logic handlers
// =================================================================================

const selectHome = async () => {
    await hangUp();
    activeView = 'home';
    activeServerId = null;
    activeChannelId = null;
    setDisplay('home-view', 'flex');
    setDisplay('channel-list-panel', 'none');
    setDisplay('chat-view', 'none');
    setDisplay('placeholder-view', 'flex');
    loadFriends();
    renderServers([]); // Re-render triggers server loading
    loadServers();
};

const selectServer = async (serverId) => {
    if (activeServerId === serverId && activeView === 'servers') return;
    await hangUp();
    activeView = 'servers';
    activeServerId = serverId;
    activeChannelId = null;
    
    setDisplay('home-view', 'none');
    setDisplay('channel-list-panel', 'flex');
    setDisplay('chat-view', 'none');
    setDisplay('placeholder-view', 'flex');

    if (usersUnsubscribe) usersUnsubscribe();
    if (channelUnsubscribe) channelUnsubscribe();

    const serverRef = db.collection('servers').doc(serverId);
    usersUnsubscribe = serverRef.onSnapshot(doc => {
        if (doc.exists) {
            activeServerData = doc.data();
            getEl('server-name-text').textContent = activeServerData.name;
            getEl('open-server-settings-button').classList.toggle('hidden', !currentUserHasModPermissions());
        }
    });

    channelUnsubscribe = serverRef.collection('channels').orderBy('name').onSnapshot(snap => {
        const channels = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        renderChannels(activeServerData, channels);
        if (!activeChannelId && channels.length > 0) selectChannel(channels[0].id);
    });
};

const selectChannel = (channelId) => {
    activeChannelId = channelId;
    if (messageUnsubscribe) messageUnsubscribe();
    
    setDisplay('placeholder-view', 'none');
    setDisplay('chat-view', 'flex');
    
    const channelRef = db.collection('servers').doc(activeServerId).collection('channels').doc(channelId);
    channelRef.get().then(doc => {
        if (doc.exists) {
            getEl('chat-header').innerHTML = `<div class="flex items-center space-x-2">${ICON_HASH}<h2 class="font-black text-white text-xs uppercase italic">${doc.data().name}</h2></div>`;
        }
    });

    messageUnsubscribe = channelRef.collection('messages').orderBy('timestamp', 'asc').limitToLast(100).onSnapshot(snap => {
        renderMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
};

const loadFriends = () => {
    friendsUnsubscribe = db.collection('users').doc(currentUser.uid).onSnapshot(async doc => {
        if (doc.exists) {
            const friendIds = doc.data().friends || [];
            if (friendIds.length > 0) {
                const snap = await db.collection('users').where(firebase.firestore.FieldPath.documentId(), 'in', friendIds).get();
                renderFriends(snap.docs.map(d => ({ id: d.id, ...d.data() })));
            } else renderFriends([]);
        }
    });
};

const renderFriends = (friends) => {
    const list = getEl('friend-list');
    if (!list) return;
    list.innerHTML = `<h2 class="text-[10px] font-black text-gray-500 uppercase px-2 py-2">Friends — ${friends.length}</h2>`;
    friends.forEach(f => {
        const btn = document.createElement('button');
        btn.className = "flex items-center w-full px-2 py-1.5 rounded text-gray-400 hover:bg-gray-700/50 transition";
        const avatar = isValidHttpUrl(f.photoURL) ? f.photoURL : DEFAULT_AVATAR_SVG;
        btn.innerHTML = `
            <div class="relative mr-2">
                <img src="${avatar}" class="w-8 h-8 rounded-lg object-cover" />
                <div class="absolute -bottom-1 -right-1 w-2.5 h-2.5 ${f.status === 'online' ? 'bg-green-500' : 'bg-gray-500'} border-2 border-gray-800 rounded-full"></div>
            </div>
            <span class="text-xs font-bold truncate">${f.displayName}</span>
        `;
        btn.onclick = () => selectDmChannel(f);
        list.appendChild(btn);
    });
};

const selectDmChannel = async (friend) => {
    await hangUp();
    activeChannelId = [currentUser.uid, friend.id].sort().join('_');
    if (messageUnsubscribe) messageUnsubscribe();
    
    setDisplay('placeholder-view', 'none');
    setDisplay('chat-view', 'flex');
    
    const avatar = isValidHttpUrl(friend.photoURL) ? friend.photoURL : DEFAULT_AVATAR_SVG;
    getEl('chat-header').innerHTML = `
        <div class="flex items-center">
            <div class="relative mr-2">
                <img src="${avatar}" class="w-7 h-7 rounded-lg object-cover" />
                <div class="absolute -bottom-1 -right-1 w-2 h-2 ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-500'} border border-gray-900 rounded-full"></div>
            </div>
            <h2 class="font-black text-white text-xs uppercase italic">${friend.displayName}</h2>
        </div>
        <button id="start-call-button" class="ml-auto text-gray-500 hover:text-white transition">${ICON_VIDEO}</button>
    `;
    getEl('start-call-button').onclick = () => startCall(friend);

    messageUnsubscribe = db.collection('dms').doc(activeChannelId).collection('messages').orderBy('timestamp', 'asc').limitToLast(100).onSnapshot(snap => {
        renderMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
};

// =================================================================================
// Call UI
// =================================================================================

const showCallUI = (type, peer) => {
    const view = getEl('video-call-view');
    const status = getEl('video-call-status');
    const controls = getEl('video-call-controls');
    view.classList.remove('hidden');
    
    const avatar = isValidHttpUrl(peer.photoURL) ? peer.photoURL : DEFAULT_AVATAR_SVG;

    if (type === 'outgoing') {
        status.innerHTML = `
            <img src="${avatar}" class="w-20 h-20 rounded-2xl mb-4 animate-pulse shadow-2xl border border-gray-700">
            <h3 class="text-xl font-black text-white uppercase italic tracking-tighter">Calling ${peer.displayName}</h3>
        `;
        controls.style.display = 'flex';
        controls.innerHTML = `<button id="hang-up-button" class="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition shadow-xl">${HANGUP_SVG}</button>`;
        getEl('hang-up-button').onclick = hangUp;
    } else if (type === 'incoming') {
        status.innerHTML = `
            <img src="${avatar}" class="w-20 h-20 rounded-2xl mb-4 shadow-2xl border border-gray-700">
            <h3 class="text-xl font-black text-white uppercase italic tracking-tighter">${peer.displayName} is calling</h3>
        `;
        controls.style.display = 'flex';
        controls.innerHTML = `
            <button id="decline-call-button" class="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition shadow-xl">${HANGUP_SVG}</button>
            <button id="answer-call-button" class="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition shadow-xl">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-6.13-6.13A19.79 19.79 0 0 1 2.06 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </button>
        `;
        getEl('decline-call-button').onclick = declineCall;
        getEl('answer-call-button').onclick = answerCall;
    } else if (type === 'connected') {
        status.classList.add('hidden');
        getEl('local-video-container').style.display = 'block';
        controls.style.display = 'flex';
        controls.innerHTML = `
            <button id="toggle-mic-button" class="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition">${MIC_ON_SVG}</button>
            <button id="toggle-camera-button" class="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition">${CAM_ON_SVG}</button>
            <button id="toggle-screen-share-button" class="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition">${SCREEN_SHARE_ON_SVG}</button>
            <button id="hang-up-button" class="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition shadow-xl">${HANGUP_SVG}</button>
        `;
        getEl('hang-up-button').onclick = hangUp;
    }
};

const hangUp = async () => {
    if (peerConnection) peerConnection.close();
    if (localStream) localStream.getTracks().forEach(t => t.stop());
    peerConnection = null;
    localStream = null;
    getEl('video-call-view').classList.add('hidden');
    getEl('video-call-status').classList.remove('hidden');
    getEl('local-video-container').style.display = 'none';
};

const startCall = async (friend) => {
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    getEl('local-video').srcObject = localStream;
    showCallUI('outgoing', friend);
};

const declineCall = () => hangUp();
const answerCall = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    getEl('local-video').srcObject = localStream;
    showCallUI('connected', { displayName: 'Peer' });
};

// =================================================================================
// Message Actions
// =================================================================================

const deleteMessage = async (msgId) => {
    if (!confirm("Delete this message?")) return;
    let ref;
    if (activeServerId) {
        ref = db.collection('servers').doc(activeServerId).collection('channels').doc(activeChannelId).collection('messages').doc(msgId);
    } else {
        ref = db.collection('dms').doc(activeChannelId).collection('messages').doc(msgId);
    }
    await ref.delete();
};

const handleSendMessage = async (e) => {
    e.preventDefault();
    const input = getEl('message-input');
    const text = input.value.trim();
    if (!text && !stagedFile) return;

    const msg = {
        text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: { uid: currentUser.uid, displayName: currentUser.displayName, photoURL: currentUser.photoURL }
    };

    input.value = '';
    if (activeServerId) {
        await db.collection('servers').doc(activeServerId).collection('channels').doc(activeChannelId).collection('messages').add(msg);
    } else {
        await db.collection('dms').doc(activeChannelId).collection('messages').add(msg);
    }
};

// =================================================================================
// Initialization & Listeners
// =================================================================================

const loadServers = () => {
    serversUnsubscribe = db.collection('servers').where('members', 'array-contains', currentUser.uid).onSnapshot(snap => {
        const servers = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        renderServers(servers);
    });
};

const currentUserHasModPermissions = () => {
    if (!activeServerData || !currentUser) return false;
    return activeServerData.owner === currentUser.uid;
};

auth.onAuthStateChanged(async (user) => {
    if (user) {
        currentUser = user;
        const uref = db.collection('users').doc(user.uid);
        const udoc = await uref.get();
        if (!udoc.exists) {
            const dn = user.displayName || user.email.split('@')[0];
            const p = user.photoURL || DEFAULT_AVATAR_SVG;
            await uref.set({ displayName: dn, photoURL: p, status: 'online', friends: [] });
        } else {
            await uref.update({ status: 'online' });
        }
        setDisplay('login-view', 'none');
        setDisplay('app-view', 'flex');
        getEl('friend-code-display').textContent = user.uid;
        renderUserInfo();
        selectHome();
    } else {
        currentUser = null;
        setDisplay('login-view', 'flex');
        setDisplay('app-view', 'none');
    }
});

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    getEl('login-button').onclick = () => auth.signInWithPopup(provider);
    getEl('message-form').onsubmit = handleSendMessage;
    getEl('signup-form').onsubmit = async (e) => {
        e.preventDefault();
        const email = getEl('signup-email').value;
        const pass = getEl('signup-password').value;
        await auth.createUserWithEmailAndPassword(email, pass);
    };
    getEl('signin-form').onsubmit = async (e) => {
        e.preventDefault();
        const email = getEl('signin-email').value;
        const pass = getEl('signin-password').value;
        await auth.signInWithEmailAndPassword(email, pass);
    };
    getEl('show-signin-link').onclick = () => { setDisplay('signup-form', 'none'); setDisplay('signin-form', 'block'); };
    getEl('show-signup-link').onclick = () => { setDisplay('signin-form', 'none'); setDisplay('signup-form', 'block'); };
    getEl('server-options-button').onclick = (e) => { e.stopPropagation(); getEl('server-options-dropdown').classList.toggle('hidden'); };
    getEl('toggle-home-panel-button').innerHTML = COLLAPSE_SVG;
    getEl('toggle-home-panel-button').onclick = () => {
        const hv = getEl('home-view');
        const isMin = hv.classList.contains('w-16');
        hv.classList.toggle('w-60', isMin);
        hv.classList.toggle('w-16', !isMin);
        getEl('home-view-title').classList.toggle('hidden', !isMin);
        getEl('home-view-content').classList.toggle('hidden', !isMin);
        getEl('toggle-home-panel-button').innerHTML = isMin ? COLLAPSE_SVG : EXPAND_SVG;
    };
    document.querySelectorAll('.settings-button').forEach(b => b.onclick = () => setDisplay('settings-modal', 'flex'));
    getEl('close-settings-modal').onclick = () => setDisplay('settings-modal', 'none');
    getEl('close-my-profile-modal').onclick = () => setDisplay('my-profile-modal', 'none');
    getEl('add-server-form').onsubmit = async (e) => {
        e.preventDefault();
        const name = getEl('server-name-input').value;
        const ref = await db.collection('servers').add({ name, owner: currentUser.uid, members: [currentUser.uid], iconUrl: DEFAULT_AVATAR_SVG });
        await ref.collection('channels').add({ name: 'general' });
        getEl('server-name-input').value = '';
        setDisplay('add-server-modal', 'none');
        selectServer(ref.id);
    };
    getEl('cancel-add-server').onclick = () => setDisplay('add-server-modal', 'none');
});
