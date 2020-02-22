# Alokin
A discord bot for personal use

### Usage
You need to create a `config.json` file in the root directory (where the package.json file is) with the following contents:
```json
{
  "prefix": "the prefix you want to use",
  "token": "your bot token here",
  "db": {
    "hostname": "db.host",
    "user": "db.user",
    "password": "db.password",
    "database": "db.database"
  }
}
```

Then you simply run the following commands:
```
npm install
npm run start
```
