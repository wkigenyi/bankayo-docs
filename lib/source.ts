import { loader } from 'fumadocs-core/source';

import { docs } from '@/.source/server';

export const helpSource = loader({
  baseUrl: '/help',
  source: docs.toFumadocsSource(),
});
