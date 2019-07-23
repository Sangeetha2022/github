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

$if(object.additional.camunda.login)$
  public $object.additional.camunda.login.methodName$(req: Request, res: Response) {
        new ApiAdaptar().$object.additional.camunda.login.apiAction$($object.additional.camunda.login.constantName$.$object.additional.camunda.login.nodeName$ + `$object.additional.camunda.login.methodUrl$` $if(object.additional.camunda.login.requestParameter)$, $object.additional.camunda.login.requestParameter$$endif$).then(async ($object.additional.camunda.login.responseParameter$) => {
            // @ts-ignore
            const token = $object.additional.camunda.login.responseParameter$.body.Idtoken;
            // @ts-ignore
            if ($object.additional.camunda.login.responseParameter$.body.Idtoken === null || $object.additional.camunda.login.responseParameter$.body.Idtoken === '' || $object.additional.camunda.login.responseParameter$.body.Idtoken === undefined) {
                req.baseUrl === '/mobile' ? res.send({"Userdetails": $object.additional.camunda.login.responseParameter$}) :
                    req.baseUrl === '/desktop' ? res.send({"Userdetails": $object.additional.camunda.login.responseParameter$}) : res.send(null)
            } else {
                          $if(object.additional.camunda.isVerify)$
            jwt.verify(token, 'geppettosecret', (err, decoded) => {
                if (err) {
                    return ({ 'status': 'Unauthorized', 'error': err, 'Userdetails': result });
                } else {
                    new ApiAdaptar().post(Constant.AUTHPROXYURL + `/proxy`, decoded).then((response) => {
                        const temp = {
                            "Access": JSON.parse(JSON.stringify(response)).body,
                            "Userdetails": result
                        }
                req.baseUrl === '/mobile' ? res.send(temp) :
                req.baseUrl === '/desktop' ? res.send(temp) : res.send(null)
                    })
                }
            })
$endif$
            }
        }).catch(err => {
            res.send(err);
        });
    }
$endif$

$if(object.additional.camunda.consent)$
   public $object.additional.camunda.consent.methodName$(req: Request, res: Response) {
        new ApiAdaptar().$object.additional.camunda.consent.apiAction$($object.additional.camunda.consent.constantName$.$object.additional.camunda.consent.nodeName$ + `$object.additional.camunda.consent.methodUrl$` $if(object.additional.camunda.consent.requestParameter)$, $object.additional.camunda.consent.requestParameter$$endif$).then(async ($object.additional.camunda.consent.responseParameter$) => {
            // @ts-ignore
            const token = $object.additional.camunda.consent.responseParameter$.body.Idtoken;
            $if(object.additional.camunda.isVerify)$
            jwt.verify(token, 'geppettosecret', (err, decoded) => {
                if (err) {
                    return ({ 'status': 'Unauthorized', 'error': err, 'Userdetails': result });
                } else {
                    new ApiAdaptar().post(Constant.AUTHPROXYURL + `/proxy`, decoded).then((response) => {
                        const temp = {
                            "Access": JSON.parse(JSON.stringify(response)).body,
                            "Userdetails": result
                        }
                req.baseUrl === '/mobile' ? res.send(temp) :
                req.baseUrl === '/desktop' ? res.send(temp) : res.send(null)
                    })
                }
            })
$endif$
        }).catch(err => {
            res.send(err);
        });
    }
$endif$
}

>>