/*async function openModalFromFile(type, title, meta, filePath) {
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
});*/

/********************* Sidebar instead of Modal ***********************************/

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
 * Loads a session file into the content panel.
 */
function loadSession(element, type, title, meta, filePath) {
    const placeholder = document.getElementById('content-placeholder');
    const viewer = document.getElementById('session-viewer');
    const viewBody = document.getElementById('view-body');
    
    if (!placeholder || !viewer || !viewBody) return;

    // 1. Update Active State
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.classList.remove('active');
    });
    element.classList.add('active');

    // 2. Show Viewer
    placeholder.style.display = 'none';
    viewer.style.display = 'flex';

    // 3. Set Header Text
    document.getElementById('view-type').innerText = type;
    document.getElementById('view-title').innerText = title;
    document.getElementById('view-meta').innerText = meta;

    // 4. Load Content Iframe
    viewBody.innerHTML = `
        <iframe 
            src="${filePath}" 
            id="session-iframe"
            title="${title}">
        </iframe>`;

    // 5. Auto-close on small screens
    if (window.innerWidth <= 768) {
        const wrapper = document.getElementById('layout-wrapper');
        if (wrapper && !wrapper.classList.contains('sidebar-hidden')) {
            wrapper.classList.add('sidebar-hidden');
        }
    }
}