export type AppRoute = 
  | '/'
  | '/login'
  | '/mentor/login'
  | '/mentee/login'
  | '/mentor/register'
  | '/mentee/register'
  | '/organization/register'
  | '/organization/login'
  | '/dashboard';

export interface RouteState {
  from?: Location;
} 