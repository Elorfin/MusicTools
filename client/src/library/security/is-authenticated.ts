/**
 * We need to create a stand-alone function for checking if User is authenticated
 * as the check must be done in the `@CanActivate` event of the Router which does not
 * support DI for now
 * 
 * @returns {boolean}
 */
export function isAuthenticated() {
    return !!localStorage.getItem('token');
}