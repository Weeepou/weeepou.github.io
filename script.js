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

/**
 * Zavře modální okno.
 */
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