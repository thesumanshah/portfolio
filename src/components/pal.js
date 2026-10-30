import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePrefersReducedMotion } from '@hooks';
import { loadPal } from '@utils/piixpal';

const Pal = ({ pal, ...attrs }) => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    loadPal(pal);
    setIsMounted(true);
  }, [prefersReducedMotion]);

  if (!isMounted || prefersReducedMotion) {
    return null;
  }

  return <piix-pal pal={pal} {...attrs} />;
};

Pal.propTypes = {
  pal: PropTypes.string.isRequired,
};

export default Pal;
