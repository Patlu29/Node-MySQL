import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: "bigint" })
  F_number: number;

  @Column()
  F_name: string;

  @Column()
  Destination: string;

  @Column({ default: true })
  IsActive: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
