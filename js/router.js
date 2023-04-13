export class Router {

  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event // VERIFICANDO SE PASSEI O EVENTO, SE NÃO PEGA O EVENTO QUE ESTÁ NA JANELA (WINDOW - QUE É GLOBAL)
    event.preventDefault() // NÃO FAÇA O PADRÃO, NO CASO, NÃO ESTÁ REDIRECIONANDO

    window.history.pushState({}, "", event.target.href) // TARGET QUEM DISPAROU O EVENTO -- ESTOU COLOCANDO O HREF NO MEU HISTÓRICO

    if(window.location.pathname == "/exploration") {
      document.body.style.backgroundImage = "url(../assets/mountains-universe-3.png)"
      document.getElementById("exp").style.fontWeight = "700"
      document.getElementById("univ").style.fontWeight = "400"
      document.getElementById("hom").style.fontWeight = "400"
    } else if(window.location.pathname == "/universe") {
      document.body.style.backgroundImage = "url(../assets/mountains-universe02.png)"
      document.getElementById("univ").style.fontWeight = "700"
      document.getElementById("exp").style.fontWeight = "400"
      document.getElementById("hom").style.fontWeight = "400"
    } else {
      document.body.style.backgroundImage = "url(../assets/mountains-universe-1.png)"
      document.getElementById("hom").style.fontWeight = "700"
      document.getElementById("univ").style.fontWeight = "400"
      document.getElementById("exp").style.fontWeight = "400"
    }
    document.body.style.backgroundSize = '100% 100%'
    this.handle()
  }

  handle() {
    const { pathname }  = window.location
    const route = this.routes[pathname] || this.routes[404]
    fetch(route)
    .then(data => data.text())
    .then(html => {
      document.querySelector('#app').innerHTML = html
    })
  }
}