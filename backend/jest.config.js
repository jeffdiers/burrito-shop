/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
};

// Reset the DB_NAME env variable to the test database
process.env = Object.assign(process.env, {
  DB_NAME: "test_burrito_shop",
});
