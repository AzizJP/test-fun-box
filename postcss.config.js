/* eslint-disable import/no-extraneous-dependencies */
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export const plugins = [autoprefixer, cssnano({preset: 'default'})];
