import fs from "node:fs";

const compose = fs.readFileSync(new URL("./docker-compose.yml", import.meta.url), "utf8");
const env = fs.readFileSync(new URL("./.env.example", import.meta.url), "utf8");

const requiredServices = ["web", "api", "worker", "postgres", "redis", "object-storage"];
const requiredEnv = ["DATABASE_URL", "REDIS_URL", "SESSION_SECRET", "BACKUP_BUCKET", "ALERT_EMAIL"];
const failures = [];

for (const service of requiredServices) {
  if (!compose.includes(`  ${service}:`)) {
    failures.push(`Missing service: ${service}`);
  }
}

for (const key of requiredEnv) {
  if (!env.includes(`${key}=`)) {
    failures.push(`Missing env var: ${key}`);
  }
}

if (failures.length > 0) {
  console.error("Deployment playground smoke check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Deployment playground smoke check passed.");

