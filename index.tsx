
// Conflict App Logic (TypeScript)
declare const firebase: any;

export {};

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
// Icons
// =================================================================================
const ICONS = {
  HOME: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  PLUS: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  HASH: `<svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>`,
  VIDEO: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="m22 8-6 4 6 4V8z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>`,
  TRASH: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`,
  HANGUP: `<svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-6.13-6.13A19.79 19.79 0 0 1 2.06 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 2.64 3.4z"/></svg>`,
  COLLAPSE: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></svg>`,
  EXPAND: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>`
};

const DEFAULT_AVATAR_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%2330363d'/%3E%3Cpath d='M50 50a15 15 0 1 0 0-30 15 15 0 0 0 0 30zM20 80c0-15 15-20 30-20s30 5 30 20' fill='none' stroke='%23484f58' stroke-width='4'/%3E%3C/svg%3E";

// =================================================================================
// App State
// =================================================================================
let currentUser: any = null;
let activeView: 'home' | 'servers' = 'home';
let activeServerId: string | null = null;
let activeServerData: any = null;
let activeChannelId: string | null = null;

// Unsubscribes
let messageUnsubscribe = () => {};
let channelUnsubscribe = () => {};
let usersUnsubscribe = () => {};
let serversUnsubscribe = () => {};
let friendsUnsubscribe = () => {};
let incomingCallUnsubscribe = () => {};
let callSignalingUnsubscribe = () => {};

// WebRTC State
let pc: RTCPeerConnection | null = null;
let localStream: MediaStream | null = null;
let activeCallId: string | null = null;

const iceServers = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
  ],
  iceCandidatePoolSize: 10,
};

// =================================================================================
// UI Helpers
// =================================================================================
const getEl = (id: string) => document.getElementById(id);
const setDisplay = (id: string, style: string) => { const el = getEl(id); if (el) el.style.display = style; };
const isValidHttpUrl = (s: string) => { try { const u = new URL(s); return u.protocol === 'http:' || u.protocol === 'https:'; } catch (_) { return false; } };
const escapeHTML = (s: string) => s ? s.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m] || m)) : '';

const formatMessageText = (text: string) => {
  if (!text) return '';
  let esc = escapeHTML(text);
  return esc.replace(/```txt\n([\s\S]*?)\n```/g, (m, code) => `<pre class="bg-gray-900 p-3 rounded-xl text-xs font-mono text-gray-400 mt-2 border border-gray-700/50 shadow-inner"><code>${code}</code></pre>`);
};

// =================================================================================
// Rendering Functions
// =================================================================================

const renderUserInfo = () => {
  if (!currentUser) return;
  const avatarUrl = isValidHttpUrl(currentUser.photoURL) ? currentUser.photoURL : DEFAULT_AVATAR_SVG;
  const html = `
    <div class="relative mr-2 flex-shrink-0">
      <img src="${avatarUrl}" class="w-10 h-10 rounded-xl object-cover border border-gray-700 shadow-md"/>
      <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></div>
    </div>
    <div class="truncate min-w-0">
      <p class="text-[11px] font-black text-white truncate uppercase tracking-tighter">${currentUser.displayName}</p>
      <p class="text-[9px] text-gray-500 font-black uppercase tracking-widest leading-none">Online</p>
    </div>
  `;
  document.querySelectorAll('.user-info-panel').forEach(p => p.innerHTML = html);
  const friendCodeDisplay = getEl('friend-code-display');
  if (friendCodeDisplay) friendCodeDisplay.textContent = currentUser.uid;
};

