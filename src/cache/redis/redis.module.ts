import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from 'src/configs/api-options.constants';

@Module({
  imports: [CacheModule.registerAsync(RedisOptions)],
})
export class RedisModule {}
