export interface RequestResult {
  code: number;
  url: string;
  response: Response;
  shareUrl: string;
  timingAnalysis: object;
}

export interface Response {
  http: string;
  location: string;
  server: string;
  statusCode: string;
}