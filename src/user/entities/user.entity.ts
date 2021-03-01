import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true, nullable: false })
  googleID: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  picture: string;

  @Column({ type: 'text' })
  email: string;
}
