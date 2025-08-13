import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Tenant } from "./Tenant";

@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column({ unique: true })
    email: string;
    @Column({ select: false })
    password: string;
    @Column()
    role: string;
    @ManyToOne(() => Tenant)
    @JoinColumn({ name: "tenant_id" })
    tenant: Tenant | null;
}
