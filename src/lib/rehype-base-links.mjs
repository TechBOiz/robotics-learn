// Lets articles link to other pages with root-relative paths such as
// [transmissions](/actuators/transmissions/) and still work when the site is
// served from a sub-path (GitHub Pages project sites).
export function rehypeBaseLinks({ base = '' } = {}) {
  const prefix = base.replace(/\/$/, '');
  const visit = (node) => {
    if (node.type === 'element' && node.tagName === 'a') {
      const link = node.properties?.href;
      if (prefix && typeof link === 'string' && link.startsWith('/') && !link.startsWith('//') && !link.startsWith(prefix + '/')) {
        node.properties.href = prefix + link;
      }
    }
    if (node.children) node.children.forEach(visit);
  };
  return (tree) => visit(tree);
}
