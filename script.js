async function openModalFromFile(type, title, meta, filePath) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalBody) return;

    document.getElementById('modal-type').innerText = type;
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-meta').innerText = meta;

    // Inject the iframe with an onload event to calculate height
    modalBody.innerHTML = `
        <iframe 
            src="${filePath}" 
            id="session-iframe"
            scrolling="no"
            style="width: 100%; border: none; overflow: hidden;"
            onload="this.style.height = this.contentWindow.document.body.scrollHeight + 'px';"
            title="${title}">
        </iframe>`;
    
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}


// * Zavře modální okno.
 
function closeModal() {
    const modal = document.getElementById('modal');
    if (!modal) return;
    
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
}

// Globální posluchače událostí
window.addEventListener('keydown', (e) => { 
    if (e.key === 'Escape') closeModal(); 
});

// Zavření modálu kliknutím na pozadí (overlay)
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
});

/********************* Sidebar instead of Modal ***********************************/

/**
 * Toggles the sidebar visibility.
 */
/**
 * Toggles the sidebar visibility.
 */
function toggleSidebar() {
    const wrapper = document.getElementById('layout-wrapper');
    if (wrapper) {
        wrapper.classList.toggle('sidebar-hidden');
    }
}

/**
 * Adjusts the iframe height based on its internal content.
 * This removes the internal scrollbar and allows the main panel to scroll.
 */
function resizeIframe(iframe) {
    if (iframe) {
        // Reset height to let it recalculate properly
        iframe.style.height = 'auto';
        // Set height to the actual scrollable height of the internal document
        iframe.style.height = iframe.contentWindow.document.documentElement.scrollHeight + 'px';
    }
}

/**
 * Loads a session file into the content panel.
 */
function loadSession(element, type, title, meta, filePath) {
    const placeholder = document.getElementById('content-placeholder');
    const viewer = document.getElementById('session-viewer');
    const viewBody = document.getElementById('view-body');
    const contentPanel = document.getElementById('content-panel');
    
    if (!placeholder || !viewer || !viewBody) return;

    // 1. Update Active State in Sidebar
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.classList.remove('active');
    });
    element.classList.add('active');

    // 2. Visibility Toggles
    placeholder.style.display = 'none';
    viewer.style.display = 'block'; // Changed to block to allow natural flow

    // 3. Set Header Text
    document.getElementById('view-type').innerText = type;
    document.getElementById('view-title').innerText = title;
    document.getElementById('view-meta').innerText = meta;

    // 4. Inject Iframe with auto-resizing logic
    // we use scrolling="no" and an onload handler
    viewBody.innerHTML = `
        <iframe 
            src="${filePath}" 
            id="session-iframe"
            scrolling="no"
            onload="resizeIframe(this)"
            title="${title}">
        </iframe>`;

    // 5. Reset scroll position of the main panel to top
    if (contentPanel) contentPanel.scrollTop = 0;

    // 6. Mobile Auto-close
    if (window.innerWidth <= 768) {
        const wrapper = document.getElementById('layout-wrapper');
        if (wrapper && !wrapper.classList.contains('sidebar-hidden')) {
            wrapper.classList.add('sidebar-hidden');
        }
    }
}

// Optional: Handle window resize to re-calculate iframe height if needed
window.addEventListener('resize', () => {
    const iframe = document.getElementById('session-iframe');
    if (iframe) resizeIframe(iframe);
});