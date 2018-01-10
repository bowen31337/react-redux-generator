# React Redux Generator

This generator is created to save minutes when creating components, containers and routes etc in the React Redux Structure.

## Installation

### Node JS (>=8.4.0)

```bash
    npm install react-redux-genertor -g 
    or
    yarn global add react-redux-genertor 
```


## Usage

###Command line

```bash
RRG -c //add component
RRG -C //add container
RRG -r //add route
```

###change the application source folder
by default, the application source folder is 'src', it is changeable via .rrgrc file.

For example, if you want to change it to "app" folder, then create .rrgrc file and put something like so:

```
{
	"APP_SRC":"app"
}

```


## License

MIT