const renderServers = (servers: any[]) => {
  const container = getEl('server-list-container');
  if (!container) return;
  container.innerHTML = '';
  
  const homeBtn = document.createElement('button');
  const isHomeActive = activeView === 'home';
  homeBtn.className = `w-12 h-12 flex items-center justify-center rounded-3xl transition-all duration-300 relative group ${isHomeActive ? 'bg-blue-500 rounded-2xl text-gray-900 shadow-xl' : 'bg-gray-800 text-gray-400 hover:bg-blue-500 hover:rounded-2xl hover:text-white'}`;
  homeBtn.innerHTML = ICONS.HOME;
  if (isHomeActive) {
    homeBtn.innerHTML += `<div class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-8 bg-white rounded-r-full shadow-lg"></div>`;
  }
  homeBtn.onclick = selectHome;
  container.appendChild(homeBtn);

  const divider = document.createElement('div');
  divider.className = "w-8 h-[2px] bg-gray-800 rounded-full my-1";
  container.appendChild(divider);

  servers.forEach(s => {
    const isActive = s.id === activeServerId;
    const iconUrl = isValidHttpUrl(s.iconUrl) ? s.iconUrl : DEFAULT_AVATAR_SVG;
    const btn = document.createElement('button');
    btn.className = `w-12 h-12 flex items-center justify-center rounded-3xl transition-all duration-300 overflow-hidden relative shadow-lg ${isActive ? 'rounded-2xl ring-2 ring-white ring-offset-2 ring-offset-gray-900' : 'hover:rounded-2xl'}`;
    btn.innerHTML = `<img src="${iconUrl}" class="w-full h-full object-cover" title="${escapeHTML(s.name)}"/>`;
    if (isActive) {
      btn.innerHTML += `<div class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-10 bg-white rounded-r-full shadow-lg"></div>`;
    }
    btn.onclick = () => selectServer(s.id);
    container.appendChild(btn);
  });

  const addBtn = document.createElement('button');
  addBtn.className = "w-12 h-12 flex items-center justify-center bg-gray-800 text-green-500 rounded-3xl hover:bg-green-500 hover:text-white transition-all duration-300 active:scale-95 shadow-lg";
  addBtn.innerHTML = ICONS.PLUS;
  addBtn.onclick = () => setDisplay('add-server-modal', 'flex');
  container.appendChild(addBtn);
};

const renderChannels = (server: any, channels: any[]) => {
  const list = getEl('channel-list');
  if (!list) return;
  const hasMod = activeServerData && activeServerData.owner === currentUser?.uid;
  list.innerHTML = `<div class="flex items-center justify-between px-2 pt-2 pb-1.5"><h2 class="text-[10px] font-black tracking-widest text-gray-500 uppercase">Text Channels</h2>${hasMod ? `<button id="add-channel-button" class="text-gray-500 hover:text-white transition active:scale-90">${ICONS.PLUS}</button>` : ''}</div>`;
  if (hasMod) {
    const btn = getEl('add-channel-button');
    if (btn) btn.onclick = () => setDisplay('create-channel-modal', 'flex');
  }
  channels.forEach(ch => {
    const isActive = ch.id === activeChannelId;
    const btn = document.createElement('button');
    btn.className = `group flex items-center w-full px-2 py-2 rounded-lg transition-all ${isActive ? 'bg-gray-700 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-700/50 hover:text-gray-300'}`;
    btn.innerHTML = `${ICONS.HASH}<span class="truncate text-xs font-bold uppercase tracking-tight">${ch.name}</span>`;
    btn.onclick = () => selectChannel(ch.id);
    list.appendChild(btn);
  });
};

