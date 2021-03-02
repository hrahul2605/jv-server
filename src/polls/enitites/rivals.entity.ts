import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PollsEntity } from './polls.entity';

@Entity('rivals')
export class RivalsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column({ type: 'integer', default: 0 })
  votes: number;

  @ManyToOne(() => PollsEntity, (polls) => polls.id, { onDelete: 'CASCADE' })
  polls: PollsEntity;
}
