/**
 * Alert definition
 */
export class Alert
{
    public type: String;

    public message: String;

    public detail: String = null;

    public cancel: Function = null;
}
