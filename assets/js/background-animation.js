// 获取画布和上下文
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');

// 检测是否为移动设备
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// 配置参数
const config = {
    particleCount: isMobile ? 15 : 30,
    baseSize: isMobile ? 10 : 15,
    colors: ['#64b5f6', '#2196f3', '#1976d2', '#0d47a1'],
    speed: isMobile ? 0.5 : 1
};

// 调整画布大小
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// 初始化时调整大小
resizeCanvas();

// 监听窗口大小变化
window.addEventListener('resize', resizeCanvas);

// 浮动元素类
class FloatingElement {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = (Math.random() * config.baseSize + config.baseSize/2);
        this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
        this.angle = Math.random() * Math.PI * 2;
        this.speed = (Math.random() * 0.5 + 0.5) * config.speed;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.growth = 0.01;
        this.maxSize = this.size * 1.5;
        this.minSize = this.size * 0.5;
    }

    update() {
        // 创建浮动效果
        this.angle += 0.02 * this.speed;
        this.x += Math.sin(this.angle) * 0.5;
        this.y += Math.cos(this.angle) * 0.5;

        // 大小呼吸效果
        this.size += this.growth;
        if (this.size > this.maxSize || this.size < this.minSize) {
            this.growth *= -1;
        }

        // 边界检查
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.y < -50) this.y = canvas.height + 50;
        if (this.y > canvas.height + 50) this.y = -50;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + Math.floor(this.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
    }
}

// 创建浮动元素数组
const elements = Array.from({ length: config.particleCount }, () => new FloatingElement());

// 渐变背景
function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1a1f25');
    gradient.addColorStop(1, '#101318');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// 动画循环
let animationId;
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();

    elements.forEach(element => {
        element.update();
        element.draw();
    });

    animationId = requestAnimationFrame(animate);
}

// 启动动画
animate();

// 页面不可见时暂停动画
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        cancelAnimationFrame(animationId);
    } else {
        animate();
    }
});

// 窗口大小改变时重置元素位置
window.addEventListener('resize', () => {
    resizeCanvas();
    elements.forEach(element => element.reset());
}); 