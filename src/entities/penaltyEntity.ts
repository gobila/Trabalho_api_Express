import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('Penalty')
export class Penalty {
  @PrimaryColumn({ type: 'varchar' })
  id!: string;

  @Column({ type: 'varchar' })
  username!: string;

  @Column({ type: 'varchar' })
  plate!: string;

  @Column({ type: 'varchar' })
  reason!: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;
}
