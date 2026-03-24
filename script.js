/**
 * Opens a modal with specific content
 */
function openModal(type, title, meta, desc) {
    const modal = document.getElementById('modal');
    if (!modal) return;

    document.getElementById('modal-type').innerText = type;
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-meta').innerText = meta;
    document.getElementById('modal-desc').innerText = desc;
    
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

/**
 * Closes the modal
 */
function closeModal() {
    const modal = document.getElementById('modal');
    if (!modal) return;
    
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
}

// Global Event Listeners
window.addEventListener('keydown', (e) => { 
    if (e.key === 'Escape') closeModal(); 
});

// Optional: Close modal on overlay click
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', closeModal);
    }
});