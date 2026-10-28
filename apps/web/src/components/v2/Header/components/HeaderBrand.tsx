import { Link } from 'react-router';

import copy from '@/content/en.json';

import { SHOW_IMAGE_LOGO } from '../constants';

export function HeaderBrand() {
  return (
    <Link id="header-logo" to="/">
      {SHOW_IMAGE_LOGO && (
        <img
          src="/assets/poke-stock/champion-gang.webp"
          alt="Profile Image"
          style={{
            objectFit: 'contain',
            objectPosition: 'center',
            aspectRatio: '4/3',
            height: '64px',
            width: 'auto',
            overflow: 'hidden'
          }}
        />
      )}
      <h1>{copy.site.name}</h1>
    </Link>
  );
}
