import { Group } from 'src/group/entities/group.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'todo_study', name: 'user' })
export class User {
  @PrimaryColumn({ name: 'id', type: 'varchar', unique: true, length: 30 })
  id: string;

  @Column({ name: 'nickname', type: 'varchar', length: 30 })
  name: string;

  @Column({ name: 'profile_image', type: 'varchar', length: 100 })
  profile_image: string;

  @Column({ name: 'introduction', type: 'varchar', length: 100 })
  introduction: string;

  @ManyToOne(() => Group, (group) => group.users)
  group: Group;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
