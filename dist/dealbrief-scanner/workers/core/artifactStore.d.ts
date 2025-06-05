export type Severity = 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export interface ArtifactInput {
    type: string;
    val_text: string;
    severity?: Severity;
    src_url?: string;
    sha256?: string;
    mime?: string;
    meta?: Record<string, unknown>;
}
export declare function insertArtifact(a: ArtifactInput): Promise<number>;
export declare function insertFinding(artifactId: number, clazz: string, mitigation: string, summary: string): Promise<void>;
//# sourceMappingURL=artifactStore.d.ts.map