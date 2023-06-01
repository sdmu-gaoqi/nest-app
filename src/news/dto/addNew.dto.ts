import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddNewDto {
  @ApiProperty({ example: '张三', description: '' })
  @IsNotEmpty({ message: '请输入标题' })
  readonly title: string;
  @ApiProperty({ example: 'abc123', description: '' })
  @IsNotEmpty({ message: '请输入内容' })
  readonly content: string;
}
