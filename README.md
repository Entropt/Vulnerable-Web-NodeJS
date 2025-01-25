# Vunerable Website by Entropt

## Requirement
| Vunerabilities | Progress |
| :--- | :---:| 
| Server-side Template Injection | not started |
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

1. Install NodeJS & Node package manager (in the website)
2. Install dependencies
```
npm install express
```
3. Run the server
```
# Run with the main file in package.json
node .
```

## Review
There will be a few image showing business logic below