class Particle {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.velocity = {
            x: (Math.random() - 0.5) * 0.5,
            y: (Math.random() - 0.5) * 0.5
        };
        this.radius = Math.random() * 2;
        this.baseRadius = this.radius;
        this.maxRadius = this.radius * 5;
        this.color = '#64b5f6';
        this.density = Math.random() * 30 + 1;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    update() {
        if (this.x + this.radius > this.canvas.width || this.x - this.radius < 0) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y + this.radius > this.canvas.height || this.y - this.radius < 0) {
            this.velocity.y = -this.velocity.y;
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

class ParticleNetwork {
    constructor() {
        this.canvas = document.getElementById('heroCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numberOfParticles = 100;
        this.mouse = {
            x: null,
            y: null,
            radius: 150
        };

        this.init();
        this.animate();
        this.handleResize();
        this.handleMouseMove();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this.canvas, this.ctx));
        }
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.init();
        });
    }

    handleMouseMove() {
        this.canvas.addEventListener('mousemove', (event) => {
            this.mouse.x = event.x;
            this.mouse.y = event.y;
        });
    }

    connect() {
        for (let a = 0; a < this.particles.length; a++) {
            for (let b = a; b < this.particles.length; b++) {
                const dx = this.particles[a].x - this.particles[b].x;
                const dy = this.particles[a].y - this.particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const opacity = 1 - (distance / 150);
                    this.ctx.strokeStyle = `rgba(100, 181, 246, ${opacity * 0.5})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
                    this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const particle of this.particles) {
            particle.update();
            particle.draw();

            // 鼠标交互
            if (this.mouse.x != null && this.mouse.y != null) {
                const dx = particle.x - this.mouse.x;
                const dy = particle.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouse.radius) {
                    particle.radius = particle.baseRadius * (1 + ((this.mouse.radius - distance) / this.mouse.radius));
                } else {
                    particle.radius = particle.baseRadius;
                }
            }
        }

        this.connect();
        requestAnimationFrame(() => this.animate());
    }
}

// 当页面加载完成后初始化动画
window.addEventListener('load', () => {
    new ParticleNetwork();
}); 