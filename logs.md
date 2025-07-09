2025-07-09 08:08:51.739	
[2025-07-09T15:08:51.738Z] [queue-monitor] Queue: 0 jobs, Workers: 0 running, 0 needed
2025-07-09 08:08:51.739	
[2025-07-09T15:08:51.738Z] [queue-monitor] Failed to fetch machines: 401 {"error":"verify: invalid token: all tokens missing third-party discharge tokens; no verified tokens; token e60f8cd1-a991-50f2-a3f8-cccca3b7f28c: missing third-party discharge token"}
2025-07-09 08:08:49.021	
}
2025-07-09 08:08:49.021	
"CRITICAL_INFOSTEALER": 9
2025-07-09 08:08:49.021	
"MEDIUM_EMAIL_EXPOSED": 504,
2025-07-09 08:08:49.021	
"HIGH_PASSWORD_EXPOSED": 54,
2025-07-09 08:08:49.021	
[2025-07-09T15:08:49.021Z] [SyncWorker] ✅ New compromised credentials synced: 567 {
2025-07-09 08:07:52.370	
[2025-07-09T15:07:52.369Z] [queue-monitor] Queue: 0 jobs, Workers: 0 running, 0 needed
2025-07-09 08:07:52.370	
[2025-07-09T15:07:52.369Z] [queue-monitor] Failed to fetch machines: 401 {"error":"verify: invalid token: all tokens missing third-party discharge tokens; no verified tokens; token e60f8cd1-a991-50f2-a3f8-cccca3b7f28c: missing third-party discharge token"}
2025-07-09 08:07:52.285	
[2025-07-09T15:07:52.285Z] [nvd-mirror-worker] NVD mirror worker completed successfully in 383ms
2025-07-09 08:07:52.285	
[2025-07-09T15:07:52.285Z] [nvd-mirror-worker] NVD mirror update completed: 0 CVEs, 0.06MB, last sync: Never
2025-07-09 08:07:52.285	
extra argument: "(SELECT"
2025-07-09 08:07:52.285	
(SELECT value FROM sync_metadata WHERE key = 'last_sync') as last_sync
2025-07-09 08:07:52.285	
(SELECT COUNT(*) FROM vulnerabilities) as total_cves,
2025-07-09 08:07:52.285	
SELECT
2025-07-09 08:07:52.285	
[2025-07-09T15:07:52.285Z] [nvdMirror] SQL query failed: Command failed: sqlite3 /tmp/nvd_mirror.sqlite .mode json
2025-07-09 08:07:52.285	
extra argument: "(SELECT"
2025-07-09 08:07:52.285	
(SELECT value FROM sync_metadata WHERE key = 'last_sync') as last_sync
2025-07-09 08:07:52.285	
(SELECT COUNT(*) FROM vulnerabilities) as total_cves,
2025-07-09 08:07:52.285	
SELECT
2025-07-09 08:07:52.285	
[2025-07-09T15:07:52.285Z] [nvdMirror] SQL execution failed: Command failed: sqlite3 /tmp/nvd_mirror.sqlite .mode json
2025-07-09 08:07:52.281	
(Use `node --trace-warnings ...` to show where the warning was created)
2025-07-09 08:07:52.281	
(node:662) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate verification.
2025-07-09 08:07:52.196	
[2025-07-09T15:07:52.196Z] [nvdMirror] Syncing CVEs modified since 2025-06-09T15:07:52.196Z...
2025-07-09 08:07:52.196	
extra argument: "value"
2025-07-09 08:07:52.196	
SELECT value FROM sync_metadata WHERE key = 'last_sync'
2025-07-09 08:07:52.196	
[2025-07-09T15:07:52.196Z] [nvdMirror] SQL query failed: Command failed: sqlite3 /tmp/nvd_mirror.sqlite .mode json
2025-07-09 08:07:52.192	
extra argument: "value"
2025-07-09 08:07:52.192	
SELECT value FROM sync_metadata WHERE key = 'last_sync'
2025-07-09 08:07:52.192	
[2025-07-09T15:07:52.192Z] [nvdMirror] SQL execution failed: Command failed: sqlite3 /tmp/nvd_mirror.sqlite .mode json
2025-07-09 08:07:52.182	
[2025-07-09T15:07:52.182Z] [nvd-mirror-worker] NVD mirror sync completed
2025-07-09 08:07:52.182	
[2025-07-09T15:07:52.182Z] [nvd-mirror-worker] NVD mirror database initialized
2025-07-09 08:07:52.178	
[2025-07-09T15:07:52.178Z] [nvdMirror] Starting NVD data sync...
2025-07-09 08:07:52.177	
[2025-07-09T15:07:52.177Z] [nvdMirror] NVD mirror is stale, initiating background sync...
2025-07-09 08:07:52.177	
extra argument: "*"
2025-07-09 08:07:52.177	
SELECT * FROM sync_metadata WHERE key = 'last_sync'
2025-07-09 08:07:52.177	
[2025-07-09T15:07:52.177Z] [nvdMirror] SQL query failed: Command failed: sqlite3 /tmp/nvd_mirror.sqlite .mode json
2025-07-09 08:07:52.176	
extra argument: "*"
2025-07-09 08:07:52.176	
SELECT * FROM sync_metadata WHERE key = 'last_sync'
2025-07-09 08:07:52.176	
[2025-07-09T15:07:52.176Z] [nvdMirror] SQL execution failed: Command failed: sqlite3 /tmp/nvd_mirror.sqlite .mode json
2025-07-09 08:07:52.166	
[2025-07-09T15:07:52.166Z] [nvdMirror] NVD mirror database initialized successfully
2025-07-09 08:07:51.939	
{
  "level": 30,
  "time": 1752073671032,
  "pid": 659,
  "hostname": "148e21dae24d98",
  "msg": "Server listening at http://172.19.19.27:3000"
}
2025-07-09 08:07:51.939	
{
  "level": 30,
  "time": 1752073671032,
  "pid": 659,
  "hostname": "148e21dae24d98",
  "msg": "Server listening at http://172.19.19.26:3000"
}
2025-07-09 08:07:51.938	
(Use `node --trace-warnings ...` to show where the warning was created)
2025-07-09 08:07:51.938	
(node:659) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate verification.
2025-07-09 08:07:51.903	
[2025-07-09T15:07:51.903Z] [nvdMirror] Initializing NVD mirror database...
2025-07-09 08:07:51.903	
[2025-07-09T15:07:51.903Z] [nvd-mirror-worker] Starting daily NVD mirror update...
2025-07-09 08:07:51.341	
[2025-07-09T15:07:51.340Z] [api] Starting queue monitoring cron job (every 60 seconds)...
2025-07-09 08:07:51.341	
[2025-07-09T15:07:51.033Z] [api] Server listening on port 3000
2025-07-09 08:07:51.032	
{
  "level": 30,
  "time": 1752073671032,
  "pid": 659,
  "hostname": "148e21dae24d98",
  "msg": "Server listening at http://127.0.0.1:3000"
}
2025-07-09 08:07:50.983	
{
  "level": 40,
  "time": 1752073670982,
  "pid": 659,
  "hostname": "148e21dae24d98",
  "msg": "\"root\" path \"/app/apps/public\" must exist"
}
2025-07-09 08:07:50.900	
(Use `node --trace-warnings ...` to show where the warning was created)
2025-07-09 08:07:50.900	
(node:668) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate verification.
2025-07-09 08:07:50.845	
[2025-07-09T15:07:50.845Z] [worker] No incomplete scans found to clean up
2025-07-09 08:07:50.844	
[2025-07-09T15:07:50.843Z] [worker] Database and scans_master table initialized successfully
2025-07-09 08:07:50.841	
[artifactStore] Database initialized successfully
2025-07-09 08:07:50.841	
]
2025-07-09 08:07:50.841	
'repro_command(text)'
2025-07-09 08:07:50.841	
'created_at(timestamp without time zone)',
2025-07-09 08:07:50.841	
'description(text)',
2025-07-09 08:07:50.841	
'recommendation(text)',
2025-07-09 08:07:50.841	
'finding_type(character varying)',
2025-07-09 08:07:50.841	
'artifact_id(integer)',
2025-07-09 08:07:50.841	
'id(integer)',
2025-07-09 08:07:50.841	
[artifactStore] findings columns: [
2025-07-09 08:07:50.841	
]
2025-07-09 08:07:50.841	
'created_at(timestamp without time zone)'
2025-07-09 08:07:50.841	
'meta(jsonb)',
2025-07-09 08:07:50.841	
'mime(character varying)',
2025-07-09 08:07:50.841	
'sha256(character varying)',
2025-07-09 08:07:50.841	
'src_url(text)',
2025-07-09 08:07:50.841	
'severity(character varying)',
2025-07-09 08:07:50.841	
'val_text(text)',
2025-07-09 08:07:50.841	
'type(character varying)',
2025-07-09 08:07:50.841	
'id(integer)',
2025-07-09 08:07:50.841	
[artifactStore] artifacts columns: [
2025-07-09 08:07:50.841	
]
2025-07-09 08:07:50.841	
'total_artifacts_count(integer)'
2025-07-09 08:07:50.841	
'completed_at(timestamp with time zone)',
2025-07-09 08:07:50.841	
'updated_at(timestamp with time zone)',
2025-07-09 08:07:50.841	
'created_at(timestamp with time zone)',
2025-07-09 08:07:50.841	
'max_severity(character varying)',
2025-07-09 08:07:50.841	
'total_findings_count(integer)',
2025-07-09 08:07:50.841	
'error_message(text)',
2025-07-09 08:07:50.841	
'total_modules(integer)',
2025-07-09 08:07:50.841	
'current_module(character varying)',
2025-07-09 08:07:50.841	
'progress(integer)',
2025-07-09 08:07:50.841	
'status(character varying)',
2025-07-09 08:07:50.841	
'domain(character varying)',
2025-07-09 08:07:50.841	
'company_name(character varying)',
2025-07-09 08:07:50.841	
'scan_id(character varying)',
2025-07-09 08:07:50.841	
[artifactStore] scans_master columns: [
2025-07-09 08:07:50.840	
[artifactStore] Current database schema:
2025-07-09 08:07:50.833	
[artifactStore] ✅ Successfully processed total_artifacts_count column check
2025-07-09 08:07:50.826	
[artifactStore] Attempting to ensure scans_master.total_artifacts_count column exists...
2025-07-09 08:07:50.764	
[2025-07-09T15:07:50.763Z] [worker] Starting security scanning worker [286565eb5406d8]
2025-07-09 08:07:49.609	
Warning: Please use the `legacy` build in Node.js environments.
2025-07-09 08:07:48.938	
2025/07/09 15:07:48 INFO SSH listening listen_address=[fdaa:16:4003:a7b:3a3:51aa:420a:2]:22
2025-07-09 08:07:48.765	
Machine created and started in 7.842s
2025-07-09 08:07:48.672	
 INFO [fly api proxy] listening at /.fly/api
2025-07-09 08:07:48.654	
 INFO Preparing to run: `docker-entrypoint.sh sh -c while true; do npx tsx apps/workers/nvd-mirror-worker.ts; sleep 86400; done` as root
2025-07-09 08:07:48.556	
 INFO Starting init (commit: d0572327e)...
2025-07-09 08:07:48.465	
[2025-07-09T15:07:48.465Z] [SyncWorker] ✅ Sync Worker running continuously - will sync every minute
2025-07-09 08:07:48.407	
}
2025-07-09 08:07:48.407	
"CRITICAL_INFOSTEALER": 32
2025-07-09 08:07:48.407	
"MEDIUM_EMAIL_EXPOSED": 1795,
2025-07-09 08:07:48.407	
"HIGH_PASSWORD_EXPOSED": 392,
2025-07-09 08:07:48.407	
[2025-07-09T15:07:48.406Z] [SyncWorker] ✅ New compromised credentials synced: 2219 {
2025-07-09 08:07:47.652	
2025-07-09T15:07:47.652625070 [01JZQVMTBC75B2VRZ78FTW1D9X:main] Running Firecracker v1.7.0
2025-07-09 08:07:47.467	
2025/07/09 15:07:47 INFO SSH listening listen_address=[fdaa:16:4003:a7b:105:2a4b:cd7:2]:22
2025-07-09 08:07:47.423	
[2025-07-09T15:07:47.415Z] [SyncWorker] ✅ Sync Worker started - running continuous sync every minute
2025-07-09 08:07:47.255	
Machine created and started in 6.471s
2025-07-09 08:07:47.243	
sh: run_nuclei: not found
2025-07-09 08:07:47.227	
 INFO [fly api proxy] listening at /.fly/api
2025-07-09 08:07:47.224	
 INFO Preparing to run: `docker-entrypoint.sh sh -c while true; do run_nuclei -update-templates; sleep 86400; done` as root
2025-07-09 08:07:47.159	
(Use `node --trace-warnings ...` to show where the warning was created)
2025-07-09 08:07:47.159	
(node:648) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate verification.
2025-07-09 08:07:47.133	
 INFO Starting init (commit: d0572327e)...
2025-07-09 08:07:46.944	
2025/07/09 15:07:46 INFO SSH listening listen_address=[fdaa:16:4003:a7b:2dbb:1ab8:7fa2:2]:22
2025-07-09 08:07:46.700	
> node dist/sync.js
2025-07-09 08:07:46.700	
> sync-worker@1.0.0 start
2025-07-09 08:07:46.639	
Machine created and started in 5.848s
2025-07-09 08:07:46.632	
 INFO [fly api proxy] listening at /.fly/api
2025-07-09 08:07:46.620	
 INFO Preparing to run: `docker-entrypoint.sh npx tsx apps/api-main/server.ts` as root
2025-07-09 08:07:46.518	
 INFO Starting init (commit: d0572327e)...
2025-07-09 08:07:46.415	
[61517.630609] reboot: Restarting system
2025-07-09 08:07:46.414	
2025/07/09 15:07:46 INFO SSH listening listen_address=[fdaa:16:4003:a7b:f9:7dfe:6c4c:2]:22
2025-07-09 08:07:46.409	
 WARN could not unmount /rootfs: EINVAL: Invalid argument
2025-07-09 08:07:46.408	
 INFO Starting clean up.
2025-07-09 08:07:46.386	
 INFO Main child exited with signal (with signal 'SIGTERM', core dumped? false)
2025-07-09 08:07:46.358	
2025/07/09 15:07:46 INFO SSH listening listen_address=[fdaa:16:4003:a7b:2d30:c80:6e46:2]:22
2025-07-09 08:07:46.263	
2025-07-09T15:07:46.263263330 [01JZQVMTB4YBY28ETAY7JYWD1J:main] Running Firecracker v1.7.0
2025-07-09 08:07:46.243	
Machine created and started in 5.452s
2025-07-09 08:07:46.202	
 INFO [fly api proxy] listening at /.fly/api
2025-07-09 08:07:46.199	
 INFO Preparing to run: `docker-entrypoint.sh npx tsx apps/workers/worker.ts` as root
2025-07-09 08:07:46.186	
Machine created and started in 5.393s
2025-07-09 08:07:46.094	
 INFO [fly api proxy] listening at /.fly/api
2025-07-09 08:07:46.092	
 INFO Preparing to run: `docker-entrypoint.sh npm run start --prefix apps/sync-worker` as root
2025-07-09 08:07:46.091	
 INFO Starting init (commit: d0572327e)...
2025-07-09 08:07:45.999	
 INFO Starting init (commit: d0572327e)...
2025-07-09 08:07:45.860	
 INFO Sending signal SIGTERM to main child process w/ PID 628
2025-07-09 08:07:45.850	
[61517.045485] reboot: Restarting system
2025-07-09 08:07:45.849	
 WARN could not unmount /rootfs: EINVAL: Invalid argument
2025-07-09 08:07:45.846	
 INFO Starting clean up.
2025-07-09 08:07:45.830	
 INFO Main child exited with signal (with signal 'SIGTERM', core dumped? false)
2025-07-09 08:07:45.787	
 INFO Sending signal SIGTERM to main child process w/ PID 629
2025-07-09 08:07:45.645	
2025-07-09T15:07:45.645113920 [01JZQVMTB5VTG793A2ZQEYGGNC:main] Running Firecracker v1.7.0
2025-07-09 08:07:45.261	
2025-07-09T15:07:45.261372382 [01JZQVMTB97HBHB062GNQSH073:main] Running Firecracker v1.7.0
2025-07-09 08:07:45.218	
2025-07-09T15:07:45.218734876 [01JZQVMTB9Z0EX220X8Z5CHENF:main] Running Firecracker v1.7.0
2025-07-09 08:07:45.104	
 INFO Sending signal SIGINT to main child process w/ PID 628
2025-07-09 08:07:45.096	
[61516.227963] reboot: Restarting system
2025-07-09 08:07:45.095	
 WARN could not unmount /rootfs: EINVAL: Invalid argument
2025-07-09 08:07:45.092	
 INFO Starting clean up.
2025-07-09 08:07:45.076	
 INFO Main child exited normally with code: 130
2025-07-09 08:07:45.017	
Configuring firecracker
2025-07-09 08:07:44.873	
[61518.790696] reboot: Restarting system
2025-07-09 08:07:44.872	
 WARN could not unmount /rootfs: EINVAL: Invalid argument
2025-07-09 08:07:44.869	
 INFO Starting clean up.
2025-07-09 08:07:44.854	
 INFO Main child exited normally with code: 0
2025-07-09 08:07:44.411	
[61518.050900] reboot: Restarting system
2025-07-09 08:07:44.410	
 WARN could not unmount /rootfs: EINVAL: Invalid argument
2025-07-09 08:07:44.409	
 INFO Starting clean up.
2025-07-09 08:07:44.390	
 WARN Reaped child process with pid: 893 and signal: SIGKILL, core dumped? false
2025-07-09 08:07:44.389	
 WARN Reaped child process with pid: 841 and signal: SIGKILL, core dumped? false
2025-07-09 08:07:44.388	
 WARN Reaped child process with pid: 840 and signal: SIGKILL, core dumped? false
2025-07-09 08:07:44.387	
 WARN Reaped child process with pid: 955 and signal: SIGKILL, core dumped? false
2025-07-09 08:07:44.386	
 WARN Reaped child process with pid: 810 and signal: SIGKILL, core dumped? false
2025-07-09 08:07:44.385	
 WARN Reaped child process with pid: 2654 and signal: SIGKILL, core dumped? false
2025-07-09 08:07:44.384	
 WARN Reaped child process with pid: 921 and signal: SIGKILL, core dumped? false
2025-07-09 08:07:44.383	
 WARN Reaped child process with pid: 901 and signal: SIGKILL, core dumped? false
2025-07-09 08:07:44.382	
 INFO Main child exited normally with code: 130
2025-07-09 08:07:44.171	
 INFO Sending signal SIGINT to main child process w/ PID 630
2025-07-09 08:07:44.151	
Configuring firecracker
2025-07-09 08:07:43.975	
Configuring firecracker
2025-07-09 08:07:43.952	
 INFO Sending signal SIGINT to main child process w/ PID 630
2025-07-09 08:07:43.950	
[2025-07-09T15:07:43.950Z] [SyncWorker] ✅ Sync Worker shutting down
2025-07-09 08:07:43.935	
Configuring firecracker
2025-07-09 08:07:43.771	
[2025-07-09T15:07:43.770Z] [worker] Received SIGINT, initiating graceful shutdown...
2025-07-09 08:07:43.738	
 INFO Sending signal SIGINT to main child process w/ PID 639
2025-07-09 08:07:43.706	
Configuring firecracker
2025-07-09 08:07:43.351	
 INFO Sending signal SIGINT to main child process w/ PID 629
2025-07-09 08:07:43.340	
Configuring firecracker
2025-07-09 08:07:43.018	
Successfully prepared image registry.fly.io/dealbrief-scanner@sha256:f124fd9f7ff366087b60fae08b27d60a7c95e9071d4df40a2fcd8d640841d74a (2.106506555s)
2025-07-09 08:07:42.628	
Successfully prepared image registry.fly.io/dealbrief-scanner@sha256:f124fd9f7ff366087b60fae08b27d60a7c95e9071d4df40a2fcd8d640841d74a (1.822039782s)
2025-07-09 08:07:42.504	
Successfully prepared image registry.fly.io/dealbrief-scanner@sha256:f124fd9f7ff366087b60fae08b27d60a7c95e9071d4df40a2fcd8d640841d74a (1.699852236s)
2025-07-09 08:07:42.502	
Successfully prepared image registry.fly.io/dealbrief-scanner@sha256:f124fd9f7ff366087b60fae08b27d60a7c95e9071d4df40a2fcd8d640841d74a (1.756943739s)
2025-07-09 08:07:42.374	
Successfully prepared image registry.fly.io/dealbrief-scanner@sha256:f124fd9f7ff366087b60fae08b27d60a7c95e9071d4df40a2fcd8d640841d74a (1.572030484s)
2025-07-09 08:07:42.224	
Successfully prepared image registry.fly.io/dealbrief-scanner@sha256:f124fd9f7ff366087b60fae08b27d60a7c95e9071d4df40a2fcd8d640841d74a (1.432853754s)
2025-07-09 08:07:40.910	
Pulling container image registry.fly.io/dealbrief-scanner@sha256:f124fd9f7ff366087b60fae08b27d60a7c95e9071d4df40a2fcd8d640841d74a
2025-07-09 08:07:40.804	
Pulling container image registry.fly.io/dealbrief-scanner@sha256:f124fd9f7ff366087b60fae08b27d60a7c95e9071d4df40a2fcd8d640841d74a
2025-07-09 08:07:40.803	
Pulling container image registry.fly.io/dealbrief-scanner@sha256:f124fd9f7ff366087b60fae08b27d60a7c95e9071d4df40a2fcd8d640841d74a
2025-07-09 08:07:40.801	
Pulling container image registry.fly.io/dealbrief-scanner@sha256:f124fd9f7ff366087b60fae08b27d60a7c95e9071d4df40a2fcd8d640841d74a
2025-07-09 08:07:40.790	
Pulling container image registry.fly.io/dealbrief-scanner@sha256:f124fd9f7ff366087b60fae08b27d60a7c95e9071d4df40a2fcd8d640841d74a
2025-07-09 08:07:40.745	
Pulling container image registry.fly.io/dealbrief-scanner@sha256:f124fd9f7ff366087b60fae08b27d60a7c95e9071d4df40a2fcd8d640841d74a
2025-07-09 08:07:01.104	
[2025-07-09T15:07:01.103Z] [queue-monitor] Queue: 0 jobs, Workers: 0 running, 0 needed
2025-07-09 08:07:01.104	
[2025-07-09T15:07:01.103Z] [queue-monitor] Failed to fetch machines: 401 {"error":"verify: invalid token: all tokens missing third-party discharge tokens; no verified tokens; token e60f8cd1-a991-50f2-a3f8-cccca3b7f28c: missing third-party discharge token"}
2025-07-09 08:06:23.723	
{
  "level": 30,
  "time": 1752073583723,
  "pid": 661,
  "hostname": "148e21dae24d98",
  "reqId": "req-d",
  "res": {
    "statusCode": 200
  },
  "responseTime": 32.71544200181961,
  "msg": "request completed"
}
2025-07-09 08:06:23.723	
{
  "level": 30,
  "time": 1752073583723,
  "pid": 661,
  "hostname": "148e21dae24d98",
  "reqId": "req-d",
  "res": {
    "statusCode": 200
  },
  "responseTime": 32.71544200181961,
  "msg": "request completed"
}
2025-07-09 08:06:23.723	
{
  "level": 30,
  "time": 1752073583723,
  "pid": 661,
  "hostname": "148e21dae24d98",
  "reqId": "req-d",
  "res": {
    "statusCode": 200
  },
  "responseTime": 32.71544200181961,
  "msg": "request completed"
}
2025-07-09 08:06:23.711	
[2025-07-09T15:06:23.711Z] [api] Found 33 artifacts for scan bcJIQcxk8ck
2025-07-09 08:06:23.711	
[2025-07-09T15:06:23.711Z] [api] Found 33 artifacts for scan bcJIQcxk8ck
2025-07-09 08:06:23.711	
[2025-07-09T15:06:23.711Z] [api] Found 33 artifacts for scan bcJIQcxk8ck
2025-07-09 08:06:23.691	
[2025-07-09T15:06:23.690Z] [api] Retrieving artifacts for scan: bcJIQcxk8ck
2025-07-09 08:06:23.691	
[2025-07-09T15:06:23.690Z] [api] Retrieving artifacts for scan: bcJIQcxk8ck
2025-07-09 08:06:23.691	
[2025-07-09T15:06:23.690Z] [api] Retrieving artifacts for scan: bcJIQcxk8ck
2025-07-09 08:06:23.690	
{
  "level": 30,
  "time": 1752073583690,
  "pid": 661,
  "hostname": "148e21dae24d98",
  "reqId": "req-d",
  "req": {
    "method": "GET",
    "url": "/scan/bcJIQcxk8ck/artifacts",
    "host": "dealbrief-scanner.fly.dev",
    "remoteAddress": "172.16.19.26",
    "remotePort": 47830
  },
  "msg": "incoming request"
}
2025-07-09 08:06:23.690	
{
  "level": 30,
  "time": 1752073583690,
  "pid": 661,
  "hostname": "148e21dae24d98",
  "reqId": "req-d",
  "req": {
    "method": "GET",
    "url": "/scan/bcJIQcxk8ck/artifacts",
    "host": "dealbrief-scanner.fly.dev",
    "remoteAddress": "172.16.19.26",
    "remotePort": 47830
  },
  "msg": "incoming request"
}
2025-07-09 08:06:23.690	
{
  "level": 30,
  "time": 1752073583690,
  "pid": 661,
  "hostname": "148e21dae24d98",
  "reqId": "req-d",
  "req": {
    "method": "GET",
    "url": "/scan/bcJIQcxk8ck/artifacts",
    "host": "dealbrief-scanner.fly.dev",
    "remoteAddress": "172.16.19.26",
    "remotePort": 47830
  },
  "msg": "incoming request"
}
2025-07-09 08:06:15.709	
{
  "level": 30,
  "time": 1752073575708,
  "pid": 661,
  "hostname": "148e21dae24d98",
  "reqId": "req-c",
  "res": {
    "statusCode": 200
  },
  "responseTime": 30.0275200009346,
  "msg": "request completed"
}
2025-07-09 08:06:15.697	
[2025-07-09T15:06:15.697Z] [api] Found 33 artifacts for scan bcJIQcxk8ck
2025-07-09 08:06:15.679	
[2025-07-09T15:06:15.678Z] [api] Retrieving artifacts for scan: bcJIQcxk8ck
2025-07-09 08:06:15.678	
{
  "level": 30,
  "time": 1752073575678,
  "pid": 661,
  "hostname": "148e21dae24d98",
  "reqId": "req-c",
  "req": {
    "method": "GET",
    "url": "/scan/bcJIQcxk8ck/artifacts",
    "host": "dealbrief-scanner.fly.dev",
    "remoteAddress": "172.16.19.26",
    "remotePort": 62708
  },
  "msg": "incoming request"
}
2025-07-09 08:06:09.498	
{
  "level": 30,
  "time": 1752073569497,
  "pid": 661,
  "hostname": "148e21dae24d98",
  "reqId": "req-b",
  "res": {
    "statusCode": 200
  },
  "responseTime": 62.75900299847126,
  "msg": "request completed"
}
2025-07-09 08:06:09.471	
[2025-07-09T15:06:09.460Z] [api] Found 33 artifacts for scan bcJIQcxk8ck
2025-07-09 08:06:09.435	
[2025-07-09T15:06:09.435Z] [api] Retrieving artifacts for scan: bcJIQcxk8ck
2025-07-09 08:06:09.435	
{
  "level": 30,
  "time": 1752073569434,
  "pid": 661,
  "hostname": "148e21dae24d98",
  "reqId": "req-b",
  "req": {
    "method": "GET",
    "url": "/scan/bcJIQcxk8ck/artifacts",
    "host": "dealbrief-scanner.fly.dev",
    "remoteAddress": "172.16.19.26",
    "remotePort": 62698
  },
  "msg": "incoming request"
}
2025-07-09 08:06:03.149	
{
  "level": 30,
  "time": 1752073563148,
  "pid": 661,
  "hostname": "148e21dae24d98",
  "reqId": "req-a",
  "res": {
    "statusCode": 200
  },
  "responseTime": 3.6834030002355576,
  "msg": "request completed"
}
2025-07-09 08:06:03.148	
[2025-07-09T15:06:03.147Z] [api] Found 21 findings for scan bcJIQcxk8ck
2025-07-09 08:06:03.145	
{
  "level": 30,
  "time": 1752073563144,
  "pid": 661,
  "hostname": "148e21dae24d98",
  "reqId": "req-a",
  "req": {
    "method": "GET",
    "url": "/scan/bcJIQcxk8ck/findings",
    "host": "dealbrief-scanner.fly.dev",
    "remoteAddress": "172.16.19.26",
    "remotePort": 50470
  },
  "msg": "incoming request"
}
2025-07-09 08:06:03.145	
[2025-07-09T15:06:03.145Z] [api] Retrieving findings for scan: bcJIQcxk8ck
2025-07-09 08:06:01.178	
[2025-07-09T15:06:01.178Z] [queue-monitor] Queue: 0 jobs, Workers: 0 running, 0 needed
2025-07-09 08:06:01.178	
[2025-07-09T15:06:01.177Z] [queue-monitor] Failed to fetch machines: 401 {"error":"verify: invalid token: all tokens missing third-party discharge tokens; no verified tokens; token e60f8cd1-a991-50f2-a3f8-cccca3b7f28c: missing third-party discharge token"}
2025-07-09 08:05:58.688	
{
  "level": 30,
  "time": 1752073558688,
  "pid": 661,
  "hostname": "148e21dae24d98",
  "reqId": "req-9",
  "res": {
    "statusCode": 200
  },
  "responseTime": 4.318293005228043,
  "msg": "request completed"
}
2025-07-09 08:05:58.687	
[2025-07-09T15:05:58.687Z] [api] Found 21 findings for scan bcJIQcxk8ck
2025-07-09 08:05:58.684	
[2025-07-09T15:05:58.684Z] [api] Retrieving findings for scan: bcJIQcxk8ck
2025-07-09 08:05:58.684	
{
  "level": 30,
  "time": 1752073558683,
  "pid": 661,
  "hostname": "148e21dae24d98",
  "reqId": "req-9",
  "req": {
    "method": "GET",
    "url": "/scan/bcJIQcxk8ck/findings",
    "host": "dealbrief-scanner.fly.dev",
    "remoteAddress": "172.16.19.26",
    "remotePort": 50462
  },
  "msg": "incoming request"
}
2025-07-09 08:05:53.604	
{
  "level": 30,
  "time": 1752073553604,
  "pid": 661,
  "hostname": "148e21dae24d98",
  "reqId": "req-8",
  "res": {
    "statusCode": 200
  },
  "responseTime": 26.68570899963379,
  "msg": "request completed"
}
2025-07-09 08:05:53.603	
[2025-07-09T15:05:53.603Z] [api] Found 21 findings for scan bcJIQcxk8ck
2025-07-09 08:05:53.578	
[2025-07-09T15:05:53.577Z] [api] Retrieving findings for scan: bcJIQcxk8ck
2025-07-09 08:05:53.577	
{
  "level": 30,
  "time": 1752073553577,
  "pid": 661,
  "hostname": "148e21dae24d98",
  "reqId": "req-8",
  "req": {
    "method": "GET",
    "url": "/scan/bcJIQcxk8ck/findings",
    "host": "dealbrief-scanner.fly.dev",
    "remoteAddress": "172.16.19.26",
    "remotePort": 52870
  },
  "msg": "incoming request"
}
2025-07-09 08:05:48.030	
{
  "level": 30,
  "time": 1752073548030,
  "pid": 661,
  "hostname": "148e21dae24d98",
  "reqId": "req-7",
  "res": {
    "statusCode": 200
  },
  "responseTime": 401.9941979944706,
  "msg": "request completed"
}
2025-07-09 08:05:47.628	
{
  "level": 30,
  "time": 1752073547628,
  "pid": 661,
  "hostname": "148e21dae24d98",
  "reqId": "req-7",
  "req": {
    "method": "GET",
    "url": "/scan/bcJIQcxk8ck/status",
    "host": "dealbrief-scanner.fly.dev",
    "remoteAddress": "172.16.19.26",
    "remotePort": 52868
  },
  "msg": "incoming request"
}
2025-07-09 08:05:01.124	
[2025-07-09T15:05:01.123Z] [queue-monitor] Queue: 0 jobs, Workers: 0 running, 0 needed
2025-07-09 08:05:01.124	
[2025-07-09T15:05:01.123Z] [queue-monitor] Failed to fetch machines: 401 {"error":"verify: invalid token: all tokens missing third-party discharge tokens; no verified tokens; token e60f8cd1-a991-50f2-a3f8-cccca3b7f28c: missing third-party discharge token"}
2025-07-09 08:04:01.077	
[2025-07-09T15:04:01.077Z] [queue-monitor] Queue: 0 jobs, Workers: 0 running, 0 needed
2025-07-09 08:04:01.077	
[2025-07-09T15:04:01.076Z] [queue-monitor] Failed to fetch machines: 401 {"error":"verify: invalid token: all tokens missing third-party discharge tokens; no verified tokens; token e60f8cd1-a991-50f2-a3f8-cccca3b7f28c: missing third-party discharge token"}
2025-07-09 08:03:00.940	
[2025-07-09T15:03:00.939Z] [queue-monitor] Queue: 0 jobs, Workers: 0 running, 0 needed
2025-07-09 08:03:00.940	
[2025-07-09T15:03:00.939Z] [queue-monitor] Failed to fetch machines: 401 {"error":"verify: invalid token: all tokens missing third-party discharge tokens; no verified tokens; token e60f8cd1-a991-50f2-a3f8-cccca3b7f28c: missing third-party discharge token"}
2025-07-09 08:02:00.988	
[2025-07-09T15:02:00.987Z] [queue-monitor] Queue: 0 jobs, Workers: 0 running, 0 needed
2025-07-09 08:02:00.988	
[2025-07-09T15:02:00.987Z] [queue-monitor] Failed to fetch machines: 401 {"error":"verify: invalid token: all tokens missing third-party discharge tokens; no verified tokens; token e60f8cd1-a991-50f2-a3f8-cccca3b7f28c: missing third-party discharge token"}
2025-07-09 08:01:00.990	
[2025-07-09T15:01:00.989Z] [queue-monitor] Queue: 0 jobs, Workers: 0 running, 0 needed
2025-07-09 08:01:00.990	
[2025-07-09T15:01:00.989Z] [queue-monitor] Failed to fetch machines: 401 {"error":"verify: invalid token: all tokens missing third-party discharge tokens; no verified tokens; token e60f8cd1-a991-50f2-a3f8-cccca3b7f28c: missing third-party discharge token"}
2025-07-09 08:00:09.454	
[2025-07-09T15:00:09.453Z] [worker] ✅ COMPREHENSIVE SCAN COMPLETED for Vulnerable Test Site Enhanced: 21 verified findings, 28 artifacts across 12 security modules
2025-07-09 08:00:09.454	
[queue] Updated job bcJIQcxk8ck status: done - Comprehensive security scan completed - 21 verified findings across 12 security modules. Findings ready for processing.
2025-07-09 08:00:09.045	
[2025-07-09T15:00:09.045Z] [worker] [updateScanMasterStatus] Updated scan bcJIQcxk8ck with: status, progress, completed_at, total_findings_count, max_severity, total_artifacts_count
2025-07-09 08:00:09.037	
[2025-07-09T15:00:09.037Z] [worker] [processScan] Counted 28 artifacts for scan bcJIQcxk8ck
2025-07-09 08:00:09.034	
[2025-07-09T15:00:09.034Z] [worker] [bcJIQcxk8ck] COMPLETED abuse_intel_scan scan: 0 findings found
2025-07-09 08:00:09.034	
[2025-07-09T15:00:09.033Z] [worker] [bcJIQcxk8ck] WAITING for abuse_intel_scan scan to complete...
2025-07-09 08:00:09.034	
[2025-07-09T15:00:09.033Z] [worker] [bcJIQcxk8ck] COMPLETED tech_stack_scan scan: 0 findings found
2025-07-09 08:00:09.034	
[2025-07-09T15:00:09.033Z] [worker] [bcJIQcxk8ck] WAITING for tech_stack_scan scan to complete...
2025-07-09 08:00:09.034	
[2025-07-09T15:00:09.033Z] [worker] [bcJIQcxk8ck] COMPLETED nuclei scan: 0 findings found
2025-07-09 08:00:09.034	
[artifactStore] Inserted scan_summary artifact: Nuclei scan completed: 0 vulnerabilities found...
2025-07-09 08:00:09.013	
[2025-07-09T15:00:09.013Z] [nuclei] Completed vulnerability scan. Total findings: 0
2025-07-09 08:00:09.013	
[2025-07-09T15:00:09.013Z] [nuclei] --- Starting Phase 2: Deep-Dive Workflow Scans ---
2025-07-09 08:00:09.013	
[2025-07-09T15:00:09.013Z] [nuclei] [Two-Pass Scan] No findings for https://vulnerable-test-site.vercel.app
2025-07-09 08:00:09.013	
[2025-07-09T15:00:09.013Z] [nucleiWrapper] Two-pass scan completed: 0 findings persisted as artifacts (baseline: 0, common+tech: 0)
2025-07-09 08:00:09.013	
[2025-07-09T15:00:09.012Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-09 08:00:09.004	
[2025-07-09T15:00:09.004Z] [nucleiWrapper] Nuclei execution timed out after 20000ms, sending SIGTERM
2025-07-09 08:00:00.915	
[2025-07-09T15:00:00.914Z] [queue-monitor] Queue: 0 jobs, Workers: 0 running, 0 needed
2025-07-09 08:00:00.915	
[2025-07-09T15:00:00.914Z] [queue-monitor] Failed to fetch machines: 401 {"error":"verify: invalid token: all tokens missing third-party discharge tokens; no verified tokens; token e60f8cd1-a991-50f2-a3f8-cccca3b7f28c: missing third-party discharge token"}
2025-07-09 07:59:55.686	
}
2025-07-09 07:59:55.686	
"MALICIOUS_TYPOSQUAT": 4
2025-07-09 07:59:55.686	
"PARKED_TYPOSQUAT": 13,
2025-07-09 07:59:55.686	
"TLS_CONFIGURATION_ISSUE": 1,
2025-07-09 07:59:55.686	
"EMAIL_SECURITY_GAP": 1,
2025-07-09 07:59:55.686	
[2025-07-09T14:59:55.685Z] [SyncWorker] ✅ New findings synced: 19 {
2025-07-09 07:59:49.003	
[2025-07-09T14:59:49.003Z] [nucleiWrapper] Manual timeout override: 20000ms
2025-07-09 07:59:49.003	
[2025-07-09T14:59:49.003Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-09 07:59:49.000	
[2025-07-09T14:59:48.999Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://vulnerable-test-site.vercel.app -tags cve,panel,xss,wp-plugin,osint,lfi,rce -c 6 -timeout 20 -retries 1
2025-07-09 07:59:49.000	
[2025-07-09T14:59:48.999Z] [nucleiWrapper] Pass 2: Running common vulnerability + tech-specific scan with gated tags: cve,panel,xss,wp-plugin,osint,lfi,rce
2025-07-09 07:59:48.999	
[2025-07-09T14:59:48.999Z] [nucleiWrapper] Detected technologies: none
2025-07-09 07:59:48.999	
[2025-07-09T14:59:48.999Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-09 07:59:48.991	
[2025-07-09T14:59:48.991Z] [nucleiWrapper] Nuclei execution timed out after 20000ms, sending SIGTERM
2025-07-09 07:59:32.326	
[2025-07-09T14:59:32.326Z] [worker] [bcJIQcxk8ck] WAITING for nuclei scan to complete...
2025-07-09 07:59:32.326	
[2025-07-09T14:59:32.326Z] [worker] [bcJIQcxk8ck] WAITING for nuclei scan to complete...
2025-07-09 07:59:32.326	
[2025-07-09T14:59:32.325Z] [worker] [bcJIQcxk8ck] COMPLETED accessibility_scan scan: 0 findings found
2025-07-09 07:59:32.326	
[2025-07-09T14:59:32.325Z] [worker] [bcJIQcxk8ck] COMPLETED accessibility_scan scan: 0 findings found
2025-07-09 07:59:32.325	
[2025-07-09T14:59:32.325Z] [accessibilityScan] Accessibility scan completed: 0 findings from 0/15 pages in 38911ms
2025-07-09 07:59:32.325	
[2025-07-09T14:59:32.325Z] [accessibilityScan] Accessibility scan completed: 0 findings from 0/15 pages in 38911ms
2025-07-09 07:59:32.323	
[2025-07-09T14:59:32.323Z] [accessibilityScan] Accessibility analysis complete: 0 violations (0 critical, 0 serious)
2025-07-09 07:59:32.323	
[2025-07-09T14:59:32.323Z] [accessibilityScan] Accessibility analysis complete: 0 violations (0 critical, 0 serious)
2025-07-09 07:59:31.660	
[2025-07-09T14:59:31.659Z] [techStackScan] techstack=complete arts=0 time=2797ms
2025-07-09 07:59:31.660	
[2025-07-09T14:59:31.659Z] [techStackScan] techstack=complete arts=0 time=2797ms
2025-07-09 07:59:31.654	
[2025-07-09T14:59:31.654Z] [techStackScan] techstack=sbom_generated components=0 vulnerabilities=0 critical=0
2025-07-09 07:59:31.654	
[2025-07-09T14:59:31.654Z] [techStackScan] techstack=sbom_generated components=0 vulnerabilities=0 critical=0
2025-07-09 07:59:31.654	
[2025-07-09T14:59:31.654Z] [sbomGenerator] SBOM generated: 0 components, 0 vulnerabilities
2025-07-09 07:59:31.654	
[2025-07-09T14:59:31.654Z] [sbomGenerator] SBOM generated: 0 components, 0 vulnerabilities
2025-07-09 07:59:31.654	
[2025-07-09T14:59:31.654Z] [sbomGenerator] Generating SBOM for vulnerable-test-site.vercel.app with 0 components
2025-07-09 07:59:31.654	
[2025-07-09T14:59:31.654Z] [sbomGenerator] Generating SBOM for vulnerable-test-site.vercel.app with 0 components
2025-07-09 07:59:31.654	
[2025-07-09T14:59:31.653Z] [osvIntegration] No components suitable for OSV.dev queries
2025-07-09 07:59:31.654	
[2025-07-09T14:59:31.653Z] [osvIntegration] No components suitable for OSV.dev queries
2025-07-09 07:59:31.653	
[2025-07-09T14:59:31.653Z] [techStackScan] techstack=osv_enhancement starting OSV.dev integration for 0 components
2025-07-09 07:59:31.653	
[2025-07-09T14:59:31.653Z] [techStackScan] techstack=osv_enhancement starting OSV.dev integration for 0 components
2025-07-09 07:59:31.653	
[2025-07-09T14:59:31.653Z] [versionMatcher] Batch vulnerability analysis completed: 0 vulnerabilities across 0 components in 0ms
2025-07-09 07:59:31.653	
[2025-07-09T14:59:31.653Z] [versionMatcher] Batch vulnerability analysis completed: 0 vulnerabilities across 0 components in 0ms
2025-07-09 07:59:31.653	
[2025-07-09T14:59:31.653Z] [versionMatcher] Starting batch vulnerability analysis for 0 components
2025-07-09 07:59:31.653	
[2025-07-09T14:59:31.653Z] [versionMatcher] Starting batch vulnerability analysis for 0 components
2025-07-09 07:59:31.653	
[2025-07-09T14:59:31.653Z] [techStackScan] techstack=vuln_analysis starting enhanced vulnerability analysis for 0 technologies
2025-07-09 07:59:31.653	
[2025-07-09T14:59:31.653Z] [techStackScan] techstack=vuln_analysis starting enhanced vulnerability analysis for 0 technologies
2025-07-09 07:59:31.653	
[2025-07-09T14:59:31.653Z] [techStackScan] techstack=header_detected url="https://www.vulnerable-test-site.vercel.app" techs=0
2025-07-09 07:59:31.653	
[2025-07-09T14:59:31.653Z] [techStackScan] techstack=header_detected url="https://www.vulnerable-test-site.vercel.app" techs=0
2025-07-09 07:59:31.653	
[2025-07-09T14:59:31.653Z] [fastTechDetection] Header detection found 0 technologies for https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:31.653	
[2025-07-09T14:59:31.653Z] [fastTechDetection] Header detection found 0 technologies for https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:31.626	
[2025-07-09T14:59:31.626Z] [techStackScan] techstack=header_detected url="https://vulnerable-test-site.vercel.app" techs=0
2025-07-09 07:59:31.626	
[2025-07-09T14:59:31.626Z] [techStackScan] techstack=header_detected url="https://vulnerable-test-site.vercel.app" techs=0
2025-07-09 07:59:31.626	
[2025-07-09T14:59:31.626Z] [fastTechDetection] Header detection found 0 technologies for https://vulnerable-test-site.vercel.app
2025-07-09 07:59:31.626	
[2025-07-09T14:59:31.626Z] [fastTechDetection] Header detection found 0 technologies for https://vulnerable-test-site.vercel.app
2025-07-09 07:59:31.625	
[2025-07-09T14:59:31.625Z] [techStackScan] techstack=header_detected url="https://vulnerable-test-site.vercel.app/admin" techs=0
2025-07-09 07:59:31.625	
[2025-07-09T14:59:31.625Z] [techStackScan] techstack=header_detected url="https://vulnerable-test-site.vercel.app/admin" techs=0
2025-07-09 07:59:31.625	
[2025-07-09T14:59:31.625Z] [fastTechDetection] Header detection found 0 technologies for https://vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.625	
[2025-07-09T14:59:31.625Z] [fastTechDetection] Header detection found 0 technologies for https://vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.617	
[2025-07-09T14:59:31.617Z] [fastTechDetection] Checking headers for quick tech detection: https://vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.617	
[2025-07-09T14:59:31.617Z] [fastTechDetection] Checking headers for quick tech detection: https://vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.617	
[2025-07-09T14:59:31.617Z] [techStackScan] techstack=header_scan url="https://vulnerable-test-site.vercel.app/admin"
2025-07-09 07:59:31.617	
[2025-07-09T14:59:31.617Z] [techStackScan] techstack=header_scan url="https://vulnerable-test-site.vercel.app/admin"
2025-07-09 07:59:31.616	
[2025-07-09T14:59:31.615Z] [fastTechDetection] Checking headers for quick tech detection: https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:31.616	
[2025-07-09T14:59:31.615Z] [fastTechDetection] Checking headers for quick tech detection: https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:31.616	
[2025-07-09T14:59:31.615Z] [techStackScan] techstack=header_scan url="https://www.vulnerable-test-site.vercel.app"
2025-07-09 07:59:31.616	
[2025-07-09T14:59:31.615Z] [techStackScan] techstack=header_scan url="https://www.vulnerable-test-site.vercel.app"
2025-07-09 07:59:31.615	
[2025-07-09T14:59:31.615Z] [fastTechDetection] Checking headers for quick tech detection: https://vulnerable-test-site.vercel.app
2025-07-09 07:59:31.615	
[2025-07-09T14:59:31.615Z] [fastTechDetection] Checking headers for quick tech detection: https://vulnerable-test-site.vercel.app
2025-07-09 07:59:31.615	
[2025-07-09T14:59:31.615Z] [techStackScan] techstack=header_scan url="https://vulnerable-test-site.vercel.app"
2025-07-09 07:59:31.615	
[2025-07-09T14:59:31.615Z] [techStackScan] techstack=header_scan url="https://vulnerable-test-site.vercel.app"
2025-07-09 07:59:31.615	
[2025-07-09T14:59:31.615Z] [techStackScan] techstack=fallback_headers starting header analysis for 3 URLs
2025-07-09 07:59:31.615	
[2025-07-09T14:59:31.615Z] [techStackScan] techstack=fallback_headers starting header analysis for 3 URLs
2025-07-09 07:59:31.615	
[2025-07-09T14:59:31.615Z] [techStackScan] techstack=fast_detection_complete total_techs=0 total_duration=136ms avg_per_url=27ms
2025-07-09 07:59:31.615	
[2025-07-09T14:59:31.615Z] [techStackScan] techstack=fast_detection_complete total_techs=0 total_duration=136ms avg_per_url=27ms
2025-07-09 07:59:31.615	
[2025-07-09T14:59:31.614Z] [faviconDetection] Batch favicon detection completed: 0 technologies detected across 3 URLs in 154ms
2025-07-09 07:59:31.615	
[2025-07-09T14:59:31.614Z] [faviconDetection] Batch favicon detection completed: 0 technologies detected across 3 URLs in 154ms
2025-07-09 07:59:31.615	
[2025-07-09T14:59:31.614Z] [faviconDetection] No favicon found for https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:31.615	
[2025-07-09T14:59:31.614Z] [faviconDetection] No favicon found for https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:31.615	
[2025-07-09T14:59:31.614Z] [faviconDetection] Failed to fetch favicon from https://www.vulnerable-test-site.vercel.app/apple-touch-icon-precomposed.png: Request failed with status code 403
2025-07-09 07:59:31.615	
[2025-07-09T14:59:31.614Z] [faviconDetection] Failed to fetch favicon from https://www.vulnerable-test-site.vercel.app/apple-touch-icon-precomposed.png: Request failed with status code 403
2025-07-09 07:59:31.575	
[2025-07-09T14:59:31.575Z] [faviconDetection] Fetching favicon from https://www.vulnerable-test-site.vercel.app/apple-touch-icon-precomposed.png
2025-07-09 07:59:31.575	
[2025-07-09T14:59:31.575Z] [faviconDetection] Fetching favicon from https://www.vulnerable-test-site.vercel.app/apple-touch-icon-precomposed.png
2025-07-09 07:59:31.575	
[2025-07-09T14:59:31.575Z] [faviconDetection] Failed to fetch favicon from https://www.vulnerable-test-site.vercel.app/apple-touch-icon.png: Request failed with status code 403
2025-07-09 07:59:31.575	
[2025-07-09T14:59:31.575Z] [faviconDetection] Failed to fetch favicon from https://www.vulnerable-test-site.vercel.app/apple-touch-icon.png: Request failed with status code 403
2025-07-09 07:59:31.539	
[2025-07-09T14:59:31.539Z] [faviconDetection] Fetching favicon from https://www.vulnerable-test-site.vercel.app/apple-touch-icon.png
2025-07-09 07:59:31.539	
[2025-07-09T14:59:31.539Z] [faviconDetection] Fetching favicon from https://www.vulnerable-test-site.vercel.app/apple-touch-icon.png
2025-07-09 07:59:31.539	
[2025-07-09T14:59:31.539Z] [faviconDetection] Failed to fetch favicon from https://www.vulnerable-test-site.vercel.app/favicon.png: Request failed with status code 403
2025-07-09 07:59:31.539	
[2025-07-09T14:59:31.539Z] [faviconDetection] Failed to fetch favicon from https://www.vulnerable-test-site.vercel.app/favicon.png: Request failed with status code 403
2025-07-09 07:59:31.514	
[2025-07-09T14:59:31.514Z] [faviconDetection] No favicon found for https://vulnerable-test-site.vercel.app
2025-07-09 07:59:31.514	
[2025-07-09T14:59:31.514Z] [faviconDetection] No favicon found for https://vulnerable-test-site.vercel.app
2025-07-09 07:59:31.514	
[2025-07-09T14:59:31.514Z] [faviconDetection] Failed to fetch favicon from https://vulnerable-test-site.vercel.app/apple-touch-icon-precomposed.png: Request failed with status code 403
2025-07-09 07:59:31.514	
[2025-07-09T14:59:31.514Z] [faviconDetection] Failed to fetch favicon from https://vulnerable-test-site.vercel.app/apple-touch-icon-precomposed.png: Request failed with status code 403
2025-07-09 07:59:31.504	
[2025-07-09T14:59:31.504Z] [faviconDetection] Fetching favicon from https://vulnerable-test-site.vercel.app/apple-touch-icon-precomposed.png
2025-07-09 07:59:31.504	
[2025-07-09T14:59:31.504Z] [faviconDetection] Fetching favicon from https://vulnerable-test-site.vercel.app/apple-touch-icon-precomposed.png
2025-07-09 07:59:31.504	
[2025-07-09T14:59:31.504Z] [faviconDetection] Failed to fetch favicon from https://vulnerable-test-site.vercel.app/apple-touch-icon.png: Request failed with status code 403
2025-07-09 07:59:31.504	
[2025-07-09T14:59:31.504Z] [faviconDetection] Failed to fetch favicon from https://vulnerable-test-site.vercel.app/apple-touch-icon.png: Request failed with status code 403
2025-07-09 07:59:31.499	
[2025-07-09T14:59:31.499Z] [faviconDetection] Fetching favicon from https://www.vulnerable-test-site.vercel.app/favicon.png
2025-07-09 07:59:31.499	
[2025-07-09T14:59:31.499Z] [faviconDetection] Fetching favicon from https://www.vulnerable-test-site.vercel.app/favicon.png
2025-07-09 07:59:31.499	
[2025-07-09T14:59:31.499Z] [faviconDetection] Failed to fetch favicon from https://www.vulnerable-test-site.vercel.app/favicon.ico: Request failed with status code 403
2025-07-09 07:59:31.499	
[2025-07-09T14:59:31.499Z] [faviconDetection] Failed to fetch favicon from https://www.vulnerable-test-site.vercel.app/favicon.ico: Request failed with status code 403
2025-07-09 07:59:31.496	
[2025-07-09T14:59:31.496Z] [faviconDetection] No favicon found for https://vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.496	
[2025-07-09T14:59:31.496Z] [faviconDetection] No favicon found for https://vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.496	
[2025-07-09T14:59:31.496Z] [faviconDetection] Failed to fetch favicon from https://vulnerable-test-site.vercel.app/admin/apple-touch-icon-precomposed.png: Request failed with status code 403
2025-07-09 07:59:31.496	
[2025-07-09T14:59:31.496Z] [faviconDetection] Failed to fetch favicon from https://vulnerable-test-site.vercel.app/admin/apple-touch-icon-precomposed.png: Request failed with status code 403
2025-07-09 07:59:31.495	
[2025-07-09T14:59:31.494Z] [faviconDetection] Fetching favicon from https://vulnerable-test-site.vercel.app/apple-touch-icon.png
2025-07-09 07:59:31.495	
[2025-07-09T14:59:31.494Z] [faviconDetection] Fetching favicon from https://vulnerable-test-site.vercel.app/apple-touch-icon.png
2025-07-09 07:59:31.495	
[2025-07-09T14:59:31.494Z] [faviconDetection] Failed to fetch favicon from https://vulnerable-test-site.vercel.app/favicon.png: Request failed with status code 403
2025-07-09 07:59:31.495	
[2025-07-09T14:59:31.494Z] [faviconDetection] Failed to fetch favicon from https://vulnerable-test-site.vercel.app/favicon.png: Request failed with status code 403
2025-07-09 07:59:31.487	
[2025-07-09T14:59:31.487Z] [faviconDetection] Fetching favicon from https://vulnerable-test-site.vercel.app/admin/apple-touch-icon-precomposed.png
2025-07-09 07:59:31.487	
[2025-07-09T14:59:31.487Z] [faviconDetection] Fetching favicon from https://vulnerable-test-site.vercel.app/admin/apple-touch-icon-precomposed.png
2025-07-09 07:59:31.487	
[2025-07-09T14:59:31.487Z] [faviconDetection] Failed to fetch favicon from https://vulnerable-test-site.vercel.app/admin/apple-touch-icon.png: Request failed with status code 403
2025-07-09 07:59:31.487	
[2025-07-09T14:59:31.487Z] [faviconDetection] Failed to fetch favicon from https://vulnerable-test-site.vercel.app/admin/apple-touch-icon.png: Request failed with status code 403
2025-07-09 07:59:31.479	
[2025-07-09T14:59:31.479Z] [faviconDetection] Fetching favicon from https://vulnerable-test-site.vercel.app/admin/apple-touch-icon.png
2025-07-09 07:59:31.479	
[2025-07-09T14:59:31.479Z] [faviconDetection] Fetching favicon from https://vulnerable-test-site.vercel.app/admin/apple-touch-icon.png
2025-07-09 07:59:31.479	
[2025-07-09T14:59:31.479Z] [faviconDetection] Failed to fetch favicon from https://vulnerable-test-site.vercel.app/admin/favicon.png: Request failed with status code 403
2025-07-09 07:59:31.479	
[2025-07-09T14:59:31.479Z] [faviconDetection] Failed to fetch favicon from https://vulnerable-test-site.vercel.app/admin/favicon.png: Request failed with status code 403
2025-07-09 07:59:31.472	
[2025-07-09T14:59:31.472Z] [faviconDetection] Fetching favicon from https://vulnerable-test-site.vercel.app/favicon.png
2025-07-09 07:59:31.472	
[2025-07-09T14:59:31.472Z] [faviconDetection] Fetching favicon from https://vulnerable-test-site.vercel.app/favicon.png
2025-07-09 07:59:31.472	
[2025-07-09T14:59:31.472Z] [faviconDetection] Failed to fetch favicon from https://vulnerable-test-site.vercel.app/favicon.ico: Request failed with status code 403
2025-07-09 07:59:31.472	
[2025-07-09T14:59:31.472Z] [faviconDetection] Failed to fetch favicon from https://vulnerable-test-site.vercel.app/favicon.ico: Request failed with status code 403
2025-07-09 07:59:31.471	
[2025-07-09T14:59:31.471Z] [faviconDetection] Fetching favicon from https://vulnerable-test-site.vercel.app/admin/favicon.png
2025-07-09 07:59:31.471	
[2025-07-09T14:59:31.471Z] [faviconDetection] Fetching favicon from https://vulnerable-test-site.vercel.app/admin/favicon.png
2025-07-09 07:59:31.471	
[2025-07-09T14:59:31.471Z] [faviconDetection] Failed to fetch favicon from https://vulnerable-test-site.vercel.app/admin/favicon.ico: Request failed with status code 403
2025-07-09 07:59:31.471	
[2025-07-09T14:59:31.471Z] [faviconDetection] Failed to fetch favicon from https://vulnerable-test-site.vercel.app/admin/favicon.ico: Request failed with status code 403
2025-07-09 07:59:31.463	
[2025-07-09T14:59:31.463Z] [faviconDetection] Fetching favicon from https://vulnerable-test-site.vercel.app/admin/favicon.ico
2025-07-09 07:59:31.463	
[2025-07-09T14:59:31.463Z] [faviconDetection] Fetching favicon from https://vulnerable-test-site.vercel.app/admin/favicon.ico
2025-07-09 07:59:31.463	
[2025-07-09T14:59:31.463Z] [faviconDetection] Starting favicon-based tech detection for https://vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.463	
[2025-07-09T14:59:31.463Z] [faviconDetection] Starting favicon-based tech detection for https://vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.461	
[2025-07-09T14:59:31.460Z] [faviconDetection] Fetching favicon from https://www.vulnerable-test-site.vercel.app/favicon.ico
2025-07-09 07:59:31.461	
[2025-07-09T14:59:31.460Z] [faviconDetection] Fetching favicon from https://www.vulnerable-test-site.vercel.app/favicon.ico
2025-07-09 07:59:31.461	
[2025-07-09T14:59:31.460Z] [faviconDetection] Starting favicon-based tech detection for https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:31.461	
[2025-07-09T14:59:31.460Z] [faviconDetection] Starting favicon-based tech detection for https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:31.460	
[2025-07-09T14:59:31.460Z] [faviconDetection] Fetching favicon from https://vulnerable-test-site.vercel.app/favicon.ico
2025-07-09 07:59:31.460	
[2025-07-09T14:59:31.460Z] [faviconDetection] Fetching favicon from https://vulnerable-test-site.vercel.app/favicon.ico
2025-07-09 07:59:31.460	
[2025-07-09T14:59:31.460Z] [faviconDetection] Starting favicon-based tech detection for https://vulnerable-test-site.vercel.app
2025-07-09 07:59:31.460	
[2025-07-09T14:59:31.460Z] [faviconDetection] Starting favicon-based tech detection for https://vulnerable-test-site.vercel.app
2025-07-09 07:59:31.460	
[2025-07-09T14:59:31.460Z] [faviconDetection] Starting batch favicon detection for 3 URLs
2025-07-09 07:59:31.460	
[2025-07-09T14:59:31.460Z] [faviconDetection] Starting batch favicon detection for 3 URLs
2025-07-09 07:59:31.460	
[2025-07-09T14:59:31.460Z] [techStackScan] techstack=favicon_detection starting favicon analysis for 3 URLs
2025-07-09 07:59:31.460	
[2025-07-09T14:59:31.460Z] [techStackScan] techstack=favicon_detection starting favicon analysis for 3 URLs
2025-07-09 07:59:31.460	
[2025-07-09T14:59:31.460Z] [techStackScan] techstack=webtech_success url="https://vulnerable-test-site.vercel.app/api" techs=0 duration=11ms
2025-07-09 07:59:31.460	
[2025-07-09T14:59:31.460Z] [techStackScan] techstack=webtech_success url="https://vulnerable-test-site.vercel.app/api" techs=0 duration=11ms
2025-07-09 07:59:31.460	
[2025-07-09T14:59:31.460Z] [techStackScan] techstack=webtech_success url="https://www.vulnerable-test-site.vercel.app/admin" techs=0 duration=49ms
2025-07-09 07:59:31.460	
[2025-07-09T14:59:31.460Z] [techStackScan] techstack=webtech_success url="https://www.vulnerable-test-site.vercel.app/admin" techs=0 duration=49ms
2025-07-09 07:59:31.460	
[2025-07-09T14:59:31.460Z] [techStackScan] techstack=webtech_success url="https://vulnerable-test-site.vercel.app/admin" techs=0 duration=10ms
2025-07-09 07:59:31.460	
[2025-07-09T14:59:31.460Z] [techStackScan] techstack=webtech_success url="https://vulnerable-test-site.vercel.app/admin" techs=0 duration=10ms
2025-07-09 07:59:31.460	
[2025-07-09T14:59:31.460Z] [techStackScan] techstack=webtech_success url="https://www.vulnerable-test-site.vercel.app" techs=0 duration=52ms
2025-07-09 07:59:31.460	
[2025-07-09T14:59:31.460Z] [techStackScan] techstack=webtech_success url="https://www.vulnerable-test-site.vercel.app" techs=0 duration=52ms
2025-07-09 07:59:31.460	
[2025-07-09T14:59:31.460Z] [techStackScan] techstack=webtech_success url="https://vulnerable-test-site.vercel.app" techs=0 duration=14ms
2025-07-09 07:59:31.460	
[2025-07-09T14:59:31.460Z] [techStackScan] techstack=webtech_success url="https://vulnerable-test-site.vercel.app" techs=0 duration=14ms
2025-07-09 07:59:31.460	
[2025-07-09T14:59:31.460Z] [fastTechDetection] Batch fast tech detection completed: 0 techs across 5 URLs in 1621ms
2025-07-09 07:59:31.460	
[2025-07-09T14:59:31.460Z] [fastTechDetection] Batch fast tech detection completed: 0 techs across 5 URLs in 1621ms
2025-07-09 07:59:31.460	
[2025-07-09T14:59:31.459Z] [fastTechDetection] Header detection found 0 technologies for https://www.vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.460	
[2025-07-09T14:59:31.459Z] [fastTechDetection] Header detection found 0 technologies for https://www.vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.411	
[2025-07-09T14:59:31.411Z] [fastTechDetection] Checking headers for quick tech detection: https://www.vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.411	
[2025-07-09T14:59:31.411Z] [fastTechDetection] Checking headers for quick tech detection: https://www.vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.411	
(105ms)
2025-07-09 07:59:31.411	
(105ms)
2025-07-09 07:59:31.411	
from /usr/local/bin/whatweb:37:in '<main>'
2025-07-09 07:59:31.411	
from /usr/local/bin/whatweb:37:in '<main>'
2025-07-09 07:59:31.411	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.411	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.411	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.411	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.411	
from /opt/whatweb/lib/whatweb.rb:22:in '<top (required)>'
2025-07-09 07:59:31.411	
from /opt/whatweb/lib/whatweb.rb:22:in '<top (required)>'
2025-07-09 07:59:31.411	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.411	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.411	
<internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require': cannot load such file -- getoptlong (LoadError)
2025-07-09 07:59:31.411	
<internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require': cannot load such file -- getoptlong (LoadError)
2025-07-09 07:59:31.411	
/usr/lib/ruby/3.4.0/did_you_mean/core_ext/name_error.rb:11: warning: getoptlong is not part of the default gems starting from Ruby 3.4.0. Install getoptlong from RubyGems.
2025-07-09 07:59:31.411	
/usr/lib/ruby/3.4.0/did_you_mean/core_ext/name_error.rb:11: warning: getoptlong is not part of the default gems starting from Ruby 3.4.0. Install getoptlong from RubyGems.
2025-07-09 07:59:31.411	
[2025-07-09T14:59:31.410Z] [fastTechDetection] WhatWeb detection failed for https://www.vulnerable-test-site.vercel.app/admin: Command failed: whatweb --log-json=- -a 3 https://www.vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.411	
[2025-07-09T14:59:31.410Z] [fastTechDetection] WhatWeb detection failed for https://www.vulnerable-test-site.vercel.app/admin: Command failed: whatweb --log-json=- -a 3 https://www.vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.368	
[2025-07-09T14:59:31.368Z] [fastTechDetection] Header detection found 0 technologies for https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:31.368	
[2025-07-09T14:59:31.368Z] [fastTechDetection] Header detection found 0 technologies for https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:31.317	
[2025-07-09T14:59:31.316Z] [fastTechDetection] Checking headers for quick tech detection: https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:31.317	
[2025-07-09T14:59:31.316Z] [fastTechDetection] Checking headers for quick tech detection: https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:31.317	
(187ms)
2025-07-09 07:59:31.317	
(187ms)
2025-07-09 07:59:31.317	
from /usr/local/bin/whatweb:37:in '<main>'
2025-07-09 07:59:31.317	
from /usr/local/bin/whatweb:37:in '<main>'
2025-07-09 07:59:31.317	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.317	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.317	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.317	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.317	
from /opt/whatweb/lib/whatweb.rb:22:in '<top (required)>'
2025-07-09 07:59:31.317	
from /opt/whatweb/lib/whatweb.rb:22:in '<top (required)>'
2025-07-09 07:59:31.317	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.317	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.317	
<internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require': cannot load such file -- getoptlong (LoadError)
2025-07-09 07:59:31.317	
<internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require': cannot load such file -- getoptlong (LoadError)
2025-07-09 07:59:31.317	
/usr/lib/ruby/3.4.0/did_you_mean/core_ext/name_error.rb:11: warning: getoptlong is not part of the default gems starting from Ruby 3.4.0. Install getoptlong from RubyGems.
2025-07-09 07:59:31.317	
/usr/lib/ruby/3.4.0/did_you_mean/core_ext/name_error.rb:11: warning: getoptlong is not part of the default gems starting from Ruby 3.4.0. Install getoptlong from RubyGems.
2025-07-09 07:59:31.317	
[2025-07-09T14:59:31.316Z] [fastTechDetection] WhatWeb detection failed for https://www.vulnerable-test-site.vercel.app: Command failed: whatweb --log-json=- -a 3 https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:31.317	
[2025-07-09T14:59:31.316Z] [fastTechDetection] WhatWeb detection failed for https://www.vulnerable-test-site.vercel.app: Command failed: whatweb --log-json=- -a 3 https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:31.305	
[2025-07-09T14:59:31.305Z] [fastTechDetection] Starting WhatWeb detection for https://www.vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.305	
[2025-07-09T14:59:31.305Z] [fastTechDetection] Starting WhatWeb detection for https://www.vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.305	
[2025-07-09T14:59:31.305Z] [fastTechDetection] WebTech detection completed for https://www.vulnerable-test-site.vercel.app/admin: 0 techs in 1375ms
2025-07-09 07:59:31.305	
[2025-07-09T14:59:31.305Z] [fastTechDetection] WebTech detection completed for https://www.vulnerable-test-site.vercel.app/admin: 0 techs in 1375ms
2025-07-09 07:59:31.295	
[2025-07-09T14:59:31.294Z] [dynamicBrowser] Page operation completed in 1092ms
2025-07-09 07:59:31.295	
[2025-07-09T14:59:31.294Z] [dynamicBrowser] Page operation completed in 1092ms
2025-07-09 07:59:31.248	
[2025-07-09T14:59:31.247Z] [fastTechDetection] Header detection found 0 technologies for https://vulnerable-test-site.vercel.app
2025-07-09 07:59:31.248	
[2025-07-09T14:59:31.247Z] [fastTechDetection] Header detection found 0 technologies for https://vulnerable-test-site.vercel.app
2025-07-09 07:59:31.247	
[2025-07-09T14:59:31.246Z] [fastTechDetection] Header detection found 0 technologies for https://vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.247	
[2025-07-09T14:59:31.246Z] [fastTechDetection] Header detection found 0 technologies for https://vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.237	
[2025-07-09T14:59:31.237Z] [fastTechDetection] Checking headers for quick tech detection: https://vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.237	
[2025-07-09T14:59:31.237Z] [fastTechDetection] Checking headers for quick tech detection: https://vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.237	
(210ms)
2025-07-09 07:59:31.237	
(210ms)
2025-07-09 07:59:31.237	
from /usr/local/bin/whatweb:37:in '<main>'
2025-07-09 07:59:31.237	
from /usr/local/bin/whatweb:37:in '<main>'
2025-07-09 07:59:31.237	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.237	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.237	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.237	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.237	
from /opt/whatweb/lib/whatweb.rb:22:in '<top (required)>'
2025-07-09 07:59:31.237	
from /opt/whatweb/lib/whatweb.rb:22:in '<top (required)>'
2025-07-09 07:59:31.237	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.237	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.237	
<internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require': cannot load such file -- getoptlong (LoadError)
2025-07-09 07:59:31.237	
<internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require': cannot load such file -- getoptlong (LoadError)
2025-07-09 07:59:31.237	
/usr/lib/ruby/3.4.0/did_you_mean/core_ext/name_error.rb:11: warning: getoptlong is not part of the default gems starting from Ruby 3.4.0. Install getoptlong from RubyGems.
2025-07-09 07:59:31.237	
/usr/lib/ruby/3.4.0/did_you_mean/core_ext/name_error.rb:11: warning: getoptlong is not part of the default gems starting from Ruby 3.4.0. Install getoptlong from RubyGems.
2025-07-09 07:59:31.237	
[2025-07-09T14:59:31.237Z] [fastTechDetection] WhatWeb detection failed for https://vulnerable-test-site.vercel.app/admin: Command failed: whatweb --log-json=- -a 3 https://vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.237	
[2025-07-09T14:59:31.237Z] [fastTechDetection] WhatWeb detection failed for https://vulnerable-test-site.vercel.app/admin: Command failed: whatweb --log-json=- -a 3 https://vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.236	
[2025-07-09T14:59:31.236Z] [fastTechDetection] Checking headers for quick tech detection: https://vulnerable-test-site.vercel.app
2025-07-09 07:59:31.236	
[2025-07-09T14:59:31.236Z] [fastTechDetection] Checking headers for quick tech detection: https://vulnerable-test-site.vercel.app
2025-07-09 07:59:31.236	
(215ms)
2025-07-09 07:59:31.236	
(215ms)
2025-07-09 07:59:31.236	
from /usr/local/bin/whatweb:37:in '<main>'
2025-07-09 07:59:31.236	
from /usr/local/bin/whatweb:37:in '<main>'
2025-07-09 07:59:31.236	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.236	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.236	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.236	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.236	
from /opt/whatweb/lib/whatweb.rb:22:in '<top (required)>'
2025-07-09 07:59:31.236	
from /opt/whatweb/lib/whatweb.rb:22:in '<top (required)>'
2025-07-09 07:59:31.236	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.236	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.236	
<internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require': cannot load such file -- getoptlong (LoadError)
2025-07-09 07:59:31.236	
<internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require': cannot load such file -- getoptlong (LoadError)
2025-07-09 07:59:31.236	
/usr/lib/ruby/3.4.0/did_you_mean/core_ext/name_error.rb:11: warning: getoptlong is not part of the default gems starting from Ruby 3.4.0. Install getoptlong from RubyGems.
2025-07-09 07:59:31.236	
/usr/lib/ruby/3.4.0/did_you_mean/core_ext/name_error.rb:11: warning: getoptlong is not part of the default gems starting from Ruby 3.4.0. Install getoptlong from RubyGems.
2025-07-09 07:59:31.236	
[2025-07-09T14:59:31.236Z] [fastTechDetection] WhatWeb detection failed for https://vulnerable-test-site.vercel.app: Command failed: whatweb --log-json=- -a 3 https://vulnerable-test-site.vercel.app
2025-07-09 07:59:31.236	
[2025-07-09T14:59:31.236Z] [fastTechDetection] WhatWeb detection failed for https://vulnerable-test-site.vercel.app: Command failed: whatweb --log-json=- -a 3 https://vulnerable-test-site.vercel.app
2025-07-09 07:59:31.129	
[2025-07-09T14:59:31.129Z] [fastTechDetection] Starting WhatWeb detection for https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:31.129	
[2025-07-09T14:59:31.129Z] [fastTechDetection] Starting WhatWeb detection for https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:31.129	
[2025-07-09T14:59:31.129Z] [fastTechDetection] WebTech detection completed for https://www.vulnerable-test-site.vercel.app: 0 techs in 1167ms
2025-07-09 07:59:31.129	
[2025-07-09T14:59:31.129Z] [fastTechDetection] WebTech detection completed for https://www.vulnerable-test-site.vercel.app: 0 techs in 1167ms
2025-07-09 07:59:31.027	
[2025-07-09T14:59:31.027Z] [fastTechDetection] Starting WhatWeb detection for https://vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.027	
[2025-07-09T14:59:31.027Z] [fastTechDetection] Starting WhatWeb detection for https://vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:31.027	
[2025-07-09T14:59:31.027Z] [fastTechDetection] WebTech detection completed for https://vulnerable-test-site.vercel.app/admin: 0 techs in 1164ms
2025-07-09 07:59:31.027	
[2025-07-09T14:59:31.027Z] [fastTechDetection] WebTech detection completed for https://vulnerable-test-site.vercel.app/admin: 0 techs in 1164ms
2025-07-09 07:59:31.022	
[2025-07-09T14:59:31.021Z] [fastTechDetection] Starting WhatWeb detection for https://vulnerable-test-site.vercel.app
2025-07-09 07:59:31.022	
[2025-07-09T14:59:31.021Z] [fastTechDetection] Starting WhatWeb detection for https://vulnerable-test-site.vercel.app
2025-07-09 07:59:31.022	
[2025-07-09T14:59:31.021Z] [fastTechDetection] WebTech detection completed for https://vulnerable-test-site.vercel.app: 0 techs in 1165ms
2025-07-09 07:59:31.022	
[2025-07-09T14:59:31.021Z] [fastTechDetection] WebTech detection completed for https://vulnerable-test-site.vercel.app: 0 techs in 1165ms
2025-07-09 07:59:31.014	
[2025-07-09T14:59:31.013Z] [fastTechDetection] Header detection found 0 technologies for https://vulnerable-test-site.vercel.app/api
2025-07-09 07:59:31.014	
[2025-07-09T14:59:31.013Z] [fastTechDetection] Header detection found 0 technologies for https://vulnerable-test-site.vercel.app/api
2025-07-09 07:59:31.006	
[2025-07-09T14:59:31.003Z] [fastTechDetection] Checking headers for quick tech detection: https://vulnerable-test-site.vercel.app/api
2025-07-09 07:59:31.006	
[2025-07-09T14:59:31.003Z] [fastTechDetection] Checking headers for quick tech detection: https://vulnerable-test-site.vercel.app/api
2025-07-09 07:59:31.006	
(168ms)
2025-07-09 07:59:31.006	
(168ms)
2025-07-09 07:59:31.006	
from /usr/local/bin/whatweb:37:in '<main>'
2025-07-09 07:59:31.006	
from /usr/local/bin/whatweb:37:in '<main>'
2025-07-09 07:59:31.006	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.006	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.006	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.006	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.006	
from /opt/whatweb/lib/whatweb.rb:22:in '<top (required)>'
2025-07-09 07:59:31.006	
from /opt/whatweb/lib/whatweb.rb:22:in '<top (required)>'
2025-07-09 07:59:31.006	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.006	
from <internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require'
2025-07-09 07:59:31.006	
<internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require': cannot load such file -- getoptlong (LoadError)
2025-07-09 07:59:31.006	
<internal:/usr/lib/ruby/3.4.0/rubygems/core_ext/kernel_require.rb>:136:in 'Kernel#require': cannot load such file -- getoptlong (LoadError)
2025-07-09 07:59:31.006	
/usr/lib/ruby/3.4.0/did_you_mean/core_ext/name_error.rb:11: warning: getoptlong is not part of the default gems starting from Ruby 3.4.0. Install getoptlong from RubyGems.
2025-07-09 07:59:31.006	
/usr/lib/ruby/3.4.0/did_you_mean/core_ext/name_error.rb:11: warning: getoptlong is not part of the default gems starting from Ruby 3.4.0. Install getoptlong from RubyGems.
2025-07-09 07:59:31.006	
[2025-07-09T14:59:31.002Z] [fastTechDetection] WhatWeb detection failed for https://vulnerable-test-site.vercel.app/api: Command failed: whatweb --log-json=- -a 3 https://vulnerable-test-site.vercel.app/api
2025-07-09 07:59:31.006	
[2025-07-09T14:59:31.002Z] [fastTechDetection] WhatWeb detection failed for https://vulnerable-test-site.vercel.app/api: Command failed: whatweb --log-json=- -a 3 https://vulnerable-test-site.vercel.app/api
2025-07-09 07:59:30.838	
[2025-07-09T14:59:30.834Z] [fastTechDetection] Starting WhatWeb detection for https://vulnerable-test-site.vercel.app/api
2025-07-09 07:59:30.838	
[2025-07-09T14:59:30.834Z] [fastTechDetection] Starting WhatWeb detection for https://vulnerable-test-site.vercel.app/api
2025-07-09 07:59:30.838	
[2025-07-09T14:59:30.834Z] [fastTechDetection] WebTech detection completed for https://vulnerable-test-site.vercel.app/api: 0 techs in 965ms
2025-07-09 07:59:30.838	
[2025-07-09T14:59:30.834Z] [fastTechDetection] WebTech detection completed for https://vulnerable-test-site.vercel.app/api: 0 techs in 965ms
2025-07-09 07:59:30.203	
[2025-07-09T14:59:30.202Z] [accessibilityScan] Testing accessibility for: https://vulnerable-test-site.vercel.app/help
2025-07-09 07:59:30.203	
[2025-07-09T14:59:30.202Z] [accessibilityScan] Testing accessibility for: https://vulnerable-test-site.vercel.app/help
2025-07-09 07:59:29.964	
[2025-07-09T14:59:29.962Z] [fastTechDetection] Starting WebTech detection for https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:29.964	
[2025-07-09T14:59:29.962Z] [fastTechDetection] Starting WebTech detection for https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:29.964	
[2025-07-09T14:59:29.950Z] [fastTechDetection] Header detection found 0 technologies for https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:29.964	
[2025-07-09T14:59:29.950Z] [fastTechDetection] Header detection found 0 technologies for https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:29.932	
[2025-07-09T14:59:29.930Z] [fastTechDetection] Starting WebTech detection for https://www.vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:29.932	
[2025-07-09T14:59:29.930Z] [fastTechDetection] Starting WebTech detection for https://www.vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:29.928	
[2025-07-09T14:59:29.928Z] [fastTechDetection] Header detection found 0 technologies for https://www.vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:29.928	
[2025-07-09T14:59:29.928Z] [fastTechDetection] Header detection found 0 technologies for https://www.vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:29.871	
[2025-07-09T14:59:29.869Z] [fastTechDetection] Starting WebTech detection for https://vulnerable-test-site.vercel.app/api
2025-07-09 07:59:29.871	
[2025-07-09T14:59:29.869Z] [fastTechDetection] Starting WebTech detection for https://vulnerable-test-site.vercel.app/api
2025-07-09 07:59:29.871	
[2025-07-09T14:59:29.869Z] [fastTechDetection] Header detection found 0 technologies for https://vulnerable-test-site.vercel.app/api
2025-07-09 07:59:29.871	
[2025-07-09T14:59:29.869Z] [fastTechDetection] Header detection found 0 technologies for https://vulnerable-test-site.vercel.app/api
2025-07-09 07:59:29.865	
[2025-07-09T14:59:29.863Z] [fastTechDetection] Starting WebTech detection for https://vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:29.865	
[2025-07-09T14:59:29.863Z] [fastTechDetection] Starting WebTech detection for https://vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:29.864	
[2025-07-09T14:59:29.863Z] [fastTechDetection] Header detection found 0 technologies for https://vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:29.864	
[2025-07-09T14:59:29.863Z] [fastTechDetection] Header detection found 0 technologies for https://vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:29.856	
[2025-07-09T14:59:29.856Z] [fastTechDetection] Starting WebTech detection for https://vulnerable-test-site.vercel.app
2025-07-09 07:59:29.856	
[2025-07-09T14:59:29.856Z] [fastTechDetection] Starting WebTech detection for https://vulnerable-test-site.vercel.app
2025-07-09 07:59:29.856	
[2025-07-09T14:59:29.856Z] [fastTechDetection] Header detection found 0 technologies for https://vulnerable-test-site.vercel.app
2025-07-09 07:59:29.856	
[2025-07-09T14:59:29.856Z] [fastTechDetection] Header detection found 0 technologies for https://vulnerable-test-site.vercel.app
2025-07-09 07:59:29.846	
[2025-07-09T14:59:29.846Z] [fastTechDetection] Checking headers for quick tech detection: https://vulnerable-test-site.vercel.app/api
2025-07-09 07:59:29.846	
[2025-07-09T14:59:29.846Z] [fastTechDetection] Checking headers for quick tech detection: https://vulnerable-test-site.vercel.app/api
2025-07-09 07:59:29.844	
[2025-07-09T14:59:29.844Z] [fastTechDetection] Checking headers for quick tech detection: https://www.vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:29.844	
[2025-07-09T14:59:29.844Z] [fastTechDetection] Checking headers for quick tech detection: https://www.vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:29.843	
[2025-07-09T14:59:29.843Z] [fastTechDetection] Checking headers for quick tech detection: https://vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:29.843	
[2025-07-09T14:59:29.843Z] [fastTechDetection] Checking headers for quick tech detection: https://vulnerable-test-site.vercel.app/admin
2025-07-09 07:59:29.841	
[2025-07-09T14:59:29.839Z] [fastTechDetection] Checking headers for quick tech detection: https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:29.841	
[2025-07-09T14:59:29.839Z] [fastTechDetection] Checking headers for quick tech detection: https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:29.841	
[2025-07-09T14:59:29.839Z] [fastTechDetection] Checking headers for quick tech detection: https://vulnerable-test-site.vercel.app
2025-07-09 07:59:29.841	
[2025-07-09T14:59:29.839Z] [fastTechDetection] Checking headers for quick tech detection: https://vulnerable-test-site.vercel.app
2025-07-09 07:59:29.841	
[2025-07-09T14:59:29.839Z] [fastTechDetection] Starting batch fast tech detection for 5 URLs
2025-07-09 07:59:29.841	
[2025-07-09T14:59:29.839Z] [fastTechDetection] Starting batch fast tech detection for 5 URLs
2025-07-09 07:59:29.841	
[2025-07-09T14:59:29.839Z] [techStackScan] techstack=fast_detection starting WebTech scan for 16 targets
2025-07-09 07:59:29.841	
[2025-07-09T14:59:29.839Z] [techStackScan] techstack=fast_detection starting WebTech scan for 16 targets
2025-07-09 07:59:29.841	
[2025-07-09T14:59:29.839Z] [techStackScan] techstack=targets primary=16 thirdParty=0 total=16 html=16 finalHtml=16 nonHtml=0 skipped=0
2025-07-09 07:59:29.841	
[2025-07-09T14:59:29.839Z] [techStackScan] techstack=targets primary=16 thirdParty=0 total=16 html=16 finalHtml=16 nonHtml=0 skipped=0
2025-07-09 07:59:29.828	
[2025-07-09T14:59:29.827Z] [dynamicBrowser] Page operation completed in 699ms
2025-07-09 07:59:29.828	
[2025-07-09T14:59:29.827Z] [dynamicBrowser] Page operation completed in 699ms
2025-07-09 07:59:29.828	
[2025-07-09T14:59:29.827Z] [techStackScan] thirdParty=discovered domain=vulnerable-test-site.vercel.app total=0 (html=0, nonHtml=0)
2025-07-09 07:59:29.828	
[2025-07-09T14:59:29.827Z] [techStackScan] thirdParty=discovered domain=vulnerable-test-site.vercel.app total=0 (html=0, nonHtml=0)
2025-07-09 07:59:29.024	
[2025-07-09T14:59:29.024Z] [techStackScan] buildTargets fallback added common paths, total=16
2025-07-09 07:59:29.024	
[2025-07-09T14:59:29.024Z] [techStackScan] buildTargets fallback added common paths, total=16
2025-07-09 07:59:29.023	
[2025-07-09T14:59:29.023Z] [techStackScan] buildTargets discovered=0 total=2 (html=2, nonHtml=0)
2025-07-09 07:59:29.023	
[2025-07-09T14:59:29.023Z] [techStackScan] buildTargets discovered=0 total=2 (html=2, nonHtml=0)
2025-07-09 07:59:29.016	
[2025-07-09T14:59:29.016Z] [techStackScan] techstack=nuclei wrapper confirmed available
2025-07-09 07:59:29.016	
[2025-07-09T14:59:29.016Z] [techStackScan] techstack=nuclei wrapper confirmed available
2025-07-09 07:59:29.016	
[2025-07-09T14:59:29.015Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-09 07:59:29.016	
[2025-07-09T14:59:29.015Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-09 07:59:29.016	
[INF] PDCP Directory: /root/.pdcp
2025-07-09 07:59:29.016	
[INF] PDCP Directory: /root/.pdcp
2025-07-09 07:59:29.016	
[INF] Nuclei Cache Directory: /root/.cache/nuclei
2025-07-09 07:59:29.016	
[INF] Nuclei Cache Directory: /root/.cache/nuclei
2025-07-09 07:59:29.016	
[INF] Nuclei Config Directory: /root/.config/nuclei
2025-07-09 07:59:29.016	
[INF] Nuclei Config Directory: /root/.config/nuclei
2025-07-09 07:59:29.016	
[2025-07-09T14:59:29.015Z] [nucleiWrapper] Nuclei stderr: [INF] Nuclei Engine Version: v3.4.5
2025-07-09 07:59:29.016	
[2025-07-09T14:59:29.015Z] [nucleiWrapper] Nuclei stderr: [INF] Nuclei Engine Version: v3.4.5
2025-07-09 07:59:28.987	
[2025-07-09T14:59:28.986Z] [nucleiWrapper] Manual timeout override: 20000ms
2025-07-09 07:59:28.987	
[2025-07-09T14:59:28.986Z] [nucleiWrapper] Manual timeout override: 20000ms
2025-07-09 07:59:28.987	
[2025-07-09T14:59:28.986Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-09 07:59:28.987	
[2025-07-09T14:59:28.986Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-09 07:59:28.981	
[2025-07-09T14:59:28.981Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://vulnerable-test-site.vercel.app -tags misconfiguration,default-logins,exposed-panels,exposure,tech -c 6 -timeout 20 -retries 1
2025-07-09 07:59:28.981	
[2025-07-09T14:59:28.981Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -silent -jsonl -u https://vulnerable-test-site.vercel.app -tags misconfiguration,default-logins,exposed-panels,exposure,tech -c 6 -timeout 20 -retries 1
2025-07-09 07:59:28.981	
[2025-07-09T14:59:28.981Z] [nucleiWrapper] Pass 1: Running baseline scan with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-07-09 07:59:28.981	
[2025-07-09T14:59:28.981Z] [nucleiWrapper] Pass 1: Running baseline scan with tags: misconfiguration,default-logins,exposed-panels,exposure,tech
2025-07-09 07:59:28.981	
[2025-07-09T14:59:28.981Z] [nucleiWrapper] Starting two-pass scan for https://vulnerable-test-site.vercel.app
2025-07-09 07:59:28.981	
[2025-07-09T14:59:28.981Z] [nucleiWrapper] Starting two-pass scan for https://vulnerable-test-site.vercel.app
2025-07-09 07:59:28.981	
[2025-07-09T14:59:28.981Z] [nuclei] Smart guard: techs=none timeout=20s headless=false
2025-07-09 07:59:28.981	
[2025-07-09T14:59:28.981Z] [nuclei] Smart guard: techs=none timeout=20s headless=false
2025-07-09 07:59:28.981	
[2025-07-09T14:59:28.981Z] [nuclei] [Enhanced Two-Pass Scan] Running on https://vulnerable-test-site.vercel.app
2025-07-09 07:59:28.981	
[2025-07-09T14:59:28.981Z] [nuclei] [Enhanced Two-Pass Scan] Running on https://vulnerable-test-site.vercel.app
2025-07-09 07:59:28.981	
[2025-07-09T14:59:28.981Z] [nuclei] --- Starting Enhanced Two-Pass Scans on 1 targets ---
2025-07-09 07:59:28.981	
[2025-07-09T14:59:28.981Z] [nuclei] --- Starting Enhanced Two-Pass Scans on 1 targets ---
2025-07-09 07:59:28.981	
[2025-07-09T14:59:28.980Z] [nuclei] Nuclei binary validated successfully.
2025-07-09 07:59:28.981	
[2025-07-09T14:59:28.980Z] [nuclei] Nuclei binary validated successfully.
2025-07-09 07:59:28.980	
[2025-07-09T14:59:28.980Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-09 07:59:28.980	
[2025-07-09T14:59:28.980Z] [nucleiWrapper] Nuclei execution completed: 0 results, exit code 0
2025-07-09 07:59:28.980	
[INF] PDCP Directory: /root/.pdcp
2025-07-09 07:59:28.980	
[INF] PDCP Directory: /root/.pdcp
2025-07-09 07:59:28.980	
[INF] Nuclei Cache Directory: /root/.cache/nuclei
2025-07-09 07:59:28.980	
[INF] Nuclei Cache Directory: /root/.cache/nuclei
2025-07-09 07:59:28.980	
[INF] Nuclei Config Directory: /root/.config/nuclei
2025-07-09 07:59:28.980	
[INF] Nuclei Config Directory: /root/.config/nuclei
2025-07-09 07:59:28.980	
[2025-07-09T14:59:28.980Z] [nucleiWrapper] Nuclei stderr: [INF] Nuclei Engine Version: v3.4.5
2025-07-09 07:59:28.980	
[2025-07-09T14:59:28.980Z] [nucleiWrapper] Nuclei stderr: [INF] Nuclei Engine Version: v3.4.5
2025-07-09 07:59:28.871	
[2025-07-09T14:59:28.871Z] [abuseIntelScan] No IP artifacts found for this scan
2025-07-09 07:59:28.871	
[2025-07-09T14:59:28.871Z] [abuseIntelScan] No IP artifacts found for this scan
2025-07-09 07:59:28.871	
[2025-07-09T14:59:28.870Z] [abuseIntelScan] Found 0 IP artifacts for scan bcJIQcxk8ck
2025-07-09 07:59:28.871	
[2025-07-09T14:59:28.870Z] [abuseIntelScan] Found 0 IP artifacts for scan bcJIQcxk8ck
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.868Z] [worker] [bcJIQcxk8ck] WAITING for accessibility_scan scan to complete...
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.868Z] [worker] [bcJIQcxk8ck] WAITING for accessibility_scan scan to complete...
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.868Z] [worker] [bcJIQcxk8ck] COMPLETED trufflehog scan: 0 findings found
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.868Z] [worker] [bcJIQcxk8ck] COMPLETED trufflehog scan: 0 findings found
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.868Z] [worker] [bcJIQcxk8ck] WAITING for trufflehog scan to complete...
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.868Z] [worker] [bcJIQcxk8ck] WAITING for trufflehog scan to complete...
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.868Z] [worker] [bcJIQcxk8ck] COMPLETED spf_dmarc scan: 3 findings found
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.868Z] [worker] [bcJIQcxk8ck] COMPLETED spf_dmarc scan: 3 findings found
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.867Z] [worker] [bcJIQcxk8ck] WAITING for spf_dmarc scan to complete...
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.867Z] [worker] [bcJIQcxk8ck] WAITING for spf_dmarc scan to complete...
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.867Z] [worker] [bcJIQcxk8ck] COMPLETED tls_scan scan: 1 findings found
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.867Z] [worker] [bcJIQcxk8ck] COMPLETED tls_scan scan: 1 findings found
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.867Z] [worker] [bcJIQcxk8ck] WAITING for tls_scan scan to complete...
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.867Z] [worker] [bcJIQcxk8ck] WAITING for tls_scan scan to complete...
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.867Z] [worker] [bcJIQcxk8ck] COMPLETED document_exposure scan: 0 findings found
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.867Z] [worker] [bcJIQcxk8ck] COMPLETED document_exposure scan: 0 findings found
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.867Z] [worker] [bcJIQcxk8ck] WAITING for document_exposure scan to complete...
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.867Z] [worker] [bcJIQcxk8ck] WAITING for document_exposure scan to complete...
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.866Z] [worker] [bcJIQcxk8ck] COMPLETED dns_twist scan: 17 findings found
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.866Z] [worker] [bcJIQcxk8ck] COMPLETED dns_twist scan: 17 findings found
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.866Z] [worker] [bcJIQcxk8ck] WAITING for dns_twist scan to complete...
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.866Z] [worker] [bcJIQcxk8ck] WAITING for dns_twist scan to complete...
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.866Z] [worker] [bcJIQcxk8ck] COMPLETED shodan scan: 0 findings found
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.866Z] [worker] [bcJIQcxk8ck] COMPLETED shodan scan: 0 findings found
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.866Z] [worker] [bcJIQcxk8ck] WAITING for shodan scan to complete...
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.866Z] [worker] [bcJIQcxk8ck] WAITING for shodan scan to complete...
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.866Z] [worker] [bcJIQcxk8ck] COMPLETED breach_directory_probe scan: 0 findings found
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.866Z] [worker] [bcJIQcxk8ck] COMPLETED breach_directory_probe scan: 0 findings found
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.866Z] [worker] [bcJIQcxk8ck] WAITING for breach_directory_probe scan to complete...
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.866Z] [worker] [bcJIQcxk8ck] WAITING for breach_directory_probe scan to complete...
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.866Z] [abuseIntelScan] Starting AbuseIPDB scan for scanId=bcJIQcxk8ck
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.866Z] [abuseIntelScan] Starting AbuseIPDB scan for scanId=bcJIQcxk8ck
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.865Z] [worker] [bcJIQcxk8ck] STARTING AbuseIPDB intelligence scan for IPs (parallel after endpoint discovery)
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.865Z] [worker] [bcJIQcxk8ck] STARTING AbuseIPDB intelligence scan for IPs (parallel after endpoint discovery)
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.865Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-09 07:59:28.869	
[2025-07-09T14:59:28.865Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-09 07:59:28.862	
[2025-07-09T14:59:28.862Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -version
2025-07-09 07:59:28.862	
[2025-07-09T14:59:28.862Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -version
2025-07-09 07:59:28.862	
[2025-07-09T14:59:28.862Z] [techStackScan] techstack=start domain=vulnerable-test-site.vercel.app
2025-07-09 07:59:28.862	
[2025-07-09T14:59:28.862Z] [techStackScan] techstack=start domain=vulnerable-test-site.vercel.app
2025-07-09 07:59:28.862	
[2025-07-09T14:59:28.862Z] [worker] [bcJIQcxk8ck] STARTING tech stack scan for vulnerable-test-site.vercel.app (parallel after endpoint discovery)
2025-07-09 07:59:28.862	
[2025-07-09T14:59:28.862Z] [worker] [bcJIQcxk8ck] STARTING tech stack scan for vulnerable-test-site.vercel.app (parallel after endpoint discovery)
2025-07-09 07:59:28.862	
[2025-07-09T14:59:28.862Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-09 07:59:28.862	
[2025-07-09T14:59:28.862Z] [nucleiWrapper] Using baseline timeout: 8000ms
2025-07-09 07:59:28.858	
[2025-07-09T14:59:28.857Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -version
2025-07-09 07:59:28.858	
[2025-07-09T14:59:28.857Z] [nucleiWrapper] Executing nuclei: /usr/local/bin/nuclei -version
2025-07-09 07:59:28.858	
[2025-07-09T14:59:28.857Z] [nuclei] Starting enhanced vulnerability scan for vulnerable-test-site.vercel.app
2025-07-09 07:59:28.858	
[2025-07-09T14:59:28.857Z] [nuclei] Starting enhanced vulnerability scan for vulnerable-test-site.vercel.app
2025-07-09 07:59:28.858	
[2025-07-09T14:59:28.857Z] [worker] [bcJIQcxk8ck] STARTING Nuclei vulnerability scan for vulnerable-test-site.vercel.app (parallel after endpoint discovery)
2025-07-09 07:59:28.858	
[2025-07-09T14:59:28.857Z] [worker] [bcJIQcxk8ck] STARTING Nuclei vulnerability scan for vulnerable-test-site.vercel.app (parallel after endpoint discovery)
2025-07-09 07:59:28.858	
[2025-07-09T14:59:28.857Z] [worker] [bcJIQcxk8ck] COMPLETED endpoint discovery: 16 endpoint collections found
2025-07-09 07:59:28.858	
[2025-07-09T14:59:28.857Z] [worker] [bcJIQcxk8ck] COMPLETED endpoint discovery: 16 endpoint collections found
2025-07-09 07:59:28.858	
[2025-07-09T14:59:28.857Z] [endpointDiscovery] ⇢ done – 0 endpoints, 16 web assets
2025-07-09 07:59:28.858	
[2025-07-09T14:59:28.857Z] [endpointDiscovery] ⇢ done – 0 endpoints, 16 web assets
2025-07-09 07:59:28.823	
[2025-07-09T14:59:28.822Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/config.json
2025-07-09 07:59:28.823	
[2025-07-09T14:59:28.822Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/config.json
2025-07-09 07:59:28.823	
[2025-07-09T14:59:28.822Z] [endpointDiscovery] +web_asset json https://vulnerable-test-site.vercel.app/config.json (31542 bytes)
2025-07-09 07:59:28.823	
[2025-07-09T14:59:28.822Z] [endpointDiscovery] +web_asset json https://vulnerable-test-site.vercel.app/config.json (31542 bytes)
2025-07-09 07:59:28.821	
[2025-07-09T14:59:28.821Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/build/config.json
2025-07-09 07:59:28.821	
[2025-07-09T14:59:28.821Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/build/config.json
2025-07-09 07:59:28.821	
[2025-07-09T14:59:28.821Z] [endpointDiscovery] +web_asset json https://vulnerable-test-site.vercel.app/build/config.json (31542 bytes)
2025-07-09 07:59:28.821	
[2025-07-09T14:59:28.821Z] [endpointDiscovery] +web_asset json https://vulnerable-test-site.vercel.app/build/config.json (31542 bytes)
2025-07-09 07:59:28.820	
[2025-07-09T14:59:28.819Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/static/js/main.js
2025-07-09 07:59:28.820	
[2025-07-09T14:59:28.819Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/static/js/main.js
2025-07-09 07:59:28.820	
[2025-07-09T14:59:28.819Z] [endpointDiscovery] +web_asset javascript https://vulnerable-test-site.vercel.app/static/js/main.js (31541 bytes)
2025-07-09 07:59:28.820	
[2025-07-09T14:59:28.819Z] [endpointDiscovery] +web_asset javascript https://vulnerable-test-site.vercel.app/static/js/main.js (31541 bytes)
2025-07-09 07:59:28.818	
[2025-07-09T14:59:28.818Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/api/settings
2025-07-09 07:59:28.818	
[2025-07-09T14:59:28.818Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/api/settings
2025-07-09 07:59:28.816	
[2025-07-09T14:59:28.816Z] [endpointDiscovery] +web_asset other https://vulnerable-test-site.vercel.app/api/settings (31541 bytes)
2025-07-09 07:59:28.816	
[2025-07-09T14:59:28.816Z] [endpointDiscovery] +web_asset other https://vulnerable-test-site.vercel.app/api/settings (31541 bytes)
2025-07-09 07:59:28.815	
[2025-07-09T14:59:28.814Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/_next/static/chunks/webpack.js
2025-07-09 07:59:28.815	
[2025-07-09T14:59:28.814Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/_next/static/chunks/webpack.js
2025-07-09 07:59:28.815	
[2025-07-09T14:59:28.814Z] [endpointDiscovery] +web_asset javascript https://vulnerable-test-site.vercel.app/_next/static/chunks/webpack.js (31536 bytes)
2025-07-09 07:59:28.815	
[2025-07-09T14:59:28.814Z] [endpointDiscovery] +web_asset javascript https://vulnerable-test-site.vercel.app/_next/static/chunks/webpack.js (31536 bytes)
2025-07-09 07:59:28.810	
[2025-07-09T14:59:28.810Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/settings.json
2025-07-09 07:59:28.810	
[2025-07-09T14:59:28.810Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/settings.json
2025-07-09 07:59:28.810	
[2025-07-09T14:59:28.810Z] [endpointDiscovery] +web_asset json https://vulnerable-test-site.vercel.app/settings.json (31543 bytes)
2025-07-09 07:59:28.810	
[2025-07-09T14:59:28.810Z] [endpointDiscovery] +web_asset json https://vulnerable-test-site.vercel.app/settings.json (31543 bytes)
2025-07-09 07:59:28.808	
[2025-07-09T14:59:28.808Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/.env
2025-07-09 07:59:28.808	
[2025-07-09T14:59:28.808Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/.env
2025-07-09 07:59:28.808	
[2025-07-09T14:59:28.808Z] [endpointDiscovery] +web_asset other https://vulnerable-test-site.vercel.app/.env (31544 bytes)
2025-07-09 07:59:28.808	
[2025-07-09T14:59:28.808Z] [endpointDiscovery] +web_asset other https://vulnerable-test-site.vercel.app/.env (31544 bytes)
2025-07-09 07:59:28.808	
[2025-07-09T14:59:28.807Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/assets/config.js
2025-07-09 07:59:28.808	
[2025-07-09T14:59:28.807Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/assets/config.js
2025-07-09 07:59:28.808	
[2025-07-09T14:59:28.807Z] [endpointDiscovery] +web_asset javascript https://vulnerable-test-site.vercel.app/assets/config.js (31543 bytes)
2025-07-09 07:59:28.808	
[2025-07-09T14:59:28.807Z] [endpointDiscovery] +web_asset javascript https://vulnerable-test-site.vercel.app/assets/config.js (31543 bytes)
2025-07-09 07:59:28.804	
[2025-07-09T14:59:28.803Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/api/config
2025-07-09 07:59:28.804	
[2025-07-09T14:59:28.803Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/api/config
2025-07-09 07:59:28.803	
[2025-07-09T14:59:28.803Z] [endpointDiscovery] +web_asset other https://vulnerable-test-site.vercel.app/api/config (31541 bytes)
2025-07-09 07:59:28.803	
[2025-07-09T14:59:28.803Z] [endpointDiscovery] +web_asset other https://vulnerable-test-site.vercel.app/api/config (31541 bytes)
2025-07-09 07:59:28.802	
[2025-07-09T14:59:28.801Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/manifest.json
2025-07-09 07:59:28.802	
[2025-07-09T14:59:28.801Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/manifest.json
2025-07-09 07:59:28.802	
[2025-07-09T14:59:28.801Z] [endpointDiscovery] +web_asset json https://vulnerable-test-site.vercel.app/manifest.json (31544 bytes)
2025-07-09 07:59:28.802	
[2025-07-09T14:59:28.801Z] [endpointDiscovery] +web_asset json https://vulnerable-test-site.vercel.app/manifest.json (31544 bytes)
2025-07-09 07:59:28.801	
[2025-07-09T14:59:28.800Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/app.config.json
2025-07-09 07:59:28.801	
[2025-07-09T14:59:28.800Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/app.config.json
2025-07-09 07:59:28.801	
[2025-07-09T14:59:28.800Z] [endpointDiscovery] +web_asset json https://vulnerable-test-site.vercel.app/app.config.json (31543 bytes)
2025-07-09 07:59:28.801	
[2025-07-09T14:59:28.800Z] [endpointDiscovery] +web_asset json https://vulnerable-test-site.vercel.app/app.config.json (31543 bytes)
2025-07-09 07:59:28.801	
[2025-07-09T14:59:28.800Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/config.js
2025-07-09 07:59:28.801	
[2025-07-09T14:59:28.800Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/config.js
2025-07-09 07:59:28.801	
[2025-07-09T14:59:28.800Z] [endpointDiscovery] +web_asset javascript https://vulnerable-test-site.vercel.app/config.js (31541 bytes)
2025-07-09 07:59:28.801	
[2025-07-09T14:59:28.800Z] [endpointDiscovery] +web_asset javascript https://vulnerable-test-site.vercel.app/config.js (31541 bytes)
2025-07-09 07:59:28.799	
[2025-07-09T14:59:28.799Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/.env.production
2025-07-09 07:59:28.799	
[2025-07-09T14:59:28.799Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/.env.production
2025-07-09 07:59:28.799	
[2025-07-09T14:59:28.799Z] [endpointDiscovery] +web_asset other https://vulnerable-test-site.vercel.app/.env.production (31536 bytes)
2025-07-09 07:59:28.799	
[2025-07-09T14:59:28.799Z] [endpointDiscovery] +web_asset other https://vulnerable-test-site.vercel.app/.env.production (31536 bytes)
2025-07-09 07:59:28.798	
[2025-07-09T14:59:28.798Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/.env.local
2025-07-09 07:59:28.798	
[2025-07-09T14:59:28.798Z] [endpointDiscovery] Found high-value asset: https://vulnerable-test-site.vercel.app/.env.local
2025-07-09 07:59:28.798	
[2025-07-09T14:59:28.797Z] [endpointDiscovery] +web_asset other https://vulnerable-test-site.vercel.app/.env.local (31536 bytes)
2025-07-09 07:59:28.798	
[2025-07-09T14:59:28.797Z] [endpointDiscovery] +web_asset other https://vulnerable-test-site.vercel.app/.env.local (31536 bytes)
2025-07-09 07:59:28.695	
[2025-07-09T14:59:28.694Z] [dynamicBrowser] Page operation completed in 686ms
2025-07-09 07:59:28.009	
[2025-07-09T14:59:28.008Z] [accessibilityScan] Testing accessibility for: https://vulnerable-test-site.vercel.app/search
2025-07-09 07:59:26.929	
[2025-07-09T14:59:26.928Z] [dynamicBrowser] Page operation completed in 703ms
2025-07-09 07:59:26.588	
[2025-07-09T14:59:26.588Z] [dnstwist] Scan completed – 17 domains analysed
2025-07-09 07:59:26.585	
[2025-07-09T14:59:26.584Z] [dnstwist] ↪️ LEGITIMATE REDIRECT: vulnerable-test-site.vercelapp.com marked as INFO severity - redirects to original
2025-07-09 07:59:26.506	
[2025-07-09T14:59:26.506Z] [dnstwist] ↪️ LEGITIMATE REDIRECT: vulnerable-test-site.vercel-app.com marked as INFO severity - redirects to original
2025-07-09 07:59:26.370	
[2025-07-09T14:59:26.369Z] [dnstwist] ❌ Serper API: No search results found for vulnerable-test-site.vercel-app.com
2025-07-09 07:59:26.225	
[2025-07-09T14:59:26.225Z] [accessibilityScan] Testing accessibility for: https://vulnerable-test-site.vercel.app/join
2025-07-09 07:59:26.207	
[2025-07-09T14:59:26.206Z] [dnstwist] ❌ Serper API: No search results found for vulnerable-test-site.vercelapp.com
2025-07-09 07:59:25.551	
[2025-07-09T14:59:25.550Z] [dnstwist] 🔍 Calling Serper API for vulnerable-test-site.vercelapp.com
2025-07-09 07:59:25.550	
[2025-07-09T14:59:25.550Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-09 07:59:25.550	
[2025-07-09T14:59:25.550Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:25.550	
Saved $0.028 vs WhoisXML
2025-07-09 07:59:25.550	
[2025-07-09T14:59:25.550Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:25.471	
[2025-07-09T14:59:25.471Z] [dnstwist] 🔍 Calling Serper API for vulnerable-test-site.vercel-app.com
2025-07-09 07:59:25.471	
[2025-07-09T14:59:25.471Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-09 07:59:25.471	
[2025-07-09T14:59:25.471Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:25.471	
Saved $0.028 vs WhoisXML
2025-07-09 07:59:25.471	
[2025-07-09T14:59:25.470Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:25.145	
[2025-07-09T14:59:25.144Z] [dynamicBrowser] Page operation completed in 636ms
2025-07-09 07:59:24.509	
[2025-07-09T14:59:24.508Z] [accessibilityScan] Testing accessibility for: https://vulnerable-test-site.vercel.app/register
2025-07-09 07:59:24.165	
[2025-07-09T14:59:24.164Z] [dnstwist] Analyzing threat signals for vulnerable-test-site.vercel-app.com
2025-07-09 07:59:24.152	
[2025-07-09T14:59:24.152Z] [dnstwist] Analyzing threat signals for vulnerable-test-site.vercelapp.com
2025-07-09 07:59:24.152	
[2025-07-09T14:59:24.152Z] [dnstwist] Batch 2/2
2025-07-09 07:59:23.848	
[2025-07-09T14:59:23.848Z] [dnstwist] ↪️ LEGITIMATE REDIRECT: vulnerable-test-site.varcel.app marked as INFO severity - redirects to original
2025-07-09 07:59:23.599	
[2025-07-09T14:59:23.599Z] [dnstwist] ↪️ LEGITIMATE REDIRECT: vulnerable-test-site.vervel.app marked as INFO severity - redirects to original
2025-07-09 07:59:23.597	
[artifactStore] Inserted finding MALICIOUS_TYPOSQUAT for artifact 2619
2025-07-09 07:59:23.596	
[artifactStore] Inserted typo_domain artifact: Active typosquat threat detected: vulnerable-test-site.gerce...
2025-07-09 07:59:23.390	
[2025-07-09T14:59:23.390Z] [dnstwist] ❌ Serper API: No search results found for vulnerable-test-site.varcel.app
2025-07-09 07:59:23.361	
[2025-07-09T14:59:23.361Z] [dynamicBrowser] Page operation completed in 694ms
2025-07-09 07:59:23.205	
[2025-07-09T14:59:23.205Z] [dnstwist] ❌ Serper API: No search results found for vulnerable-test-site.gercel.app
2025-07-09 07:59:23.143	
[2025-07-09T14:59:23.143Z] [dnstwist] ❌ Serper API: No search results found for vulnerable-test-site.vervel.app
2025-07-09 07:59:23.088	
[artifactStore] Inserted finding MALICIOUS_TYPOSQUAT for artifact 2618
2025-07-09 07:59:23.086	
[artifactStore] Inserted typo_domain artifact: Active typosquat threat detected: vulnerable-test-site.cerce...
2025-07-09 07:59:23.060	
[2025-07-09T14:59:23.060Z] [dnstwist] ↪️ LEGITIMATE REDIRECT: vulnerable-test-site.versel.app marked as INFO severity - redirects to original
2025-07-09 07:59:22.668	
[2025-07-09T14:59:22.668Z] [accessibilityScan] Testing accessibility for: https://vulnerable-test-site.vercel.app/login
2025-07-09 07:59:22.648	
[2025-07-09T14:59:22.648Z] [dnstwist] ❌ Serper API: No search results found for vulnerable-test-site.cercel.app
2025-07-09 07:59:22.645	
[2025-07-09T14:59:22.645Z] [dnstwist] ❌ Serper API: No search results found for vulnerable-test-site.versel.app
2025-07-09 07:59:22.643	
[2025-07-09T14:59:22.642Z] [dnstwist] 🔍 Calling Serper API for vulnerable-test-site.varcel.app
2025-07-09 07:59:22.643	
[2025-07-09T14:59:22.641Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-09 07:59:22.643	
[2025-07-09T14:59:22.641Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:22.643	
Saved $0.028 vs WhoisXML
2025-07-09 07:59:22.643	
[2025-07-09T14:59:22.641Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:22.566	
[2025-07-09T14:59:22.566Z] [dnstwist] 🔍 Calling Serper API for vulnerable-test-site.gercel.app
2025-07-09 07:59:22.566	
[2025-07-09T14:59:22.566Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-09 07:59:22.566	
[2025-07-09T14:59:22.565Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:22.566	
Saved $0.028 vs WhoisXML
2025-07-09 07:59:22.566	
[2025-07-09T14:59:22.565Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:22.157	
[2025-07-09T14:59:22.157Z] [dnstwist] 🔍 Calling Serper API for vulnerable-test-site.vervel.app
2025-07-09 07:59:22.157	
[2025-07-09T14:59:22.156Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-09 07:59:22.156	
[2025-07-09T14:59:22.156Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:22.156	
Saved $0.028 vs WhoisXML
2025-07-09 07:59:22.156	
[2025-07-09T14:59:22.156Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:22.126	
[artifactStore] Inserted finding MALICIOUS_TYPOSQUAT for artifact 2615
2025-07-09 07:59:22.125	
[artifactStore] Inserted typo_domain artifact: Active typosquat threat detected: vulnerable-test-site.ferce...
2025-07-09 07:59:22.124	
[2025-07-09T14:59:22.124Z] [dnstwist] ↪️ LEGITIMATE REDIRECT: vulnerable-test-site.vercell.app marked as INFO severity - redirects to original
2025-07-09 07:59:22.122	
[2025-07-09T14:59:22.121Z] [dnstwist] ↪️ LEGITIMATE REDIRECT: vulnerable-test-site.verel.app marked as INFO severity - redirects to original
2025-07-09 07:59:22.118	
[2025-07-09T14:59:22.118Z] [dnstwist] ↪️ LEGITIMATE REDIRECT: vulnerable-test-site.verce.app marked as INFO severity - redirects to original
2025-07-09 07:59:22.037	
[2025-07-09T14:59:22.037Z] [dnstwist] ↪️ LEGITIMATE REDIRECT: vulnerable-test-site.vercle.app marked as INFO severity - redirects to original
2025-07-09 07:59:22.017	
[2025-07-09T14:59:22.017Z] [dnstwist] 🔍 Calling Serper API for vulnerable-test-site.versel.app
2025-07-09 07:59:22.017	
[2025-07-09T14:59:22.017Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-09 07:59:22.017	
[2025-07-09T14:59:22.017Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:22.017	
Saved $0.028 vs WhoisXML
2025-07-09 07:59:22.017	
[2025-07-09T14:59:22.017Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:21.987	
[2025-07-09T14:59:21.987Z] [dnstwist] ❌ Serper API: No search results found for vulnerable-test-site.vercell.app
2025-07-09 07:59:21.985	
[2025-07-09T14:59:21.985Z] [dnstwist] ❌ Serper API: No search results found for vulnerable-test-site.verel.app
2025-07-09 07:59:21.983	
[2025-07-09T14:59:21.982Z] [dnstwist] ❌ Serper API: No search results found for vulnerable-test-site.verce.app
2025-07-09 07:59:21.817	
[2025-07-09T14:59:21.817Z] [dnstwist] 🔍 Calling Serper API for vulnerable-test-site.cercel.app
2025-07-09 07:59:21.817	
[2025-07-09T14:59:21.817Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-09 07:59:21.817	
[2025-07-09T14:59:21.817Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:21.817	
Saved $0.028 vs WhoisXML
2025-07-09 07:59:21.817	
[2025-07-09T14:59:21.817Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:21.748	
[2025-07-09T14:59:21.747Z] [dnstwist] ↪️ LEGITIMATE REDIRECT: vulnerable-test-site.vercei.app marked as INFO severity - redirects to original
2025-07-09 07:59:21.705	
[2025-07-09T14:59:21.705Z] [dnstwist] ❌ Serper API: No search results found for vulnerable-test-site.fercel.app
2025-07-09 07:59:21.573	
[2025-07-09T14:59:21.573Z] [dynamicBrowser] Page operation completed in 1443ms
2025-07-09 07:59:21.448	
[2025-07-09T14:59:21.446Z] [dnstwist] 🔍 Calling Serper API for vulnerable-test-site.vercell.app
2025-07-09 07:59:21.441	
[2025-07-09T14:59:21.440Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-09 07:59:21.441	
[2025-07-09T14:59:21.440Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:21.440	
Saved $0.028 vs WhoisXML
2025-07-09 07:59:21.440	
[2025-07-09T14:59:21.440Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:21.393	
[artifactStore] Inserted finding MALICIOUS_TYPOSQUAT for artifact 2609
2025-07-09 07:59:21.391	
[artifactStore] Inserted typo_domain artifact: Active typosquat threat detected: vulnerable-test-site.berce...
2025-07-09 07:59:21.268	
[2025-07-09T14:59:21.268Z] [dnstwist] ↪️ LEGITIMATE REDIRECT: vulnerable-test-site.vercl.app marked as INFO severity - redirects to original
2025-07-09 07:59:21.248	
[2025-07-09T14:59:21.247Z] [dnstwist] 🔍 Calling Serper API for vulnerable-test-site.verel.app
2025-07-09 07:59:21.247	
[2025-07-09T14:59:21.246Z] [dnstwist] ↪️ LEGITIMATE REDIRECT: vulnerable-test-site.vecel.app marked as INFO severity - redirects to original
2025-07-09 07:59:21.244	
[2025-07-09T14:59:21.244Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-09 07:59:21.244	
[2025-07-09T14:59:21.244Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:21.243	
Saved $0.028 vs WhoisXML
2025-07-09 07:59:21.243	
[2025-07-09T14:59:21.243Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:21.156	
[2025-07-09T14:59:21.156Z] [dnstwist] ❌ Serper API: No search results found for vulnerable-test-site.vercei.app
2025-07-09 07:59:21.126	
[2025-07-09T14:59:21.125Z] [dnstwist] 🔍 Calling Serper API for vulnerable-test-site.fercel.app
2025-07-09 07:59:21.123	
[2025-07-09T14:59:21.123Z] [dnstwist] ↪️ LEGITIMATE REDIRECT: vulnerable-test-site.vercal.app marked as INFO severity - redirects to original
2025-07-09 07:59:21.122	
[2025-07-09T14:59:21.122Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-09 07:59:21.122	
[2025-07-09T14:59:21.122Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:21.120	
Saved $0.028 vs WhoisXML
2025-07-09 07:59:21.119	
[2025-07-09T14:59:21.119Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:21.107	
[2025-07-09T14:59:21.107Z] [dnstwist] ❌ Serper API: No search results found for vulnerable-test-site.vercle.app
2025-07-09 07:59:21.084	
[2025-07-09T14:59:21.084Z] [dnstwist] ❌ Serper API: No search results found for vulnerable-test-site.vercl.app
2025-07-09 07:59:20.925	
[2025-07-09T14:59:20.925Z] [dnstwist] 🔍 Calling Serper API for vulnerable-test-site.verce.app
2025-07-09 07:59:20.918	
[2025-07-09T14:59:20.918Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-09 07:59:20.918	
[2025-07-09T14:59:20.918Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:20.911	
Saved $0.028 vs WhoisXML
2025-07-09 07:59:20.911	
[2025-07-09T14:59:20.911Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:20.891	
[2025-07-09T14:59:20.891Z] [dnstwist] ❌ Serper API: No search results found for vulnerable-test-site.vecel.app
2025-07-09 07:59:20.815	
[2025-07-09T14:59:20.815Z] [dnstwist] ❌ Serper API: No search results found for vulnerable-test-site.vercal.app
2025-07-09 07:59:20.588	
[2025-07-09T14:59:20.588Z] [dnstwist] ❌ Serper API: No search results found for vulnerable-test-site.bercel.app
2025-07-09 07:59:20.434	
[2025-07-09T14:59:20.434Z] [dnstwist] 🔍 Calling Serper API for vulnerable-test-site.vercei.app
2025-07-09 07:59:20.433	
[2025-07-09T14:59:20.433Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-09 07:59:20.433	
[2025-07-09T14:59:20.432Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:20.432	
Saved $0.028 vs WhoisXML
2025-07-09 07:59:20.432	
[2025-07-09T14:59:20.432Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:20.280	
[2025-07-09T14:59:20.280Z] [dnstwist] 🔍 Calling Serper API for vulnerable-test-site.vercl.app
2025-07-09 07:59:20.279	
[2025-07-09T14:59:20.279Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-09 07:59:20.279	
[2025-07-09T14:59:20.279Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:20.279	
Saved $0.028 vs WhoisXML
2025-07-09 07:59:20.279	
[2025-07-09T14:59:20.278Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:20.267	
[2025-07-09T14:59:20.267Z] [dnstwist] 🔍 Calling Serper API for vulnerable-test-site.vercle.app
2025-07-09 07:59:20.267	
[2025-07-09T14:59:20.267Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-09 07:59:20.267	
[2025-07-09T14:59:20.267Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:20.267	
Saved $0.028 vs WhoisXML
2025-07-09 07:59:20.267	
[2025-07-09T14:59:20.267Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:20.131	
[2025-07-09T14:59:20.130Z] [accessibilityScan] Testing accessibility for: https://vulnerable-test-site.vercel.app/signup
2025-07-09 07:59:20.067	
[2025-07-09T14:59:20.067Z] [dnstwist] 🔍 Calling Serper API for vulnerable-test-site.vecel.app
2025-07-09 07:59:20.067	
[2025-07-09T14:59:20.067Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-09 07:59:20.067	
[2025-07-09T14:59:20.067Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:20.056	
Saved $0.028 vs WhoisXML
2025-07-09 07:59:20.056	
[2025-07-09T14:59:20.056Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:19.936	
[2025-07-09T14:59:19.936Z] [dnstwist] 🔍 Calling Serper API for vulnerable-test-site.vercal.app
2025-07-09 07:59:19.936	
[2025-07-09T14:59:19.935Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-09 07:59:19.935	
[2025-07-09T14:59:19.935Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:19.935	
Saved $0.028 vs WhoisXML
2025-07-09 07:59:19.935	
[2025-07-09T14:59:19.935Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:19.697	
[2025-07-09T14:59:19.694Z] [dnstwist] 🔍 Calling Serper API for vulnerable-test-site.bercel.app
2025-07-09 07:59:19.692	
[2025-07-09T14:59:19.691Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-09 07:59:19.692	
[2025-07-09T14:59:19.691Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:19.692	
Saved $0.028 vs WhoisXML
2025-07-09 07:59:19.692	
[2025-07-09T14:59:19.691Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:59:18.248	
[2025-07-09T14:59:18.247Z] [dynamicBrowser] Page operation completed in 695ms
2025-07-09 07:59:18.079	
[2025-07-09T14:59:18.079Z] [dnstwist] TLS cert check failed for vulnerable-test-site.vercle.app: Request failed with status code 429
2025-07-09 07:59:17.934	
[2025-07-09T14:59:17.929Z] [dnstwist] TLS cert check failed for vulnerable-test-site.bercel.app: Request failed with status code 429
2025-07-09 07:59:17.874	
[2025-07-09T14:59:17.874Z] [dnstwist] TLS cert check failed for vulnerable-test-site.vercei.app: Request failed with status code 429
2025-07-09 07:59:17.553	
[2025-07-09T14:59:17.552Z] [accessibilityScan] Testing accessibility for: https://vulnerable-test-site.vercel.app/pricing
2025-07-09 07:59:17.205	
[2025-07-09T14:59:17.204Z] [dnstwist] Analyzing threat signals for vulnerable-test-site.vercle.app
2025-07-09 07:59:17.173	
[2025-07-09T14:59:17.172Z] [dnstwist] Analyzing threat signals for vulnerable-test-site.cercel.app
2025-07-09 07:59:17.152	
[2025-07-09T14:59:17.151Z] [dnstwist] Analyzing threat signals for vulnerable-test-site.gercel.app
2025-07-09 07:59:17.130	
[2025-07-09T14:59:17.130Z] [dnstwist] Analyzing threat signals for vulnerable-test-site.bercel.app
2025-07-09 07:59:17.107	
[2025-07-09T14:59:17.107Z] [dnstwist] Analyzing threat signals for vulnerable-test-site.vervel.app
2025-07-09 07:59:17.093	
[2025-07-09T14:59:17.093Z] [dnstwist] Analyzing threat signals for vulnerable-test-site.verel.app
2025-07-09 07:59:17.073	
[2025-07-09T14:59:17.073Z] [dnstwist] Analyzing threat signals for vulnerable-test-site.verce.app
2025-07-09 07:59:17.057	
[2025-07-09T14:59:17.057Z] [dnstwist] Analyzing threat signals for vulnerable-test-site.vecel.app
2025-07-09 07:59:17.039	
[2025-07-09T14:59:17.039Z] [dnstwist] Analyzing threat signals for vulnerable-test-site.vercl.app
2025-07-09 07:59:17.020	
[2025-07-09T14:59:17.020Z] [dnstwist] Analyzing threat signals for vulnerable-test-site.vercei.app
2025-07-09 07:59:17.003	
[2025-07-09T14:59:17.003Z] [dnstwist] Analyzing threat signals for vulnerable-test-site.fercel.app
2025-07-09 07:59:16.972	
[2025-07-09T14:59:16.972Z] [dnstwist] Analyzing threat signals for vulnerable-test-site.varcel.app
2025-07-09 07:59:16.961	
[2025-07-09T14:59:16.960Z] [dnstwist] Analyzing threat signals for vulnerable-test-site.versel.app
2025-07-09 07:59:16.942	
[2025-07-09T14:59:16.938Z] [dnstwist] Analyzing threat signals for vulnerable-test-site.vercal.app
2025-07-09 07:59:16.925	
[2025-07-09T14:59:16.925Z] [dnstwist] Analyzing threat signals for vulnerable-test-site.vercell.app
2025-07-09 07:59:16.925	
[2025-07-09T14:59:16.925Z] [dnstwist] Batch 1/2
2025-07-09 07:59:16.925	
[2025-07-09T14:59:16.925Z] [dnstwist] Found 17 registered typosquat candidates to analyze
2025-07-09 07:59:16.447	
[2025-07-09T14:59:16.446Z] [dynamicBrowser] Page operation completed in 611ms
2025-07-09 07:59:15.835	
[2025-07-09T14:59:15.835Z] [accessibilityScan] Testing accessibility for: https://vulnerable-test-site.vercel.app/products
2025-07-09 07:59:14.745	
[2025-07-09T14:59:14.745Z] [dynamicBrowser] Page operation completed in 604ms
2025-07-09 07:59:14.142	
[2025-07-09T14:59:14.141Z] [accessibilityScan] Testing accessibility for: https://vulnerable-test-site.vercel.app/services
2025-07-09 07:59:13.047	
[2025-07-09T14:59:13.046Z] [dynamicBrowser] Page operation completed in 588ms
2025-07-09 07:59:12.458	
[2025-07-09T14:59:12.458Z] [accessibilityScan] Testing accessibility for: https://vulnerable-test-site.vercel.app/about
2025-07-09 07:59:11.362	
[2025-07-09T14:59:11.361Z] [dynamicBrowser] Page operation completed in 596ms
2025-07-09 07:59:10.766	
[2025-07-09T14:59:10.765Z] [accessibilityScan] Testing accessibility for: https://vulnerable-test-site.vercel.app/contact
2025-07-09 07:59:09.653	
[2025-07-09T14:59:09.652Z] [accessibilityScan] Accessibility test error for https://www.vulnerable-test-site.vercel.app/: net::ERR_CERT_COMMON_NAME_INVALID at https://www.vulnerable-test-site.vercel.app/
2025-07-09 07:59:08.524	
[2025-07-09T14:59:08.524Z] [dynamicBrowser] Metrics: browser_rss_mb=188, heap_used_mb=73, pages_open=1
2025-07-09 07:59:06.594	
[2025-07-09T14:59:06.594Z] [accessibilityScan] Testing accessibility for: https://www.vulnerable-test-site.vercel.app/
2025-07-09 07:59:05.534	
[2025-07-09T14:59:05.534Z] [accessibilityScan] Accessibility test error for https://www.vulnerable-test-site.vercel.app: net::ERR_CERT_COMMON_NAME_INVALID at https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:02.475	
[2025-07-09T14:59:02.475Z] [accessibilityScan] Testing accessibility for: https://www.vulnerable-test-site.vercel.app
2025-07-09 07:59:01.396	
[2025-07-09T14:59:01.396Z] [dynamicBrowser] Page operation completed in 636ms
2025-07-09 07:59:00.890	
[2025-07-09T14:59:00.890Z] [queue-monitor] Queue: 0 jobs, Workers: 0 running, 0 needed
2025-07-09 07:59:00.890	
[2025-07-09T14:59:00.890Z] [queue-monitor] Failed to fetch machines: 401 {"error":"verify: invalid token: all tokens missing third-party discharge tokens; no verified tokens; token e60f8cd1-a991-50f2-a3f8-cccca3b7f28c: missing third-party discharge token"}
2025-07-09 07:59:00.761	
[2025-07-09T14:59:00.760Z] [accessibilityScan] Testing accessibility for: https://vulnerable-test-site.vercel.app/
2025-07-09 07:58:59.663	
[2025-07-09T14:58:59.662Z] [dynamicBrowser] Page operation completed in 695ms
2025-07-09 07:58:58.967	
[2025-07-09T14:58:58.967Z] [accessibilityScan] Testing accessibility for: https://vulnerable-test-site.vercel.app
2025-07-09 07:58:58.876	
[2025-07-09T14:58:58.875Z] [accessibilityScan] accessibility=running_full_scan domain="vulnerable-test-site.vercel.app" reason="changes_detected"
2025-07-09 07:58:58.876	
[2025-07-09T14:58:58.875Z] [accessibilityScan] accessibility=change_detected domain="vulnerable-test-site.vercel.app" url="https://vulnerable-test-site.vercel.app" reason="content_changed"
2025-07-09 07:58:58.856	
[2025-07-09T14:58:58.856Z] [dynamicBrowser] Page operation completed in 65ms
2025-07-09 07:58:58.716	
[2025-07-09T14:58:58.715Z] [accessibilityScan] Failed to compute hash for https://www.vulnerable-test-site.vercel.app/: net::ERR_CERT_COMMON_NAME_INVALID at https://www.vulnerable-test-site.vercel.app/
2025-07-09 07:58:57.875	
[2025-07-09T14:58:57.856Z] [tlsScan] Scan complete. Hosts: vulnerable-test-site.vercel.app, www.vulnerable-test-site.vercel.app. Findings: 1
2025-07-09 07:58:57.875	
[artifactStore] Inserted scan_summary artifact: TLS scan complete - 1 issue(s) found...
2025-07-09 07:58:57.759	
[2025-07-09T14:58:57.759Z] [tlsScan] Cross-validation complete for www.vulnerable-test-site.vercel.app: 0 additional findings
2025-07-09 07:58:57.273	
[artifactStore] Inserted scan_summary artifact: Document exposure scan completed: 0 exposed files...
2025-07-09 07:58:57.271	
[2025-07-09T14:58:57.270Z] [documentExposure] Completed: 0 files found, 10 parallel Serper calls (~$0.030)
2025-07-09 07:58:57.270	
[2025-07-09T14:58:57.270Z] [documentExposure] Query 4 returned 20 results
2025-07-09 07:58:57.218	
[2025-07-09T14:58:57.217Z] [documentExposure] Query 9 returned 20 results
2025-07-09 07:58:57.182	
[2025-07-09T14:58:57.181Z] [documentExposure] Query 3 returned 8 results
2025-07-09 07:58:57.058	
[2025-07-09T14:58:57.058Z] [documentExposure] Query 8 returned 7 results
2025-07-09 07:58:56.915	
[2025-07-09T14:58:56.914Z] [documentExposure] Query 5 returned 20 results
2025-07-09 07:58:56.877	
[2025-07-09T14:58:56.877Z] [documentExposure] Query 7 returned 20 results
2025-07-09 07:58:56.821	
[2025-07-09T14:58:56.820Z] [documentExposure] Query 10 returned 0 results
2025-07-09 07:58:56.813	
[2025-07-09T14:58:56.812Z] [documentExposure] Query 2 returned 0 results
2025-07-09 07:58:56.777	
[2025-07-09T14:58:56.776Z] [documentExposure] Query 6 returned 0 results
2025-07-09 07:58:56.646	
[2025-07-09T14:58:56.646Z] [documentExposure] Query 1 returned 0 results
2025-07-09 07:58:55.987	
[2025-07-09T14:58:55.986Z] [spfDmarc] Completed email security scan, found 3 issues
2025-07-09 07:58:55.914	
[2025-07-09T14:58:55.914Z] [spfDmarc] Checking for BIMI record...
2025-07-09 07:58:55.759	
[2025-07-09T14:58:55.759Z] [documentExposure] Serper API call 10: ""Vulnerable Test Site Enhanced" (ext:env OR ext:ini OR ext:cfg OR ext:conf OR ext:config OR ext:properties OR ext:yaml OR ext:yml)"
2025-07-09 07:58:55.757	
[2025-07-09T14:58:55.757Z] [documentExposure] Serper API call 9: ""Vulnerable Test Site Enhanced" (intext:"mysql_connect" OR intext:"mysql_pconnect" OR intext:"pg_connect" OR intext:"mssql_connect" OR intext:"oracle_connect" OR intext:"mongodb://" OR intext:"postgres://" OR intext:"redis://" OR intext:"ftp://" OR intext:"sftp://")"
2025-07-09 07:58:55.756	
[2025-07-09T14:58:55.755Z] [documentExposure] Serper API call 8: ""Vulnerable Test Site Enhanced" (intitle:"index of" OR intitle:"directory listing")"
2025-07-09 07:58:55.753	
[2025-07-09T14:58:55.753Z] [documentExposure] Serper API call 7: ""Vulnerable Test Site Enhanced" (inurl:"wp-config.php.txt" OR inurl:".env" OR inurl:"config.php" OR inurl:"settings.php" OR inurl:"database.yml" OR inurl:"credentials.json" OR inurl:"secrets.yml")"
2025-07-09 07:58:55.750	
[2025-07-09T14:58:55.750Z] [documentExposure] Serper API call 6: ""Vulnerable Test Site Enhanced" (site:github.com OR site:gitlab.com OR site:bitbucket.org OR site:pastebin.com OR site:paste.ee OR site:justpaste.it OR site:rentry.co)"
2025-07-09 07:58:55.745	
[2025-07-09T14:58:55.745Z] [documentExposure] Serper API call 5: ""Vulnerable Test Site Enhanced" ("config" OR "configuration" OR "password" OR "passwords" OR "credentials" OR "api key" OR "secret" OR "token") filetype:txt"
2025-07-09 07:58:55.742	
[2025-07-09T14:58:55.742Z] [documentExposure] Serper API call 4: ""Vulnerable Test Site Enhanced" ("database" OR "backup" OR "dump") filetype:sql"
2025-07-09 07:58:55.741	
[2025-07-09T14:58:55.740Z] [documentExposure] Serper API call 3: ""Vulnerable Test Site Enhanced" ("confidential" OR "internal" OR "private" OR "financial" OR "budget" OR "salary" OR "contract" OR "agreement" OR "employee" OR "org chart" OR "organization chart") filetype:pdf"
2025-07-09 07:58:55.740	
[2025-07-09T14:58:55.738Z] [documentExposure] Serper API call 2: ""Vulnerable Test Site Enhanced" (filetype:pdf OR filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx)"
2025-07-09 07:58:55.740	
[2025-07-09T14:58:55.738Z] [documentExposure] Serper API call 1: "site:vulnerable-test-site.vercel.app (filetype:pdf OR filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx OR filetype:ppt OR filetype:pptx OR filetype:txt OR filetype:csv OR filetype:sql OR filetype:log OR filetype:zip OR filetype:tar OR filetype:gz OR filetype:backup OR filetype:bak OR filetype:old)"
2025-07-09 07:58:55.740	
[2025-07-09T14:58:55.738Z] [documentExposure] Starting 10 parallel Serper queries
2025-07-09 07:58:55.566	
}
2025-07-09 07:58:55.566	
"EMAIL_SECURITY_GAP": 2
2025-07-09 07:58:55.566	
[2025-07-09T14:58:55.565Z] [SyncWorker] ✅ New findings synced: 2 {
2025-07-09 07:58:55.522	
[2025-07-09T14:58:55.519Z] [Shodan] Done — 0 services found, 0 unique after deduplication, 3 API calls for 1 targets
2025-07-09 07:58:55.519	
[artifactStore] Inserted scan_summary artifact: Shodan scan: 0 services found, 0 unique after deduplication...
2025-07-09 07:58:55.517	
[2025-07-09T14:58:55.517Z] [Shodan] API call 3 - search query
2025-07-09 07:58:55.516	
[2025-07-09T14:58:55.515Z] [accessibilityScan] Failed to compute hash for https://www.vulnerable-test-site.vercel.app: net::ERR_CERT_COMMON_NAME_INVALID at https://www.vulnerable-test-site.vercel.app
2025-07-09 07:58:55.404	
[2025-07-09T14:58:55.404Z] [tlsScan] Python validator: www.vulnerable-test-site.vercel.app - INVALID
2025-07-09 07:58:55.364	
[2025-07-09T14:58:55.363Z] [dnstwist] ❌ Serper API: No search results found for vulnerable-test-site.vercel.app
2025-07-09 07:58:55.341	
[2025-07-09T14:58:55.341Z] [breachDirectoryProbe] Breach probe completed: 0 findings in 1942ms
2025-07-09 07:58:55.339	
[2025-07-09T14:58:55.339Z] [breachDirectoryProbe] Combined breach analysis complete: BD=0, LC=0, Total=0
2025-07-09 07:58:55.339	
[2025-07-09T14:58:55.338Z] [breachDirectoryProbe] LeakCheck response for vulnerable-test-site.vercel.app: 0 breached accounts, quota remaining: 999999
2025-07-09 07:58:55.191	
[2025-07-09T14:58:55.191Z] [dynamicBrowser] Page operation completed in 78ms
2025-07-09 07:58:54.965	
[2025-07-09T14:58:54.965Z] [tlsScan] Scanning www.vulnerable-test-site.vercel.app with hybrid validation (sslscan + Python)...
2025-07-09 07:58:54.965	
[2025-07-09T14:58:54.965Z] [tlsScan] Skipping false positive: "No SSL certificate presented" - Python validator confirmed valid certificate
2025-07-09 07:58:54.965	
[2025-07-09T14:58:54.964Z] [tlsScan] Cross-validation complete for vulnerable-test-site.vercel.app: 0 additional findings
2025-07-09 07:58:54.946	
[2025-07-09T14:58:54.945Z] [dynamicBrowser] Page operation completed in 107ms
2025-07-09 07:58:54.847	
[artifactStore] Inserted scan_summary artifact: TruffleHog scan completed: 0 potential secrets found...
2025-07-09 07:58:54.844	
[2025-07-09T14:58:54.844Z] [trufflehog] Finished comprehensive secret scan for vulnerable-test-site.vercel.app Total secrets found: 0
2025-07-09 07:58:54.844	
[2025-07-09T14:58:54.844Z] [trufflehog] [File Scan] Unable to scan file /tmp/spiderfoot-links-bcJIQcxk8ck.json: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-bcJIQcxk8ck.json'
2025-07-09 07:58:54.844	
[2025-07-09T14:58:54.843Z] [trufflehog] [File Scan] Checking file existence: /tmp/spiderfoot-links-bcJIQcxk8ck.json
2025-07-09 07:58:54.844	
[2025-07-09T14:58:54.843Z] [trufflehog] [File Scan] Scanning local artifacts...
2025-07-09 07:58:54.844	
[2025-07-09T14:58:54.843Z] [trufflehog] Unable to process SpiderFoot links file: File does not exist. Skipping Git repo scan.
2025-07-09 07:58:54.843	
[2025-07-09T14:58:54.843Z] [trufflehog] SpiderFoot links file does not exist: ENOENT: no such file or directory, access '/tmp/spiderfoot-links-bcJIQcxk8ck.json'
2025-07-09 07:58:54.843	
[2025-07-09T14:58:54.843Z] [trufflehog] Checking for SpiderFoot links file at: /tmp/spiderfoot-links-bcJIQcxk8ck.json
2025-07-09 07:58:54.843	
[2025-07-09T14:58:54.842Z] [trufflehog] [Targeted Scan] Completed high-value path scanning: 0 secrets found
2025-07-09 07:58:54.802	
[2025-07-09T14:58:54.801Z] [breachDirectoryProbe] Querying LeakCheck for domain: vulnerable-test-site.vercel.app
2025-07-09 07:58:54.721	
[2025-07-09T14:58:54.721Z] [dnstwist] 🔍 Calling Serper API for vulnerable-test-site.vercel.app
2025-07-09 07:58:54.721	
[2025-07-09T14:58:54.721Z] [dnstwist] Fetching original site content for AI comparison
2025-07-09 07:58:54.714	
[2025-07-09T14:58:54.714Z] [whoisWrapper] Saved $0.013 vs WhoisXML
2025-07-09 07:58:54.714	
[2025-07-09T14:58:54.714Z] [whoisWrapper] WHOIS resolution: 0 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:58:54.714	
Saved $0.028 vs WhoisXML
2025-07-09 07:58:54.714	
[2025-07-09T14:58:54.713Z] [whoisWrapper] Python stderr: WHOIS Resolution: 1 RDAP (free) + 1 Whoxy (~$0.002)
2025-07-09 07:58:54.713	
[2025-07-09T14:58:54.712Z] [accessibilityScan] accessibility=hash_computation domain="vulnerable-test-site.vercel.app" pages=15
2025-07-09 07:58:54.713	
[2025-07-09T14:58:54.712Z] [accessibilityScan] Discovered 15 pages to test for accessibility
2025-07-09 07:58:54.450	
[2025-07-09T14:58:54.450Z] [breachDirectoryProbe] Breach Directory response for vulnerable-test-site.vercel.app: 0 breached accounts
2025-07-09 07:58:53.706	
[2025-07-09T14:58:53.704Z] [endpointDiscovery] +web_asset javascript https://vulnerable-test-site.vercel.app#inline-script-0 (5578 bytes)
2025-07-09 07:58:53.706	
[2025-07-09T14:58:53.702Z] [endpointDiscovery] +web_asset other https://vulnerable-test-site.vercel.app (8053 bytes)
2025-07-09 07:58:53.594	
[2025-07-09T14:58:53.594Z] [spfDmarc] Probing for common DKIM selectors...
2025-07-09 07:58:53.581	
[2025-07-09T14:58:53.580Z] [tlsScan] Python validator: vulnerable-test-site.vercel.app - VALID
2025-07-09 07:58:53.537	
[2025-07-09T14:58:53.537Z] [spfDmarc] Performing recursive SPF check...
2025-07-09 07:58:53.529	
[2025-07-09T14:58:53.529Z] [trufflehog] [Targeted Scan] Testing 12 high-value paths for secrets
2025-07-09 07:58:53.529	
[2025-07-09T14:58:53.529Z] [trufflehog] [Web Asset Scan] No discovered web assets found from endpointDiscovery
2025-07-09 07:58:53.436	
[2025-07-09T14:58:53.435Z] [Shodan] Querying 1 targets (PAGE_LIMIT=10)
2025-07-09 07:58:53.420	
[2025-07-09T14:58:53.420Z] [tlsScan] Scanning vulnerable-test-site.vercel.app with hybrid validation (sslscan + Python)...
2025-07-09 07:58:53.420	

2025-07-09 07:58:53.420	
OpenSSL 3.5.1 1 Jul 2025
2025-07-09 07:58:53.420	
[2025-07-09T14:58:53.419Z] [tlsScan] sslscan found: [1;34m		2.1.6
2025-07-09 07:58:53.416	
[2025-07-09T14:58:53.416Z] [worker] [bcJIQcxk8ck] WAITING for endpoint discovery to complete for dependent modules...
2025-07-09 07:58:53.414	
[2025-07-09T14:58:53.414Z] [accessibilityScan] Starting accessibility scan for domain="vulnerable-test-site.vercel.app"
2025-07-09 07:58:53.414	
[2025-07-09T14:58:53.414Z] [worker] [bcJIQcxk8ck] STARTING accessibility compliance scan for vulnerable-test-site.vercel.app (immediate parallel)
2025-07-09 07:58:53.414	
[2025-07-09T14:58:53.414Z] [trufflehog] [Web Asset Scan] Scanning discovered web assets...
2025-07-09 07:58:53.414	
[2025-07-09T14:58:53.414Z] [trufflehog] Scanning discovered web assets from endpointDiscovery...