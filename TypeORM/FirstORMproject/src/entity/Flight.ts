import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  F_number: number;

  @Column()
  F_name: string;

  @Column()
  Destination: string;

  @Column({ default: true })
  IsActive: boolean;
}
