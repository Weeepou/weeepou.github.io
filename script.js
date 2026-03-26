/**
 * Otevře modální okno se zadaným obsahem.
 * Podporuje innerHTML pro formátovaný text.
 */
function openModal(type, title, meta, desc) {
    const modal = document.getElementById('modal');
    if (!modal) return;

    document.getElementById('modal-type').innerText = type;
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-meta').innerText = meta;
    document.getElementById('modal-desc').innerHTML = desc;
    
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

/**
 * Načte obsah z externího souboru a zobrazí jej v modálu.
 * Umožňuje mít zápisy v samostatných souborech (.txt nebo .html).
 * Důležité: Pro fungování v prohlížeči je obvykle nutné mít spuštěný lokální server (např. Live Server).
 */
async function openModalFromFile(type, title, meta, filePath) {
    // Předběžné otevření modálu s informací o načítání
    openModal(type, title, meta, "<i>Načítám obsah zápisu...</i>");

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error('Soubor se nepodařilo nalézt.');
        
        const text = await response.text();
        
        // Jakmile je text stažen, aktualizujeme obsah modálu
        document.getElementById('modal-desc').innerHTML = text;
    } catch (error) {
        document.getElementById('modal-desc').innerHTML = "<span style='color: #ef4444;'>Chyba: Nepodařilo se načíst externí soubor. Ujistěte se, že cesta k souboru je správná.</span>";
        console.error('Chyba při načítání souboru:', error);
    }
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