const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export async function submitToIndexNow(urls: string[]) {
  const key = process.env.INDEXNOW_KEY;

  if (!key) {
    console.warn("INDEXNOW_KEY is not configured.");
    return;
  }

  if (urls.length === 0) {
    return;
  }

  const host = "acquisiflow.com";

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `https://${host}/${key}.txt`,
      urlList: urls,
    }),
  });

  if (!response.ok) {
    const body = await response.text();

    throw new Error(
      `IndexNow submission failed: ${response.status} ${body}`
    );
  }

  return {
    success: true,
    status: response.status,
  };
}