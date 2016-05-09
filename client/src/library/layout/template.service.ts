export class Template {
    public static getUrl(relativePath: string, component: string = ''): string {
        return './dist/components/' + component + '/' + relativePath;
    }
}