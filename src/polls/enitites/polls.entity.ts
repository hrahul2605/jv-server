import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PollsDto } from '../dto/polls.dto';
import { RivalsEntity } from './rivals.entity';

@Entity('polls')
export class PollsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  googleID: string;

  @Column({ type: 'text', unique: true })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'jsonb', default: [] })
  votedUsers: string[];

  @Column({ type: 'integer', default: 0 })
  voteCount: number;

  @Column({ type: 'timestamptz' })
  startTime: Date;

  @Column({ type: 'timestamptz' })
  endTime: Date;

  @OneToMany(() => RivalsEntity, (rivals) => rivals.polls)
  @JoinColumn()
  rivals: RivalsEntity[];

  constructor(data?: PollsDto) {
    this.googleID = data?.googleID;
    this.title = data?.title;
    this.description = data?.description;
    this.startTime = data?.startTime;
    this.endTime = data?.endTime;
  }
}
