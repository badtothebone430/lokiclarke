// Animated particles with parallax effect
class ParticleField {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseY = window.innerHeight / 2;
        this.mouseX = window.innerWidth / 2;
        this.parallaxOffsetX = 0;
        this.parallaxOffsetY = 0;
        
        // Gradient colors (darker versions)
        this.colors = [
            'rgba(80, 150, 200, 0.6)',   // darker cyan
            'rgba(100, 80, 180, 0.6)',   // darker purple
            'rgba(180, 60, 120, 0.6)'    // darker pink
        ];
        
        // Set canvas size
        this.resize();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // Initialize particles
        this.initParticles();
        
        // Start animation loop
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.parallaxOffsetX = (this.mouseX - window.innerWidth / 2) * 0.04;
        this.parallaxOffsetY = (this.mouseY - window.innerHeight / 2) * 0.04;
    }
    
    initParticles() {
        this.particles = [];
        const particleCount = 120;
        for (let i = 0; i < particleCount; i++) {
            let x, y;
            let valid = false;
            
            // Keep generating until we find a valid position (avoid bottom-left and top-right corners)
            while (!valid) {
                x = Math.random() * this.canvas.width;
                y = Math.random() * this.canvas.height;
                
                // Avoid bottom-left corner (roughly 38% from edges)
                const isBottomLeft = x < this.canvas.width * 0.38 && y > this.canvas.height * 0.62;
                // Avoid top-right corner (roughly 38% from edges)
                const isTopRight = x > this.canvas.width * 0.62 && y < this.canvas.height * 0.38;
                
                valid = !isBottomLeft && !isTopRight;
            }
            
            this.particles.push({
                x: x,
                y: y,
                size: Math.random() * 2 + 0.5,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                speedX: (Math.random() - 0.5) * 0.1,
                speedY: (Math.random() - 0.5) * 0.05,
                depth: Math.random() * 100
            });
        }
    }
    
    animate() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            // Slow movement
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Parallax movement based on mouse (both X and Y)
            particle.x += (this.parallaxOffsetX * particle.depth * 0.0005);
            particle.y += (this.parallaxOffsetY * particle.depth * 0.0005);
            
            // Check if particle drifted into forbidden corners
            const isBottomLeft = particle.x < this.canvas.width * 0.38 && particle.y > this.canvas.height * 0.62;
            const isTopRight = particle.x > this.canvas.width * 0.62 && particle.y < this.canvas.height * 0.38;
            
            if (isBottomLeft || isTopRight) {
                // Respawn in safe area
                particle.x = Math.random() * this.canvas.width * 0.6 + this.canvas.width * 0.2;
                particle.y = Math.random() * this.canvas.height * 0.6 + this.canvas.height * 0.2;
            } else {
                // Wrap around edges normally
                if (particle.x < 0) particle.x = this.canvas.width;
                if (particle.x > this.canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = this.canvas.height;
                if (particle.y > this.canvas.height) particle.y = 0;
            }
            
            // Draw particle
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle field when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ParticleField('starfield-canvas');
});
