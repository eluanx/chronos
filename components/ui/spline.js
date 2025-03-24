/**
 * A simplified version of the SplineScene component for vanilla JavaScript
 */
class SplineScene {
  /**
   * Create a SplineScene
   * @param {string} containerId - The ID of the container element
   * @param {string} scene - The URL of the Spline scene
   */
  constructor(containerId, scene) {
    this.container = document.getElementById(containerId);
    this.scene = scene;
    this.initialized = false;
  }

  /**
   * Initialize the Spline scene
   */
  init() {
    if (this.initialized) return;
    
    // Create a loading indicator
    const loader = document.createElement('div');
    loader.className = 'spline-loader';
    loader.innerHTML = '<span class="loader"></span>';
    this.container.appendChild(loader);
    
    // Load the Spline scene
    import('https://unpkg.com/@splinetool/viewer@0.9.490/build/spline-viewer.js')
      .then(() => {
        // Create the Spline viewer element
        const viewer = document.createElement('spline-viewer');
        viewer.setAttribute('url', this.scene);
        viewer.style.width = '100%';
        viewer.style.height = '100%';
        
        // Replace the loader with the viewer
        this.container.innerHTML = '';
        this.container.appendChild(viewer);
        this.initialized = true;
      })
      .catch(error => {
        console.error('Failed to load Spline viewer:', error);
        this.container.innerHTML = '<div class="error">Failed to load 3D scene</div>';
      });
  }
}

export { SplineScene };
