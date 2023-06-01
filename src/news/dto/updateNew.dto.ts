import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateNewDto {
  @ApiProperty({ example: '新闻内容', description: '新闻内容' })
  @IsNotEmpty({ message: '请输入新闻信息' })
  readonly content: string;
}
