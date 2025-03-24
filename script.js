// Import components
import { SplineScene } from './components/ui/spline.js';
import { Spotlight } from './components/ui/spotlight.js';
import { applyGlowingEffect } from './components/ui/glowing-effect.js';

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Add scroll animations
    setupScrollAnimations();
    
    // Create technical diagram placeholder
    createDiagramPlaceholder();
    
    // Setup feature carousel
    setupFeatureCarousel();
    
    // Setup Spline scene
    setupSplineScene();
    
    // Setup Spotlight effect
    setupSpotlight();
    
    // Setup glowing effect for cards
    setupGlowingEffect();
});

// Setup glowing effect for cards
function setupGlowingEffect() {
    // Apply glowing effect to feature cards
    applyGlowingEffect('.glowing-card', {
        spread: 40,
        glow: true,
        disabled: false, // Enable the glowing effect
        proximity: 64,
        inactiveZone: 0.01,
        borderWidth: 3,
        blur: 0,
        movementDuration: 1.5,
        variant: 'default'
    });
}

// Setup Spline scene
function setupSplineScene() {
    // Setup hero Spline scene
    const heroSplineViewer = document.getElementById('hero-spline-viewer');
    if (heroSplineViewer) {
        // Create the hero Spline scene
        const heroSplineScene = new SplineScene(
            'hero-spline-viewer',
            'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'
        );
        
        // Initialize the hero scene
        heroSplineScene.init();
    }
}

// Setup Spotlight effect
function setupSpotlight() {
    // Skip spotlight setup for now
    return;
}

// Setup feature carousel
function setupFeatureCarousel() {
    const carousel = document.getElementById('feature-carousel');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    
    if (!carousel || !prevButton || !nextButton) return;
    
    let currentSlide = 0;
    const slides = carousel.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    
    // Initialize carousel
    updateCarousel();
    
    // Add event listeners
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });
    
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });
    
    // Auto-advance carousel every 5 seconds
    let autoplayInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }, 5000);
    
    // Pause autoplay on hover
    carousel.parentElement.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    carousel.parentElement.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    });
    
    // Update carousel position and button states
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update button states
        prevButton.disabled = currentSlide === 0;
        nextButton.disabled = currentSlide === totalSlides - 1;
    }
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add scroll animations to elements
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .use-case-card, .workflow-step');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe each element
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// Create a technical diagram placeholder
function createDiagramPlaceholder() {
    const diagramImg = document.querySelector('.diagram');
    
    if (diagramImg) {
        // Create a canvas element for the diagram
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 400;
        canvas.className = 'diagram';
        
        const ctx = canvas.getContext('2d');
        
        // Set background
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw border
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
        
        // Draw title
        ctx.font = 'bold 24px Inter, sans-serif';
        ctx.fillStyle = '#f8fafc';
        ctx.textAlign = 'center';
        ctx.fillText('Chronos MCP Architecture', canvas.width / 2, 50);
        
        // Draw components
        drawComponent(ctx, 200, 150, 'AI Application', '#6366f1');
        drawComponent(ctx, 400, 150, 'Chronos MCP Server', '#8b5cf6');
        drawComponent(ctx, 600, 150, 'Stellar Network', '#0ea5e9');
        
        // Draw arrows
        drawArrow(ctx, 250, 150, 350, 150);
        drawArrow(ctx, 450, 150, 550, 150);
        
        // Draw labels
        ctx.font = '14px Inter, sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.textAlign = 'center';
        ctx.fillText('MCP Protocol', 300, 130);
        ctx.fillText('Stellar API', 500, 130);
        
        // Draw operations
        ctx.font = '12px Inter, sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.textAlign = 'left';
        
        const operations = [
            'stellar_get_account',
            'stellar_create_transaction',
            'stellar_submit_transaction',
            'stellar_get_assets',
            'stellar_query_ledger'
        ];
        
        operations.forEach((op, index) => {
            ctx.fillText(`• ${op}`, 320, 220 + index * 20);
        });
        
        // Replace the img with the canvas
        diagramImg.parentNode.replaceChild(canvas, diagramImg);
    }
}

// Helper function to draw a component box
function drawComponent(ctx, x, y, text, color) {
    const width = 150;
    const height = 80;
    
    // Draw box with gradient
    const gradient = ctx.createLinearGradient(x - width/2, y - height/2, x + width/2, y + height/2);
    gradient.addColorStop(0, color + '20'); // 20 = 12% opacity in hex
    gradient.addColorStop(1, color + '10'); // 10 = 6% opacity in hex
    
    ctx.fillStyle = gradient;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    
    // Rounded rectangle
    const radius = 10;
    ctx.beginPath();
    ctx.moveTo(x - width/2 + radius, y - height/2);
    ctx.lineTo(x + width/2 - radius, y - height/2);
    ctx.quadraticCurveTo(x + width/2, y - height/2, x + width/2, y - height/2 + radius);
    ctx.lineTo(x + width/2, y + height/2 - radius);
    ctx.quadraticCurveTo(x + width/2, y + height/2, x + width/2 - radius, y + height/2);
    ctx.lineTo(x - width/2 + radius, y + height/2);
    ctx.quadraticCurveTo(x - width/2, y + height/2, x - width/2, y + height/2 - radius);
    ctx.lineTo(x - width/2, y - height/2 + radius);
    ctx.quadraticCurveTo(x - width/2, y - height/2, x - width/2 + radius, y - height/2);
    ctx.closePath();
    
    ctx.fill();
    ctx.stroke();
    
    // Draw text
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.fillStyle = '#f8fafc';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
}

// Helper function to draw an arrow
function drawArrow(ctx, fromX, fromY, toX, toY) {
    const headLength = 10;
    const headAngle = Math.PI / 6;
    
    // Calculate the angle of the line
    const angle = Math.atan2(toY - fromY, toX - fromX);
    
    // Draw the line
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw the arrow head
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
        toX - headLength * Math.cos(angle - headAngle),
        toY - headLength * Math.sin(angle - headAngle)
    );
    ctx.lineTo(
        toX - headLength * Math.cos(angle + headAngle),
        toY - headLength * Math.sin(angle + headAngle)
    );
    ctx.closePath();
    ctx.fillStyle = '#94a3b8';
    ctx.fill();
}
