import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Books {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ unique: true })
  bookName: string;
}
