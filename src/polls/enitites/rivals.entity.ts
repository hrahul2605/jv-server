import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PollsEntity } from './polls.entity';

@Entity('rivals')
export class RivalsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column({ type: 'integer', default: 0 })
  votes: number;

  @ManyToMany(() => UserEntity, (user) => user.rivals)
  @JoinTable()
  users: UserEntity[];

  @ManyToOne(() => PollsEntity, (polls) => polls.id, { onDelete: 'CASCADE' })
  polls: PollsEntity;
}
