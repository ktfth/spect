test('Async should have a done function to end properly', (done) => {
  expect(() => {
    const start = Date.now();
    while (Date.now() < start + 2500) {}
    done();
  }).toBeThrow('need to throw an error on timeout');
});
