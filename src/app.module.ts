import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StoryModule } from './story/story.module';

@Module({
  imports: [StoryModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
