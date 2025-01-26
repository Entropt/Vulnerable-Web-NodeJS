# Vunerable Website by Entropt

## Requirement
| Vunerabilities | Progress |
| :--- | :---:|
| Race Condition | not started |
| Prototype Pollution | not started |
| JWT Attacks | not started|

## Specification
| Specs| Value |
| :--- | :---: |
| OS | Ubuntu |
| Webserver | Nginx |
| Language | NodeJS |
| Database | MariaDB |

## Website Information:
- A blog website with login function.
- Only admin can change content of the blog.
- Normal user can try to attack JWT token.
- Admin can change specific dataset for Prototype Pollution to RCE.

## How to set up

1. Install Nginx, MariaDB
```
sudo apt install mariadb-server nginx
sudo mysql_secure_installation          # Set up MariaDB
```
2. Install NodeJS & Node package manager (in the website)
```
sudo apt install nodejs npm
```
OR you can try to install the same version with me:
- *node v18.19.1*<br>
- *npm 9.2.0*
```

```
3. Install dependencies
```
npm install express jsonwebtoken
```
4. Run the server
```
# Run with the main file in package.json
node .
```

## Review
There will be a few image showing business logic below