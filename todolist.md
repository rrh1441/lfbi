# TechStackScan Refactoring & Module Improvements Todolist

## 🎯 **Phase 1: TechStackScan Module Architecture Refactoring**

### Week 1: Cache Layer ✅ COMPLETED
- [x] Create unified cache interface (`techCache/index.ts`)
- [x] Implement LRU cache with TTL and byte limits (`techCache/lruCache.ts`) 
- [x] Create configuration module (`techStackConfig.ts`)
- [x] Replace 6 cache instances with 1 unified cache
- [x] Update all cache usage patterns in techStackScan.ts
- [x] Add lru-cache dependency
- [x] Validate zero linter errors

### Week 2: SBOM Generation ✅ COMPLETED
- [x] Create `sbomGenerator/` module directory
- [x] Extract SBOM generation interface (`sbomGenerator/index.ts`)
- [x] Move CycloneDX implementation (`sbomGenerator/cycloneDx.ts`)
- [x] Abstract SBOM generation behind clean interface
- [x] Update techStackScan.ts to use SBOM module
- [x] Remove local generateSBOM function and CycloneDXComponent interface
- [x] Unified modern and legacy SBOM approaches

### Week 3: Vulnerability Intelligence ✅ COMPLETED
- [x] Create `vulnIntelligence/` module directory
- [x] Extract vulnerability analysis interface (`vulnIntelligence/index.ts`)
- [x] Move OSV.dev client (`vulnIntelligence/osvClient.ts`)
- [x] Move GitHub advisory client (`vulnIntelligence/githubClient.ts`)
- [x] Extract EPSS enrichment (`vulnIntelligence/epssEnrichment.ts`)
- [x] Move CVE timeline validation (`vulnIntelligence/cveValidation.ts`)
- [x] Separated concerns for better testability and maintainability

### Week 4: Technology Detection
- [ ] Create `techDetection/` module directory
- [ ] Extract unified detection interface (`techDetection/index.ts`)
- [ ] Move FastTech integration (`techDetection/fastDetection.ts`)
- [ ] Move header analysis fallback (`techDetection/fallbackDetection.ts`)
- [ ] Preserve circuit breaker functionality
- [ ] Unify multiple detection methods
- [ ] Update techStackScan.ts to use tech detection module
- [ ] Run coverage comparison tests

### Week 5: Core Simplification & Cleanup
- [ ] Reduce techStackScan.ts to orchestration only (target: 300-400 lines)
- [ ] Remove dead imports and unused code
- [ ] Update dependency injection wiring
- [ ] Run `ts-prune` to find dead code
- [ ] Add comprehensive integration tests
- [ ] Run shadow mode A/B testing
- [ ] Performance benchmark comparisons

## 🔧 **Phase 2: Other Module Improvements**

### High Priority Fixes
- [ ] **dnsTwist.ts**: Fix AI prompt injection vulnerability (sanitize domain inputs)
- [ ] **clientSecretScanner.ts**: Fix YAML loading on every execution (load once at startup)
- [ ] **Nuclei consolidation**: Standardize nuclei usage across modules (nuclei.ts, techStackScan.ts, zapScan.ts)

### Error Handling & Reliability  
- [ ] **Standardize error handling**: Consistent try/catch patterns across all modules
- [ ] **Circuit breaker pattern**: Implement in modules that make external API calls
- [ ] **Timeout handling**: Review and standardize timeouts across modules
- [ ] **Graceful degradation**: Ensure modules continue with reduced functionality when dependencies fail

### Performance & Concurrency
- [ ] **Review concurrency limits**: Some modules have 20+ concurrent operations
- [ ] **Rate limiting**: Implement in Shodan, BreachDirectory, GitHub API modules  
- [ ] **Memory optimization**: Review techStackScan, documentExposure for memory leaks
- [ ] **Batch processing**: Optimize API calls in vulnerability modules

### Configuration & Deployment
- [ ] **Tier configuration**: Ensure all modules respect tier settings properly
- [ ] **Environment variables**: Standardize env var patterns across modules
- [ ] **Feature flags**: Add consistent feature flag support
- [ ] **Monitoring**: Add structured logging with module prefixes

### Security & Validation
- [ ] **Input sanitization**: Review all modules for injection vulnerabilities
- [ ] **Dependency validation**: Improve tool availability checks
- [ ] **Vulnerability deduplication**: Fix same CVEs reported from different scanners
- [ ] **Timeline validation**: Strengthen CVE timeline checks

## 📊 **Phase 3: Testing & Validation**

### Test Coverage
- [ ] **Unit tests**: Add for each extracted module
- [ ] **Integration tests**: Ensure module interactions work correctly
- [ ] **Snapshot tests**: Validate zero-diff during refactoring
- [ ] **Performance tests**: Benchmark before/after metrics

### Quality Assurance
- [ ] **Linting**: Ensure zero linter errors throughout
- [ ] **Type checking**: Strict TypeScript compliance
- [ ] **Code review**: Document all public interfaces
- [ ] **Documentation**: Update module README files

## 🚀 **Deployment & Monitoring**

### Rollout Strategy
- [ ] **Shadow mode**: Run old and new implementations in parallel
- [ ] **Gradual rollout**: Incrementally increase traffic to new modules
- [ ] **Rollback plan**: Prepare quick rollback procedures
- [ ] **Monitoring**: Set up alerts for performance degradation

### Success Metrics
- [ ] **Performance**: Response times within 10% of baseline
- [ ] **Memory**: Reduced memory usage from unified caching
- [ ] **Reliability**: Error rates same or better than before
- [ ] **Maintainability**: Reduced cyclomatic complexity

---

## 📝 **Progress Tracking**

**Week 1 (Cache Layer)**: ✅ COMPLETED
- Unified 6 caches into 1 with typed keys
- Added memory limits and better monitoring
- Zero linter errors, ready for production

**Week 2 (SBOM Generation)**: ✅ COMPLETED
- Created unified SBOM interface supporting both modern and legacy approaches
- Extracted CycloneDX implementation into dedicated module
- Removed 70+ lines from techStackScan.ts
- Zero linter errors, maintains compatibility

**Current Status**: Starting Week 3 (Vulnerability Intelligence)
**Next**: Extract vulnerability analysis into dedicated module

**Last Updated**: $(date) 