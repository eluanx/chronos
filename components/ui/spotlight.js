import { cn } from '../../lib/utils.js';

/**
 * A simplified version of the Spotlight component for vanilla JavaScript
 */
class Spotlight {
  /**
   * Create a Spotlight
   * @param {string} containerId - The ID of the container element
   * @param {Object} options - Configuration options
   * @param {number} options.size - Size of the spotlight in pixels
   * @param {string} options.className - Additional CSS classes
   */
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.size = options.size || 200;
    this.className = options.className || '';
    this.isHovered = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.spotlightElement = null;
    this.initialized = false;
  }

  /**
   * Initialize the Spotlight
   */
  init() {
    if (this.initialized) return;
    
    // Ensure the container has relative positioning
    if (getComputedStyle(this.container).position === 'static') {
      this.container.style.position = 'relative';
    }
    this.container.style.overflow = 'hidden';
    
    // Create the spotlight element
    this.spotlightElement = document.createElement('div');
    this.spotlightElement.className = cn(
      'pointer-events-none absolute rounded-full bg-spotlight blur-xl transition-opacity duration-200',
      'opacity-0',
      this.className
    );
    this.spotlightElement.style.width = `${this.size}px`;
    this.spotlightElement.style.height = `${this.size}px`;
    this.container.appendChild(this.spotlightElement);
    
    // Add event listeners
    this.container.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.container.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    this.container.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    
    this.initialized = true;
  }
  
  /**
   * Handle mouse movement
   * @param {MouseEvent} event - The mouse event
   */
  handleMouseMove(event) {
    const rect = this.container.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
    
    this.updateSpotlightPosition();
  }
  
  /**
   * Handle mouse enter
   */
  handleMouseEnter() {
    this.isHovered = true;
    this.spotlightElement.classList.remove('opacity-0');
    this.spotlightElement.classList.add('opacity-100');
  }
  
  /**
   * Handle mouse leave
   */
  handleMouseLeave() {
    this.isHovered = false;
    this.spotlightElement.classList.remove('opacity-100');
    this.spotlightElement.classList.add('opacity-0');
  }
  
  /**
   * Update the spotlight position
   */
  updateSpotlightPosition() {
    const left = this.mouseX - this.size / 2;
    const top = this.mouseY - this.size / 2;
    
    this.spotlightElement.style.left = `${left}px`;
    this.spotlightElement.style.top = `${top}px`;
  }
}

export { Spotlight };
