import {
  Column,
  Double,
  Entity,
  Long,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({
    type: 'bigint',
    default: -1,
  })
  last_login: number;

  @Column({
    type: 'bigint',
    default: 0,
  })
  login_count: number;
}
