// WAFT Core Protocol Implementation
document.addEventListener('DOMContentLoaded', () => {
    // 1. ノイズレイヤーの動的生成
    const overlay = document.createElement('div');
    overlay.id = 'waft-overlay';
    document.body.appendChild(overlay);

    // 2. 観測者の視線（マウス）による干渉
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        // わずかに画面を傾ける（境界の揺らぎ）
        document.body.style.transform = `perspective(1000px) rotateY(${(x - 0.5) * 2}deg) rotateX(${(y - 0.5) * -2}deg)`;
    });

    // 3. 要綱第20条：忘却へのカウントダウン
    let idleTime = 0;
    const idleLimit = 30; // 30秒で消滅開始
    
    setInterval(() => {
        idleTime++;
        if (idleTime > idleLimit) {
            document.body.classList.add('decay-step');
            document.title = "存在の忘却を確認中...";
        }
    }, 1000);

    document.addEventListener('mousemove', () => {
        idleTime = 0;
        document.body.classList.remove('decay-step');
        document.title = "WAFT | 対境界線広域干渉";
    });

    // 4. コンソールへの密やかな干渉（第4条 逆因果論）
    console.log("%c[SYSTEM] 観測者の接続を承認。既にあなたは「知って」いたはずです。", "color: #0000FF; font-weight: bold;");
});

// 位相間の通信障害を模したランダムなグリッチ
function triggerGlitch() {
    const targets = document.querySelectorAll('h1, h2, a');
    const target = targets[Math.floor(Math.random() * targets.length)];
    const originalText = target.innerText;
    
    if(!originalText) return;

    const chars = "境界揺らぎWaft死生虚実";
    target.innerText = chars[Math.floor(Math.random() * chars.length)];
    
    setTimeout(() => {
        target.innerText = originalText;
    }, 150);
}

setInterval(() => {
    if(Math.random() > 0.95) triggerGlitch();
}, 3000);