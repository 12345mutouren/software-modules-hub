import https from "node:https";

const repositories = [
  "nextjs/saas-starter",
  "calcom/cal.diy",
  "makeplane/plane",
  "supabase/supabase",
  "appwrite/appwrite",
  "nextauthjs/next-auth",
  "prisma/prisma",
  "vercel/next.js",
  "fastapi/fastapi",
  "docker/compose",
  "microsoft/playwright",
  "stripe-samples/accept-a-payment",
  "facebook/docusaurus",
];

for (const repository of repositories) {
  const data = await getJson(`https://api.github.com/repos/${repository}`);
  console.log(JSON.stringify({
    full_name: data.full_name,
    archived: data.archived,
    disabled: data.disabled,
    private: data.private,
    default_branch: data.default_branch,
    pushed_at: data.pushed_at,
    updated_at: data.updated_at,
    stargazers_count: data.stargazers_count,
    license: data.license?.spdx_id || "NOASSERTION",
  }));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, {
      headers: {
        "User-Agent": "software-modules-hub-audit",
      },
    }, (response) => {
      let body = "";

      response.on("data", (chunk) => {
        body += chunk;
      });

      response.on("end", () => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          reject(new Error(`GitHub API failed for ${url}: ${response.statusCode}`));
          return;
        }

        resolve(JSON.parse(body));
      });
    });

    request.on("error", reject);
  });
}

