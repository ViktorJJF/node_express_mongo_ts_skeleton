import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import { loadRoutes } from './routes/api';
import i18n from 'i18n';
import initMongo from './config/mongo';
import path from 'path';

const app = express();

// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log("🐞 LOG HERE req:", req);

//   // If there's an error in the request
//   if (req.error) {
//     return res.status(req.error.status || 422).json({ errors: req.error.array() });
//   }

//   // Other logic can be added here

//   // Continue to the next middleware or route handler
//   next();
// });

// Setup express server port from ENV, default: 3000
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Enable only in development HTTP request logger middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// for parsing json
// app.use(
//   bodyParser.json({
//     limit: '100mb',
//   }),
// );

app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: '100mb',
    extended: true,
  }),
);

// i18n
i18n.configure({
  locales: ['en', 'es'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'en',
  objectNotation: true,
});
app.use(i18n.init);

// Init all other stuff
app.use(cors());
app.use(passport.initialize());
app.use(compression());
app.use(helmet());
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

loadRoutes().then((routes) => {
  app.use('/api', routes);
});

app.listen(app.get('port'));

// Init MongoDB
initMongo();

export default app; // for testing
