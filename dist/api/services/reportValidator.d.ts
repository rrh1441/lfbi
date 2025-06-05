export interface ValidationResult {
    isValid: boolean;
    realFindings: number;
    errorMessage?: string;
    scanStatus: 'valid' | 'no_data' | 'scan_failed' | 'invalid';
}
export declare function validateScanData(scanId: string): Promise<ValidationResult>;
export declare function getVerifiedArtifacts(scanId: string): Promise<any[]>;
export declare function getVerifiedFindings(scanId: string): Promise<any[]>;
//# sourceMappingURL=reportValidator.d.ts.map