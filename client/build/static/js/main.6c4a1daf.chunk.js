(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{105:function(e,t,a){},107:function(e,t,a){},119:function(e,t,a){},121:function(e,t,a){},122:function(e,t,a){},123:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(35),c=a.n(s),o=(a(60),a(3)),l=a(4),i=a(6),m=a(5),u=a(7),d=a(127),p=a(128),E=a(125),f=a(11),h=a(22),v="SET_CURRENT_USER",b="REMOVE_CURRENT_USER",N=function(e){return{type:v,payload:e}},g=function(){return{type:b}},w={isAuth:!1},O=Object(h.b)({session:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case v:return{isAuth:!0,user:n};case b:return localStorage.removeItem("jwtToken"),{isAuth:!1,user:void 0};default:return e}}}),C=window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__(),j=Object(h.c)(O,C),S=a(9),y=a.n(S),x=a(51),_=a.n(x),k=(a(86),a(87),function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(i.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).logout=function(){a.props.removeCurrentUser()},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("nav",{className:"navbar navbar-expand-sm navbar-light fixed-top"},r.a.createElement("div",{className:"container"},r.a.createElement("a",{className:"navbar-brand",href:"/"},"Panel de administraci\xf3n"),r.a.createElement("ul",{className:"navbar-nav mr-auto"},r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:"/"},"PuntoLab"))),r.a.createElement("ul",{className:"navbar-nav"},r.a.createElement("li",{className:"nav-item"},r.a.createElement("h5",{onClick:this.logout,className:"nav-link"},"Cerrar sesi\xf3n")))))}}]),t}(n.Component)),D={removeCurrentUser:g},T=Object(f.b)(null,D)(k),q=a(52),L=a.n(q),I=(a(88),a(24)),A=a(124),R=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).state={menu:I.menu},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state.menu,t=this.props.session;return r.a.createElement("div",{className:"main-menu"},r.a.createElement("ul",null,r.a.createElement("div",{className:"profile"},r.a.createElement("img",{src:L.a,alt:"logo"}),r.a.createElement("p",null,"BIENVENIDO"),r.a.createElement("h6",null,t.user?t.user.nombre:"")),r.a.createElement("div",{className:"MenuItemsContainer"},e.map(function(e,a){var n=e.items.map(function(e,n){return 0===e.permisos.filter(function(e){return e===t.user.permisos}).length?null:r.a.createElement("li",{key:a+n.toString()},r.a.createElement(A.a,{to:e.url},r.a.createElement("i",{className:"material-icons"}," ",e.icon," "),r.a.createElement("span",{className:"menu-title"},e.name)))});return 0===n.length?null:r.a.createElement("div",{key:a},r.a.createElement("li",{className:"nav-header"},e.title),n)}))))}}]),t}(n.Component),P=Object(f.b)(function(e){return{session:e.session}})(R),M=a(20),U=a(19),F=a.n(U),H=a(2),B=a(13),V=(a(105),function(e){function t(){return Object(o.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{id:"main"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-wrapper"},this.props.children))))}}]),t}(n.Component)),z=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).pagination=function(e){a.setState({index:e},function(){a.requestData()})},a.itemsToShowChanges=function(e){var t=e.target.value;a.setState({itemsToShow:t,index:0},function(){a.requestData()})},a.filter=function(e){if("Enter"===e.key){var t=e.target.value;a.setState({index:0,filterWord:t},function(){a.requestData()})}},a.delete=function(e,t){var n=a.props.session.user.permisos;F.a.prompt("Confirma la eliminaci\xf3n","Ingresa ".concat(0===n?"tu contrase\xf1a":"una contrase\xf1a de administrador"," para eliminar a ").concat(t),"",function(t,r){y.a.post("/api/clientes/eliminar",{password:r,_id:e}).then(function(e){H.toast.info("Se elimin\xf3 el cliente".concat(0===n?".":" con autorizaci\xf3n de "+e.data.admin)),a.requestData()}).catch(function(e){return 401===e.response.status?H.toast.warn("La contrase\xf1a".concat(0===n?"":" de administrador"," es incorrecta.")):H.toast.error("No se pudo eliminar el cliente - "+e)})},function(){}).set("type","password")},a.state={clientes:[],index:0,itemsToShow:5,totalItems:0,filterWord:""},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"requestData",value:function(){var e=this,t=this.state,a=t.itemsToShow,n=t.index,r=t.filterWord;y.a.post("/api/clientes/listar",{itemsToShow:a,filtro:r,salto:a*n}).then(function(t){if(t.data){var a=t.data,n=a.clientes,r=a.totalItems;e.setState({clientes:n,totalItems:r})}}).catch(function(e){return H.toast.warn("No se puede mostrar la informaci\xf3n - "+e)})}},{key:"componentDidMount",value:function(){this.requestData()}},{key:"render",value:function(){var e=this,t=this.state,a=t.clientes,n=t.index,s=t.totalItems,c=t.itemsToShow,o=Math.ceil(s/c),l=c*(n+1);return r.a.createElement(V,null,r.a.createElement(B.Helmet,null,r.a.createElement("title",null,"Clientes | ","PuntoLab")),r.a.createElement("div",{className:"header"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-8"},r.a.createElement("h2",null,r.a.createElement("span",null,"Clientes "))),r.a.createElement("div",{className:"col-sm-4"},r.a.createElement(A.a,{to:"/clientes/crear",className:"btn btn-success"},r.a.createElement("i",{className:"material-icons"}," add ")," ",r.a.createElement("span",null,"Agregar"))))),r.a.createElement("div",{className:"table-filter"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-3"},r.a.createElement("div",{className:"show-entries"},r.a.createElement("span",null,"Mostrar"),r.a.createElement("select",{onChange:this.itemsToShowChanges},r.a.createElement("option",null,"5"),r.a.createElement("option",null,"10"),r.a.createElement("option",null,"15"),r.a.createElement("option",null,"20"),r.a.createElement("option",null,"25"),r.a.createElement("option",null,"30")),r.a.createElement("span",null,"campos"))),r.a.createElement("div",{className:"col-sm-9"},r.a.createElement("div",{className:"filter-group"},r.a.createElement("label",null,"Buscar nombre"),r.a.createElement("input",{type:"text",className:"form-control",onKeyDown:this.filter}))))),r.a.createElement("table",{className:"table"},r.a.createElement("thead",{className:"thead-light"},r.a.createElement("tr",null,r.a.createElement("th",{scope:"col"},"Nombre"),r.a.createElement("th",{scope:"col"},"Tel\xe9fono"),r.a.createElement("th",{scope:"col"},"Direcci\xf3n"),r.a.createElement("th",{scope:"col"},"Ciudad"),r.a.createElement("th",{scope:"col"},"Editar"),r.a.createElement("th",{scope:"col"},"Eliminar"))),r.a.createElement("tbody",null,a.map(function(t){var a=t._id,n=t.nombre,s=t.telefono,c=t.direccion,o=t.comunidad,l=t.ciudad;return r.a.createElement("tr",{key:a},r.a.createElement("td",null,n),r.a.createElement("td",null,s),r.a.createElement("td",null,c),r.a.createElement("td",null,o?o+", ":""," ",l),r.a.createElement("td",null,r.a.createElement(A.a,{to:"/clientes/editar/"+a},r.a.createElement("i",{className:"material-icons"}," edit "))),r.a.createElement("td",{onClick:function(){return e.delete(a,n)}},r.a.createElement("i",{className:"material-icons"}," delete ")))}))),r.a.createElement("div",{className:"clearfix mt-2"},r.a.createElement("div",{className:"hint-text"},"Mostrando ",r.a.createElement("b",null,l>s?s:l)," de ",r.a.createElement("b",null,s)," entradas"),r.a.createElement("ul",{className:"pagination"},Object(M.a)(Array(o)).map(function(t,a){return r.a.createElement("li",{key:a,onClick:function(){return e.pagination(a)},className:n===a?"page-item active":"page-item"}," ",r.a.createElement("span",{className:"page-link"}," ",a+1," "))}))))}}]),t}(n.Component),G=Object(f.b)(function(e){return{session:e.session}})(z),W=a(17),X=a(129),J=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).state={notFound:{title:"El contenido no existe",details:"La direcci\xf3n que has solicitado no se encontr\xf3, asegurate que est\xe1 bien escrita."},unautorized:{title:"Acceso denegado",details:"No tienes permiso para ver este contenido, solicitalo al administrador."}},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.statusCode||404,t=this.state,a=t.notFound,n=t.unautorized;return r.a.createElement(V,null,r.a.createElement(B.Helmet,null,r.a.createElement("title",null,404===e?"404":"401"," | ","PuntoLab")),r.a.createElement("h4",null,404===e?a.title:n.title),r.a.createElement("p",{style:{marginTop:"20px",fontWeight:"300"}},404===e?a.details:n.details))}}]),t}(n.Component),K=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).onSubmit=function(e){e.preventDefault();var t=a.state,n=t._id,r=t.nombre,s=t.telefono,c=t.direccion,o=t.ciudad,l=t.comunidad,i=t.isEditing;y.a.post("/"+"api/clientes".concat(i?"/editar":"/nuevo"),{_id:n,nombre:r,telefono:s,direccion:c,ciudad:o,comunidad:l}).then(function(e){H.toast.success("Cliente ".concat(i?"editado":"creado")),a.props.history.push("/clientes")}).catch(function(e){return H.toast.warn("No se pudo ".concat(i?"editar":"crear"," el cliente - ").concat(e))})},a.onChange=function(e){var t=e.target,n=t.name,r=t.value;a.setState(Object(W.a)({},n,r))},a.state={_id:void 0,nombre:void 0,telefono:void 0,direccion:void 0,ciudad:void 0,comunidad:void 0,isEditing:!1,notFound:!1},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props.match.params.id;t&&(this.setState({isEditing:!0}),y.a.get("/api/clientes/detallar/"+t).then(function(t){var a=t.data,n=a._id,r=a.nombre,s=a.telefono,c=a.direccion,o=a.ciudad,l=a.comunidad;e.setState({_id:n,nombre:r,telefono:s,direccion:c,ciudad:o,comunidad:l})}).catch(function(t){if(404===t.response.status)return e.setState({notFound:!0});H.toast.warn("No se puede mostrar la informaci\xf3n - "+t)}))}},{key:"render",value:function(){var e=this.state,t=e.nombre,a=e.telefono,n=e.direccion,s=e.ciudad,c=e.comunidad,o=e.isEditing;return e.notFound?r.a.createElement(J,null):r.a.createElement(V,null,r.a.createElement(B.Helmet,null,r.a.createElement("title",null,o?"Editar":"Crear"," cliente | ","PuntoLab")),r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("div",{className:"header"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-8"},o?r.a.createElement("h2",null,r.a.createElement("span",null,"Editar a "),t):r.a.createElement("h2",null,r.a.createElement("span",null,"Crear "),"cliente")),r.a.createElement("div",{className:"col-sm-4"},r.a.createElement("button",{type:"submit",className:"btn btn-success"},r.a.createElement("i",{className:"material-icons"}," backup ")," ",r.a.createElement("span",null,o?"Guardar":"Crear"))))),r.a.createElement("div",{className:"form-content"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-8"},r.a.createElement("div",{className:"form-group mb-4"},r.a.createElement("input",{onChange:this.onChange,value:t||"",type:"text",className:"form-control form-control frm_field",placeholder:"Nombre(s), Apellidos",name:"nombre",required:!0}),r.a.createElement("small",{className:"form-text text-muted"},"* Escribe el nombre del cliente"))),r.a.createElement("div",{className:"col-sm-4"},r.a.createElement("div",{className:"form-group mb-4"},r.a.createElement("input",{onChange:this.onChange,value:a||"",type:"text",className:"form-control form-control frm_field",placeholder:"Telefono",name:"telefono"}),r.a.createElement("small",{className:"form-text text-muted"},"N\xfamero tel\xe9fonico del cliente"))),r.a.createElement("div",{className:"col-sm-5"},r.a.createElement("div",{className:"form-group mb-2"},r.a.createElement("input",{onChange:this.onChange,value:n||"",type:"text",className:"form-control form-control frm_field",placeholder:"Direcci\xf3n",name:"direccion",required:!0}),r.a.createElement("small",{className:"form-text text-muted"},"* Direcci\xf3n del cliente"))),r.a.createElement("div",{className:"col-sm-3"},r.a.createElement("div",{className:"form-group mb-2"},r.a.createElement("input",{onChange:this.onChange,value:s||"",type:"text",className:"form-control form-control frm_field",placeholder:"Ciudad",name:"ciudad",required:!0}),r.a.createElement("small",{className:"form-text text-muted"},"* Ciudad del cliente"))),r.a.createElement("div",{className:"col-sm-4"},r.a.createElement("div",{className:"form-group mb-2"},r.a.createElement("input",{onChange:this.onChange,value:c||"",type:"text",className:"form-control form-control frm_field",placeholder:"Comunidad",name:"comunidad"}),r.a.createElement("small",{className:"form-text text-muted"},"Comunidad del cliente")))))))}}]),t}(n.Component),Y=Object(X.a)(K),Q=function(e){function t(){return Object(o.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(V,null,r.a.createElement("div",{className:"header",style:{marginBottom:"0px"}},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-8"},r.a.createElement("h2",null,r.a.createElement("span",null,"Servicios "))),r.a.createElement("div",{className:"col-sm-4"},r.a.createElement(A.a,{to:"/servicios/crear",className:"btn btn-success"},r.a.createElement("i",{className:"material-icons"}," add ")," ",r.a.createElement("span",null,"Agregar"))))))}}]),t}(n.Component),Z=a(39),$=(a(107),a(54)),ee=a.n($),te=function(e){return e.nombre},ae=function(e){return r.a.createElement("div",null,e.nombre," ",r.a.createElement("div",{className:"details"},e.direccion,", ",e.comunidad?e.comunidad+", ":""," ",e.ciudad))},ne=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(i.a)(this,Object(m.a)(t).call(this))).getSuggestions=function(t){var a=e.state.clientes,n=t.trim().toLowerCase(),r=n.length;return 0===r?[]:a.filter(function(e){return e.nombre.toLowerCase().slice(0,r)===n})},e.onChange=function(t,a){var n=a.newValue;(0,e.props.updateCliente)(void 0),e.setState({value:n})},e.onSuggestionsFetchRequested=function(t){var a=t.value;e.setState({suggestions:e.getSuggestions(a)})},e.onSuggestionsClearRequested=function(){e.setState({suggestions:[]})},e.onSuggestionSelected=function(t,a){var n=a.suggestion;a.method;(0,e.props.updateCliente)(n)},e.state={value:"",suggestions:[],clientes:[]},e}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;y.a.post("/api/clientes/listar",{itemsToShow:void 0,filtro:void 0,salto:0}).then(function(t){if(t.data){var a=t.data.clientes;e.setState({suggestions:a,clientes:a})}}).catch(function(e){return H.toast.warn("No se pueden listar los clientes - "+e)})}},{key:"render",value:function(){var e=this.state,t=e.value,a=e.suggestions,n=e.clientes,s={placeholder:0===n.length?"No tienes clientes creados":"Nombre",value:t,onChange:this.onChange,disabled:0===n.length};return r.a.createElement(ee.a,{suggestions:a,onSuggestionsFetchRequested:this.onSuggestionsFetchRequested,onSuggestionsClearRequested:this.onSuggestionsClearRequested,getSuggestionValue:te,onSuggestionSelected:this.onSuggestionSelected,renderSuggestion:ae,inputProps:s})}}]),t}(n.Component),re=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).updateCliente=function(e){a.setState({cliente:e})},a.seleccionarServicio=function(e){a.setState({servicio:e.target.value})},a.state={cliente:void 0,servicio:0},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state,t=e.cliente,a=e.servicio;return r.a.createElement(V,null,r.a.createElement("form",null,r.a.createElement("div",{className:"header"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-8"},r.a.createElement("h2",null,r.a.createElement("span",null,"Nuevo "),"servicio")),r.a.createElement("div",{className:"col-sm-4"},r.a.createElement("button",{id:"btn_send",className:"btn btn-success"},r.a.createElement("i",{className:"material-icons"}," backup ")," ",r.a.createElement("span",null,"Guardar"))))),r.a.createElement("div",{className:"form-content"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-7"},r.a.createElement("div",{className:"form-group mb-4"},r.a.createElement(ne,{updateCliente:this.updateCliente,updateClientesStatus:this.updateClientesStatus}),r.a.createElement("small",{className:"form-text text-muted"},"Busqueda por nombre"))),r.a.createElement("div",{className:"col-sm-5"},r.a.createElement("div",{className:"form-group mb-4"},r.a.createElement("select",{onChange:this.seleccionarServicio,name:"servicio",className:"form-control form-control frm_field",required:!0},Z.servicios.map(function(e){return r.a.createElement("option",{key:e.id,value:e.id},e.descripcion)})),r.a.createElement("small",{className:"form-text text-muted"},"Tipo de servicio"))),r.a.createElement("div",{className:"col-sm-3"},r.a.createElement("div",{className:"form-group mb-2"},r.a.createElement("input",{disabled:!0,type:"text",className:"form-control form-control frm_field",value:t&&t.telefono?t.telefono:""}),r.a.createElement("small",{className:"form-text text-muted"},"N\xfamero tel\xe9fonico"))),r.a.createElement("div",{className:"col-sm-4"},r.a.createElement("div",{className:"form-group mb-2"},r.a.createElement("input",{disabled:!0,type:"text",className:"form-control form-control frm_field",value:t&&t.direccion?t.direccion:""}),r.a.createElement("small",{className:"form-text text-muted"},"Direcci\xf3n"))),r.a.createElement("div",{className:"col-sm-5"},r.a.createElement("div",{className:"form-group mb-2"},r.a.createElement("input",{disabled:!0,type:"text",className:"form-control form-control frm_field",value:t?t.comunidad?t.comunidad+", "+t.ciudad:t.ciudad:""}),r.a.createElement("small",{className:"form-text text-muted"},"Localidad / Ciudad"))))),r.a.createElement("div",null,r.a.createElement("h4",null,"Formulario ",Z.servicios[a].descripcion," (pendiente)"))))}}]),t}(n.Component),se=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).delete=function(e,t){F.a.prompt("Confirma la eliminaci\xf3n","Ingresa tu contrase\xf1a para eliminar a "+t,"",function(t,n){y.a.post("/api/usuarios/eliminar",{password:n,_id:e}).then(function(e){H.toast.info("Se elimin\xf3 el usuario"),a.requestData()}).catch(function(e){return 404===e.response.status?H.toast.warn("La contrase\xf1a es incorrecta."):H.toast.error("No se pudo eliminar el cliente - "+e)})},function(){}).set("type","password")},a.state={usuarios:[]},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.requestData()}},{key:"requestData",value:function(){var e=this;y.a.get("/api/usuarios/listar").then(function(t){t.data&&e.setState({usuarios:t.data})}).catch(function(e){return H.toast.warn("No se puede mostrar la informaci\xf3n - "+e)})}},{key:"render",value:function(){var e=this,t=this.state.usuarios;return r.a.createElement(V,null,r.a.createElement(B.Helmet,null,r.a.createElement("title",null,"Usuarios | ","PuntoLab")),r.a.createElement("div",{className:"header",style:{marginBottom:"0px"}},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-8"},r.a.createElement("h2",null,r.a.createElement("span",null,"Usuarios "))),r.a.createElement("div",{className:"col-sm-4"},r.a.createElement(A.a,{to:"/usuarios/crear",className:"btn btn-success"},r.a.createElement("i",{className:"material-icons"}," add ")," ",r.a.createElement("span",null,"Agregar"))))),r.a.createElement("table",{className:"table"},r.a.createElement("thead",{className:"thead-light"},r.a.createElement("tr",null,r.a.createElement("th",{scope:"col"},"Nombre"),r.a.createElement("th",{scope:"col"},"Usuario"),r.a.createElement("th",{scope:"col"},"Permisos"),r.a.createElement("th",{scope:"col"},"Editar"),r.a.createElement("th",{scope:"col"},"Eliminar"))),r.a.createElement("tbody",null,t.map(function(t){var a=t._id,n=t.nombre,s=t.usuario,c=t.permisos;return r.a.createElement("tr",{key:a},r.a.createElement("td",null,n),r.a.createElement("td",null,s),r.a.createElement("td",null,0===c?"Administrador":1===c?"Asistente":2===c?"T\xe9cnico":""),r.a.createElement("td",null,r.a.createElement(A.a,{to:"/usuarios/editar/"+a},r.a.createElement("i",{className:"material-icons"}," edit "))),r.a.createElement("td",{onClick:function(){return e.delete(a,n)}},r.a.createElement("i",{className:"material-icons"}," delete ")))}))))}}]),t}(n.Component),ce=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).newPassword=function(){a.setState({password:Math.random().toString(36).substr(2,8)})},a.onChange=function(e){var t=e.target,n=t.name,r=t.value;a.setState(Object(W.a)({},n,r))},a.onSubmit=function(e){e.preventDefault();var t=a.state,n=t._id,r=t.nombre,s=t.usuario,c=t.password,o=t.permisos,l=t.isEditing;y.a.post("/"+"api/usuarios".concat(l?"/editar":"/nuevo"),{_id:n,nombre:r,usuario:s,password:c,permisos:o}).then(function(e){H.toast.success("Se ".concat(l?"edit\xf3":"cre\xf3"," el usuario ")+s),a.props.history.push("/usuarios")}).catch(function(e){if(409===e.response.status)return H.toast.warn("Ya existe el nombre de usuario "+s);H.toast.warn("No se pudo ".concat(l?"editar":"crear"," el usuario - ").concat(e))})},a.state={_id:void 0,nombre:void 0,usuario:void 0,password:void 0,permisos:0,isEditing:!1,notFound:!1},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props.match.params.id;t?(this.setState({isEditing:!0}),y.a.get("/api/usuarios/detallar/"+t).then(function(t){var a=t.data,n=a._id,r=a.nombre,s=a.usuario,c=a.permisos;e.setState({_id:n,nombre:r,usuario:s,permisos:c})}).catch(function(t){if(404===t.response.status)return e.setState({notFound:!0});H.toast.warn("No se puede mostrar la informaci\xf3n - "+t)})):this.newPassword()}},{key:"render",value:function(){var e=this.state,t=e.nombre,a=e.usuario,n=e.password,s=e.permisos,c=e.isEditing;return e.notFound?r.a.createElement(J,null):r.a.createElement(V,null,r.a.createElement(B.Helmet,null,r.a.createElement("title",null,c?"Editar":"Crear "," usuario | ","PuntoLab")),r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("div",{className:"header"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-8"},c?r.a.createElement("h2",null,r.a.createElement("span",null,"Editar a "),t):r.a.createElement("h2",null,r.a.createElement("span",null,"Crear "),"usuario")),r.a.createElement("div",{className:"col-sm-4"},r.a.createElement("button",{type:"submit",className:"btn btn-success"},r.a.createElement("i",{className:"material-icons"}," backup ")," ",r.a.createElement("span",null,c?"Guardar":"Crear"))))),r.a.createElement("div",{className:"form-content"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-12"},r.a.createElement("div",{className:"form-group mb-4"},r.a.createElement("input",{maxLength:"35",onChange:this.onChange,value:t||"",type:"text",className:"form-control form-control frm_field",placeholder:"Nombre completo",name:"nombre",required:!0}),r.a.createElement("small",{className:"form-text text-muted"},"* Escribe el nombre del usuario"))),r.a.createElement("div",{className:"col-sm-4"},r.a.createElement("div",{className:"form-group mb-2"},r.a.createElement("input",{maxLength:"20",onChange:this.onChange,value:a||"",type:"text",required:!0,className:"form-control form-control frm_field",placeholder:"Nombre de usuario",name:"usuario"}),r.a.createElement("small",{className:"form-text text-muted"},"* N\xfameros y letras"))),r.a.createElement("div",{className:"col-sm-4"},r.a.createElement("div",{className:"form-group mb-2"},r.a.createElement("input",{value:n||"SIN CAMBIOS",style:{width:"auto",display:"inline"},disabled:!0,type:"text",required:!0,className:"form-control form-control frm_field",name:"password"}),r.a.createElement("button",{onClick:this.newPassword,style:{marginTop:"-3px",border:"none"},type:"button",className:"btn btn-primary"},c?"Reiniciar":"Generar"),r.a.createElement("small",{className:"form-text text-muted"},"Contrase\xf1a generada autom\xe1ticamente"))),r.a.createElement("div",{className:"col-sm-4"},r.a.createElement("div",{className:"form-group mb-2"},r.a.createElement("select",{onChange:this.onChange,name:"permisos",className:"form-control form-control frm_field",required:!0,value:s},r.a.createElement("option",{value:"0"},"Administrador"),r.a.createElement("option",{value:"1"},"Asistente"),r.a.createElement("option",{value:"2"},"T\xe9cnico")),r.a.createElement("small",{className:"form-text text-muted"},"* Permisos para el usuario")))))))}}]),t}(n.Component),oe=Object(X.a)(ce),le=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).onChange=function(e){var t=e.target,n=t.name,r=t.value;a.setState(Object(W.a)({},n,r))},a.onSubmit=function(e){e.preventDefault();var t=a.state,n=t.old_password,r=t.new_password,s=t.conf_password,c=a.props.session.user._id;if(r!==s)return H.toast.warn("Las contrase\xf1as no coinciden");y.a.post("/api/password/new",{_id:c,old_password:n,new_password:r}).then(function(e){return a.setState({old_password:"",new_password:"",conf_password:""}),H.toast.success("Se cambi\xf3 tu contrase\xf1a")}).catch(function(e){return 400===e.response.status?H.toast.warn("La contrase\xf1a actual es incorrecta"):H.toast.warn("No se pudo cambiar tu contrase\xf1a - "+e)})},a.state={old_password:"",new_password:"",conf_password:""},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state,t=e.old_password,a=e.new_password,n=e.conf_password;return r.a.createElement(V,null,r.a.createElement(B.Helmet,null,r.a.createElement("title",null,"Nueva contrase\xf1a | ","PuntoLab")),r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("div",{className:"header"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-8"},r.a.createElement("h2",null,r.a.createElement("span",null,"Cambiar "),"contrase\xf1a")),r.a.createElement("div",{className:"col-sm-4"},r.a.createElement("button",{id:"btn_send",className:"btn btn-success"},r.a.createElement("i",{className:"material-icons"}," backup ")," ",r.a.createElement("span",null,"Actualizar"))))),r.a.createElement("div",{className:"form-content"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-4"},r.a.createElement("div",{className:"form-group mb-2"},r.a.createElement("input",{value:t,onChange:this.onChange,type:"password",className:"form-control form-control frm_field",placeholder:"Contrase\xf1a actual",name:"old_password",required:!0}),r.a.createElement("small",{className:"form-text text-muted"},"Para validad tu identidad"))),r.a.createElement("div",{className:"col-sm-4"},r.a.createElement("div",{className:"form-group mb-2"},r.a.createElement("input",{value:a,onChange:this.onChange,type:"password",className:"form-control form-control frm_field",placeholder:"Nueva contrase\xf1a",name:"new_password",required:!0}),r.a.createElement("small",{className:"form-text text-muted"},"Escribe la nueva contrase\xf1a"))),r.a.createElement("div",{className:"col-sm-4"},r.a.createElement("div",{className:"form-group mb-2"},r.a.createElement("input",{value:n,onChange:this.onChange,type:"password",className:"form-control form-control frm_field",placeholder:"Confirma la contrase\xf1a",name:"conf_password",required:!0}),r.a.createElement("small",{className:"form-text text-muted"},"Repite la contrase\xf1a")))))))}}]),t}(n.Component),ie=Object(f.b)(function(e){return{session:e.session}})(le),me=a(28),ue=Object(f.b)(function(e){return{session:e.session}})(function(e){var t=e.component,a=e.session,n=Object(me.a)(e,["component","session"]);return r.a.createElement(E.a,Object.assign({},n,{render:function(e){return n.permisos&&n.permisos.filter(function(e){return e===a.user.permisos}).length>0?r.a.createElement(t,e):r.a.createElement(J,{statusCode:"401"})}}))}),de=function(e){function t(){return Object(o.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(T,null),r.a.createElement(P,null),r.a.createElement(p.a,null,r.a.createElement(ue,{permisos:[0,1],exact:!0,path:"/clientes",component:G}),r.a.createElement(ue,{permisos:[0,1],exact:!0,path:"/clientes/crear",component:Y}),r.a.createElement(ue,{permisos:[0,1],exact:!0,path:"/clientes/editar/:id",component:Y}),r.a.createElement(ue,{permisos:[0,1,2],exact:!0,path:"/servicios",component:Q}),r.a.createElement(ue,{permisos:[0,1,2],exact:!0,path:"/servicios/crear",component:re}),r.a.createElement(ue,{permisos:[0],exact:!0,path:"/usuarios",component:se}),r.a.createElement(ue,{permisos:[0],exact:!0,path:"/usuarios/crear",component:oe}),r.a.createElement(ue,{permisos:[0],exact:!0,path:"/usuarios/editar/:id",component:oe}),r.a.createElement(ue,{permisos:[0,1,2],exact:!0,path:"/password",component:ie}),r.a.createElement(E.a,{component:J})))}}]),t}(n.Component),pe=(a(119),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).onChange=function(e){var t=e.target,n=t.name,r=t.value;a.setState(Object(W.a)({},n,r))},a.onSubmit=function(e){e.preventDefault();var t=a.state,n=t.usuario,r=t.password;y.a.post("/api/auth",{usuario:n,password:r}).then(function(e){if(200===e.status){var t=e.data,n=t.token,r=t.user;localStorage.setItem("jwtToken",n),a.props.setCurrentUser(r);var s=I.menu.reduce(function(e,t){var a=t.items.reduce(function(e,t){return t.permisos.filter(function(e){return e===r.permisos}).length>0?[].concat(Object(M.a)(e),[t.url]):Object(M.a)(e)},[]);return[].concat(Object(M.a)(e),Object(M.a)(a))},[]);return s.length>0?a.props.history.push(s[0]):a.props.history.push("/")}}).catch(function(e){if(404===e.response.status)return H.toast.error("Credenciales inv\xe1lidas");H.toast.error(e.response.data)})},a.state={usuario:"",password:""},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state,t=e.usuario,a=e.password;return r.a.createElement("div",null,r.a.createElement(B.Helmet,null,r.a.createElement("title",null,"Login | ","PuntoLab")),r.a.createElement("div",{className:"card-alternative"},r.a.createElement("div",{className:"wrap"},r.a.createElement("div",{className:"card-content"},r.a.createElement("form",{className:"login-form",onSubmit:this.onSubmit},r.a.createElement("input",{onChange:this.onChange,value:t,type:"text",placeholder:"Nombre de usuario",name:"usuario"}),r.a.createElement("input",{onChange:this.onChange,value:a,type:"password",placeholder:"Contrase\xf1a",name:"password"}),r.a.createElement("button",null,"login"))))))}}]),t}(n.Component)),Ee={setCurrentUser:N},fe=Object(X.a)(Object(f.b)(null,Ee)(pe)),he=a(126),ve=Object(f.b)(function(e){return{session:e.session}})(function(e){var t=e.component,a=e.session,n=Object(me.a)(e,["component","session"]);return r.a.createElement(E.a,Object.assign({},n,{render:function(e){return!0===a.isAuth?r.a.createElement(t,e):r.a.createElement(he.a,{to:"/login"})}}))});a(120),a(121),a(122);if(F.a.set("prompt","transition","flipx"),F.a.set("alert","transition","fade"),localStorage.jwtToken)try{var be=_()(localStorage.jwtToken);j.dispatch(N(be)),y.a.post("/api/token/validate",{token:localStorage.jwtToken}).then(function(e){(e.data||e.data._id)&&j.dispatch(N(e.data))}).catch(function(e){j.dispatch(g())})}catch(ge){console.log("Decoded error")}var Ne=function(e){function t(){return Object(o.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=document.getElementById("ipl-progress-indicator");e&&setTimeout(function(){e.classList.add("available"),setTimeout(function(){e.outerHTML=""},2e3)},500)}},{key:"render",value:function(){return r.a.createElement(f.a,{store:j},r.a.createElement(d.a,null,r.a.createElement(p.a,null,r.a.createElement(E.a,{exact:!0,path:"/login",component:fe}),r.a.createElement(ve,{component:de}))),r.a.createElement(H.ToastContainer,{draggable:!1,pauseOnHover:!1,pauseOnFocusLoss:!1,closeOnClick:!1}))}}]),t}(n.Component);c.a.render(r.a.createElement(Ne,null),document.getElementById("root"))},24:function(e){e.exports={menu:[{title:"Men\xfa principal",items:[{name:"Clientes",icon:"people",url:"/clientes",permisos:[0,1]},{name:"Servicios",icon:"settings",url:"/servicios",permisos:[0,1,2]}]},{title:"Cuenta",items:[{name:"Usuarios",icon:"people_outline",url:"/usuarios",permisos:[0]},{name:"Cambiar contrase\xf1a",icon:"security",url:"/password",permisos:[0,1,2]}]}]}},39:function(e){e.exports={servicios:[{id:"0",descripcion:"Instalaci\xf3n de internet"},{id:"1",descripcion:"Instalaci\xf3n de c\xe1maras de seguridad"},{id:"2",descripcion:"Dise\xf1o de p\xe1ginas web"},{id:"3",descripcion:"Soporte y mantenimiento a equipos de c\xf3mputo"},{id:"4",descripcion:"Venta de software"}]}},52:function(e,t,a){e.exports=a.p+"static/media/logo.a14509a1.png"},55:function(e,t,a){e.exports=a(123)},60:function(e,t,a){},86:function(e,t,a){},87:function(e,t,a){},88:function(e,t,a){}},[[55,1,2]]]);
//# sourceMappingURL=main.6c4a1daf.chunk.js.map