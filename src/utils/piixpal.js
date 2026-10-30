// Only ever load these with import(): Piixpal reads `window` as soon as it's evaluated
const pals = {
  bitbug: () => import('piixpal/c/bitbug'),
  boing: () => import('piixpal/c/boing'),
  pip: () => import('piixpal/c/pip'),
  thread: () => import('piixpal/c/thread'),
  // Not on npm yet, copied from diiviikk5/Piixpal@54b56d2 (MIT). Swap to piixpal/c/wyrm once it is
  wyrm: () => {
    // It also calls a sound helper the npm core doesn't have, so give it a silent one
    window.Piixpal._k.sfx = () => {};
    return import('../vendor/piixpal-wyrm.min.js');
  },
};

let core;

// The core has to load first, otherwise each pal tries to fetch it from a URL
// based on its own script, which doesn't exist in a webpack build
export const loadPal = name => {
  core = core || import('piixpal/core');
  return core.then(pals[name]);
};
