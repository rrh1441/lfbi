import { Pool } from 'pg';
export declare const pool: Pool;
export interface ArtifactInput {
    type: string;
    val_text: string;
    severity: 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    src_url?: string;
    sha256?: string;
    mime?: string;
    meta?: Record<string, any>;
}
export interface Finding {
    artifact_id: number;
    finding_type: string;
    recommendation: string;
    description: string;
}
export declare function insertArtifact(artifact: ArtifactInput): Promise<number>;
export declare function insertFinding(artifactId: number, findingType: string, recommendation: string, description: string): Promise<number>;
export declare function initializeDatabase(): Promise<void>;
//# sourceMappingURL=artifactStore.d.ts.map