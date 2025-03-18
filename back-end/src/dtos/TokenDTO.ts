export class JwtPayloadDTO {
  public readonly id: string;
  public readonly name: string;
  public readonly ip: string;

  constructor(id: string, name: string, ip: string) {
      this.id = id;
      this.name = name;
      this.ip = ip;
  }
}