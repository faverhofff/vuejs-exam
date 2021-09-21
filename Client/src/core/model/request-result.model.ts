export interface RequestResult {
  error: string;
  data: Body;
  stats: string;
}

export interface Body {
  url: Url;
  response: Array<Response>;
  request: Request;
  errors: string;
  status: number;
}

export interface Request {
  id: string;
}

export interface Url {
  domain: string;
  path: string;
  scheme: string;
}

export interface Response {
  http: string;
  location: string;
  server: string;
  statusCode: string;
}