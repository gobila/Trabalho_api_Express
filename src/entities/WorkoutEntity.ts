import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { AthleteEntity } from "./AthleteEntity";


@Entity({ name: "workouts" })
export class WorkoutEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", nullable: false })
    name!: string;

    @Column({ type: "text", nullable: false })
    description!: string;

    @Column({ type: "int", nullable: false })
    athleteId!: number;

    @ManyToOne(() => AthleteEntity, (athlete) => athlete.workouts, { onDelete: "CASCADE" })
    @JoinColumn({ name: "athleteId" })
    athlete!: AthleteEntity;
}
