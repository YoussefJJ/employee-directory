angular.module("app.login")
.factory("loginService", function($rootScope, $location) {
    var user = JSON.parse(localStorage.getItem("user")) || null;

    var setUser = function(aUser) {
        user = aUser;
    }

    var isLoggedIn = function() {
        return !!user
    }

    var getUser = function() {
        return user;
    }

    var redirectToHome = function() {
        $location.path("/home")
    }
    
    var login = function(credentials) {
        const { username, password, rememberMe } = credentials

        return new Promise((resolve, reject) => {
            if (!username || !password) {
                reject({
                    message: "Username or password are empty"
                })
            }
            if (username !== "admin" || password !== "admin") {
                reject({
                    message: "Invalid credentials"
                })
            }

            setUser({
                username
            })
            if (rememberMe) {
                localStorage.setItem("user", JSON.stringify({
                    username
                }))
            }

            resolve({
                user: {
                    username: username
                },
                message: "Success"
            })
        })
    }

    $rootScope.$on("app.logout", function(event) {
        event.preventDefault();
        setUser(null);
        localStorage.removeItem("user");
        $location.path("/login");
    })

    $rootScope.$on("app.loggedIn", function(event) {
        event.preventDefault()
        if (!isLoggedIn()) {
            $location.path("/login")
        } else {
            $location.path("/home")
        }
        $rootScope.$apply()
    })

    $rootScope.$on("app.loginRedirect", function(event) {
        event.preventDefault()
        $location.path("/login")
    })

    
    return {
        test: function() {
            console.log("hello")
        },
        isLoggedIn: isLoggedIn,
        setUser: setUser,
        getUser: getUser,
        login: login,
        redirectToHome
    }
})