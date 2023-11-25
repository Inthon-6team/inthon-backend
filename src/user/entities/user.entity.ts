import { ApiProperty } from '@nestjs/swagger';
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

@Entity({ schema: 'freedb_inthon', name: 'user' })
export class User {
  @ApiProperty({ example: 'admin', description: '아이디' })
  @PrimaryColumn({ name: 'id', type: 'varchar', unique: true, length: 30 })
  id: string;

  @ApiProperty({ example: '1234', description: '비밀번호' })
  @Column({ name: 'password', type: 'varchar', length: 100, select: false })
  password: string;

  @ApiProperty({ example: '우귀정', description: '닉네임' })
  @Column({ name: 'nickname', type: 'varchar', length: 30 })
  name: string;

  @ApiProperty({
    example: 'profile_image_base64',
    description: '프로필 이미지',
  })
  @Column({ name: 'profile_image', type: 'varchar', length: 500 })
  profile_image: string;

  @ApiProperty({ example: '행복한 우리 가족', description: '한 줄 소개' })
  @Column({ name: 'introduction', type: 'varchar', length: 100 })
  introduction: string;

  @ApiProperty({ example: '1', description: '그룹 아이디' })
  @ManyToOne(() => Group, (group) => group.users)
  group: Group;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
