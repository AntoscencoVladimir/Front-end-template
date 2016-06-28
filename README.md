##Front-end template

=======================================
##Installing for Linux Ubuntu/Mint

:one: Install Node JS:

```curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -```

```sudo apt-get install -y nodejs```

    or
    
```sudo apt-get install nodejs```

```sudo apt-get install npm```

:two: Install Bower ```sudo npm install -g bower```

:three: Install Gulp globally ```sudo npm i -g gulp```

:four: Install packages. Go to the project directory and  run command: ```npm i```

:five: Download libs: ```bower i```

:six: Install libs: ```gulp all:libs```

:seven: Run server ```gulp main```

=======================================
##Installing for Windows

:one: Download and install [Node JS](https://nodejs.org/en/)

:two: Install Bower ```npm install -g bower```

:three: Install Gulp globally ```npm install -g gulp```

:four: Install packages. Go to the project directory and  run command: ```npm install```

:five: Download libs: ```bower install```

:six: Install libs: ```gulp all:libs```

:seven: Run server ```gulp main```

=======================================
##Take fun !

------------------------------------------------------------------------------------------------------------------

=======================================
### JS Libs

1. JQuery
2. Html5shiv
3. Respond

=======================================
###HTML

1. Sticky footer by [Ryan Fait](http://ryanfait.com/resources/footer-stick-to-bottom-of-page/)
2. Optimized load scripts and styles

=======================================
###CSS

1. Normalize by [necolas](https://necolas.github.io/normalize.css/)
2. Autoprefixer (last 15 versions)
3. Clean CSS
4. Postcss assets (just put for example background-image: resolve(img.jpg) the path will generate automatically)

=======================================
###Images

1. Put your images in ```not_compressed_img``` directory the output compressed images will be in ```app/img``` directory


=======================================
###Bourbon family

1. [Bourbon](http://bourbon.io/)         ``` A simple and lightweight mixin library for Sass. ```
2. [Neat](http://neat.bourbon.io/)       ``` A lightweight semantic grid framework for Sass and Bourbon. ```
3. [Bitters](http://bitters.bourbon.io/) ``` Scaffold styles, variables and structure for Bourbon projects. ```
4. [Refills](http://refills.bourbon.io/) ``` Components and patterns built with Bourbon and Neat. See on the site.```

=======================================
###Browser-sync

1. Autoreload
2. You can publish your local site on the web (for example: show your project to the client) for more information see  ```gulpfile.js``` and [https://www.browsersync.io/](https://www.browsersync.io/)

=======================================
###Other

1. Optimized .htaccess