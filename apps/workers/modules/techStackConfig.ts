// Deployment-specific configuration for techStackScan and related modules
export interface TechStackConfig {
  // Essential runtime configs
  maxTargets: number;
  timeoutMs: number;
  maxConcurrency: number;
  
  // Deployment-specific (env-configurable) 
  apiTimeoutMs: number;      // Network varies by region
  cacheTtlMs: number;        // Ops-tunable
  cacheMaxMemoryMB: number;  // Memory limits per deployment
  
  // Feature flags
  enableNucleiCVE: boolean;
  enableCircuitBreaker: boolean;
  enableVulnTimeline: boolean;
  enableSBOMGeneration: boolean;
}

export const defaultConfig: TechStackConfig = {
  // Runtime limits
  maxTargets: 10,
  timeoutMs: 30_000,
  maxConcurrency: 5,
  
  // Environment-specific
  apiTimeoutMs: parseInt(process.env.TECH_STACK_API_TIMEOUT_MS || '15000'),
  cacheTtlMs: parseInt(process.env.TECH_STACK_CACHE_TTL_MS || '86400000'), // 24h
  cacheMaxMemoryMB: parseInt(process.env.TECH_STACK_CACHE_MAX_MB || '100'),
  
  // Feature flags
  enableNucleiCVE: process.env.TECH_STACK_ENABLE_NUCLEI_CVE !== '0',
  enableCircuitBreaker: process.env.TECH_STACK_ENABLE_CIRCUIT_BREAKER !== '0',
  enableVulnTimeline: process.env.TECH_STACK_ENABLE_VULN_TIMELINE !== '0',
  enableSBOMGeneration: process.env.TECH_STACK_ENABLE_SBOM !== '0',
};

// Validation helper
export function validateConfig(config: TechStackConfig): void {
  if (config.maxTargets <= 0 || config.maxTargets > 50) {
    throw new Error(`Invalid maxTargets: ${config.maxTargets}. Must be 1-50.`);
  }
  
  if (config.timeoutMs < 5000 || config.timeoutMs > 300000) {
    throw new Error(`Invalid timeoutMs: ${config.timeoutMs}. Must be 5s-5min.`);
  }
  
  if (config.maxConcurrency <= 0 || config.maxConcurrency > 20) {
    throw new Error(`Invalid maxConcurrency: ${config.maxConcurrency}. Must be 1-20.`);
  }
  
  if (config.cacheMaxMemoryMB < 10 || config.cacheMaxMemoryMB > 1000) {
    throw new Error(`Invalid cacheMaxMemoryMB: ${config.cacheMaxMemoryMB}. Must be 10-1000MB.`);
  }
}

// Create validated config instance
export function createTechStackConfig(overrides: Partial<TechStackConfig> = {}): TechStackConfig {
  const config = { ...defaultConfig, ...overrides };
  validateConfig(config);
  return config;
} 