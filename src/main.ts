import 'dotenv/config';
import 'reflect-metadata';

import { helloWorld } from '@/core/hello';

async function bootstrap() {
  helloWorld();
  const a = new Promise(resolve => setTimeout(resolve, 1e3 * 20));
  await a;
}

bootstrap();
