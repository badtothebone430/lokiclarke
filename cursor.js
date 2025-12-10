// Glowing cursor effect
class GlowingCursor {
    constructor() {
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        this.cursorCanvas = document.getElementById('cursor-canvas');
        this.ctx = this.cursorCanvas.getContext('2d');
        this.isHoveringButton = false;
        this.isSelectingText = false;
        
        // Set canvas to cover entire viewport
        this.cursorCanvas.width = window.innerWidth;
        this.cursorCanvas.height = window.innerHeight;
        
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.addEventListener('mouseover', (e) => this.handleMouseOver(e));
        window.addEventListener('mouseout', (e) => this.handleMouseOut(e));
        document.addEventListener('selectionchange', () => this.handleSelectionChange());
        
        // Hide default cursor
        document.body.style.cursor = 'none';
        document.addEventListener('mouseover', (e) => {
            e.target.style.cursor = 'none';
        });
        document.addEventListener('mousedown', (e) => {
            e.target.style.cursor = 'none';
        });
        
        this.animate();
    }
    
    handleMouseOver(e) {
        // Check if hovering over a button/link
        if (e.target.classList.contains('card') || e.target.closest('.card')) {
            this.isHoveringButton = true;
        }
    }
    
    handleMouseOut(e) {
        if (e.target.classList.contains('card') || e.target.closest('.card')) {
            this.isHoveringButton = false;
        }
    }
    
    handleSelectionChange() {
        const selectedText = window.getSelection().toString();
        this.isSelectingText = selectedText.length > 0;
    }
    
    handleResize() {
        this.cursorCanvas.width = window.innerWidth;
        this.cursorCanvas.height = window.innerHeight;
    }
    
    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }
    
    animate() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.cursorCanvas.width, this.cursorCanvas.height);
        
        if (this.isHoveringButton) {
            // Brighter, more intense glow for button hover
            this.drawGlowCircle(this.mouseX, this.mouseY, 45, 'rgba(255, 105, 180, 0.2)');
            this.drawGlowCircle(this.mouseX, this.mouseY, 30, 'rgba(122, 92, 255, 0.25)');
            this.drawGlowCircle(this.mouseX, this.mouseY, 18, 'rgba(109, 211, 255, 0.3)');
            
            // Larger core dot on button hover
            this.ctx.fillStyle = 'rgba(255, 105, 180, 1)';
            this.ctx.beginPath();
            this.ctx.arc(this.mouseX, this.mouseY, 5, 0, Math.PI * 2);
            this.ctx.fill();
        } else if (this.isSelectingText) {
            // Different appearance for text selection
            this.drawGlowCircle(this.mouseX, this.mouseY, 35, 'rgba(109, 211, 255, 0.15)');
            this.drawGlowCircle(this.mouseX, this.mouseY, 20, 'rgba(109, 211, 255, 0.2)');
            this.drawGlowCircle(this.mouseX, this.mouseY, 10, 'rgba(255, 105, 180, 0.15)');
            
            // Crosshair-like effect during text selection
            this.ctx.strokeStyle = 'rgba(109, 211, 255, 0.4)';
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(this.mouseX - 8, this.mouseY);
            this.ctx.lineTo(this.mouseX + 8, this.mouseY);
            this.ctx.moveTo(this.mouseX, this.mouseY - 8);
            this.ctx.lineTo(this.mouseX, this.mouseY + 8);
            this.ctx.stroke();
            
            // Core dot
            this.ctx.fillStyle = 'rgba(109, 211, 255, 0.9)';
            this.ctx.beginPath();
            this.ctx.arc(this.mouseX, this.mouseY, 2.5, 0, Math.PI * 2);
            this.ctx.fill();
        } else {
            // Normal cursor appearance
            this.drawGlowCircle(this.mouseX, this.mouseY, 30, 'rgba(109, 211, 255, 0.08)');
            this.drawGlowCircle(this.mouseX, this.mouseY, 18, 'rgba(122, 92, 255, 0.12)');
            this.drawGlowCircle(this.mouseX, this.mouseY, 10, 'rgba(255, 105, 180, 0.15)');
            
            this.ctx.fillStyle = 'rgba(200, 220, 255, 0.9)';
            this.ctx.beginPath();
            this.ctx.arc(this.mouseX, this.mouseY, 3, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawGlowCircle(x, y, radius, color) {
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

// Initialize glowing cursor when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new GlowingCursor();
});
