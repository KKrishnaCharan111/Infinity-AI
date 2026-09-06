/* ==========================================================================
   Infinity AI Agent 2.0 — Embeddable Widget Script for Websites
   Integrates full Autonomous AI Agent into Digital Portal AI Assistant
   ========================================================================== */

(function () {
    // Check if widget container already exists
    if (document.getElementById('infinity-agent-root')) return;

    // Inject FontAwesome & Fonts if missing
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fa = document.createElement('link');
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(fa);
    }

    // Create Widget Mount Node
    const rootNode = document.createElement('div');
    rootNode.id = 'infinity-agent-root';
    document.body.appendChild(rootNode);

    // Inject Floating Action Trigger Button
    const triggerBtn = document.createElement('button');
    triggerBtn.id = 'infinity-floating-trigger';
    triggerBtn.innerHTML = `
        <div style="position: relative; display: flex; align-items: center; justify-content: center;">
            <i class="fa-solid fa-infinity" style="font-size: 20px;"></i>
            <span style="position: absolute; top: -4px; right: -4px; width: 10px; height: 10px; background: #10b981; border-radius: 50%; border: 2px solid #ffffff;"></span>
        </div>
        <span style="font-weight: 700; font-size: 13px; letter-spacing: 0.3px;">Infinity AI</span>
    `;

    // Apply inline style for floating button
    Object.assign(triggerBtn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '99999',
        background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
        color: '#ffffff',
        border: 'none',
        borderRadius: '9999px',
        padding: '12px 20px',
        display: 'flex',
        align-items: 'center',
        gap: '10px',
        boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        fontFamily: 'Inter, system-ui, sans-serif',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    });

    triggerBtn.addEventListener('mouseenter', () => {
        triggerBtn.style.transform = 'translateY(-3px) scale(1.03)';
    });
    triggerBtn.addEventListener('mouseleave', () => {
        triggerBtn.style.transform = 'translateY(0) scale(1)';
    });

    document.body.appendChild(triggerBtn);

    // Create Modal Drawer Overlay
    const drawerOverlay = document.createElement('div');
    drawerOverlay.id = 'infinity-drawer-overlay';
    Object.assign(drawerOverlay.style, {
        position: 'fixed',
        inset: '0',
        zIndex: '999999',
        background: 'rgba(9, 13, 22, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'none',
        justifyContent: 'flex-end',
        opacity: '0',
        transition: 'opacity 0.3s ease'
    });

    // Drawer Frame Container
    const drawerContainer = document.createElement('div');
    Object.assign(drawerContainer.style, {
        width: '100%',
        maxWidth: '720px',
        height: '100%',
        background: '#090d16',
        borderLeft: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    });

    // Embed iFrame linking to Infinity AI index.html
    const iframe = document.createElement('iframe');
    // Relative or local path to index.html
    iframe.src = window.location.origin.includes('github.io') 
        ? './infinity-ai/index.html' 
        : 'C:/Users/K KRISHNA CHARAN/.gemini/antigravity/scratch/infinity-ai/index.html';

    Object.assign(iframe.style, {
        width: '100%',
        height: '100%',
        border: 'none'
    });

    // Close Button Header inside Drawer
    const headerBar = document.createElement('div');
    Object.assign(headerBar.style, {
        height: '48px',
        background: '#111827',
        borderBottom: '1px solid #1f2937',
        padding: '0 16px',
        display: 'flex',
        align-items: 'center',
        justify-content: 'space-between',
        color: '#ffffff',
        fontFamily: 'Inter, sans-serif',
        fontSize: '13px',
        fontWeight: '700'
    });

    headerBar.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-infinity" style="color: #06b6d4;"></i>
            <span>Infinity AI 2.0 Assistant</span>
            <span style="font-size: 10px; background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 2px 8px; border-radius: 9999px;">Online</span>
        </div>
        <button id="infinity-close-drawer" style="background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 16px; padding: 4px;">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;

    drawerContainer.appendChild(headerBar);
    drawerContainer.appendChild(iframe);
    drawerOverlay.appendChild(drawerContainer);
    document.body.appendChild(drawerOverlay);

    // Toggle Modal Functions
    function openDrawer() {
        drawerOverlay.style.display = 'flex';
        setTimeout(() => {
            drawerOverlay.style.opacity = '1';
            drawerContainer.style.transform = 'translateX(0)';
        }, 10);
    }

    function closeDrawer() {
        drawerOverlay.style.opacity = '0';
        drawerContainer.style.transform = 'translateX(100%)';
        setTimeout(() => {
            drawerOverlay.style.display = 'none';
        }, 300);
    }

    triggerBtn.addEventListener('click', openDrawer);
    headerBar.querySelector('#infinity-close-drawer').addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', (e) => {
        if (e.target === drawerOverlay) closeDrawer();
    });

    // Intercept existing "Ask AI" buttons on website (e.g. toggleAiDrawer or Ask AI button)
    window.toggleAiDrawer = openDrawer;
    window.openInfinityAgent = openDrawer;

    // Attach listener to any button with onclick or class matching Ask AI
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (btn && (btn.textContent.includes('Ask AI') || btn.getAttribute('onclick')?.includes('toggleAiDrawer'))) {
            e.preventDefault();
            e.stopPropagation();
            openDrawer();
        }
    });

    console.log('✅ Infinity AI Agent 2.0 Widget initialized.');
})();
