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

    // 2. 追加演出：放置すると「青い目」が浮かび上がる (第8条)
    const eye = document.createElement('div');
    eye.innerHTML = "👁";
    Object.assign(eye.style, {
        position: 'fixed', color: '#0000FF', fontSize: '3rem', opacity: '0',
        pointerEvents: 'none', zIndex: '9998', transition: 'opacity 2s',
        textShadow: '0 0 15px #0000FF', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'
    });
    document.body.appendChild(eye);

    let idleTimer;
    const resetIdle = () => {
        clearTimeout(idleTimer);
        eye.style.opacity = '0';
        document.body.style.opacity = '1';
        idleTimer = setTimeout(() => {
            eye.style.opacity = '0.4'; // 10秒放置で目が浮かぶ
            document.body.style.opacity = '0.2'; // 画面が沈む
        }, 10000);
    };
    ['mousemove', 'keydown', 'click'].forEach(e => document.addEventListener(e, resetIdle));
    resetIdle();

    // 3. 忘却と再励起システム (5秒で復帰)
    document.querySelectorAll('[data-waft-id]').forEach(el => {
        el.addEventListener('click', () => {
            el.style.transition = "opacity 0.5s";
            el.style.opacity = "0.1";
            el.style.pointerEvents = "none";
            setTimeout(() => {
                el.style.opacity = "0.4";
                el.style.pointerEvents = "auto";
            }, 5000);
        });
    });

    // 4. コンソールログ
    console.clear();
    console.log("%c[SYSTEM] 対境界線広域干渉及び超領域的表現開発機構", "font-weight:bold; color:#555;");
    console.log("%c三条瞳：観測を継続してください。逃げても無駄です。", "color:#900;");
});