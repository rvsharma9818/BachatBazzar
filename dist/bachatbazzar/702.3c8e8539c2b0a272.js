"use strict";(self.webpackChunkbachatbazzar=self.webpackChunkbachatbazzar||[]).push([[702],{9225:(F,c,a)=>{a.r(c),a.d(c,{LoginModule:()=>J});var p=a(9808),g=a(5020),i=a(3075),n=a(5e3),d=a(5980),l=a(3838);function m(t,r){1&t&&n._UZ(0,"div",17)}function u(t,r){1&t&&(n.TgZ(0,"small",19),n._uU(1," This field is required. "),n.qZA())}function h(t,r){1&t&&(n.TgZ(0,"small",19),n._uU(1," Email Should be like aaa1@gmail/google.com "),n.qZA())}function _(t,r){if(1&t&&(n.TgZ(0,"div"),n.YNc(1,u,2,0,"small",18),n.YNc(2,h,2,0,"small",18),n.qZA()),2&t){const e=n.oxw();n.xp6(1),n.Q6J("ngIf",e.loginForm.get("email").hasError("required")),n.xp6(1),n.Q6J("ngIf",e.loginForm.get("email").hasError("pattern"))}}function x(t,r){1&t&&(n.TgZ(0,"small",19),n._uU(1," This field is required. "),n.qZA())}function C(t,r){if(1&t&&(n.TgZ(0,"div"),n.YNc(1,x,2,0,"small",18),n.qZA()),2&t){const e=n.oxw();n.xp6(1),n.Q6J("ngIf",e.loginForm.get("password").hasError("required"))}}let f=(()=>{class t{constructor(e,o,s){this.authServiced=e,this.router=o,this.toast=s,this.loader=!1,this.loginForm=new i.cw({email:new i.NI("",[i.kI.required,i.kI.email,i.kI.pattern(/^[a-z0-9]{1,}@g(oogle)?mail\.com$/)]),password:new i.NI("",[i.kI.required,i.kI.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/)])})}ngOnInit(){}get f(){return this.loginForm.controls}onlogin(){this.loader=!0,this.authServiced.login(this.loginForm.value).subscribe(e=>{setTimeout(()=>{this.loader=!1,localStorage.setItem("token",e.data.token),localStorage.setItem("userId",e.data.userId),this.router.navigate(["/home"])},4e3)},e=>{this.toast.error({detail:"WARNING",summary:`${e.error.message}`,duration:5e3}),this.loader=!1})}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(d.r),n.Y36(g.F0),n.Y36(l.s))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-login"]],decls:33,vars:4,consts:[["rel","stylesheet","href","https://use.fontawesome.com/releases/v5.8.1/css/all.css","integrity","sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf","crossorigin","anonymous"],["class","loader",4,"ngIf"],["id","container",1,"container"],[1,"form-container","sign-in-container"],[3,"formGroup","ngSubmit"],[1,"social-container"],[1,"social"],[1,"fab","fa-facebook-f"],[1,"fab","fa-google-plus-g"],[1,"fab","fa-linkedin-in"],["type","email","formControlName","email","placeholder","Email"],[4,"ngIf"],["type","password","placeholder","Password","formControlName","password"],[1,"overlay-container"],[1,"overlay"],[1,"overlay-panel","overlay-right"],["id","signUp","routerLink","/signup",1,"ghost"],[1,"loader"],["class","text-danger",4,"ngIf"],[1,"text-danger"]],template:function(e,o){1&e&&(n._UZ(0,"link",0),n.YNc(1,m,1,0,"div",1),n.TgZ(2,"div",2),n.TgZ(3,"div",3),n.TgZ(4,"form",4),n.NdJ("ngSubmit",function(){return o.onlogin()}),n.TgZ(5,"h1"),n._uU(6,"Sign in"),n.qZA(),n.TgZ(7,"div",5),n.TgZ(8,"a",6),n._UZ(9,"i",7),n.qZA(),n.TgZ(10,"a",6),n._UZ(11,"i",8),n.qZA(),n.TgZ(12,"a",6),n._UZ(13,"i",9),n.qZA(),n.qZA(),n.TgZ(14,"span"),n._uU(15,"or use your account"),n.qZA(),n._UZ(16,"input",10),n.YNc(17,_,3,2,"div",11),n._UZ(18,"input",12),n.YNc(19,C,2,1,"div",11),n.TgZ(20,"a"),n._uU(21,"Forgot your password?"),n.qZA(),n.TgZ(22,"button"),n._uU(23,"Sign In"),n.qZA(),n.qZA(),n.qZA(),n.TgZ(24,"div",13),n.TgZ(25,"div",14),n.TgZ(26,"div",15),n.TgZ(27,"h1"),n._uU(28,"BACHATBAZZAR"),n.qZA(),n.TgZ(29,"p"),n._uU(30,"Enter your personal details and start journey with us"),n.qZA(),n.TgZ(31,"button",16),n._uU(32,"Sign Up"),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA()),2&e&&(n.xp6(1),n.Q6J("ngIf",o.loader),n.xp6(3),n.Q6J("formGroup",o.loginForm),n.xp6(13),n.Q6J("ngIf",o.loginForm.get("email").invalid&&o.loginForm.get("email").errors&&(o.loginForm.get("email").dirty||o.loginForm.get("email").touched)),n.xp6(2),n.Q6J("ngIf",o.loginForm.get("password").invalid&&o.loginForm.get("password").errors&&(o.loginForm.get("password").dirty||o.loginForm.get("password").touched)))},directives:[p.O5,i._Y,i.JL,i.sg,i.Fj,i.JJ,i.u,g.rH],styles:['@import"https://fonts.googleapis.com/css?family=Montserrat:400,800";*[_ngcontent-%COMP%]{box-sizing:border-box}body[_ngcontent-%COMP%]{font-family:Montserrat,sans-serif;background:#f6f5f7;display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;margin:20px 0 50px}h1[_ngcontent-%COMP%]{font-weight:700;margin:0}p[_ngcontent-%COMP%]{font-size:14px;font-weight:100;line-height:20px;letter-spacing:.5px;margin:20px 0 30px}span[_ngcontent-%COMP%]{font-size:12px}a[_ngcontent-%COMP%]{color:#333;font-size:14px;text-decoration:none;margin:15px 0}.container[_ngcontent-%COMP%]{background:#fff;border-radius:10px;box-shadow:0 14px 28px #0003,0 10px 10px #0003;position:relative;overflow:hidden;width:768px;max-width:100%;min-height:480px}.form-container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{background:#fff;display:flex;flex-direction:column;padding:0 50px;height:100%;justify-content:center;align-items:center;text-align:center}.social-container[_ngcontent-%COMP%]{margin:20px 0}.social-container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{border:1px solid #ddd;border-radius:50%;display:inline-flex;justify-content:center;align-items:center;margin:0 5px;height:40px;width:40px}.form-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background:#eee;border:none;padding:12px 15px;margin:8px 0;width:100%}button[_ngcontent-%COMP%]{border-radius:20px;border:1px solid #ff4b2b;background:#ff445c;color:#fff;font-size:12px;font-weight:700;padding:12px 45px;letter-spacing:1px;text-transform:uppercase;transition:transform 80ms ease-in}button[_ngcontent-%COMP%]:active{transform:scale(.95)}button[_ngcontent-%COMP%]:focus{outline:none}button.ghost[_ngcontent-%COMP%]{background:transparent;border-color:#fff}.form-container[_ngcontent-%COMP%]{position:absolute;top:0;height:100%;transition:all .6s ease-in-out}.sign-in-container[_ngcontent-%COMP%]{left:0;width:50%;z-index:2}.sign-up-container[_ngcontent-%COMP%]{left:0;width:50%;z-index:1;opacity:0}.overlay-container[_ngcontent-%COMP%]{position:absolute;top:0;left:50%;width:50%;height:100%;overflow:hidden;transition:transform .6s ease-in-out;z-index:100}.overlay[_ngcontent-%COMP%]{background:#ff416c;background:linear-gradient(to right,#ff4b2b,#ff416c) no-repeat 0 0/cover;color:#fff;position:relative;left:-100%;height:100%;width:200%;transform:translateY(0);transition:transform .6s ease-in-out}.overlay-panel[_ngcontent-%COMP%]{position:absolute;top:0;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:0 40px;height:100%;width:50%;text-align:center;transform:translateY(0);transition:transform .6s ease-in-out}.overlay-right[_ngcontent-%COMP%]{right:0;transform:translateY(0)}.overlay-left[_ngcontent-%COMP%]{transform:translateY(-20%)}.container.right-panel-active[_ngcontent-%COMP%]   .sign-in-container[_ngcontent-%COMP%]{transform:translateY(100%)}.container.right-panel-active[_ngcontent-%COMP%]   .overlay-container[_ngcontent-%COMP%]{transform:translate(-100%)}.container.right-panel-active[_ngcontent-%COMP%]   .sign-up-container[_ngcontent-%COMP%]{transform:translate(100%);opacity:1;z-index:5}.container.right-panel-active[_ngcontent-%COMP%]   .overlay[_ngcontent-%COMP%]{transform:translate(50%)}.container.right-panel-active[_ngcontent-%COMP%]   .overlay-left[_ngcontent-%COMP%]{transform:translateY(0)}.container.right-panel-active[_ngcontent-%COMP%]   .overlay-right[_ngcontent-%COMP%]{transform:translateY(20%)}.footer[_ngcontent-%COMP%]{margin-top:25px;text-align:center}.icons[_ngcontent-%COMP%]{display:flex;width:30px;height:30px;letter-spacing:15px;align-items:center}.wrapper-warning[_ngcontent-%COMP%]{margin:120px;top:-110px;right:-110px;position:absolute;z-index:99}.wrapper-warning[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{width:-moz-fit-content;width:fit-content;height:70px;background-color:#fff;padding:10px 20px;display:flex;justify-content:space-around;align-items:center;border-left:5px solid #fdc220;border-radius:3px;box-shadow:#959da533 0 8px 24px}.wrapper-warning[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .subject[_ngcontent-%COMP%]{margin-right:20px;width:-moz-fit-content;width:fit-content}.wrapper-warning[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .subject[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{position:relative;top:11px;color:#000;width:-moz-fit-content;width:fit-content}.wrapper-warning[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .subject[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:red;width:-moz-fit-content;width:fit-content}.wrapper-warning[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{position:relative;top:43px;left:102px;font-size:28px;color:#fdc220}.wrapper-warning[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .icon-times[_ngcontent-%COMP%]{position:relative;top:12px;font-size:28px;color:#c3c2c7;cursor:pointer}.loader[_ngcontent-%COMP%]{position:relative;top:68px;z-index:9999;right:-10px;width:50px;height:50px;border:4px solid transparent;border-radius:50%;border-top:4px solid #971c1c;animation:rotate 1.5s linear infinite}.loader[_ngcontent-%COMP%]:before, .loader[_ngcontent-%COMP%]:after{position:absolute;content:"";border-radius:50%;box-sizing:border-box;border:4px solid transparent}.loader[_ngcontent-%COMP%]:after{inset:0;border-bottom:4px solid #d81b1b;animation:rotate .5s linear infinite reverse}.loader[_ngcontent-%COMP%]:before{inset:4px;border-left:4px solid #eb1313;animation:rotate 1.5s linear infinite}@keyframes rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}']}),t})();function b(t,r){1&t&&n._UZ(0,"div",21)}function v(t,r){1&t&&(n.TgZ(0,"small",23),n._uU(1," This field is required. "),n.qZA())}function M(t,r){if(1&t&&(n.TgZ(0,"div"),n.YNc(1,v,2,0,"small",22),n.qZA()),2&t){const e=n.oxw();n.xp6(1),n.Q6J("ngIf",e.Signupform.get("name").hasError("required"))}}function O(t,r){1&t&&(n.TgZ(0,"small",23),n._uU(1," This field is required. "),n.qZA())}function P(t,r){1&t&&(n.TgZ(0,"small",23),n._uU(1," Email Should be like aaa1@gmail/google.com "),n.qZA())}function Z(t,r){if(1&t&&(n.TgZ(0,"div"),n.YNc(1,O,2,0,"small",22),n.YNc(2,P,2,0,"small",22),n.qZA()),2&t){const e=n.oxw();n.xp6(1),n.Q6J("ngIf",e.Signupform.get("email").hasError("required")),n.xp6(1),n.Q6J("ngIf",e.Signupform.get("email").hasError("pattern"))}}function w(t,r){1&t&&(n.TgZ(0,"small",23),n._uU(1," This field is required. "),n.qZA())}function y(t,r){1&t&&(n.TgZ(0,"small",23),n._uU(1," Password contain [A-Z + a-z + 1-9 + special charcater ]"),n._UZ(2,"br"),n._uU(3," Should be 8 to 15 charchater "),n.qZA())}function T(t,r){if(1&t&&(n.TgZ(0,"div"),n.YNc(1,w,2,0,"small",22),n.YNc(2,y,4,0,"small",22),n.qZA()),2&t){const e=n.oxw();n.xp6(1),n.Q6J("ngIf",e.Signupform.get("password").hasError("required")),n.xp6(1),n.Q6J("ngIf",e.Signupform.get("password").hasError("pattern"))}}function S(t,r){1&t&&(n.TgZ(0,"small",23),n._uU(1," This field is required. "),n.qZA())}function A(t,r){if(1&t&&(n.TgZ(0,"small",23),n._uU(1),n.qZA()),2&t){const e=n.oxw(2);n.xp6(1),n.hij(" The minimum length for this field is ",e.Signupform.get("mobile").errors.minlength.requiredLength," characters. ")}}function q(t,r){if(1&t&&(n.TgZ(0,"small",23),n._uU(1),n.qZA()),2&t){const e=n.oxw(2);n.xp6(1),n.hij(" The maximum length for this field is ",e.Signupform.get("mobile").errors.maxlength.requiredLength," characters. ")}}function I(t,r){if(1&t&&(n.TgZ(0,"div"),n.YNc(1,S,2,0,"small",22),n.YNc(2,A,2,1,"small",22),n.YNc(3,q,2,1,"small",22),n.qZA()),2&t){const e=n.oxw();n.xp6(1),n.Q6J("ngIf",e.Signupform.get("mobile").hasError("required")),n.xp6(1),n.Q6J("ngIf",e.Signupform.get("mobile").hasError("minlength")),n.xp6(1),n.Q6J("ngIf",e.Signupform.get("mobile").hasError("maxlength"))}}function U(t,r){1&t&&(n.TgZ(0,"small",23),n._uU(1," This field is required. "),n.qZA())}function z(t,r){if(1&t&&(n.TgZ(0,"div"),n.YNc(1,U,2,0,"small",22),n.qZA()),2&t){const e=n.oxw();n.xp6(1),n.Q6J("ngIf",e.Signupform.get("profile").hasError("required"))}}const k=[{path:"",component:(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-login"]],decls:3,vars:0,consts:[[1,"container-fluid"]],template:function(e,o){1&e&&(n.TgZ(0,"div",0),n._UZ(1,"router-outlet"),n._UZ(2,"lib-ng-toast"),n.qZA())},directives:[g.lC,l.V],styles:[".container-fluid[_ngcontent-%COMP%]{position:relative;display:flex;justify-content:center;align-items:center;background-image:url(http://demos.creative-tim.com/paper-kit-2/assets/img/antoine-barres.jpg);background-position:center;background-repeat:no-repeat;height:100%}"]}),t})(),children:[{path:"",component:f},{path:"signin",component:f},{path:"signup",component:(()=>{class t{constructor(e,o,s){this.authServiced=e,this.router=o,this.toast=s,this.loader=!1,this.Signupform=new i.cw({name:new i.NI("",[i.kI.required]),email:new i.NI("",[i.kI.required,i.kI.email,i.kI.pattern(/^[a-z0-9]{1,}@g(oogle)?mail\.com$/)]),mobile:new i.NI("",[i.kI.required,i.kI.minLength(10),i.kI.maxLength(10)]),profile:new i.NI("",[i.kI.required]),password:new i.NI("",[i.kI.required,i.kI.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/)])})}ngOnInit(){}get f(){return this.Signupform.controls}onFileChange(e){e.target.files.length>0&&this.Signupform.controls.profile.setValue(e.target.files[0])}onsignup(){this.loader=!0;const e=new FormData;e.append("name",this.Signupform.get("name").value),e.append("email",this.Signupform.get("email").value),e.append("mobile",this.Signupform.get("mobile").value),e.append("password",this.Signupform.get("password").value),e.append("profile",this.Signupform.get("profile").value),this.authServiced.registerUser(e).subscribe(o=>{setTimeout(()=>{this.loader=!1,this.router.navigate(["/signin"])},2e3)},o=>{this.loader=!1,this.toast.error({detail:"WARNING",summary:`${o.error.message}`,duration:5e3})})}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(d.r),n.Y36(g.F0),n.Y36(l.s))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-signup"]],decls:35,vars:8,consts:[["rel","stylesheet","href","https://use.fontawesome.com/releases/v5.8.1/css/all.css","integrity","sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf","crossorigin","anonymous"],["class","loader",4,"ngIf"],["id","container",1,"container","right-panel-active"],[1,"form-container","sign-up-container"],[3,"formGroup"],[1,"social-container"],[1,"social"],[1,"fab","fa-facebook-f"],[1,"fab","fa-google-plus-g"],[1,"fab","fa-linkedin-in"],["type","text","formControlName","name","placeholder","Name"],[4,"ngIf"],["type","email","formControlName","email","placeholder","Email"],["type","password","formControlName","password","placeholder","Password"],["type","text","placeholder","Mobile","formControlName","mobile"],["type","file","placeholder","Profile Image","formControlName","profile",3,"change"],["type","submit",3,"disabled","click"],[1,"overlay-container"],[1,"overlay"],[1,"overlay-panel","overlay-left"],["id","signIn","routerLink","/signin",1,"ghost"],[1,"loader"],["class","text-danger",4,"ngIf"],[1,"text-danger"]],template:function(e,o){1&e&&(n._UZ(0,"link",0),n.YNc(1,b,1,0,"div",1),n.TgZ(2,"div",2),n.TgZ(3,"div",3),n.TgZ(4,"form",4),n.TgZ(5,"h1"),n._uU(6,"Create Account"),n.qZA(),n.TgZ(7,"div",5),n.TgZ(8,"a",6),n._UZ(9,"i",7),n.qZA(),n.TgZ(10,"a",6),n._UZ(11,"i",8),n.qZA(),n.TgZ(12,"a",6),n._UZ(13,"i",9),n.qZA(),n.qZA(),n._UZ(14,"input",10),n.YNc(15,M,2,1,"div",11),n._UZ(16,"input",12),n.YNc(17,Z,3,2,"div",11),n._UZ(18,"input",13),n.YNc(19,T,3,2,"div",11),n._UZ(20,"input",14),n.YNc(21,I,4,3,"div",11),n.TgZ(22,"input",15),n.NdJ("change",function(L){return o.onFileChange(L)}),n.qZA(),n.YNc(23,z,2,1,"div",11),n.TgZ(24,"button",16),n.NdJ("click",function(){return o.onsignup()}),n._uU(25," Sign Up "),n.qZA(),n.qZA(),n.qZA(),n.TgZ(26,"div",17),n.TgZ(27,"div",18),n.TgZ(28,"div",19),n.TgZ(29,"h1"),n._uU(30,"BACHATBAZZAR"),n.qZA(),n.TgZ(31,"p"),n._uU(32,"To keep connected with us please login with your personal info"),n.qZA(),n.TgZ(33,"button",20),n._uU(34,"Sign In"),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA()),2&e&&(n.xp6(1),n.Q6J("ngIf",o.loader),n.xp6(3),n.Q6J("formGroup",o.Signupform),n.xp6(11),n.Q6J("ngIf",o.Signupform.get("name").invalid&&o.Signupform.get("name").errors&&(o.Signupform.get("name").dirty||o.Signupform.get("name").touched)),n.xp6(2),n.Q6J("ngIf",o.Signupform.get("email").invalid&&o.Signupform.get("email").errors&&(o.Signupform.get("email").dirty||o.Signupform.get("email").touched)),n.xp6(2),n.Q6J("ngIf",o.Signupform.get("password").invalid&&o.Signupform.get("password").errors&&(o.Signupform.get("password").dirty||o.Signupform.get("password").touched)),n.xp6(2),n.Q6J("ngIf",o.Signupform.get("mobile").invalid&&o.Signupform.get("mobile").errors&&(o.Signupform.get("mobile").dirty||o.Signupform.get("mobile").touched)),n.xp6(2),n.Q6J("ngIf",o.Signupform.get("profile").invalid&&o.Signupform.get("profile").errors&&(o.Signupform.get("profile").dirty||o.Signupform.get("profile").touched)),n.xp6(1),n.Q6J("disabled",!o.Signupform.valid))},directives:[p.O5,i._Y,i.JL,i.sg,i.Fj,i.JJ,i.u,g.rH],styles:['@import"https://fonts.googleapis.com/css?family=Montserrat:400,800";*[_ngcontent-%COMP%]{box-sizing:border-box}body[_ngcontent-%COMP%]{font-family:Montserrat,sans-serif;background:#f6f5f7;display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;margin:20px 0 50px}h1[_ngcontent-%COMP%]{font-weight:700;margin:0}p[_ngcontent-%COMP%]{font-size:14px;font-weight:100;line-height:20px;letter-spacing:.5px;margin:20px 0 30px}span[_ngcontent-%COMP%]{font-size:12px}a[_ngcontent-%COMP%]{color:#333;font-size:14px;text-decoration:none;margin:15px 0}.container[_ngcontent-%COMP%]{background:#fff;border-radius:10px;box-shadow:0 14px 28px #0003,0 10px 10px #0003;position:relative;overflow:hidden;width:768px;max-width:100%;min-height:480px}.form-container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{background:#fff;display:flex;flex-direction:column;padding:0 50px;height:100%;justify-content:center;align-items:center;text-align:center}.social-container[_ngcontent-%COMP%]{margin:20px 0}.social-container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{border:1px solid #ddd;border-radius:50%;display:inline-flex;justify-content:center;align-items:center;margin:0 5px;height:40px;width:40px}.form-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background:#eee;border:none;padding:12px 15px;margin:8px 0;width:100%}button[_ngcontent-%COMP%]{border-radius:20px;border:1px solid #ff4b2b;background:#ff445c;color:#fff;font-size:12px;font-weight:700;padding:12px 45px;letter-spacing:1px;text-transform:uppercase;transition:transform 80ms ease-in}button[_ngcontent-%COMP%]:active{transform:scale(.95)}button[_ngcontent-%COMP%]:focus{outline:none}button.ghost[_ngcontent-%COMP%]{background:transparent;border-color:#fff}.form-container[_ngcontent-%COMP%]{position:absolute;top:0;height:100%;transition:all .6s ease-in-out}.sign-in-container[_ngcontent-%COMP%]{left:0;width:50%;z-index:2}.sign-up-container[_ngcontent-%COMP%]{left:0;width:50%;z-index:1;opacity:0}.overlay-container[_ngcontent-%COMP%]{position:absolute;top:0;left:50%;width:50%;height:100%;overflow:hidden;transition:transform .6s ease-in-out;z-index:100}.overlay[_ngcontent-%COMP%]{background:#ff416c;background:linear-gradient(to right,#ff4b2b,#ff416c) no-repeat 0 0/cover;color:#fff;position:relative;left:-100%;height:100%;width:200%;transform:translateY(0);transition:transform .6s ease-in-out}.overlay-panel[_ngcontent-%COMP%]{position:absolute;top:0;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:0 40px;height:100%;width:50%;text-align:center;transform:translateY(0);transition:transform .6s ease-in-out}.overlay-right[_ngcontent-%COMP%]{right:0;transform:translateY(0)}.overlay-left[_ngcontent-%COMP%]{transform:translateY(-20%)}.container.right-panel-active[_ngcontent-%COMP%]   .sign-in-container[_ngcontent-%COMP%]{transform:translateY(100%)}.container.right-panel-active[_ngcontent-%COMP%]   .overlay-container[_ngcontent-%COMP%]{transform:translate(-100%)}.container.right-panel-active[_ngcontent-%COMP%]   .sign-up-container[_ngcontent-%COMP%]{transform:translate(100%);opacity:1;z-index:5}.container.right-panel-active[_ngcontent-%COMP%]   .overlay[_ngcontent-%COMP%]{transform:translate(50%)}.container.right-panel-active[_ngcontent-%COMP%]   .overlay-left[_ngcontent-%COMP%]{transform:translateY(0)}.container.right-panel-active[_ngcontent-%COMP%]   .overlay-right[_ngcontent-%COMP%]{transform:translateY(20%)}.footer[_ngcontent-%COMP%]{margin-top:25px;text-align:center}.icons[_ngcontent-%COMP%]{display:flex;width:30px;height:30px;letter-spacing:15px;align-items:center}.wrapper-warning[_ngcontent-%COMP%]{margin:120px;top:-110px;right:-110px;position:absolute;z-index:99}.wrapper-warning[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{width:-moz-fit-content;width:fit-content;height:70px;background-color:#fff;padding:10px 20px;display:flex;justify-content:space-around;align-items:center;border-left:5px solid #fdc220;border-radius:3px;box-shadow:#959da533 0 8px 24px}.wrapper-warning[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .subject[_ngcontent-%COMP%]{margin-right:20px;width:-moz-fit-content;width:fit-content}.wrapper-warning[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .subject[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{position:relative;top:11px;color:#000;width:-moz-fit-content;width:fit-content}.wrapper-warning[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .subject[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:red;width:-moz-fit-content;width:fit-content}.wrapper-warning[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{position:relative;top:43px;left:102px;font-size:28px;color:#fdc220}.wrapper-warning[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .icon-times[_ngcontent-%COMP%]{position:relative;top:12px;font-size:28px;color:#c3c2c7;cursor:pointer}.loader[_ngcontent-%COMP%]{position:relative;top:68px;z-index:9999;right:-700px;width:50px;height:50px;border:4px solid transparent;border-radius:50%;border-top:4px solid #971c1c;animation:rotate 1.5s linear infinite}.loader[_ngcontent-%COMP%]:before, .loader[_ngcontent-%COMP%]:after{position:absolute;content:"";border-radius:50%;box-sizing:border-box;border:4px solid transparent}.loader[_ngcontent-%COMP%]:after{inset:0;border-bottom:4px solid #d81b1b;animation:rotate .5s linear infinite reverse}.loader[_ngcontent-%COMP%]:before{inset:4px;border-left:4px solid #eb1313;animation:rotate 1.5s linear infinite}@keyframes rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}']}),t})()}]}];let N=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[[g.Bz.forChild(k)],g.Bz]}),t})();var Y=a(520);let J=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[[p.ez,N,i.UX,i.u5,Y.JF,l.XF]]}),t})()}}]);