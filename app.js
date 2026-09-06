// Infinity AI Master App Controller

document.addEventListener('DOMContentLoaded', () => {
    // --- Application State ---
    let state = {
        activePersona: 'general',
        activeModel: 'infinity-free',
        activeTools: {
            web_search: true,
            image_gen: true,
            code_runner: true,
            math_solver: true
        },
        apiKeys: JSON.parse(localStorage.getItem('infinity_keys') || '{"gemini":"","groq":"","openai":""}'),
        temperature: parseFloat(localStorage.getItem('infinity_temp') || '0.7'),
        sessions: JSON.parse(localStorage.getItem('infinity_sessions') || '[]'),
        activeSessionId: null,
        ttsAutoPlay: false,
        theme: localStorage.getItem('infinity_theme') || 'dark',
        isProcessing: false
    };

    // --- DOM Element References ---
    const elements = {
        bgCanvas: document.getElementById('bgCanvas'),
        sidebar: document.getElementById('sidebar'),
        sidebarOverlay: document.getElementById('sidebarOverlay'),
        openSidebarMobile: document.getElementById('openSidebarMobile'),
        closeSidebarMobile: document.getElementById('closeSidebarMobile'),
        newChatBtn: document.getElementById('newChatBtn'),
        personaSelector: document.getElementById('personaSelector'),
        chatHistoryList: document.getElementById('chatHistoryList'),
        modelDropdownBtn: document.getElementById('modelDropdownBtn'),
        modelDropdownMenu: document.getElementById('modelDropdownMenu'),
        currentModelLabel: document.getElementById('currentModelLabel'),
        openKeyConfigBtn: document.getElementById('openKeyConfigBtn'),
        openSettingsBtn: document.getElementById('openSettingsBtn'),
        settingsModal: document.getElementById('settingsModal'),
        closeSettingsBtn: document.getElementById('closeSettingsBtn'),
        saveSettingsBtn: document.getElementById('saveSettingsBtn'),
        geminiApiKey: document.getElementById('geminiApiKey'),
        groqApiKey: document.getElementById('groqApiKey'),
        openaiApiKey: document.getElementById('openaiApiKey'),
        tempSlider: document.getElementById('tempSlider'),
        tempValue: document.getElementById('tempValue'),
        voiceSelect: document.getElementById('voiceSelect'),
        personaAvatarHeader: document.getElementById('personaAvatarHeader'),
        currentPersonaTitle: document.getElementById('currentPersonaTitle'),
        agentStatusBadge: document.getElementById('agentStatusBadge'),
        themeToggleBtn: document.getElementById('themeToggleBtn'),
        themeIcon: document.getElementById('themeIcon'),
        themeText: document.getElementById('themeText'),
        toggleTtsBtn: document.getElementById('toggleTtsBtn'),
        ttsIcon: document.getElementById('ttsIcon'),
        ttsText: document.getElementById('ttsText'),
        exportDropdownBtn: document.getElementById('exportDropdownBtn'),
        exportMenu: document.getElementById('exportMenu'),
        exportMarkdownBtn: document.getElementById('exportMarkdownBtn'),
        exportJsonBtn: document.getElementById('exportJsonBtn'),
        clearChatBtn: document.getElementById('clearChatBtn'),
        messagesContainer: document.getElementById('messagesContainer'),
        welcomeHub: document.getElementById('welcomeHub'),
        starterPromptsGrid: document.getElementById('starterPromptsGrid'),
        messagesList: document.getElementById('messagesList'),
        userInput: document.getElementById('userInput'),
        sendMessageBtn: document.getElementById('sendMessageBtn'),
        voiceMicBtn: document.getElementById('voiceMicBtn'),
        micPulse: document.getElementById('micPulse'),
        quickTemplateBtn: document.getElementById('quickTemplateBtn'),
        codeRunnerModal: document.getElementById('codeRunnerModal'),
        closeCodeRunnerBtn: document.getElementById('closeCodeRunnerBtn'),
        codeRunnerFrame: document.getElementById('codeRunnerFrame')
    };

    // --- 1. Background Particles Animation ---
    function initBgParticles() {
        const canvas = elements.bgCanvas;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = Array.from({ length: 45 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            color: Math.random() > 0.5 ? '#6366f1' : '#06b6d4'
        }));

        function animate() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(animate);
        }
        animate();
    }

    // --- 2. Render Personas & Starter Cards ---
    function renderPersonas() {
        elements.personaSelector.innerHTML = '';
        Object.values(AGENT_PERSONAS).forEach(p => {
            const btn = document.createElement('button');
            btn.className = `p-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                state.activePersona === p.id 
                ? `${p.bgColor} ${p.borderColor} ${p.color} ring-2 ring-brand-500/50 scale-105` 
                : 'border-slate-800 bg-darkSurface/60 text-slate-400 hover:text-white hover:border-slate-700'
            }`;
            btn.title = `${p.name} — ${p.role}`;
            btn.innerHTML = `<i class="fa-solid ${p.icon} text-base mb-1"></i><span class="text-[10px] font-medium leading-none">${p.name.split(' ')[0]}</span>`;
            btn.addEventListener('click', () => switchPersona(p.id));
            elements.personaSelector.appendChild(btn);
        });
    }

    function switchPersona(personaId) {
        state.activePersona = personaId;
        renderPersonas();
        const p = AGENT_PERSONAS[personaId];
        elements.personaAvatarHeader.className = `w-7 h-7 rounded-lg ${p.bgColor} border ${p.borderColor} flex items-center justify-center ${p.color} text-sm`;
        elements.personaAvatarHeader.innerHTML = `<i class="fa-solid ${p.icon}"></i>`;
        elements.currentPersonaTitle.textContent = p.name;
    }

    function renderStarterPrompts() {
        elements.starterPromptsGrid.innerHTML = '';
        STARTER_PROMPTS.forEach(item => {
            const card = document.createElement('div');
            card.className = 'p-3.5 rounded-xl bg-darkSurface/70 border border-slate-800 hover:border-brand-500/50 cursor-pointer transition flex items-start gap-3 group hover:scale-[1.01]';
            card.innerHTML = `
                <div class="w-8 h-8 rounded-lg bg-darkBg border border-slate-700/60 flex items-center justify-center shrink-0 group-hover:border-brand-500 transition">
                    <i class="fa-solid ${item.icon} text-sm"></i>
                </div>
                <div>
                    <h4 class="text-xs font-semibold text-white group-hover:text-brand-300 transition">${item.title}</h4>
                    <p class="text-[11px] text-slate-400 line-clamp-2 mt-0.5">${item.prompt}</p>
                </div>
            `;
            card.addEventListener('click', () => {
                switchPersona(item.persona);
                elements.userInput.value = item.prompt;
                sendMessage();
            });
            elements.starterPromptsGrid.appendChild(card);
        });
    }

    // --- 3. Chat Session & Storage ---
    function createNewSession() {
        state.activeSessionId = 'session_' + Date.now();
        const newSession = {
            id: state.activeSessionId,
            title: 'New Conversation',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            messages: []
        };
        state.sessions.unshift(newSession);
        saveSessionsToStorage();
        renderSessionHistory();
        renderMessages();
    }

    function saveSessionsToStorage() {
        localStorage.setItem('infinity_sessions', JSON.stringify(state.sessions));
    }

    function renderSessionHistory() {
        elements.chatHistoryList.innerHTML = '';
        state.sessions.forEach(sess => {
            const item = document.createElement('div');
            const isActive = sess.id === state.activeSessionId;
            item.className = `group p-2 rounded-lg flex items-center justify-between text-xs cursor-pointer transition ${
                isActive ? 'bg-brand-600/20 text-white border border-brand-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`;
            item.innerHTML = `
                <div class="flex items-center gap-2 truncate flex-1">
                    <i class="fa-regular fa-message text-[11px] ${isActive ? 'text-brand-400' : 'text-slate-500'}"></i>
                    <span class="truncate font-medium">${sess.title}</span>
                </div>
                <button class="delete-sess-btn opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 p-1" title="Delete Session">
                    <i class="fa-solid fa-xmark text-xs"></i>
                </button>
            `;
            item.addEventListener('click', (e) => {
                if (e.target.closest('.delete-sess-btn')) {
                    deleteSession(sess.id);
                } else {
                    state.activeSessionId = sess.id;
                    renderSessionHistory();
                    renderMessages();
                }
            });
            elements.chatHistoryList.appendChild(item);
        });
    }

    function deleteSession(sessionId) {
        state.sessions = state.sessions.filter(s => s.id !== sessionId);
        saveSessionsToStorage();
        if (state.activeSessionId === sessionId) {
            state.activeSessionId = state.sessions.length > 0 ? state.sessions[0].id : null;
        }
        if (!state.activeSessionId) {
            createNewSession();
        } else {
            renderSessionHistory();
            renderMessages();
        }
    }

    function getCurrentSession() {
        return state.sessions.find(s => s.id === state.activeSessionId);
    }

    // --- 4. Render Chat Messages ---
    function renderMessages() {
        const session = getCurrentSession();
        if (!session || session.messages.length === 0) {
            elements.welcomeHub.classList.remove('hidden');
            elements.messagesList.classList.add('hidden');
            elements.messagesList.innerHTML = '';
            return;
        }

        elements.welcomeHub.classList.add('hidden');
        elements.messagesList.classList.remove('hidden');
        elements.messagesList.innerHTML = '';

        session.messages.forEach((msg, idx) => {
            appendMessageNode(msg, idx);
        });

        scrollToBottom();
    }

    function appendMessageNode(msg, index) {
        const msgNode = document.createElement('div');
        const isUser = msg.sender === 'user';

        msgNode.className = `flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`;

        const avatar = isUser ? `
            <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-brand-600 flex items-center justify-center text-white text-xs shrink-0 shadow-md">
                <i class="fa-solid fa-user"></i>
            </div>
        ` : `
            <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 via-violet-600 to-cyanAccent p-0.5 shrink-0 shadow-md">
                <div class="w-full h-full bg-darkBg rounded-[10px] flex items-center justify-center text-cyanAccent text-xs">
                    <i class="fa-solid fa-infinity"></i>
                </div>
            </div>
        `;

        // Reasoning Badge Stream if present
        let reasoningHtml = '';
        if (!isUser && msg.reasoning && msg.reasoning.length > 0) {
            reasoningHtml = `
                <div class="thought-container mb-3 border border-slate-700/50 rounded-xl overflow-hidden text-xs">
                    <div class="thought-header bg-slate-900/80 px-3 py-2 flex items-center justify-between text-slate-300 font-medium">
                        <span class="flex items-center gap-2">
                            <i class="fa-solid fa-brain text-violet-400"></i>
                            <span>Agent Thought Stream (${msg.reasoning.length} steps)</span>
                        </span>
                        <i class="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
                    </div>
                    <div class="thought-body p-3 bg-darkBg/60 space-y-1.5 border-t border-slate-800/60">
                        ${msg.reasoning.map(r => `
                            <div class="flex items-start gap-2 text-slate-400">
                                <i class="fa-solid fa-check text-emerald-400 text-[10px] mt-1"></i>
                                <span>${r}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Render Markdown content
        let parsedText = isUser ? escapeHtml(msg.text) : marked.parse(msg.text);

        const bubbleContent = `
            <div class="max-w-[85%] sm:max-w-[80%] ${isUser ? 'bg-gradient-to-r from-brand-700 to-violet-700 text-white rounded-2xl rounded-tr-xs p-4 shadow-lg' : 'bg-darkSurface/90 border border-slate-800 text-slate-100 rounded-2xl rounded-tl-xs p-4 shadow-xl prose-dark'}">
                ${reasoningHtml}
                <div class="message-body">${parsedText}</div>
                ${!isUser ? `
                    <div class="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/60 text-slate-400 text-xs">
                        <div class="flex items-center gap-1.5">
                            <button class="speak-msg-btn hover:text-white p-1" title="Read Aloud"><i class="fa-solid fa-volume-high text-xs"></i></button>
                            <button class="copy-msg-btn hover:text-white p-1" title="Copy Text"><i class="fa-regular fa-copy text-xs"></i></button>
                        </div>
                        <span class="text-[10px] text-slate-500">${msg.timestamp || ''}</span>
                    </div>
                ` : ''}
            </div>
        `;

        if (isUser) {
            msgNode.innerHTML = bubbleContent + avatar;
        } else {
            msgNode.innerHTML = avatar + bubbleContent;
        }

        // Bind copy & speech listeners
        const copyBtn = msgNode.querySelector('.copy-msg-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(msg.text);
                copyBtn.innerHTML = '<i class="fa-solid fa-check text-emerald-400 text-xs"></i>';
                setTimeout(() => copyBtn.innerHTML = '<i class="fa-regular fa-copy text-xs"></i>', 2000);
            });
        }

        const speakBtn = msgNode.querySelector('.speak-msg-btn');
        if (speakBtn) {
            speakBtn.addEventListener('click', () => {
                SpeechService.speak(msg.text);
            });
        }

        elements.messagesList.appendChild(msgNode);
        enhanceCodeBlocks(msgNode);

        // Render LaTeX math formulas
        if (window.renderMathInElement) {
            renderMathInElement(msgNode, {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false}
                ]
            });
        }
    }

    function enhanceCodeBlocks(container) {
        const pres = container.querySelectorAll('pre code');
        pres.forEach(code => {
            hljs.highlightElement(code);
            const pre = code.parentElement;
            if (pre.parentElement.classList.contains('code-block-wrapper')) return;

            const language = code.className.match(/language-(\w+)/)?.[1] || 'code';
            const rawCode = code.textContent;

            const wrapper = document.createElement('div');
            wrapper.className = 'code-block-wrapper';

            const header = document.createElement('div');
            header.className = 'code-block-header';
            header.innerHTML = `
                <span class="font-mono text-xs text-brand-300 font-semibold uppercase">${language}</span>
                <div class="flex items-center gap-2">
                    ${['html', 'xml', 'svg', 'javascript', 'js'].includes(language.toLowerCase()) ? `
                        <button class="run-code-btn bg-emerald-600/30 border border-emerald-500/40 hover:bg-emerald-600/50 text-emerald-300 px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 transition">
                            <i class="fa-solid fa-play text-[10px]"></i> Run Live Preview
                        </button>
                    ` : ''}
                    <button class="copy-code-btn hover:text-white px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                        <i class="fa-regular fa-copy text-[10px]"></i> Copy
                    </button>
                </div>
            `;

            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.appendChild(header);
            wrapper.appendChild(pre);

            // Copy listener
            header.querySelector('.copy-code-btn').addEventListener('click', (e) => {
                navigator.clipboard.writeText(rawCode);
                e.currentTarget.innerHTML = '<i class="fa-solid fa-check text-emerald-400"></i> Copied';
                setTimeout(() => e.currentTarget.innerHTML = '<i class="fa-regular fa-copy"></i> Copy', 2000);
            });

            // Live Code Preview Runner
            const runBtn = header.querySelector('.run-code-btn');
            if (runBtn) {
                runBtn.addEventListener('click', () => {
                    openCodePreview(rawCode);
                });
            }
        });
    }

    function openCodePreview(code) {
        elements.codeRunnerFrame.srcdoc = code;
        elements.codeRunnerModal.classList.remove('hidden');
    }

    function scrollToBottom() {
        setTimeout(() => {
            elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
        }, 50);
    }

    function escapeHtml(str) {
        return str.replace(/[&<>"']/g, match => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[match]));
    }

    // --- 5. User Input & Agent Dispatcher ---
    async function sendMessage() {
        const text = elements.userInput.value.trim();
        if (!text || state.isProcessing) return;

        state.isProcessing = true;
        elements.sendMessageBtn.disabled = true;
        elements.userInput.value = '';
        elements.userInput.style.height = 'auto';

        let session = getCurrentSession();
        if (!session) {
            createNewSession();
            session = getCurrentSession();
        }

        // Set session title from first user query
        if (session.messages.length === 0) {
            session.title = text.length > 25 ? text.substring(0, 25) + '...' : text;
            renderSessionHistory();
        }

        const userMsg = {
            sender: 'user',
            text: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        session.messages.push(userMsg);
        saveSessionsToStorage();
        renderMessages();

        // Agent Thinking Indicator
        const reasoningSteps = [];
        const thinkingNode = document.createElement('div');
        thinkingNode.className = 'flex gap-3 sm:gap-4 justify-start animate-pulse';
        thinkingNode.innerHTML = `
            <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-violet-600 p-0.5 shrink-0 shadow-md">
                <div class="w-full h-full bg-darkBg rounded-[10px] flex items-center justify-center text-cyanAccent text-xs">
                    <i class="fa-solid fa-infinity animate-spin-slow"></i>
                </div>
            </div>
            <div class="bg-darkSurface/90 border border-slate-800 rounded-2xl rounded-tl-xs p-4 text-xs text-slate-300 flex items-center gap-3">
                <div class="flex gap-1">
                    <span class="w-2 h-2 rounded-full bg-brand-400 typing-dot"></span>
                    <span class="w-2 h-2 rounded-full bg-violet-400 typing-dot"></span>
                    <span class="w-2 h-2 rounded-full bg-cyan-400 typing-dot"></span>
                </div>
                <span id="thinkingStatusText" class="font-medium text-slate-300">Infinity AI is reasoning...</span>
            </div>
        `;
        elements.messagesList.appendChild(thinkingNode);
        scrollToBottom();

        function updateThinkingText(t) {
            reasoningSteps.push(t);
            const statusEl = document.getElementById('thinkingStatusText');
            if (statusEl) statusEl.textContent = t;
        }

        // Tool Intent Detection & Execution
        const intent = ToolsEngine.analyzeUserIntent(text, state.activeTools);
        let appendedToolOutput = '';

        if (intent.imageGen) {
            updateThinkingText(`Generating FLUX AI Image for "${intent.imagePrompt}"...`);
            const imgResult = await ToolsEngine.runImageGenTool(intent.imagePrompt);
            appendedToolOutput += imgResult.markdownSnippet;
        }

        if (intent.webSearch) {
            updateThinkingText(`Running Web Search RAG for "${text}"...`);
            const ragResult = await ToolsEngine.runWebSearchTool(text);
            appendedToolOutput += `\n\n### 🌐 Web RAG Search Sources:\n${ragResult.summaryMarkdown}\n`;
        }

        if (intent.mathSolve) {
            updateThinkingText('Evaluating Step-by-Step Math Engine...');
            const mathResult = await ToolsEngine.runMathTool(text);
            if (mathResult.result) {
                appendedToolOutput += `\n\n**🧮 Math Evaluation**: \`${mathResult.expression}\` = **${mathResult.result}**\n`;
            }
        }

        // Execute AI Inference
        let aiResponseText = '';
        try {
            aiResponseText = await AIService.generateResponse({
                messages: session.messages,
                persona: state.activePersona,
                modelId: state.activeModel,
                temperature: state.temperature,
                keys: state.apiKeys,
                onThoughtStep: updateThinkingText
            });
        } catch (err) {
            aiResponseText = AIService.generateFailsafeResponse(text, AGENT_PERSONAS[state.activePersona]);
        }

        // Combine response
        const finalText = aiResponseText + appendedToolOutput;

        // Remove thinking indicator
        thinkingNode.remove();

        // Push Agent Message
        const agentMsg = {
            sender: 'agent',
            text: finalText,
            reasoning: reasoningSteps,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        session.messages.push(agentMsg);
        saveSessionsToStorage();
        renderMessages();

        if (state.ttsAutoPlay) {
            SpeechService.speak(finalText);
        }

        state.isProcessing = false;
        elements.sendMessageBtn.disabled = false;
    }

    // --- 6. Event Listeners & UI Controls ---
    elements.sendMessageBtn.addEventListener('click', sendMessage);
    elements.userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-resizing textarea
    elements.userInput.addEventListener('input', () => {
        elements.userInput.style.height = 'auto';
        elements.userInput.style.height = Math.min(elements.userInput.scrollHeight, 150) + 'px';
    });

    // Sidebar Mobile Toggle
    elements.openSidebarMobile?.addEventListener('click', () => {
        elements.sidebar.classList.remove('-translate-x-full');
        elements.sidebarOverlay.classList.remove('hidden');
    });

    elements.closeSidebarMobile?.addEventListener('click', () => {
        elements.sidebar.classList.add('-translate-x-full');
        elements.sidebarOverlay.classList.add('hidden');
    });

    elements.sidebarOverlay?.addEventListener('click', () => {
        elements.sidebar.classList.add('-translate-x-full');
        elements.sidebarOverlay.classList.add('hidden');
    });

    elements.newChatBtn.addEventListener('click', createNewSession);

    // Model Dropdown
    elements.modelDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.modelDropdownMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('.model-option').forEach(opt => {
        opt.addEventListener('click', () => {
            state.activeModel = opt.getAttribute('data-model');
            elements.currentModelLabel.textContent = opt.querySelector('span').textContent;
            elements.modelDropdownMenu.classList.add('hidden');
        });
    });

    document.addEventListener('click', () => {
        elements.modelDropdownMenu?.classList.add('hidden');
        elements.exportMenu?.classList.add('hidden');
    });

    // Tools Chips Toggles
    document.querySelectorAll('.tool-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const toolName = chip.getAttribute('data-tool');
            state.activeTools[toolName] = !state.activeTools[toolName];
            chip.classList.toggle('inactive', !state.activeTools[toolName]);
        });
    });

    // Light / Dark Theme Controller
    function applyTheme(themeName) {
        state.theme = themeName;
        localStorage.setItem('infinity_theme', themeName);
        if (themeName === 'light') {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            document.body.classList.remove('dark');
            document.body.classList.add('light');
            if (elements.themeIcon) elements.themeIcon.className = 'fa-solid fa-moon text-sm text-indigo-600';
            if (elements.themeText) elements.themeText.textContent = 'Dark Mode';
        } else {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
            document.body.classList.remove('light');
            document.body.classList.add('dark');
            if (elements.themeIcon) elements.themeIcon.className = 'fa-solid fa-sun text-sm text-amber-400';
            if (elements.themeText) elements.themeText.textContent = 'Light Mode';
        }
    }

    elements.themeToggleBtn?.addEventListener('click', () => {
        const nextTheme = state.theme === 'light' ? 'dark' : 'light';
        applyTheme(nextTheme);
    });

    // Voice Input Speech Recognition
    elements.voiceMicBtn.addEventListener('click', () => {
        const isListening = SpeechService.toggleListening(
            (transcript) => {
                elements.userInput.value = transcript;
            },
            () => {
                elements.micPulse.classList.add('hidden');
            }
        );
        if (isListening) {
            elements.micPulse.classList.remove('hidden');
        }
    });

    // Text To Speech Mute Toggle
    elements.toggleTtsBtn.addEventListener('click', () => {
        state.ttsAutoPlay = !state.ttsAutoPlay;
        if (state.ttsAutoPlay) {
            elements.ttsIcon.className = 'fa-solid fa-volume-high text-brand-400';
            elements.ttsText.textContent = 'Voice On';
        } else {
            elements.ttsIcon.className = 'fa-solid fa-volume-xmark text-slate-400';
            elements.ttsText.textContent = 'Voice Off';
            SpeechService.stopSpeaking();
        }
    });

    // Settings Modal
    elements.openSettingsBtn.addEventListener('click', openSettings);
    elements.openKeyConfigBtn.addEventListener('click', openSettings);
    elements.closeSettingsBtn.addEventListener('click', () => elements.settingsModal.classList.add('hidden'));

    function openSettings() {
        elements.geminiApiKey.value = state.apiKeys.gemini || '';
        elements.groqApiKey.value = state.apiKeys.groq || '';
        elements.openaiApiKey.value = state.apiKeys.openai || '';
        elements.tempSlider.value = state.temperature;
        elements.tempValue.textContent = state.temperature;
        elements.settingsModal.classList.remove('hidden');
    }

    elements.tempSlider.addEventListener('input', () => {
        elements.tempValue.textContent = elements.tempSlider.value;
    });

    elements.saveSettingsBtn.addEventListener('click', () => {
        state.apiKeys.gemini = elements.geminiApiKey.value.trim();
        state.apiKeys.groq = elements.groqApiKey.value.trim();
        state.apiKeys.openai = elements.openaiApiKey.value.trim();
        state.temperature = parseFloat(elements.tempSlider.value);

        localStorage.setItem('infinity_keys', JSON.stringify(state.apiKeys));
        localStorage.setItem('infinity_temp', state.temperature.toString());

        elements.settingsModal.classList.add('hidden');
    });

    // Code Sandbox Runner Modal Close
    elements.closeCodeRunnerBtn.addEventListener('click', () => {
        elements.codeRunnerModal.classList.add('hidden');
        elements.codeRunnerFrame.srcdoc = '';
    });

    // Export Chat
    elements.exportDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.exportMenu.classList.toggle('hidden');
    });

    elements.exportMarkdownBtn.addEventListener('click', () => {
        const session = getCurrentSession();
        if (!session) return;
        let content = `# ${session.title}\n\n`;
        session.messages.forEach(m => {
            content += `### ${m.sender === 'user' ? 'User' : 'Infinity AI'}\n${m.text}\n\n---\n\n`;
        });
        downloadFile(`${session.title.replace(/[^a-z0-9]/gi, '_')}.md`, content, 'text/markdown');
    });

    elements.exportJsonBtn.addEventListener('click', () => {
        const session = getCurrentSession();
        if (!session) return;
        downloadFile(`${session.title.replace(/[^a-z0-9]/gi, '_')}.json`, JSON.stringify(session, null, 2), 'application/json');
    });

    function downloadFile(filename, content, type) {
        const blob = new Blob([content], { type: type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    elements.clearChatBtn.addEventListener('click', () => {
        if (confirm('Clear current chat session?')) {
            const session = getCurrentSession();
            if (session) {
                session.messages = [];
                saveSessionsToStorage();
                renderMessages();
            }
        }
    });

    // Quick template button
    elements.quickTemplateBtn.addEventListener('click', () => {
        elements.userInput.value = "Write a complete responsive dark mode portfolio website in single-file HTML, CSS, and JavaScript.";
        elements.userInput.focus();
    });

    // --- 7. Initialization ---
    applyTheme(state.theme);
    initBgParticles();
    renderPersonas();
    renderStarterPrompts();

    if (state.sessions.length === 0) {
        createNewSession();
    } else {
        state.activeSessionId = state.sessions[0].id;
        renderSessionHistory();
        renderMessages();
    }
});
