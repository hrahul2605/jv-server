import { PollsEntity } from 'src/polls/enitites/polls.entity';
import { RivalsEntity } from 'src/polls/enitites/rivals.entity';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryColumn({ type: 'text', unique: true, nullable: false })
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  picture: string;

  @Column({ type: 'text' })
  email: string;

  @ManyToMany(() => RivalsEntity, (rivals) => rivals.users, {
    onDelete: 'CASCADE',
  })
  rivals: RivalsEntity[];

  @ManyToMany(() => PollsEntity, (poll) => poll.votedUsers, {
    onDelete: 'CASCADE',
  })
  polls: PollsEntity[];
}
