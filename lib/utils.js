/**
 * Concatenates class names, filtering out falsy values
 * @param  {...string} classes - Class names to concatenate
 * @returns {string} - Concatenated class names
 */
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export { cn };
