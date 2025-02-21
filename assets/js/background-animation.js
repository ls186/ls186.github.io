// 获取画布和上下文
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');

// 检测是否为移动设备
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// 移动设备配置
const mobileConfig = {
    particleCount: 30,    // 减少粒子数量
    particleSize: 2,      // 减小粒子大小
    connectionDistance: 100, // 减少连接距离
    speed: 0.5,           // 降低速度
    fps: 30               // 降低帧率
};

// 桌面设备配置
const desktopConfig = {
    particleCount: 100,
    particleSize: 3,
    connectionDistance: 150,
    speed: 1,
    fps: 60
};

// 根据设备类型选择配置
const config = isMobile ? mobileConfig : desktopConfig;

// 调整画布大小
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// 初始化时调整大小
resizeCanvas();

// 监听窗口大小变化
window.addEventListener('resize', resizeCanvas);

// 粒子类
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * config.speed;
        this.vy = (Math.random() - 0.5) * config.speed;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // 边界检查
        if (this.x < 0 || this.x > canvas.width) {
            this.vx *= -1;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.vy *= -1;
        }

        // 确保粒子不会完全离开画布
        this.x = Math.max(0, Math.min(this.x, canvas.width));
        this.y = Math.max(0, Math.min(this.y, canvas.height));
    }
}

// 创建粒子数组
const particles = Array.from({ length: config.particleCount }, () => new Particle());

// 性能监控变量
let lastTime = performance.now();
let frameCount = 0;
const fpsInterval = 1000 / config.fps;

// 动画循环
function animate(currentTime) {
    const elapsed = currentTime - lastTime;

    // FPS 限制
    if (elapsed < fpsInterval) {
        requestAnimationFrame(animate);
        return;
    }

    lastTime = currentTime - (elapsed % fpsInterval);

    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 更新和绘制粒子
    particles.forEach(particle => {
        particle.update();

        // 绘制粒子
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, config.particleSize, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();

        // 绘制连接线
        particles.forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < config.connectionDistance) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / config.connectionDistance)})`;
                ctx.stroke();
            }
        });
    });

    // 性能监控
    frameCount++;
    if (frameCount > 60) {
        frameCount = 0;
        // 如果检测到性能问题，自动降低配置
        if (elapsed > fpsInterval * 1.5) {
            config.particleCount = Math.max(20, config.particleCount - 5);
            config.connectionDistance = Math.max(50, config.connectionDistance - 10);
            // 重新初始化粒子
            particles.splice(config.particleCount);
        }
    }

    requestAnimationFrame(animate);
}

// 启动动画
animate(performance.now());

// 页面不可见时暂停动画
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        cancelAnimationFrame(animate);
    } else {
        requestAnimationFrame(animate);
    }
}); 