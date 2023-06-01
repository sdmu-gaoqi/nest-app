import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddNewDto {
  @ApiProperty({ example: '', description: '标题' })
  @IsNotEmpty({ message: '请输入标题' })
  readonly title: string;
  @ApiProperty({ example: '', description: '内容' })
  @IsNotEmpty({ message: '请输入内容' })
  readonly content: string;
}
