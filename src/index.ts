import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';

(async () => {
    const app = await NestFactory.create(AppModule);

    await app.listen(8080);
})();
