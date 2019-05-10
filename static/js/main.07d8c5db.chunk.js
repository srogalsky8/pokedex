(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{37:function(e,t,n){e.exports=n(72)},42:function(e,t,n){},72:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(14),i=n.n(r),s=(n(42),n(7)),c=n(8),l=n(11),m=n(9),u=n(10),p=n(20),d=n(13),h=n(12),g=n(16),f=function(e){return{type:"SET_BAG",payload:e}},b=Object(g.b)({pokemonList:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_POKEMON_LIST":return t.payload;default:return e}},bag:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_BAG":return t.payload;default:return e}}});var k=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(g.c)(b,e)}(),v=n(34),E=n.n(v),y=function(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=151").then(function(e){return e.json()}).then(function(e){return e.results.map(function(e,t){return e.id=t+1,e})})},O=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(m.a)(t).call(this,e))).getFilteredPokemon=function(){var e=n.props.pokemonList;return n.state.search&&(e=e.filter(function(e){return e.name.includes(n.state.search)})),n.state.showBagOnly&&(e=e.filter(function(e){return n.props.bag[e.id]})),e.slice(0,n.state.numCardsLoaded)},n.getCards=function(){return n.getFilteredPokemon().map(function(e){return o.a.createElement("div",{className:"card-container text-center",key:e.id},o.a.createElement(p.b,{className:"card",to:"/pokemon/"+e.name},o.a.createElement("img",{className:"card-img",alt:e.name,src:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+e.id+".png"})),o.a.createElement("div",{className:"card-label"},e.name))})},n.state={pokemon:[],search:"",showBagOnly:!1,numCardsLoaded:20},0===e.pokemonList.length&&y().then(function(t){e.setPokemonList(t)}),n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"Home container",style:{marginTop:"10em"}},o.a.createElement("div",{className:"list-toggle text-center"},o.a.createElement("div",{className:"btn-group"},o.a.createElement("button",{className:"btn all-btn "+(this.state.showBagOnly?"":"active"),onClick:function(){return e.setState({showBagOnly:!1,numCardsLoaded:20})}},"All"),o.a.createElement("button",{className:"btn bag-btn "+(this.state.showBagOnly?"active":""),onClick:function(){return e.setState({showBagOnly:!0,numCardsLoaded:20})}},"Bag"))),o.a.createElement("div",{className:"search-input-container text-center"},o.a.createElement("input",{type:"text",value:this.state.search,onChange:function(t){return e.setState({search:t.target.value,numCardsLoaded:20})},placeholder:"Search"})),o.a.createElement(E.a,{pageStart:0,loadMore:function(){return e.setState({numCardsLoaded:e.state.numCardsLoaded+20})},hasMore:this.state.numCardsLoaded<this.props.pokemonList.length,loader:o.a.createElement("div",{className:"loader",key:0},"Loading ...")},o.a.createElement("div",{className:"card-deck"},this.getCards())))}}]),t}(o.a.Component),j={setPokemonList:function(e){return{type:"SET_POKEMON_LIST",payload:e}}},w=Object(h.b)(function(e){return{pokemonList:e.pokemonList,bag:e.bag}},j)(O),N=n(36),L=n.n(N),C=["32.734778,-117.152630","32.734196,-117.139709","32.833744,-117.067149","32.819219,-117.029244","32.907707,-116.797917"],B=function(e){return Promise.resolve(C).then(function(e){return S(e)})},S=function(e){return e.map(function(e){var t=e.split(",");return{lat:parseFloat(t[0]),lng:parseFloat(t[1])}})},P=function(e){var t=e.pokemon;return o.a.createElement("img",{src:t.sprites.front_default,width:50,alt:t.name})},A=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(m.a)(t).call(this,e))).positionMap=function(e){var t=new e.maps.LatLngBounds;for(var a in n.state.locations)t.extend(new e.maps.LatLng(n.state.locations[a].lat,n.state.locations[a].lng));e.map.fitBounds(t)},n.state={locations:null},B(e.pokemon.id).then(function(e){n.setState({locations:e})}),n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return this.state.locations?o.a.createElement("div",{className:"Map"},o.a.createElement("div",{style:{height:"30em",width:"100%"}},o.a.createElement(L.a,{bootstrapURLKeys:{key:"AIzaSyAEJ3rGsi9pShMUPjS9_CNALgEX5l_l3iA"},defaultCenter:{lat:32.7157,lng:-117.1611},defaultZoom:11,yesIWantToUseGoogleMapApiInternals:!0,onGoogleApiLoaded:function(t,n){return e.positionMap(t,n)}},this.state.locations.map(function(t,n){return o.a.createElement(P,{lat:t.lat,lng:t.lng,key:n,pokemon:e.props.pokemon})})))):o.a.createElement("div",null)}}]),t}(o.a.Component),x=function(e,t){var n=e+"="+JSON.stringify(t);document.cookie=n},I=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(o)))).toggleBag=function(){var e=n.props.pokemon.id,t=Object.assign({},n.props.bag);t[e]?delete t[e]:t[e]=!0,x("bag",t),n.props.setBag(t)},n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"Info"},o.a.createElement("div",{className:"info-img-container"},o.a.createElement("div",{className:"info-img-box"},o.a.createElement("img",{className:"info-img",src:this.props.pokemon.sprites.front_default,alt:this.props.pokemon.name})),o.a.createElement("div",{className:"card-label text-center"},this.props.pokemon.name)),o.a.createElement("p",null,"Height: ",this.props.pokemon.height),o.a.createElement("p",null,"Weight: ",this.props.pokemon.weight),o.a.createElement("p",null,"In bag: ",o.a.createElement("input",{name:"inBag",type:"checkbox",checked:this.props.bag[this.props.pokemon.id],onChange:this.toggleBag})),o.a.createElement("p",null,this.props.pokemon.types.map(function(e,t){return o.a.createElement("span",{className:"label",key:t},e.type.name)})),o.a.createElement("p",null,"Bacon ipsum dolor amet alcatra brisket chuck jerky bresaola. Capicola ball tip landjaeger pig burgdoggen. Kielbasa short loin kevin salami landjaeger leberkas cow. Meatball jowl ball tip brisket shankle porchetta, filet mignon rump."),o.a.createElement("div",null,o.a.createElement("ul",null,this.props.pokemon.stats.map(function(e,t){return o.a.createElement("li",{key:t},e.stat.name,": ",e.base_stat)}))))}}]),t}(o.a.Component),_={setBag:f},M=Object(h.b)(function(e){return{bag:e.bag}},_)(I),T=function(e){return function(e){return fetch("https://pokeapi.co/api/v2/pokemon/"+e).then(function(e){return e.json()})}(e)},G=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(m.a)(t).call(this,e))).getInfoPane=function(){if(n.state.pokemon)return o.a.createElement(M,{pokemon:n.state.pokemon})},n.getContentPane=function(){if(n.state.pokemon)return o.a.createElement("div",null,o.a.createElement(A,{pokemon:n.state.pokemon}),o.a.createElement("div",{style:{marginTop:"2em"}},"Abilities:",n.state.pokemon.abilities.map(function(e,t){return o.a.createElement("div",{key:t},e.ability.name)})))},n.state={pokemon:null,locations:null},T(e.match.params.name).then(function(e){n.setState({pokemon:e})}),n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"Details",style:{marginTop:"10em"}},o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"details-container"},o.a.createElement("div",{className:"info-pane"},this.getInfoPane()),o.a.createElement("div",{className:"content-pane"},this.getContentPane()))))}}]),t}(o.a.Component),J=function(e){var t=document.cookie.match(new RegExp(e+"=([^;]+)"));return t&&(t=JSON.parse(t[1])),t}("bag"),F=function(e){function t(e){var n;return Object(s.a)(this,t),n=Object(l.a)(this,Object(m.a)(t).call(this,e)),e.setBag(J||{}),n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement(p.a,null,o.a.createElement("div",{className:"App"},o.a.createElement(d.a,{exact:!0,path:"/",component:w}),o.a.createElement(d.a,{path:"/pokemon/:name",component:G})))}}]),t}(o.a.Component),K={setBag:f},W=Object(h.b)(null,K)(F);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(h.a,{store:k},o.a.createElement(W,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[37,1,2]]]);
//# sourceMappingURL=main.07d8c5db.chunk.js.map