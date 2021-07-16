import { RivalsEntity } from 'src/polls/enitites/rivals.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToMany(() => RivalsEntity, (rivals) => rivals.users, {
    onDelete: 'CASCADE',
  })
  rivals: RivalsEntity[];
}
