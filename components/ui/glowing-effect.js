// Glowing Effect Component
import { cn } from '../../lib/utils.js';

class GlowingEffect {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      blur: options.blur || 0,
      inactiveZone: options.inactiveZone || 0.7,
      proximity: options.proximity || 0,
      spread: options.spread || 20,
      variant: options.variant || 'default',
      glow: options.glow !== undefined ? options.glow : false,
      movementDuration: options.movementDuration || 2,
      borderWidth: options.borderWidth || 1,
      disabled: options.disabled !== undefined ? options.disabled : true,
    };
    
    this.containerRef = null;
    this.lastPosition = { x: 0, y: 0 };
    this.animationFrameId = null;
    
    this.init();
  }
  
  init() {
    if (this.options.disabled) {
      // Create a static border for disabled state
      const borderDiv = document.createElement('div');
      borderDiv.className = cn(
        "pointer-events-none absolute -inset-px rounded-[inherit] border opacity-0 transition-opacity",
        this.options.glow && "opacity-100",
        this.options.variant === "white" && "border-white",
        "!block"
      );
      this.element.appendChild(borderDiv);
      return;
    }
    
    // Create container element for active glow effect
    this.containerRef = document.createElement('div');
    
    // Set custom properties
    this.containerRef.style.setProperty('--blur', `${this.options.blur}px`);
    this.containerRef.style.setProperty('--spread', this.options.spread);
    this.containerRef.style.setProperty('--start', '0');
    this.containerRef.style.setProperty('--active', '0');
    this.containerRef.style.setProperty('--glowingeffect-border-width', `${this.options.borderWidth}px`);
    this.containerRef.style.setProperty('--repeating-conic-gradient-times', '5');
    
    // Set gradient based on variant
    if (this.options.variant === 'white') {
      this.containerRef.style.setProperty(
        '--gradient',
        `repeating-conic-gradient(
          from 236.84deg at 50% 50%,
          var(--black),
          var(--black) calc(25% / var(--repeating-conic-gradient-times))
        )`
      );
    } else {
      this.containerRef.style.setProperty(
        '--gradient',
        `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
        radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
        radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%), 
        radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
        repeating-conic-gradient(
          from 236.84deg at 50% 50%,
          #dd7bbb 0%,
          #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
          #5a922c calc(50% / var(--repeating-conic-gradient-times)), 
          #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
          #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
        )`
      );
    }
    
    this.containerRef.className = cn(
      "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
      this.options.glow && "opacity-100",
      this.options.blur > 0 && "blur-[var(--blur)]"
    );
    
    // Create glow element
    const glowElement = document.createElement('div');
    glowElement.className = cn(
      "glow",
      "rounded-[inherit]",
      'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
      "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
      "after:[background:var(--gradient)] after:[background-attachment:fixed]",
      "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
      "after:[mask-clip:padding-box,border-box]",
      "after:[mask-composite:intersect]",
      "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
    );
    
    this.containerRef.appendChild(glowElement);
    this.element.appendChild(this.containerRef);
    
    // Add event listeners
    document.addEventListener('pointermove', this.handlePointerMove.bind(this), { passive: true });
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
  }
  
  handlePointerMove(e) {
    this.handleMove(e);
  }
  
  handleScroll() {
    this.handleMove();
  }
  
  handleMove(e) {
    if (this.options.disabled || !this.containerRef) return;
    
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    this.animationFrameId = requestAnimationFrame(() => {
      const element = this.containerRef;
      if (!element) return;
      
      const { left, top, width, height } = this.element.getBoundingClientRect();
      const mouseX = e ? e.clientX : this.lastPosition.x;
      const mouseY = e ? e.clientY : this.lastPosition.y;
      
      if (e) {
        this.lastPosition = { x: mouseX, y: mouseY };
      }
      
      const center = [left + width * 0.5, top + height * 0.5];
      const distanceFromCenter = Math.hypot(
        mouseX - center[0],
        mouseY - center[1]
      );
      const inactiveRadius = 0.5 * Math.min(width, height) * this.options.inactiveZone;
      
      if (distanceFromCenter < inactiveRadius) {
        element.style.setProperty('--active', '0');
        return;
      }
      
      const isActive =
        mouseX > left - this.options.proximity &&
        mouseX < left + width + this.options.proximity &&
        mouseY > top - this.options.proximity &&
        mouseY < top + height + this.options.proximity;
      
      element.style.setProperty('--active', isActive ? '1' : '0');
      
      if (!isActive) return;
      
      const currentAngle = parseFloat(element.style.getPropertyValue('--start')) || 0;
      let targetAngle =
        (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;
      
      const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
      const newAngle = currentAngle + angleDiff;
      
      this.animateAngle(currentAngle, newAngle);
    });
  }
  
  animateAngle(start, end) {
    const duration = this.options.movementDuration * 1000;
    const startTime = performance.now();
    const ease = (t) => {
      // Cubic bezier approximation of [0.16, 1, 0.3, 1]
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };
    
    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = ease(progress);
      const value = start + (end - start) * easedProgress;
      
      this.containerRef.style.setProperty('--start', String(value));
      
      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    this.animationFrameId = requestAnimationFrame(animate);
  }
  
  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    document.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('scroll', this.handleScroll);
    
    if (this.containerRef && this.element.contains(this.containerRef)) {
      this.element.removeChild(this.containerRef);
    }
  }
}

// Helper function to apply the glowing effect to elements
function applyGlowingEffect(selector, options = {}) {
  const elements = document.querySelectorAll(selector);
  const instances = [];
  
  elements.forEach(element => {
    instances.push(new GlowingEffect(element, options));
  });
  
  return instances;
}

export { GlowingEffect, applyGlowingEffect };
