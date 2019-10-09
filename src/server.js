import app from './app';

const port =
  process.env.NODE_ENV === 'development'
    ? process.env.LOCAL_PORT
    : process.env.PORT;

app.listen(port, function() {
  console.log('Umbler listening on port %s', port);
});
