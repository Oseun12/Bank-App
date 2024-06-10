import App from './app';
import AccountRoute from './routes/account.routes';
import AuthRoute from './routes/audit.routes';
import AuditRoute from './routes/audit.routes';
import UserRoute from './routes/user.routes';

export const app = new App ([
    new UserRoute(),
    new AccountRoute(),
    new AuditRoute(),
    new AuthRoute()
])

app.listen();