export class JwtPayloadDTO {
  public readonly id: string;
  public readonly name: string;
  public readonly ip: string;
  public readonly userAgent: string
  // public readonly exp?: Date

  constructor(id: string, name: string, ip: string,userAgent: string) {
      this.id = id;
      this.name = name;
      this.ip = ip;
      this.userAgent = userAgent
      // this.exp = exp
  }
}