const renderMessages = (messages: any[]) => {
  const list = getEl('message-list');
  if (!list) return;
  list.innerHTML = '';
  let lastUid = null;
  messages.forEach(m => {
    const isGrouped = m.user.uid === lastUid;
    const div = document.createElement('div');
    div.className = `group px-4 ${isGrouped ? 'py-0.5' : 'py-3 mt-2'} flex items-start hover:bg-gray-800/40 transition-colors`;
    const time = m.timestamp ? new Date(m.timestamp.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...';
    if (isGrouped) {
      div.innerHTML = `
        <div class="w-10 text-[9px] text-gray-600 font-black opacity-0 group-hover:opacity-100 flex-shrink-0 mt-1 select-none transition-opacity">${time}</div>
        <div class="flex-1 min-w-0 text-sm text-gray-300 leading-relaxed">${formatMessageText(m.text)}</div>
      `;
    } else {
      const avatar = isValidHttpUrl(m.user.photoURL) ? m.user.photoURL : DEFAULT_AVATAR_SVG;
      div.innerHTML = `
        <img src="${avatar}" class="w-10 h-10 rounded-xl object-cover mr-4 flex-shrink-0 border border-gray-800 shadow-sm" />
        <div class="flex-1 min-w-0">
          <div class="flex items-baseline space-x-2">
            <span class="text-[11px] font-black text-white uppercase tracking-tighter cursor-pointer hover:underline">${m.user.displayName}</span>
            <span class="text-[9px] text-gray-500 font-bold uppercase tracking-widest select-none">${time}</span>
          </div>
          <div class="text-sm text-gray-300 mt-0.5 leading-relaxed">${formatMessageText(m.text)}</div>
        </div>
      `;
    }
    if (m.user.uid === currentUser?.uid) {
      const del = document.createElement('button');
      del.className = "text-gray-700 hover:text-red-500 opacity-0 group-hover:opacity-100 ml-2 transition active:scale-90 flex-shrink-0";
      del.innerHTML = ICONS.TRASH;
      del.onclick = (e) => { e.stopPropagation(); deleteMessage(m.id); };
      div.appendChild(del);
    }
    list.appendChild(div);
    lastUid = m.user.uid;
  });
  list.scrollTop = list.scrollHeight;
};

// =================================================================================
// Signaling & Call Logic
// =================================================================================

const initPeerConnection = () => {
  pc = new RTCPeerConnection(iceServers);
  pc.ontrack = (event) => {
    const remoteVideo = getEl('remote-video') as HTMLVideoElement;
    if (remoteVideo) remoteVideo.srcObject = event.streams[0];
  };
};

const startCall = async (friend: any) => {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    const localVideo = getEl('local-video') as HTMLVideoElement;
    if (localVideo) localVideo.srcObject = localStream;

    initPeerConnection();
    localStream.getTracks().forEach((track) => pc!.addTrack(track, localStream!));

    const callDoc = db.collection('calls').doc();
    activeCallId = callDoc.id;

    // Write ICE candidates to Firestore
    pc!.onicecandidate = (event) => {
      event.candidate && callDoc.collection('callerCandidates').add(event.candidate.toJSON());
    };

    // Create offer
    const offerDescription = await pc!.createOffer();
    await pc!.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await callDoc.set({
      offer,
      status: 'ringing',
      caller: {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      },
      calleeId: friend.id,
    });

    showCallUI('outgoing', friend);

    // Listen for answer
    callSignalingUnsubscribe = callDoc.onSnapshot((snapshot: any) => {
      const data = snapshot.data();
      if (!pc!.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc!.setRemoteDescription(answerDescription);
        showCallUI('connected', friend);
      }
      if (data?.status === 'ended') {
        hangUpLocal();
      }
    });

    // Listen for remote ICE candidates
    callDoc.collection('calleeCandidates').onSnapshot((snapshot: any) => {
      snapshot.docChanges().forEach((change: any) => {
        if (change.type === 'added') {
          const data = change.doc.data();
          pc!.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });

  } catch (e) {
    console.error(e);
    alert("Call failed: Permission denied or connection error.");
  }
};

const answerCall = async (callId: string, caller: any) => {
  try {
    activeCallId = callId;
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    const localVideo = getEl('local-video') as HTMLVideoElement;
    if (localVideo) localVideo.srcObject = localStream;

    initPeerConnection();
    localStream.getTracks().forEach((track) => pc!.addTrack(track, localStream!));

    const callDoc = db.collection('calls').doc(callId);

    // Get offer
    const callData = (await callDoc.get()).data();
    const offerDescription = callData.offer;
    await pc!.setRemoteDescription(new RTCSessionDescription(offerDescription));

    // Handle candidates
    pc!.onicecandidate = (event) => {
      event.candidate && callDoc.collection('calleeCandidates').add(event.candidate.toJSON());
    };

    // Create answer
    const answerDescription = await pc!.createAnswer();
    await pc!.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await callDoc.update({ answer, status: 'connected' });

    // Listen for caller candidates
    callDoc.collection('callerCandidates').onSnapshot((snapshot: any) => {
      snapshot.docChanges().forEach((change: any) => {
        if (change.type === 'added') {
          const data = change.doc.data();
          pc!.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });

    // Listen for call end
    callSignalingUnsubscribe = callDoc.onSnapshot((snapshot: any) => {
      const data = snapshot.data();
      if (data?.status === 'ended') {
        hangUpLocal();
      }
    });

    showCallUI('connected', caller);
  } catch (e) {
    console.error(e);
    alert("Could not answer call.");
  }
};

const declineCall = async (callId: string) => {
  await db.collection('calls').doc(callId).update({ status: 'ended' });
  setDisplay('video-call-view', 'none');
};

const hangUp = async () => {
  if (activeCallId) {
    await db.collection('calls').doc(activeCallId).update({ status: 'ended' });
  }
  hangUpLocal();
};

const hangUpLocal = () => {
  if (pc) {
    pc.close();
    pc = null;
  }
  if (localStream) {
    localStream.getTracks().forEach(t => t.stop());
    localStream = null;
  }
  if (callSignalingUnsubscribe) {
    callSignalingUnsubscribe();
    callSignalingUnsubscribe = () => {};
  }
  activeCallId = null;
  setDisplay('video-call-view', 'none');
  setDisplay('local-video-container', 'none');
  const status = getEl('video-call-status');
  if (status) status.classList.remove('hidden');
};

const showCallUI = (type: string, peer: any) => {
  const view = getEl('video-call-view');
  const status = getEl('video-call-status');
  const controls = getEl('video-call-controls');
  if (!view || !status || !controls) return;

  view.classList.remove('hidden');
  const avatar = isValidHttpUrl(peer.photoURL) ? peer.photoURL : DEFAULT_AVATAR_SVG;

  if (type === 'incoming') {
    status.innerHTML = `
      <img src="${avatar}" class="w-24 h-24 rounded-3xl mb-6 shadow-2xl border-4 border-white/5 object-cover">
      <h3 class="text-2xl font-black text-white uppercase italic tracking-tighter">${peer.displayName} is calling...</h3>
    `;
    controls.style.display = 'flex';
    controls.innerHTML = `
      <button id="decline-btn" class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition shadow-2xl active:scale-90">${ICONS.HANGUP}</button>
      <button id="answer-btn" class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition shadow-2xl active:scale-90">
         <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-6.13-6.13A19.79 19.79 0 0 1 2.06 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      </button>
    `;
    getEl('decline-btn')!.onclick = () => declineCall(activeCallId!);
    getEl('answer-btn')!.onclick = () => answerCall(activeCallId!, peer);
  } else if (type === 'outgoing') {
    status.innerHTML = `
      <img src="${avatar}" class="w-24 h-24 rounded-3xl mb-6 animate-pulse shadow-2xl border-4 border-white/5 object-cover">
      <h3 class="text-2xl font-black text-white uppercase italic tracking-tighter">Calling ${peer.displayName}...</h3>
    `;
    controls.style.display = 'flex';
    controls.innerHTML = `<button id="hang-up-button" class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition shadow-2xl active:scale-90">${ICONS.HANGUP}</button>`;
    getEl('hang-up-button')!.onclick = hangUp;
  } else if (type === 'connected') {
    status.classList.add('hidden');
    setDisplay('local-video-container', 'block');
    controls.style.display = 'flex';
    controls.innerHTML = `
      <button id="hang-up-button" class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition shadow-2xl active:scale-90">${ICONS.HANGUP}</button>
    `;
    getEl('hang-up-button')!.onclick = hangUp;
  }
};

const listenForCalls = () => {
  if (!currentUser) return;
  if (incomingCallUnsubscribe) incomingCallUnsubscribe();
  incomingCallUnsubscribe = db.collection('calls')
    .where('calleeId', '==', currentUser.uid)
    .where('status', '==', 'ringing')
    .onSnapshot((snapshot: any) => {
      snapshot.docChanges().forEach((change: any) => {
        if (change.type === 'added') {
          const callData = change.doc.data();
          activeCallId = change.doc.id;
          showCallUI('incoming', callData.caller);
        }
      });
    });
};

// =================================================================================
// Message & Core logic
// =================================================================================

const deleteMessage = async (msgId: string) => {
  if (!confirm("Delete this message?")) return;
  const ref = activeServerId 
    ? db.collection('servers').doc(activeServerId).collection('channels').doc(activeChannelId!).collection('messages').doc(msgId)
    : db.collection('dms').doc(activeChannelId!).collection('messages').doc(msgId);
  await ref.delete();
};

const handleSendMessage = async (e: Event) => {
  e.preventDefault();
  const input = getEl('message-input') as HTMLInputElement;
  const text = input.value.trim();
  if (!text) return;
  const msg = {
    text,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    user: { uid: currentUser.uid, displayName: currentUser.displayName, photoURL: currentUser.photoURL }
  };
  input.value = '';
  const ref = activeServerId 
    ? db.collection('servers').doc(activeServerId).collection('channels').doc(activeChannelId!).collection('messages')
    : db.collection('dms').doc(activeChannelId!).collection('messages');
  await ref.add(msg);
};

const selectHome = async () => {
  activeView = 'home';
  activeServerId = null;
  activeChannelId = null;
  setDisplay('home-view', 'flex');
  setDisplay('channel-list-panel', 'none');
  setDisplay('chat-view', 'none');
  setDisplay('placeholder-view', 'flex');
  loadFriends();
  loadServers();
};

const selectServer = async (serverId: string) => {
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
  usersUnsubscribe = serverRef.onSnapshot((doc: any) => {
    if (doc.exists) {
      activeServerData = doc.data();
      const textEl = getEl('server-name-text');
      if (textEl) textEl.textContent = activeServerData.name;
      loadServers();
    }
  });
  channelUnsubscribe = serverRef.collection('channels').orderBy('name').onSnapshot((snap: any) => {
    const channels = snap.docs.map((d: any) => ({ id: d.id, ...d.data() }));
    renderChannels(activeServerData, channels);
    if (!activeChannelId && channels.length > 0) selectChannel(channels[0].id);
  });
};

const selectChannel = (channelId: string) => {
  activeChannelId = channelId;
  if (messageUnsubscribe) messageUnsubscribe();
  setDisplay('placeholder-view', 'none');
  setDisplay('chat-view', 'flex');
  const channelRef = db.collection('servers').doc(activeServerId!).collection('channels').doc(channelId);
  channelRef.get().then((doc: any) => {
    if (doc.exists) {
      const header = getEl('chat-header');
      if (header) header.innerHTML = `<div class="flex items-center space-x-2 text-gray-500">${ICONS.HASH}<h2 class="font-black text-white text-xs uppercase italic tracking-tighter">${doc.data().name}</h2></div>`;
    }
  });
  messageUnsubscribe = channelRef.collection('messages').orderBy('timestamp', 'asc').limitToLast(100).onSnapshot((snap: any) => {
    renderMessages(snap.docs.map((d: any) => ({ id: d.id, ...d.data() })));
  });
};

const selectDmChannel = async (friend: any) => {
  activeChannelId = [currentUser.uid, friend.id].sort().join('_');
  if (messageUnsubscribe) messageUnsubscribe();
  setDisplay('placeholder-view', 'none');
  setDisplay('chat-view', 'flex');
  const avatar = isValidHttpUrl(friend.photoURL) ? friend.photoURL : DEFAULT_AVATAR_SVG;
  const header = getEl('chat-header');
  if (header) {
    header.innerHTML = `
      <div class="flex items-center">
        <div class="relative mr-3 flex-shrink-0">
          <img src="${avatar}" class="w-8 h-8 rounded-lg object-cover border border-gray-900 shadow-md" />
          <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-600'} border-2 border-gray-900 rounded-full"></div>
        </div>
        <h2 class="font-black text-white text-xs uppercase italic tracking-tighter">${friend.displayName}</h2>
      </div>
      <button id="start-call-button" class="ml-auto text-gray-500 hover:text-white transition active:scale-90 p-2 rounded-lg hover:bg-gray-700/50">${ICONS.VIDEO}</button>
    `;
    const callBtn = getEl('start-call-button');
    if (callBtn) callBtn.onclick = () => startCall(friend);
  }
  messageUnsubscribe = db.collection('dms').doc(activeChannelId).collection('messages').orderBy('timestamp', 'asc').limitToLast(100).onSnapshot((snap: any) => {
    renderMessages(snap.docs.map((d: any) => ({ id: d.id, ...d.data() })));
  });
};

const loadFriends = () => {
  if (!currentUser) return;
  friendsUnsubscribe = db.collection('users').doc(currentUser.uid).onSnapshot(async (doc: any) => {
    if (doc.exists) {
      const friendIds = doc.data().friends || [];
      if (friendIds.length > 0) {
        const snap = await db.collection('users').where(firebase.firestore.FieldPath.documentId(), 'in', friendIds).get();
        renderFriends(snap.docs.map((d: any) => ({ id: d.id, ...d.data() })));
      } else renderFriends([]);
    }
  });
};

const renderFriends = (friends: any[]) => {
  const list = getEl('friend-list');
  if (!list) return;
  list.innerHTML = `<h2 class="text-[10px] font-black text-gray-500 uppercase px-3 py-3 tracking-widest">Direct Messages</h2>`;
  friends.forEach(f => {
    const btn = document.createElement('button');
    btn.className = "flex items-center w-full px-2 py-2 rounded-lg text-gray-500 hover:bg-gray-700/50 hover:text-gray-300 transition-all";
    const avatar = isValidHttpUrl(f.photoURL) ? f.photoURL : DEFAULT_AVATAR_SVG;
    btn.innerHTML = `
      <div class="relative mr-2 flex-shrink-0">
        <img src="${avatar}" class="w-8 h-8 rounded-lg object-cover border border-gray-900 shadow-sm" />
        <div class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 ${f.status === 'online' ? 'bg-green-500' : 'bg-gray-600'} border-2 border-gray-800 rounded-full"></div>
      </div>
      <span class="text-xs font-bold truncate uppercase tracking-tighter">${f.displayName}</span>
    `;
    btn.onclick = () => selectDmChannel(f);
    list.appendChild(btn);
  });
};

const loadServers = () => {
  if (!currentUser) return;
  if (serversUnsubscribe) serversUnsubscribe();
  serversUnsubscribe = db.collection('servers').where('members', 'array-contains', currentUser.uid).onSnapshot((snap: any) => {
    renderServers(snap.docs.map((d: any) => ({ id: d.id, ...d.data() })));
  });
};

auth.onAuthStateChanged(async (user: any) => {
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
    renderUserInfo();
    selectHome();
    listenForCalls();
  } else {
    currentUser = null;
    setDisplay('login-view', 'flex');
    setDisplay('app-view', 'none');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  getEl('login-button')!.onclick = () => auth.signInWithPopup(provider);
  getEl('message-form')!.onsubmit = handleSendMessage;
  getEl('add-server-form')!.onsubmit = async (e) => {
    e.preventDefault();
    const nameInput = getEl('server-name-input') as HTMLInputElement;
    const name = nameInput.value.trim();
    if (!name || !currentUser) return;
    const ref = await db.collection('servers').add({ name, owner: currentUser.uid, members: [currentUser.uid], iconUrl: DEFAULT_AVATAR_SVG, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    await ref.collection('channels').add({ name: 'general' });
    nameInput.value = '';
    setDisplay('add-server-modal', 'none');
    selectServer(ref.id);
  };
  getEl('join-server-form')!.onsubmit = async (e) => {
    e.preventDefault();
    const codeInput = getEl('join-server-input') as HTMLInputElement;
    const code = codeInput.value.trim();
    if (!code || !currentUser) return;
    const serverRef = db.collection('servers').doc(code);
    const doc = await serverRef.get();
    if (doc.exists) {
      await serverRef.update({ members: firebase.firestore.FieldValue.arrayUnion(currentUser.uid) });
      codeInput.value = '';
      setDisplay('add-server-modal', 'none');
      selectServer(code);
    } else {
      alert("Invalid Room Code.");
    }
  };
  getEl('cancel-add-server')!.onclick = () => setDisplay('add-server-modal', 'none');
  getEl('leave-server-button')!.onclick = async () => {
    if (!activeServerId || !currentUser) return;
    if (!confirm("Leave this room?")) return;
    await db.collection('servers').doc(activeServerId).update({ members: firebase.firestore.FieldValue.arrayRemove(currentUser.uid) });
    selectHome();
  };
  getEl('server-options-button')!.onclick = (e) => { e.stopPropagation(); getEl('server-options-dropdown')?.classList.toggle('hidden'); };
  getEl('toggle-home-panel-button')!.onclick = () => {
    const hv = getEl('home-view')!;
    const isMin = hv.classList.contains('w-16');
    hv.classList.toggle('w-60', isMin);
    hv.classList.toggle('w-16', !isMin);
    getEl('home-view-title')!.classList.toggle('hidden', !isMin);
    getEl('home-view-content')!.classList.toggle('hidden', !isMin);
    getEl('toggle-home-panel-button')!.innerHTML = isMin ? ICONS.COLLAPSE : ICONS.EXPAND;
  };
  document.addEventListener('click', () => getEl('server-options-dropdown')?.classList.add('hidden'));
});
