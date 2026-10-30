// Only ever load these with import(): Piixpal reads `window` as soon as it's evaluated
const pals = {
  bitbug: () => import('piixpal/c/bitbug'),
  boing: () => import('piixpal/c/boing'),
  pip: () => import('piixpal/c/pip'),
};

let core;

// The core has to load first, otherwise each pal tries to fetch it from a URL
// based on its own script, which doesn't exist in a webpack build
export const loadPal = name => {
  core = core || import('piixpal/core');
  return core.then(pals[name]);
};
