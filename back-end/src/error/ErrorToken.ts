export class ErrorToken extends Error {
    public statusCode: number;
    public type: 'ACCESS_TOKEN' | 'REFRESH_TOKEN'
    constructor( message: string,statusCode: number,type: 'ACCESS_TOKEN' | 'REFRESH_TOKEN' ) {
        super(message);
        this.statusCode = statusCode;
        this.type = type
    }
}