import * as accountService from './account.service';
import * as userService from './user.service';
import * as auditService from './audit.service';
import * as authService from './auth.service'

export default {
    userService: userService,
    auditService: auditService,
    authService: authService,
    accountService: accountService
}