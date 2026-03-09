export interface LoginResponseDto {
  success: boolean;
  redirect: string;
  userId: number;
  companyId: string;
  firstname: string;
  surname: string;
  role: string;
  username: string;
  token: string;
}
