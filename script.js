// 今日の日付を表示
const today = new Date();
const dateString = today.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});
document.getElementById('today').textContent = dateString;

// ボタンクリック時の動作
document.getElementById('click-me').addEventListener('click', function() {
    const messages = [
        'こんにちは！',
        'Vercelすごい！',
        'デプロイ成功！',
        '今日もいい日だ！'
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    document.getElementById('message').textContent = randomMessage;
});