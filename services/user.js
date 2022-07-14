export async function getAccessToken() {
    const res = await fetch('/api/get-token')

    if (!res.ok) { throw new Error(res.statusText) }

    const { accessTokenTwilio } = await res.json()
    return accessTokenTwilio
}
