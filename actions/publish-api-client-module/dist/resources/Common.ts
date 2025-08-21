export function jwt(jwtStr: string): string {
  return jwtStr?.startsWith('Bearer ')
    ? jwtStr : `Bearer ${jwtStr}`;
}

export function apiKey(apiKeyStr: string): string {
  return apiKeyStr?.startsWith('APIKey ')
    ? apiKeyStr : `APIKey ${apiKeyStr}`;
}
