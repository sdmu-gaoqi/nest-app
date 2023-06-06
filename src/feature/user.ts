import { Column, Double, Entity, Long, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
  })
  last_login: number;

  @Column()
  login_count: number;
}
