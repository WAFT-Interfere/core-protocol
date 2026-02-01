document.addEventListener('DOMContentLoaded', () => {
    // 1. ノイズ生成
    const canvas = document.createElement('canvas');
    canvas.id = 'grain-canvas';
    Object.assign(canvas.style, {
        position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: '9999', opacity: '0.05'
    });
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    resize();
    const noise = () => {
        const idata = ctx.createImageData(canvas.width, canvas.height);
        const buffer32 = new Uint32Array(idata.data.buffer);
        for (let i = 0; i < buffer32.length; i++) if (Math.random() < 0.5) buffer32[i] = 0xffffffff;
        ctx.putImageData(idata, 0, 0);
        setTimeout(noise, 50);
    };
    noise();

    // 2. 忘却と再励起システム (不便さを解消した配慮)
    document.querySelectorAll('[data-waft-id]').forEach(el => {
        el.addEventListener('click', (e) => {
            // 位相のズレ：クリックした瞬間に要素を透明にする
            el.style.transition = "opacity 0.5s, transform 0.5s";
            el.style.opacity = "0";
            el.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`;
            el.style.pointerEvents = "none";

            // 再励起：数秒後にうっすらと復帰させる
            setTimeout(() => {
                el.style.opacity = "0.3"; // 完全に消さず、薄く残す
                el.style.pointerEvents = "auto";
                el.style.transform = "translate(0, 0)";
            }, 5000); // 5秒後に復帰
        });
    });

    // 3. コンソール語りかけ
    console.clear();
    console.log("%c[SYSTEM] WAFT Protocol - Observation Mode", "color: #555; font-weight: bold;");
    console.log("%c三条瞳：情報の不一致は健全な揺らぎです。消えたように見えても、そこに在ります。", "color: #900;");
});