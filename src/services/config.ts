export default class Config{
    public golrangEndpoint:string = "https://portal.golrang.com/_vti_bin/SPService.svc";
    public headers = {'Content-Type': 'application/json'};
    public PDFheaders = {'Content-Type': 'application/PDF'};
}