apicontroller(object) ::= <<
$if(object.import)$$object.import:{dependency | import $dependency.name$ from '$dependency.path$';};separator="\n"$$endif$

export class $object.className$Controller $if(object.implementName)$implements $object.implementName$$endif$ {
      public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        $if(object.router)$$object.router:{router | this.router.$router.apiAction$('$router.routeUrl$', this.$router.methodName$);};separator="\n"$$endif$
    }

$if(object.methods)$$object.methods:{methods |  public $methods.methodName$(req: Request, res: Response) {
        new ApiAdaptar().$methods.apiAction$($methods.constantName$.$methods.nodeName$ + `$methods.methodUrl$` $if(methods.requestParameter)$, $methods.requestParameter$$endif$).then($methods.responseParameter$ => {
              req.baseUrl === '/mobile' ? res.send($methods.responseParameter$) :
              req.baseUrl === '/desktop' ? res.send($methods.responseParameter$) : res.send(null)
        \}).catch(err => {
            res.send(err);
        \});
    \}};separator="\n"$$endif$

}

>>