
# Dynamic Form Builder

This is the simple survey application for getting data from the user/customer.
## Technologies
Project is created with:
* Laravel v9.40.1 (PHP v8.2.0)
* React v18.2.0
* MySQL 
* tailwindcss v3.2.4

# User Features
* Registration and login with email `OTP`.
* A dedicated page where user can create dynamic form and public `URL` for providing the end user.
* Survey `edit` and `delete` options.
* Every user can fillup the required fields and submit the information.
* Dashboard overview.
* Survey result showing and exporting `excel`.

# Installation
#### Make sure you have environment setup properly. You will need PHP8.1 or more, composer and Node.js.
1. Download the project (or clone using GIT)
Copy `.env.example` into `.env` and configure database credentials

2. Navigate to the project's root directory using terminal
3. Run `composer install`
4. Set the encryption key by executing `php artisan key:generate --ansi`
5. Run migrations `php artisan migrate --seed`
6. Start local server by executing `php artisan serve`
7. Open new terminal and navigate to the `react folder`
8. Copy `react/.env.example` into `.env` and adjust the `VITE_API_BASE_URL` parameter
9. Run `npm install`
10. Run `npm run dev` to start vite server for React

# Email setup
Go to .env file fillpu below information:
Please here [documentation..](https://support.google.com/accounts/answer/185833?hl=en)
```MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME= <You Email address>
MAIL_PASSWORD= <App password here>
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="<You Email address>"
MAIL_FROM_NAME="Verification Code" 
```
## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 2000 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.
## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).
## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
